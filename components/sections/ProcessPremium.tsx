"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Lightbulb, Palette, Code, Rocket, Heart } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Découverte",
    description: "Analyse de vos besoins, objectifs et vision du projet",
    details: [
      "Entretien approfondi pour comprendre vos objectifs",
      "Analyse de votre marché et de vos concurrents",
      "Définition du périmètre et des livrables",
      "Proposition de solution technique adaptée",
    ],
    duration: "1-2 semaines",
  },
  {
    number: "02",
    icon: Palette,
    title: "Design",
    description: "Création de maquettes et prototypes interactifs",
    details: [
      "Wireframes et architecture de l'information",
      "Maquettes haute fidélité sur Figma",
      "Prototypes interactifs pour validation",
      "Design system et guide de style",
    ],
    duration: "2-3 semaines",
  },
  {
    number: "03",
    icon: Code,
    title: "Développement",
    description: "Codage propre, testé et optimisé pour la performance",
    details: [
      "Code modulaire et maintenable",
      "Tests unitaires et d'intégration",
      "Optimisation des performances",
      "Revues de code régulières",
    ],
    duration: "4-8 semaines",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Lancement",
    description: "Déploiement et formation pour une prise en main facile",
    details: [
      "Configuration de l'environnement de production",
      "Migration des données si nécessaire",
      "Formation à l'utilisation de la plateforme",
      "Documentation technique et utilisateur",
    ],
    duration: "1 semaine",
  },
  {
    number: "05",
    icon: Heart,
    title: "Suivi",
    description: "Support continu et évolutions selon vos besoins",
    details: [
      "Monitoring et alertes automatiques",
      "Corrections de bugs en priorité",
      "Évolutions et nouvelles fonctionnalités",
      "Support technique réactif",
    ],
    duration: "En continu",
  },
];

export default function ProcessPremium() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  const toggleStep = (index: number) => {
    setActiveStep(activeStep === index ? null : index);
  };

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
              const isActive = activeStep === index;
              const isHovered = hoveredStep === index;

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
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Icon Circle */}
                  <motion.div
                    className="relative z-10 mb-8 flex justify-center md:justify-start cursor-pointer"
                    onClick={() => toggleStep(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-20 h-20 flex items-center justify-center border-2 transition-all duration-500 relative ${
                      isActive || isHovered
                        ? "border-orange-pantone bg-orange-pantone"
                        : "border-black-deep"
                    }`}>
                      <Icon className={`w-8 h-8 transition-colors duration-500 ${
                        isActive || isHovered
                          ? "text-white-pure"
                          : "text-black-deep"
                      }`} />

                      {/* Number badge */}
                      <div className={`absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center text-xs font-medium transition-all duration-500 ${
                        isActive || isHovered
                          ? "bg-black-deep text-white-pure"
                          : "bg-orange-pantone text-white-pure"
                      }`}>
                        {step.number}
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="text-center md:text-left">
                    <h3 className={`text-xl font-medium mb-3 transition-colors duration-500 cursor-pointer ${
                      isActive || isHovered
                        ? "text-orange-pantone"
                        : "text-black-deep"
                    }`}
                    onClick={() => toggleStep(index)}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-secondary leading-relaxed mb-3">
                      {step.description}
                    </p>

                    {/* Duration badge */}
                    <div className="inline-flex items-center px-3 py-1 border border-black-deep/10 text-xs text-gray-secondary mb-4">
                      <svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {step.duration}
                    </div>

                    {/* Expandable details */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-black-deep/10 mt-4">
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <motion.li
                              key={detailIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: detailIndex * 0.05 }}
                              className="flex items-start text-xs text-gray-secondary"
                            >
                              <span className="text-orange-pantone mr-2 mt-0.5">→</span>
                              <span>{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Click hint */}
                    {!isActive && (
                      <motion.button
                        onClick={() => toggleStep(index)}
                        className="text-xs text-orange-pantone hover:underline mt-3 cursor-pointer inline-flex items-center gap-1"
                        whileHover={{ x: 5 }}
                      >
                        <span>En savoir plus</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>
                    )}
                  </div>

                  {/* Connecting dot (desktop only) */}
                  <div className={`hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-3 h-3 bg-cream border-2 transition-all duration-500 z-20 ${
                    isActive || isHovered
                      ? "border-orange-pantone bg-orange-pantone scale-150"
                      : "border-black-deep"
                  }`} />
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
