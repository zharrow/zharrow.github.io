"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Palette, Code, Rocket, Heart } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Découverte",
    description: "Analyse de vos besoins, objectifs et vision du projet",
  },
  {
    number: "02",
    icon: Palette,
    title: "Design",
    description: "Création de maquettes et prototypes interactifs",
  },
  {
    number: "03",
    icon: Code,
    title: "Développement",
    description: "Codage propre, testé et optimisé pour la performance",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Lancement",
    description: "Déploiement et formation pour une prise en main facile",
  },
  {
    number: "05",
    icon: Heart,
    title: "Suivi",
    description: "Support continu et évolutions selon vos besoins",
  },
];

export default function ProcessPremium() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      id="process"
      className="py-32 md:py-40 bg-cream px-6 md:px-12 lg:px-16 xl:px-24 overflow-hidden"
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gray-secondary mb-4 block">
            Processus
          </span>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-tight tracking-[-0.02em] text-black-deep">
            Comment je{" "}
            <span className="text-orange-pantone">travaille</span>
          </h2>
          <p className="text-gray-secondary mt-6 max-w-2xl mx-auto">
            Une méthode éprouvée en 5 étapes pour garantir la réussite de votre projet
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated Line */}
          <div className="absolute top-24 left-0 right-0 h-px bg-black-deep/10 hidden md:block">
            <motion.div
              style={{ width: lineWidth }}
              className="h-full bg-orange-pantone"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative group"
                >
                  {/* Icon Circle */}
                  <div className="relative z-10 mb-8 flex justify-center md:justify-start">
                    <div className="w-20 h-20 flex items-center justify-center border-2 border-black-deep group-hover:border-orange-pantone group-hover:bg-orange-pantone transition-all duration-500 relative">
                      <Icon className="w-8 h-8 text-black-deep group-hover:text-white-pure transition-colors duration-500" />

                      {/* Number badge */}
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-orange-pantone text-white-pure flex items-center justify-center text-xs font-medium">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-medium text-black-deep mb-3 group-hover:text-orange-pantone transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connecting dot (desktop only) */}
                  <div className="hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-3 h-3 bg-cream border-2 border-black-deep group-hover:border-orange-pantone group-hover:bg-orange-pantone transition-all duration-500 z-20" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-24"
        >
          <p className="text-gray-secondary mb-6">
            Prêt à démarrer votre projet ?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-black-deep text-white-pure hover:bg-orange-pantone transition-all duration-500 text-sm font-medium tracking-wide uppercase"
          >
            Discutons-en
          </a>
        </motion.div>
      </div>
    </section>
  );
}
