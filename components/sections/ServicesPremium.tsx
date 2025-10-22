"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShoppingBag, Layout, Rocket, Calculator } from "lucide-react";
import { Card3D } from "@/components/ui/card-3d";
import { PriceSimulatorModal } from "@/components/ui/price-simulator-modal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MorphingIcon } from "@/components/ui/morphing-icon";
import { useState } from "react";

const services = [
  {
    id: "shopify",
    icon: ShoppingBag,
    key: "shopify" as const,
  },
  {
    id: "wordpress",
    icon: Layout,
    key: "wordpress" as const,
  },
  {
    id: "saas",
    icon: Rocket,
    key: "saas" as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function ServicesPremium() {
  const t = useTranslations("services");
  const tSimulator = useTranslations("simulator");
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="services" className="py-32 md:py-40 bg-cream">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gray-secondary mb-4 block">
            {t("label")}
          </span>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-tight tracking-[-0.02em] text-black-deep">
            {t("title")}{" "}
            <span className="text-orange-pantone">{t("titleHighlight")}</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card3D
                  className="h-full"
                  glowColor="rgba(255, 122, 0, 0.2)"
                  intensity={8}
                >
                  <div className="group relative bg-cream hover:bg-white-pure card-hover border border-black-deep/10 p-8 md:p-12 min-h-[400px] md:min-h-[500px] flex flex-col cursor-default h-full">

                {/* Number */}
                <div className="absolute top-8 right-8 text-[120px] font-medium leading-none text-black-deep/5 group-hover:text-orange-pantone/10 transition-colors duration-700">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon with Morphing Effect */}
                <div className="mb-8 relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center border border-black-deep/20 group-hover:border-orange-pantone group-hover:bg-orange-pantone transition-all duration-500">
                    <MorphingIcon
                      Icon={Icon}
                      isHovered={hoveredCard === service.id}
                      className="text-black-deep group-hover:text-white-pure transition-colors duration-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow relative z-10">
                  <h3 className="text-2xl font-medium mb-6 text-black-deep tracking-tight">
                    {t(`items.${service.key}.title`)}
                  </h3>
                  <p className="text-gray-secondary leading-relaxed mb-8">
                    {t(`items.${service.key}.description`)}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {[0, 1, 2].map((i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-secondary"
                      >
                        <span className="w-1 h-1 bg-orange-pantone rounded-full mt-2 flex-shrink-0" />
                        <span>{t(`items.${service.key}.features.${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                    {/* Hover Line */}
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-orange-pantone group-hover:w-full transition-all duration-700" />
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="text-center mt-20"
        >
          <MagneticButton
            onClick={() => setIsSimulatorOpen(true)}
            strength={0.3}
            className="bg-orange-pantone text-white-pure transition-colors px-8 py-6 text-base font-medium inline-flex items-center gap-4 group relative overflow-hidden uppercase tracking-wide duration-500"
          >
            <span className="absolute inset-0 bg-black-deep transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Calculator className="w-5 h-5 relative z-10" />
            <span className="relative z-10">{tSimulator("cta")}</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Price Simulator Modal */}
      <PriceSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />
    </section>
  );
}
