import { create } from 'zustand';
import { SimulatorState, SelectedSection } from './types';
import { simulatorConfig } from './config';

const HOURLY_RATE = 70; // €/h
const HOURS_PER_DAY = 6;
const TAX_RATE = 0.2; // 20% TVA

// Fonction récursive pour obtenir toutes les dépendances (directes et indirectes)
const getAllDependencies = (optionId: string, type: 'design' | 'technical'): string[] => {
  const config = type === 'design' ? simulatorConfig.designOptions : simulatorConfig.technicalFeatures;
  const option = config.find(o => o.id === optionId);

  if (!option) return [];

  const deps = type === 'design'
    ? (option as any).dependencies || []
    : (option as any).requiredFeatures || [];

  if (deps.length === 0) return [];

  // Récursivement obtenir toutes les dépendances
  const allDeps = [...deps];
  deps.forEach((dep: string) => {
    const subDeps = getAllDependencies(dep, type);
    subDeps.forEach(subDep => {
      if (!allDeps.includes(subDep)) {
        allDeps.push(subDep);
      }
    });
  });

  return allDeps;
};

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  // État initial
  projectType: null,
  designOptions: [],
  sections: [],
  technicalFeatures: [],
  maintenanceOptions: [],
  performanceOptions: [],
  contentOptions: {},
  totalPrice: 0,
  estimatedDuration: 0,
  complexity: 0,

  // Actions
  setProjectType: (typeId) => {
    set({ projectType: typeId });
    get().calculateTotal();
  },

  toggleDesignOption: (optionId) => {
    const { designOptions } = get();
    const option = simulatorConfig.designOptions.find(o => o.id === optionId);

    if (!option) return;

    // Si l'option n'est pas sélectionnée, l'ajouter avec toutes ses dépendances
    if (!designOptions.includes(optionId)) {
      // Obtenir TOUTES les dépendances (directes et indirectes)
      const allDeps = getAllDependencies(optionId, 'design');
      const missingDeps = allDeps.filter(dep => !designOptions.includes(dep));

      if (missingDeps.length > 0) {
        // Ajouter toutes les dépendances manquantes + l'option
        set({
          designOptions: [...designOptions, ...missingDeps, optionId]
        });
      } else {
        // Pas de dépendances manquantes, juste ajouter l'option
        set({
          designOptions: [...designOptions, optionId]
        });
      }
    } else {
      // Retirer l'option ET toutes les options qui dépendent d'elle
      const dependentOptions = simulatorConfig.designOptions
        .filter(o => o.dependencies?.includes(optionId))
        .map(o => o.id);

      const optionsToRemove = [optionId, ...dependentOptions];
      set({
        designOptions: designOptions.filter(id => !optionsToRemove.includes(id))
      });
    }

    get().calculateTotal();
  },

  setSection: (sectionId, level) => {
    const { sections } = get();
    const existingIndex = sections.findIndex(s => s.sectionId === sectionId);

    if (level === null) {
      // Retirer la section
      set({ sections: sections.filter(s => s.sectionId !== sectionId) });
    } else if (existingIndex >= 0) {
      // Mettre à jour le niveau
      const newSections = [...sections];
      newSections[existingIndex] = { sectionId, level };
      set({ sections: newSections });
    } else {
      // Ajouter la section
      set({ sections: [...sections, { sectionId, level }] });
    }

    get().calculateTotal();
  },

  toggleTechnicalFeature: (featureId) => {
    const { technicalFeatures } = get();
    const feature = simulatorConfig.technicalFeatures.find(f => f.id === featureId);

    if (!feature) return;

    // Si la feature n'est pas sélectionnée, l'ajouter avec toutes ses dépendances
    if (!technicalFeatures.includes(featureId)) {
      // Obtenir TOUTES les dépendances (directes et indirectes)
      const allDeps = getAllDependencies(featureId, 'technical');
      const missingDeps = allDeps.filter(dep => !technicalFeatures.includes(dep));

      if (missingDeps.length > 0) {
        // Ajouter toutes les dépendances manquantes + la feature
        set({
          technicalFeatures: [...technicalFeatures, ...missingDeps, featureId]
        });
      } else {
        // Pas de dépendances manquantes, juste ajouter la feature
        set({
          technicalFeatures: [...technicalFeatures, featureId]
        });
      }
    } else {
      // Retirer la feature ET toutes les features qui dépendent d'elle
      const dependentFeatures = simulatorConfig.technicalFeatures
        .filter(f => f.requiredFeatures?.includes(featureId))
        .map(f => f.id);

      const featuresToRemove = [featureId, ...dependentFeatures];
      set({
        technicalFeatures: technicalFeatures.filter(id => !featuresToRemove.includes(id))
      });
    }

    get().calculateTotal();
  },

  toggleMaintenanceOption: (optionId) => {
    const { maintenanceOptions } = get();
    if (maintenanceOptions.includes(optionId)) {
      set({ maintenanceOptions: maintenanceOptions.filter(id => id !== optionId) });
    } else {
      set({ maintenanceOptions: [...maintenanceOptions, optionId] });
    }
    get().calculateTotal();
  },

  togglePerformanceOption: (optionId) => {
    const { performanceOptions } = get();
    if (performanceOptions.includes(optionId)) {
      set({ performanceOptions: performanceOptions.filter(id => id !== optionId) });
    } else {
      set({ performanceOptions: [...performanceOptions, optionId] });
    }
    get().calculateTotal();
  },

  setContentOption: (optionId, quantity) => {
    const { contentOptions } = get();
    if (quantity <= 0) {
      const newOptions = { ...contentOptions };
      delete newOptions[optionId];
      set({ contentOptions: newOptions });
    } else {
      set({ contentOptions: { ...contentOptions, [optionId]: quantity } });
    }
    get().calculateTotal();
  },

  calculateTotal: () => {
    const state = get();
    let total = 0;
    let complexityPoints = 0;

    // 1. Type de projet (base)
    if (state.projectType) {
      const projectType = simulatorConfig.projectTypes.find(t => t.id === state.projectType);
      if (projectType) {
        // Cas spécial pour refonte (-25% sur le total final)
        if (projectType.id !== 'refonte') {
          total += projectType.basePrice;
          complexityPoints += projectType.basePrice / 100;
        }
      }
    }

    // 2. Design options
    state.designOptions.forEach(optionId => {
      const option = simulatorConfig.designOptions.find(o => o.id === optionId);
      if (option) {
        total += option.price;
        complexityPoints += option.price / 50;
      }
    });

    // 3. Sections
    state.sections.forEach(({ sectionId, level }) => {
      const section = simulatorConfig.sectionOptions.find(s => s.id === sectionId);
      if (section) {
        const price = level === 'basic'
          ? section.basicPrice
          : level === 'advanced'
          ? section.advancedPrice
          : section.premiumPrice;

        total += price;
        complexityPoints += price / 50;
      }
    });

    // 4. Fonctionnalités techniques
    state.technicalFeatures.forEach(featureId => {
      const feature = simulatorConfig.technicalFeatures.find(f => f.id === featureId);
      if (feature) {
        total += feature.price;
        complexityPoints += feature.price / 50;
      }
    });

    // 5. Maintenance (setup uniquement pour le calcul initial)
    state.maintenanceOptions.forEach(optionId => {
      const option = simulatorConfig.maintenanceOptions.find(o => o.id === optionId);
      if (option) {
        total += option.setupPrice;
        complexityPoints += option.setupPrice / 100;
      }
    });

    // 6. Performance & SEO
    state.performanceOptions.forEach(optionId => {
      const option = simulatorConfig.performanceOptions.find(o => o.id === optionId);
      if (option) {
        total += option.price;
        complexityPoints += option.price / 50;
      }
    });

    // 7. Contenu
    Object.entries(state.contentOptions).forEach(([optionId, quantity]) => {
      const option = simulatorConfig.contentOptions.find(o => o.id === optionId);
      if (option) {
        total += option.price * quantity;
        complexityPoints += (option.price * quantity) / 100;
      }
    });

    // 8. Appliquer réduction refonte si applicable (-25%)
    if (state.projectType === 'refonte' && total > 0) {
      total = total * 0.75;
    }

    // 9. Calculer la durée estimée (en jours)
    // Formule : total / taux horaire / heures par jour
    const estimatedDays = Math.ceil(total / HOURLY_RATE / HOURS_PER_DAY);

    // 10. Mettre à jour le state
    set({
      totalPrice: Math.round(total),
      estimatedDuration: estimatedDays,
      complexity: Math.round(complexityPoints),
    });
  },

  reset: () => {
    set({
      projectType: null,
      designOptions: [],
      sections: [],
      technicalFeatures: [],
      maintenanceOptions: [],
      performanceOptions: [],
      contentOptions: {},
      totalPrice: 0,
      estimatedDuration: 0,
      complexity: 0,
    });
  },
}));

// Fonctions utilitaires pour obtenir le prix TTC
export const getTTC = (htPrice: number): number => {
  return Math.round(htPrice * (1 + TAX_RATE));
};

export const getTax = (htPrice: number): number => {
  return Math.round(htPrice * TAX_RATE);
};

// Fonction pour obtenir les coûts mensuels de maintenance
export const getMonthlyMaintenanceCost = (selectedOptions: string[]): number => {
  let monthly = 0;
  selectedOptions.forEach(optionId => {
    const option = simulatorConfig.maintenanceOptions.find(o => o.id === optionId);
    if (option) {
      monthly += option.monthlyPrice;
    }
  });
  return monthly;
};
