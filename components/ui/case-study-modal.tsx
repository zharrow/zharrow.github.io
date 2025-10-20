"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, Calendar, Users, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

// SVG Github icon
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export interface CaseStudy {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;

  // Hero section
  client: string;
  duration: string;
  team: string;
  role: string;

  // Challenge section
  challenge: {
    title: string;
    description: string;
    points: string[];
  };

  // Solution section
  solution: {
    title: string;
    description: string;
    approach: Array<{
      title: string;
      description: string;
    }>;
  };

  // Stack & Tools
  stack: string[];
  tools: string[];

  // Results section
  results: {
    title: string;
    metrics: Array<{
      label: string;
      value: string;
      description: string;
    }>;
    testimonial?: {
      quote: string;
      author: string;
      position: string;
    };
  };

  // Gallery
  gallery?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;

  // Links
  links?: {
    live?: string;
    github?: string;
  };
}

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function CaseStudyModal({
  isOpen,
  onClose,
  caseStudy,
  onNavigate,
  hasPrev = false,
  hasNext = false,
}: CaseStudyModalProps) {
  const t = useTranslations("caseStudy");
  const scrollPositionRef = useRef(0);

  // Prevent body scroll when modal is open and hide header
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      scrollPositionRef.current = window.scrollY;

      // Disable Lenis smooth scroll
      const html = document.documentElement;
      html.classList.add('lenis-stopped');

      // Lock body and html scroll completely
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";

      html.style.overflow = "hidden";
      html.style.position = "fixed";
      html.style.width = "100%";
      html.style.height = "100%";

      // Hide the header when modal is open
      const header = document.querySelector('header');
      const progressBar = document.querySelector('.fixed.top-0.h-1');
      if (header) (header as HTMLElement).style.display = 'none';
      if (progressBar) (progressBar as HTMLElement).style.display = 'none';

      // No need to prevent wheel events since position fixed will handle it
    } else {
      // Re-enable Lenis smooth scroll
      const html = document.documentElement;
      html.classList.remove('lenis-stopped');

      // Restore scroll position
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      html.style.overflow = "";
      html.style.position = "";
      html.style.width = "";
      html.style.height = "";

      window.scrollTo(0, scrollPositionRef.current);

      // Show the header when modal is closed
      const header = document.querySelector('header');
      const progressBar = document.querySelector('.fixed.top-0.h-1');
      if (header) (header as HTMLElement).style.display = '';
      if (progressBar) (progressBar as HTMLElement).style.display = '';
    }
    return () => {
      const html = document.documentElement;
      html.classList.remove('lenis-stopped');
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      html.style.overflow = "";
      html.style.position = "";
      html.style.width = "";
      html.style.height = "";
      const header = document.querySelector('header');
      const progressBar = document.querySelector('.fixed.top-0.h-1');
      if (header) (header as HTMLElement).style.display = '';
      if (progressBar) (progressBar as HTMLElement).style.display = '';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (hasPrev && onNavigate) onNavigate('prev');
          break;
        case "ArrowRight":
          if (hasNext && onNavigate) onNavigate('next');
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hasPrev, hasNext, onNavigate, onClose]);

  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop to hide everything behind */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99998] bg-black-deep"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999] bg-cream overflow-y-scroll overflow-x-hidden"
            style={{
              overflowY: 'scroll',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain'
            }}
            data-lenis-prevent
          >
          {/* Fixed Header */}
          <div className="sticky top-0 z-[100000] bg-cream backdrop-blur-md border-b border-black-deep/10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
              {/* Project Title */}
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-secondary block mb-1">
                  {t("title")}
                </span>
                <h2 className="text-xl md:text-2xl font-medium text-black-deep">
                  {caseStudy.title}
                </h2>
              </div>

              {/* Navigation & Close */}
              <div className="flex items-center gap-3">
                {/* Previous Project */}
                {hasPrev && onNavigate && (
                  <button
                    onClick={() => onNavigate('prev')}
                    className="w-12 h-12 flex items-center justify-center border border-black-deep/20 hover:border-orange-pantone hover:bg-orange-pantone hover:text-white-pure text-black-deep transition-all duration-300"
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}

                {/* Next Project */}
                {hasNext && onNavigate && (
                  <button
                    onClick={() => onNavigate('next')}
                    className="w-12 h-12 flex items-center justify-center border border-black-deep/20 hover:border-orange-pantone hover:bg-orange-pantone hover:text-white-pure text-black-deep transition-all duration-300"
                    aria-label="Next project"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center bg-black-deep hover:bg-orange-pantone text-white-pure transition-all duration-300 group"
                  aria-label="Close case study"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
            {/* Hero Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-20"
            >
              {/* Hero Image */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] bg-gray-light overflow-hidden mb-12">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Category badge overlay */}
                <div className="absolute top-8 left-8 px-4 py-2 bg-white-pure/95 backdrop-blur-sm border border-black-deep/10">
                  <span className="text-xs uppercase tracking-[0.15em] text-black-deep font-medium">
                    {caseStudy.category}
                  </span>
                </div>
              </div>

              {/* Project Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center gap-2 text-orange-pantone mb-2">
                    <Users size={18} />
                    <span className="text-xs uppercase tracking-[0.15em]">{t("client")}</span>
                  </div>
                  <p className="text-black-deep font-medium">{caseStudy.client}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-orange-pantone mb-2">
                    <Calendar size={18} />
                    <span className="text-xs uppercase tracking-[0.15em]">{t("duration")}</span>
                  </div>
                  <p className="text-black-deep font-medium">{caseStudy.duration}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-orange-pantone mb-2">
                    <Users size={18} />
                    <span className="text-xs uppercase tracking-[0.15em]">{t("team")}</span>
                  </div>
                  <p className="text-black-deep font-medium">{caseStudy.team}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-orange-pantone mb-2">
                    <TrendingUp size={18} />
                    <span className="text-xs uppercase tracking-[0.15em]">{t("role")}</span>
                  </div>
                  <p className="text-black-deep font-medium">{caseStudy.role}</p>
                </div>
              </div>
            </motion.section>

            {/* Challenge Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-3xl md:text-4xl font-medium text-black-deep mb-6">
                    {caseStudy.challenge.title}
                  </h3>
                  <p className="text-gray-secondary text-lg leading-relaxed">
                    {caseStudy.challenge.description}
                  </p>
                </div>
                <div className="bg-white-pure p-8 border border-black-deep/10">
                  <h4 className="text-sm uppercase tracking-[0.15em] text-orange-pantone mb-6">
                    {t("keyPoints")}
                  </h4>
                  <ul className="space-y-4">
                    {caseStudy.challenge.points.map((point, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-orange-pantone mt-1">•</span>
                        <span className="text-gray-secondary flex-1">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Solution Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-20"
            >
              <h3 className="text-3xl md:text-4xl font-medium text-black-deep mb-6">
                {caseStudy.solution.title}
              </h3>
              <p className="text-gray-secondary text-lg leading-relaxed mb-12 max-w-3xl">
                {caseStudy.solution.description}
              </p>

              {/* Approach Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.solution.approach.map((step, index) => (
                  <div
                    key={index}
                    className="bg-white-pure p-8 border border-black-deep/10 hover:border-orange-pantone transition-colors duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-5xl font-medium text-orange-pantone/20">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 pt-2">
                        <h4 className="text-xl font-medium text-black-deep mb-3">
                          {step.title}
                        </h4>
                        <p className="text-gray-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Stack & Tools */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-20"
            >
              <div className="bg-black-deep text-white-pure p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-sm uppercase tracking-[0.15em] text-orange-pantone mb-6">
                      {t("technologies")}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {caseStudy.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 border border-white-pure/20 text-sm hover:border-orange-pantone hover:text-orange-pantone transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-[0.15em] text-orange-pantone mb-6">
                      {t("toolsServices")}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {caseStudy.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-4 py-2 border border-white-pure/20 text-sm hover:border-orange-pantone hover:text-orange-pantone transition-colors duration-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Results Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-20"
            >
              <h3 className="text-3xl md:text-4xl font-medium text-black-deep mb-12">
                {caseStudy.results.title}
              </h3>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {caseStudy.results.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-white-pure p-8 border border-black-deep/10 text-center hover:border-orange-pantone transition-colors duration-300"
                  >
                    <div className="text-4xl md:text-5xl font-medium text-orange-pantone mb-3">
                      {metric.value}
                    </div>
                    <div className="text-sm uppercase tracking-[0.15em] text-black-deep mb-2">
                      {metric.label}
                    </div>
                    <p className="text-sm text-gray-secondary">
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              {caseStudy.results.testimonial && (
                <div className="bg-orange-pantone text-white-pure p-8 md:p-12">
                  <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-6 italic">
                    "{caseStudy.results.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-white-pure/50" />
                    <div>
                      <div className="font-medium">{caseStudy.results.testimonial.author}</div>
                      <div className="text-sm text-white-pure/70">{caseStudy.results.testimonial.position}</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.section>

            {/* Gallery Section */}
            {caseStudy.gallery && caseStudy.gallery.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mb-20"
              >
                <h3 className="text-3xl md:text-4xl font-medium text-black-deep mb-12">
                  {t("projectOverview")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseStudy.gallery.map((item, index) => (
                    <div key={index} className="relative aspect-[4/3] bg-gray-light overflow-hidden group">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black-deep/90 text-white-pure p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-sm">{item.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-center pt-12 border-t border-black-deep/10"
            >
              <h3 className="text-2xl md:text-3xl font-medium text-black-deep mb-6">
                {t("cta.title")}
              </h3>
              <p className="text-gray-secondary mb-8 max-w-2xl mx-auto">
                {t("cta.description")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {caseStudy.links?.live && (
                  <a
                    href={caseStudy.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-orange-pantone text-white-pure hover:bg-black-deep transition-all duration-300 text-sm font-medium tracking-wide uppercase"
                  >
                    <ExternalLink size={18} />
                    <span>{t("cta.viewSite")}</span>
                  </a>
                )}
                {caseStudy.links?.github && (
                  <a
                    href={caseStudy.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-black-deep text-white-pure hover:bg-orange-pantone transition-all duration-300 text-sm font-medium tracking-wide uppercase"
                  >
                    <GithubIcon />
                    <span>{t("cta.viewCode")}</span>
                  </a>
                )}
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-black-deep text-black-deep hover:bg-black-deep hover:text-white-pure transition-all duration-300 text-sm font-medium tracking-wide uppercase"
                >
                  <span>{t("cta.contact")}</span>
                </a>
              </div>
            </motion.section>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
