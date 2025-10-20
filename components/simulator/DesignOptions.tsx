"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { simulatorConfig } from "@/lib/simulator/config";
import { useSimulatorStore } from "@/lib/simulator/store";
import { Check } from "lucide-react";

export function DesignOptions() {
  const t = useTranslations("simulator");
  const { designOptions, toggleDesignOption } = useSimulatorStore();

  // Grouper les options par catégorie
  const categorizedOptions = simulatorConfig.designOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, typeof simulatorConfig.designOptions>);

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h3 className="text-2xl font-medium text-black-deep mb-2">
          Design & Expérience Utilisateur
        </h3>
        <p className="text-gray-secondary text-sm">
          Personnalisez l'identité visuelle et l'expérience de votre projet
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(categorizedOptions).map(([category, options]) => {
          // Map category names to translation keys
          const categoryKey = category === 'Direction artistique' ? 'direction' :
                             category === 'UX Design' ? 'ux' : 'ui';

          return (
          <div key={category}>
            <h4 className="text-sm uppercase tracking-[0.15em] text-orange-pantone mb-4">
              {t(`config.designOptions.categories.${categoryKey}`)}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {options.map((option) => {
                const isSelected = designOptions.includes(option.id);
                const hasDependencies = option.dependencies && option.dependencies.length > 0;
                const dependenciesMet = !hasDependencies || option.dependencies?.every(dep => designOptions.includes(dep));

                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    onClick={() => toggleDesignOption(option.id)}
                    className={`
                      relative p-4 border text-left transition-all flex items-start gap-3
                      ${isSelected
                        ? 'border-orange-pantone bg-orange-pantone/5'
                        : 'border-black-deep/10 hover:border-orange-pantone/50 bg-white-pure'
                      }
                      ${!dependenciesMet && !isSelected ? 'opacity-60' : ''}
                    `}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
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
                          {t(`config.designOptions.items.${option.id}.name`)}
                        </h5>
                        <span className="text-orange-pantone font-medium text-sm whitespace-nowrap">
                          {option.price > 0 ? `+${option.price}€` : t("design.included")}
                        </span>
                      </div>

                      <p className="text-sm text-gray-secondary">
                        {t(`config.designOptions.items.${option.id}.description`)}
                      </p>

                      {/* Dependencies info */}
                      {hasDependencies && (
                        <div className="mt-2 text-xs text-gray-secondary/70">
                          {t("design.requires")} : {option.dependencies?.map(dep => {
                            return t(`config.designOptions.items.${dep}.name`);
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
