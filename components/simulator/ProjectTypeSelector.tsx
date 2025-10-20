"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { simulatorConfig } from "@/lib/simulator/config";
import { useSimulatorStore } from "@/lib/simulator/store";
import { Check } from "lucide-react";

export function ProjectTypeSelector() {
  const t = useTranslations("simulator");
  const { projectType, setProjectType } = useSimulatorStore();

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h3 className="text-2xl font-medium text-black-deep mb-2">
          {t("projectType.title")}
        </h3>
        <p className="text-gray-secondary text-sm">
          {t("projectType.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {simulatorConfig.projectTypes.map((type) => {
          const isSelected = projectType === type.id;

          return (
            <motion.button
              key={type.id}
              type="button"
              onClick={() => setProjectType(type.id)}
              className={`
                relative p-6 border-2 text-left transition-all
                ${isSelected
                  ? 'border-orange-pantone bg-orange-pantone/5'
                  : 'border-black-deep/10 hover:border-orange-pantone/50 bg-white-pure'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Check indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-orange-pantone flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white-pure" />
                </motion.div>
              )}

              {/* Content */}
              <div className="mb-3">
                <h4 className="text-lg font-medium text-black-deep mb-1">
                  {t(`config.projectTypes.${type.id}.name`)}
                </h4>
                <p className="text-sm text-gray-secondary">
                  {t(`config.projectTypes.${type.id}.description`)}
                </p>
              </div>

              {/* Price */}
              <div className="text-orange-pantone font-medium">
                {type.id === 'refonte' ? (
                  <span className="text-sm">{t("projectType.discount")}</span>
                ) : (
                  <span>{t("projectType.startingFrom")} {type.basePrice}€</span>
                )}
              </div>

              {/* Impact badge */}
              {type.impact && (
                <div className="mt-3 text-xs text-gray-secondary/70 uppercase tracking-wider">
                  {type.impact}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
