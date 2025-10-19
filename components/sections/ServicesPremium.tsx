"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShoppingBag, Layout, Rocket } from "lucide-react";

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
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ServicesPremium() {
  const t = useTranslations("services");

  return (
    <section id="services" className="py-32 md:py-40 bg-cream px-6 md:px-12">
      <div className="max-w-container mx-auto">
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
                className="group relative bg-cream hover:bg-white-pure card-hover border border-black-deep/10 p-12 min-h-[500px] flex flex-col cursor-default"
              >
                {/* Number */}
                <div className="absolute top-8 right-8 text-[120px] font-medium leading-none text-black-deep/5 group-hover:text-orange-pantone/10 transition-colors duration-700">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="mb-8 relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center border border-black-deep/20 group-hover:border-orange-pantone group-hover:bg-orange-pantone transition-all duration-500">
                    <Icon className="w-8 h-8 text-black-deep group-hover:text-white-pure transition-colors duration-500" />
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
