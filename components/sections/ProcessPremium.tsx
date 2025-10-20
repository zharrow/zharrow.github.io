"use client";

import { useRef, useEffect } from "react";
import { Lightbulb, Palette, Code, Rocket, Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!container || !slider || !cardsContainer) return;

    // Calculate total width to scroll (5 cards × 66vw + gaps)
    const totalWidth = cardsContainer.scrollWidth - window.innerWidth;

    // Create GSAP horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${container.offsetHeight}`,
        scrub: 1, // Smooth scrubbing
        pin: slider, // Pin the slider while scrolling
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Animate the horizontal scroll
    tl.to(cardsContainer, {
      x: -totalWidth,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative bg-cream"
      style={{ height: '800vh' }}
    >
      {/* Pinned container - GSAP will pin this */}
      <div ref={sliderRef} className="h-screen overflow-hidden flex flex-col bg-cream">

        {/* Section Header */}
        <div className="flex-shrink-0 pt-16 pb-8 px-6 md:px-12 bg-cream">
          <div className="section-container">
            <div className="text-center">
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
            </div>
          </div>
        </div>

        {/* Horizontal slider - GSAP will animate this */}
        <div className="flex-1 flex items-center overflow-hidden">
          <div
            ref={cardsContainerRef}
            className="flex gap-6 px-6 md:px-12 will-change-transform"
          >
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="flex-shrink-0"
                    style={{ width: 'min(66vw, 900px)' }}
                  >
                    {/* Card Container */}
                    <div className="bg-white-pure border border-black-deep/10 hover:border-orange-pantone transition-all duration-500 p-8 md:p-12 h-[70vh] flex flex-col group overflow-y-auto">
                      {/* Number */}
                      <div className="text-7xl md:text-8xl font-medium mb-6 text-black-deep/10 group-hover:text-orange-pantone transition-colors duration-500">
                        {step.number}
                      </div>

                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-16 h-16 inline-flex items-center justify-center border-2 border-black-deep/20 group-hover:border-orange-pantone group-hover:bg-orange-pantone transition-all duration-500">
                          <Icon className="w-7 h-7 text-black-deep group-hover:text-white-pure transition-colors duration-500" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-medium mb-4 text-black-deep group-hover:text-orange-pantone transition-colors duration-500">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base text-gray-secondary leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Duration badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-2 border border-black-deep/10 bg-cream text-sm text-gray-secondary mb-6 w-fit">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        <span className="whitespace-nowrap">{step.duration}</span>
                      </div>

                      {/* Details - Always visible */}
                      <div className="pt-4 border-t border-black-deep/10 space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            className="flex items-start gap-3 text-sm text-gray-secondary"
                          >
                            <span className="text-orange-pantone mt-1 flex-shrink-0">•</span>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

      </div>
    </section>
  );
}
