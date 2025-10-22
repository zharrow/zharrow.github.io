"use client";

import { useRef, useEffect } from "react";
import { Lightbulb, Palette, Code, Rocket, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!container || !slider || !cardsContainer) return;

    // Only enable horizontal scroll on desktop (>= 1024px)
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    // Calculate total width to scroll (5 cards × 66vw + gaps)
    const totalWidth = cardsContainer.scrollWidth - window.innerWidth;

    // Create GSAP horizontal scroll animation with snap effect
    const cardWidth = cardsContainer.children[0]?.clientWidth || 0;
    const gap = 24; // 6 * 4px (gap-6)
    const snapIncrement = cardWidth + gap;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth * 1.2}`, // Much faster (was 2.5)
        scrub: 0.3, // Even more responsive
        pin: slider,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (progress) => {
            // Calculate which card we're closest to
            const totalCards = 5;
            const snapPoints = Array.from({ length: totalCards }, (_, i) => i / (totalCards - 1));

            // Find closest snap point
            let closest = snapPoints[0];
            let minDiff = Math.abs(progress - closest);

            snapPoints.forEach(point => {
              const diff = Math.abs(progress - point);
              if (diff < minDiff) {
                minDiff = diff;
                closest = point;
              }
            });

            return closest;
          },
          duration: 0.4,
          ease: "power2.inOut"
        }
      }
    });

    // Animate the horizontal scroll
    tl.to(cardsContainer, {
      x: -totalWidth,
      ease: "none"
    });

    // Add active state based on scroll position with GSAP animations
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${totalWidth * 1.2}`,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalCards = cardRefs.current.length;

        cardRefs.current.forEach((card, index) => {
          if (!card) return;

          // Calculate if this card is "active" (centered)
          const cardProgress = index / (totalCards - 1);
          const distance = Math.abs(progress - cardProgress);

          // Get all animated elements inside the card
          const numberEl = card.querySelector('.card-number');
          const iconContainer = card.querySelector('.card-icon-container');
          const icon = card.querySelector('.card-icon');
          const title = card.querySelector('.card-title');

          // Card is active if within 0.15 range
          if (distance < 0.15) {
            // Animate to active state
            gsap.to(card, { borderColor: '#FF5722', duration: 0.5 });
            if (numberEl) gsap.to(numberEl, { color: '#FF5722', duration: 0.5 });
            if (iconContainer) {
              gsap.to(iconContainer, { borderColor: '#FF5722', backgroundColor: '#FF5722', duration: 0.5 });
            }
            if (icon) gsap.to(icon, { color: '#FFFEF7', duration: 0.5 });
            if (title) gsap.to(title, { color: '#FF5722', duration: 0.5 });
          } else {
            // Animate to inactive state
            gsap.to(card, { borderColor: 'rgba(1, 22, 39, 0.1)', duration: 0.5 });
            if (numberEl) gsap.to(numberEl, { color: 'rgba(1, 22, 39, 0.1)', duration: 0.5 });
            if (iconContainer) {
              gsap.to(iconContainer, { borderColor: 'rgba(1, 22, 39, 0.2)', backgroundColor: 'transparent', duration: 0.5 });
            }
            if (icon) gsap.to(icon, { color: '#011627', duration: 0.5 });
            if (title) gsap.to(title, { color: '#011627', duration: 0.5 });
          }
        });
      }
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
    >
      {/* Desktop: Pinned horizontal scroll container */}
      <div ref={sliderRef} className="hidden lg:block h-screen overflow-hidden" style={{ background: 'transparent' }}>
        <div className="flex flex-col h-full">
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
              className="flex gap-6 will-change-transform"
              style={{ paddingLeft: 'max(12vw, 96px)', paddingRight: '96px' }}
            >
              {(["discovery", "design", "development", "launch", "support"] as const).map((stepKey, index) => {
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
                    style={{
                      width: 'min(50vw, 600px)'
                    }}
                  >
                    {/* Card Container */}
                    <div
                      ref={(el) => { cardRefs.current[index] = el; }}
                      style={{
                        background: '#FFFEF7',
                        border: '1px solid rgba(1, 22, 39, 0.1)',
                        padding: 'clamp(1.5rem, 4vw, 2rem)',
                        height: '60vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto',
                        transition: 'border-color 0.5s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#FF5722';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(1, 22, 39, 0.1)';
                      }}
                    >
                      {/* Header: Number + Icon */}
                      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div
                          className="card-number"
                          style={{
                            fontSize: 'clamp(3rem, 6vw, 3.75rem)',
                            fontWeight: 500,
                            color: 'rgba(1, 22, 39, 0.1)',
                            transition: 'color 0.5s ease'
                          }}
                        >
                          {stepNumber}
                        </div>
                        <div
                          className="card-icon-container"
                          style={{
                            width: '3rem',
                            height: '3rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid rgba(1, 22, 39, 0.2)',
                            transition: 'all 0.5s ease'
                          }}
                        >
                          <Icon className="card-icon" style={{ width: '1.25rem', height: '1.25rem', color: '#011627', transition: 'color 0.5s ease' }} />
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className="card-title"
                        style={{
                          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                          fontWeight: 500,
                          marginBottom: '0.75rem',
                          color: '#011627',
                          transition: 'color 0.5s ease'
                        }}
                      >
                        {stepTitle}
                      </h3>

                      {/* Duration badge */}
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.75rem', border: '1px solid rgba(1, 22, 39, 0.1)', background: '#F8F7F4', fontSize: '0.75rem', color: '#697386', marginBottom: '1rem', width: 'fit-content' }}>
                        <svg style={{ width: '0.875rem', height: '0.875rem', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        <span style={{ whiteSpace: 'nowrap' }}>{stepDuration}</span>
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: '0.875rem', color: '#697386', lineHeight: '1.75', marginBottom: '1rem' }}>
                        {stepDescription}
                      </p>

                      {/* Details */}
                      <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(1, 22, 39, 0.1)', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                        {stepDetails.map((detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', fontSize: '0.75rem', color: '#697386' }}
                          >
                            <span style={{ color: '#FF5722', marginTop: '0.125rem', flexShrink: 0 }}>•</span>
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
      </div>

      {/* Mobile/Tablet: Vertical scroll layout */}
      <div className="lg:hidden py-20 md:py-32 bg-cream">
        <div className="section-container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
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
          </motion.div>

          {/* Vertical Cards */}
          <div className="space-y-8">
            {(["discovery", "design", "development", "launch", "support"] as const).map((stepKey, index) => {
              const Icon = stepIcons[stepKey];
              const stepNumber = t(`steps.${stepKey}.number`);
              const stepTitle = t(`steps.${stepKey}.title`);
              const stepDescription = t(`steps.${stepKey}.description`);
              const stepDuration = t(`steps.${stepKey}.duration`);
              const stepDetails = t.raw(`steps.${stepKey}.details`) as string[];

              return (
                <motion.div
                  key={stepKey}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="bg-white-pure border-2 border-black-deep/10 p-6 md:p-8 hover:border-orange-pantone transition-all duration-500"
                >
                  {/* Header: Number + Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl md:text-6xl font-medium text-black-deep/10">
                      {stepNumber}
                    </div>
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-2 border-black-deep/10">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-black-deep" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-medium mb-3 text-black-deep">
                    {stepTitle}
                  </h3>

                  {/* Duration badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-black-deep/10 bg-gray-light text-xs text-gray-secondary mb-4">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span>{stepDuration}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-secondary leading-relaxed mb-6">
                    {stepDescription}
                  </p>

                  {/* Details */}
                  <div className="pt-6 border-t border-black-deep/10 space-y-3">
                    {stepDetails.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="flex items-start gap-2 text-xs md:text-sm text-gray-secondary"
                      >
                        <span className="text-orange-pantone mt-0.5 flex-shrink-0">•</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
