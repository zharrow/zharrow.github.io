"use client";

import { useRef, useEffect } from "react";
import { Lightbulb, Palette, Code, Rocket, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stepIcons = {
  discovery: Lightbulb,
  design: Palette,
  development: Code,
  launch: Rocket,
  support: Heart,
};

export default function ProcessPremium() {
  const t = useTranslations("process");
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
      style={{ height: '900vh' }}
    >
      {/* Pinned container - GSAP will pin this */}
      <div ref={sliderRef} className="h-screen overflow-hidden flex flex-col bg-cream">

        {/* Section Header */}
        <div className="flex-shrink-0 pt-16 pb-8 px-6 md:px-12 bg-cream">
          <div className="section-container">
            <div className="text-center">
              <span className="text-sm uppercase tracking-[0.2em] text-gray-secondary mb-4 block">
                {t("label")}
              </span>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-tight tracking-[-0.02em] text-black-deep">
                {t("title")}{" "}
                <span className="text-orange-pantone">{t("titleHighlight")}</span>
              </h2>
              <p className="text-gray-secondary mt-6 max-w-2xl mx-auto">
                {t("subtitle")}
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
              {(["discovery", "design", "development", "launch", "support"] as const).map((stepKey) => {
                const Icon = stepIcons[stepKey];
                const stepNumber = t(`steps.${stepKey}.number`);
                const stepTitle = t(`steps.${stepKey}.title`);
                const stepDescription = t(`steps.${stepKey}.description`);
                const stepDuration = t(`steps.${stepKey}.duration`);
                const stepDetails = t.raw(`steps.${stepKey}.details`) as string[];

                return (
                  <div
                    key={stepKey}
                    className="flex-shrink-0"
                    style={{ width: 'min(66vw, 900px)' }}
                  >
                    {/* Card Container */}
                    <div className="bg-white-pure border border-black-deep/10 hover:border-orange-pantone transition-all duration-500 p-8 md:p-12 h-[70vh] flex flex-col group overflow-y-auto">
                      {/* Number */}
                      <div className="text-7xl md:text-8xl font-medium mb-6 text-black-deep/10 group-hover:text-orange-pantone transition-colors duration-500">
                        {stepNumber}
                      </div>

                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-16 h-16 inline-flex items-center justify-center border-2 border-black-deep/20 group-hover:border-orange-pantone group-hover:bg-orange-pantone transition-all duration-500">
                          <Icon className="w-7 h-7 text-black-deep group-hover:text-white-pure transition-colors duration-500" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-medium mb-4 text-black-deep group-hover:text-orange-pantone transition-colors duration-500">
                        {stepTitle}
                      </h3>

                      {/* Description */}
                      <p className="text-base text-gray-secondary leading-relaxed mb-6">
                        {stepDescription}
                      </p>

                      {/* Duration badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-2 border border-black-deep/10 bg-cream text-sm text-gray-secondary mb-6 w-fit">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        <span className="whitespace-nowrap">{stepDuration}</span>
                      </div>

                      {/* Details - Always visible */}
                      <div className="pt-4 border-t border-black-deep/10 space-y-3">
                        {stepDetails.map((detail, detailIndex) => (
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
