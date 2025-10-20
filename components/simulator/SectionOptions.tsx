"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { simulatorConfig } from "@/lib/simulator/config";
import { useSimulatorStore } from "@/lib/simulator/store";

export function SectionOptions() {
  const t = useTranslations("simulator");
  const { sections, setSection } = useSimulatorStore();

  const getSectionLevel = (sectionId: string): 'basic' | 'advanced' | 'premium' | null => {
    const section = sections.find(s => s.sectionId === sectionId);
    return section?.level || null;
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h3 className="text-2xl font-medium text-black-deep mb-2">
          Structure & Contenu
        </h3>
        <p className="text-gray-secondary text-sm">
          Choisissez les sections de votre site et leur niveau de sophistication
        </p>
      </div>

      <div className="space-y-4">
        {simulatorConfig.sectionOptions.map((section) => {
          const currentLevel = getSectionLevel(section.id);

          return (
            <div key={section.id} className="bg-white-pure border border-black-deep/10 p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-black-deep">
                  {t(`config.sectionOptions.${section.id}.name`)}
                </h4>

                {/* Toggle to remove section */}
                {currentLevel && (
                  <button
                    type="button"
                    onClick={() => setSection(section.id, null)}
                    className="text-xs text-gray-secondary hover:text-orange-pantone transition-colors uppercase tracking-wider"
                  >
                    {t("structure.remove")}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Basic */}
                <motion.button
                  type="button"
                  onClick={() => setSection(section.id, 'basic')}
                  className={`
                    p-4 border-2 text-left transition-all
                    ${currentLevel === 'basic'
                      ? 'border-orange-pantone bg-orange-pantone/5'
                      : 'border-black-deep/10 hover:border-orange-pantone/50'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm uppercase tracking-wider text-gray-secondary">
                      {t("structure.levels.basic")}
                    </span>
                    <span className="text-orange-pantone font-medium">
                      +{section.basicPrice}€
                    </span>
                  </div>
                  <p className="text-sm text-gray-secondary">
                    {t(`config.sectionOptions.${section.id}.basic`)}
                  </p>
                </motion.button>

                {/* Advanced */}
                <motion.button
                  type="button"
                  onClick={() => setSection(section.id, 'advanced')}
                  className={`
                    p-4 border-2 text-left transition-all
                    ${currentLevel === 'advanced'
                      ? 'border-orange-pantone bg-orange-pantone/5'
                      : 'border-black-deep/10 hover:border-orange-pantone/50'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm uppercase tracking-wider text-gray-secondary">
                      {t("structure.levels.advanced")}
                    </span>
                    <span className="text-orange-pantone font-medium">
                      +{section.advancedPrice}€
                    </span>
                  </div>
                  <p className="text-sm text-gray-secondary">
                    {t(`config.sectionOptions.${section.id}.advanced`)}
                  </p>
                </motion.button>

                {/* Premium */}
                <motion.button
                  type="button"
                  onClick={() => setSection(section.id, 'premium')}
                  className={`
                    p-4 border-2 text-left transition-all
                    ${currentLevel === 'premium'
                      ? 'border-orange-pantone bg-orange-pantone/5'
                      : 'border-black-deep/10 hover:border-orange-pantone/50'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm uppercase tracking-wider text-gray-secondary">
                      {t("structure.levels.premium")}
                    </span>
                    <span className="text-orange-pantone font-medium">
                      +{section.premiumPrice}€
                    </span>
                  </div>
                  <p className="text-sm text-gray-secondary">
                    {t(`config.sectionOptions.${section.id}.premium`)}
                  </p>
                </motion.button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
