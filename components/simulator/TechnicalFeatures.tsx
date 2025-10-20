"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { simulatorConfig } from "@/lib/simulator/config";
import { useSimulatorStore } from "@/lib/simulator/store";
import { Check } from "lucide-react";

export function TechnicalFeatures() {
  const t = useTranslations("simulator");
  const { technicalFeatures, toggleTechnicalFeature } = useSimulatorStore();

  // Grouper les features par catégorie
  const categorizedFeatures = simulatorConfig.technicalFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, typeof simulatorConfig.technicalFeatures>);

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h3 className="text-2xl font-medium text-black-deep mb-2">
          Fonctionnalités Techniques
        </h3>
        <p className="text-gray-secondary text-sm">
          Ajoutez des fonctionnalités avancées à votre projet
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(categorizedFeatures).map(([category, features]) => {
          // Map category names to translation keys
          const categoryMap: Record<string, string> = {
            'Architecture': 'architecture',
            'Authentification': 'auth',
            'Back-office': 'backoffice',
            'E-commerce': 'ecommerce',
            'Documents': 'documents',
            'API / intégrations': 'api',
            'Stockage': 'storage',
            'Notifications': 'notifications',
            'Recherche': 'search'
          };
          const categoryKey = categoryMap[category] || category;

          return (
          <div key={category}>
            <h4 className="text-sm uppercase tracking-[0.15em] text-orange-pantone mb-4">
              {t(`config.technicalFeatures.categories.${categoryKey}`)}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature) => {
                const isSelected = technicalFeatures.includes(feature.id);
                const hasRequiredFeatures = feature.requiredFeatures && feature.requiredFeatures.length > 0;
                const requirementsMet = !hasRequiredFeatures || feature.requiredFeatures?.every(req => technicalFeatures.includes(req));

                return (
                  <motion.button
                    key={feature.id}
                    type="button"
                    onClick={() => toggleTechnicalFeature(feature.id)}
                    disabled={!requirementsMet && !isSelected}
                    className={`
                      relative p-4 border text-left transition-all flex items-start gap-3
                      ${isSelected
                        ? 'border-orange-pantone bg-orange-pantone/5'
                        : 'border-black-deep/10 hover:border-orange-pantone/50 bg-white-pure'
                      }
                      ${!requirementsMet && !isSelected ? 'opacity-40 cursor-not-allowed' : ''}
                    `}
                    whileHover={requirementsMet || isSelected ? { scale: 1.01 } : {}}
                    whileTap={requirementsMet || isSelected ? { scale: 0.99 } : {}}
                  >
                    {/* Checkbox */}
                    <div className={`
                      w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                      ${isSelected
                        ? 'border-orange-pantone bg-orange-pantone'
                        : 'border-black-deep/20'
                      }
                    `}>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check className="w-3 h-3 text-white-pure" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h5 className="text-base font-medium text-black-deep">
                          {t(`config.technicalFeatures.items.${feature.id}.name`)}
                        </h5>
                        <span className="text-orange-pantone font-medium text-sm whitespace-nowrap">
                          {feature.price > 0 ? `+${feature.price}€` : t("technical.included")}
                        </span>
                      </div>

                      <p className="text-sm text-gray-secondary">
                        {t(`config.technicalFeatures.items.${feature.id}.description`)}
                      </p>

                      {/* Conditions */}
                      {feature.conditions && (
                        <div className="mt-2 text-xs text-gray-secondary/70 italic">
                          {t("technical.conditions")} : {feature.conditions}
                        </div>
                      )}

                      {/* Required features info */}
                      {hasRequiredFeatures && !requirementsMet && (
                        <div className="mt-2 text-xs text-orange-pantone">
                          {t("technical.requiresWarning")} : {feature.requiredFeatures?.map(req => {
                            return t(`config.technicalFeatures.items.${req}.name`);
                          }).join(', ')}
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}
