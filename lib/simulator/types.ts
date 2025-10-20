// Types pour le simulateur de prix

export interface ProjectType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  impact?: string;
}

export interface DesignOption {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  dependencies?: string[];
}

export interface SectionOption {
  id: string;
  name: string;
  basicPrice: number;
  advancedPrice: number;
  premiumPrice: number;
  descriptions: {
    basic: string;
    advanced: string;
    premium: string;
  };
}

export interface TechnicalFeature {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  conditions?: string;
  requiredFeatures?: string[];
}

export interface MaintenanceOption {
  id: string;
  name: string;
  description: string;
  setupPrice: number;
  monthlyPrice: number;
}

export interface PerformanceOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface ContentOption {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
}

export interface SimulatorConfig {
  projectTypes: ProjectType[];
  designOptions: DesignOption[];
  sectionOptions: SectionOption[];
  technicalFeatures: TechnicalFeature[];
  maintenanceOptions: MaintenanceOption[];
  performanceOptions: PerformanceOption[];
  contentOptions: ContentOption[];
}

export interface SelectedSection {
  sectionId: string;
  level: 'basic' | 'advanced' | 'premium';
}

export interface SimulatorState {
  // Sélections
  projectType: string | null;
  designOptions: string[];
  sections: SelectedSection[];
  technicalFeatures: string[];
  maintenanceOptions: string[];
  performanceOptions: string[];
  contentOptions: { [key: string]: number }; // id -> quantité

  // Calculs
  totalPrice: number;
  estimatedDuration: number; // en jours
  complexity: number;

  // Actions
  setProjectType: (typeId: string | null) => void;
  toggleDesignOption: (optionId: string) => void;
  setSection: (sectionId: string, level: 'basic' | 'advanced' | 'premium' | null) => void;
  toggleTechnicalFeature: (featureId: string) => void;
  toggleMaintenanceOption: (optionId: string) => void;
  togglePerformanceOption: (optionId: string) => void;
  setContentOption: (optionId: string, quantity: number) => void;
  calculateTotal: () => void;
  reset: () => void;
}

export interface QuoteData {
  projectType: string;
  selections: {
    design: string[];
    sections: SelectedSection[];
    technical: string[];
    maintenance: string[];
    performance: string[];
    content: { [key: string]: number };
  };
  pricing: {
    subtotal: number;
    tax: number;
    total: number;
  };
  estimation: {
    duration: number; // jours
    complexity: number;
  };
  generatedAt: Date;
}
