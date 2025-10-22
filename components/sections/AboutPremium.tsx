"use client";

import { motion } from "framer-motion";
import { Award, Coffee, Heart, Zap, Clock, Code, Server, Palette, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { EnhancedMarquee } from "@/components/ui/enhanced-marquee";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ExpertiseTimeline } from "@/components/ui/expertise-timeline";
import { TimelineModal } from "@/components/ui/timeline-modal";

// Hook personnalisé pour gérer l'état de hover des technologies
function useTechHover() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  return { hoveredTech, setHoveredTech };
}

const valueIcons = {
  passion: Heart,
  performance: Zap,
  excellence: Award,
  collaboration: Coffee,
};

// Données d'expertise avec années d'expérience
const expertiseData = [
  {
    categoryKey: "frontend",
    icon: "Code",
    skills: [
      { nameKey: "react", years: "5+" },
      { nameKey: "typescript", years: "5+" },
      { nameKey: "scss", years: "4+" },
    ],
  },
  {
    categoryKey: "backend",
    icon: "Server",
    skills: [
      { nameKey: "nodejs", years: "3+" },
      { nameKey: "postgresql", years: "3+" },
      { nameKey: "api", years: "4+" },
    ],
  },
  {
    categoryKey: "design",
    icon: "Palette",
    skills: [
      { nameKey: "uiux", years: "5+" },
      { nameKey: "animations", years: "4+" },
      { nameKey: "responsive", years: "5+" },
    ],
  },
  {
    categoryKey: "tools",
    icon: "Wrench",
    skills: [
      { nameKey: "git", years: "5+" },
      { nameKey: "docker", years: "2+" },
      { nameKey: "cicd", years: "3+" },
    ],
  },
];

const technologies = [
  "Angular",
  "C# .NET",
  "Unity",
  "React",
  "Next.js",
  "TypeScript",
  "GSAP",
  "Shopify",
  "WordPress",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "SCSS",
  "Framer Motion",
  "Prisma",
  "GraphQL",
  "REST API",
  "Docker",
  "Git",
  "Kubernetes",
];

const iconMap = {
  Code,
  Server,
  Palette,
  Wrench,
};

export default function AboutPremium() {
  const t = useTranslations("about");
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const { hoveredTech, setHoveredTech } = useTechHover();

  // Transform expertiseData with translated strings and icons
  const expertise = expertiseData.map((category) => ({
    category: t(`expertise.categories.${category.categoryKey}`),
    icon: iconMap[category.icon as keyof typeof iconMap],
    skills: category.skills.map((skill) => ({
      name: t(`expertise.skills.${category.categoryKey}.${skill.nameKey}`),
      years: skill.years,
    })),
  }));

  return (
    <section id="apropos" className="relative z-10 py-32 md:py-40 bg-white-pure">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40">
          {/* Left Column - Photo + Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Photo avec Stats en overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative mb-12"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-orange-pantone transition-all duration-500 group">
                {/* Image principale */}
                <Image
                  src="/IMG_9916.jpg"
                  alt="Florent Detres"
                  fill
                  className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                  priority
                />
                {/* Image au hover (lobster) */}
                <Image
                  src="/lobster.jpg"
                  alt="Florent Detres - Alternative"
                  fill
                  className="object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                />
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-orange-pantone opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-orange-pantone opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Stats Banner Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white-pure/80 backdrop-blur-lg py-8 px-6 z-10">
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { number: 5, suffix: "+", labelKey: "years" },
                      { number: 50, suffix: "+", labelKey: "projects" },
                      { number: 100, suffix: "%", labelKey: "satisfaction" },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.labelKey}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                        className="text-center"
                      >
                        <div className="text-3xl md:text-4xl font-medium text-orange-pantone mb-1">
                          <AnimatedCounter
                            from={0}
                            to={stat.number}
                            duration={2}
                            suffix={stat.suffix}
                          />
                        </div>
                        <div className="text-xs text-black-deep/70 uppercase tracking-[0.15em]">
                          {t(`stats.${stat.labelKey}`)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-black-deep">
                {t("intro.greeting")}{" "}
                <span className="font-medium text-orange-pantone">
                  {t("intro.name")}
                </span>
                , {t("intro.description")}
              </p>

              <p className="text-gray-secondary leading-relaxed">
                {t("paragraphs.experience")}
              </p>

              <p className="text-gray-secondary leading-relaxed">
                {t("paragraphs.approach")} <strong className="text-black-deep">{t("paragraphs.pillars.design")}</strong>, <strong className="text-black-deep">{t("paragraphs.pillars.code")}</strong> et <strong className="text-black-deep">{t("paragraphs.pillars.results")}</strong>.
              </p>

              <p className="text-gray-secondary leading-relaxed">
                {t("paragraphs.services")}
              </p>

              {/* Timeline Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                onClick={() => setIsTimelineOpen(true)}
                className="mt-8 w-full px-6 py-4 border-2 border-black-deep text-black-deep hover:bg-black-deep hover:text-white-pure transition-all duration-500 text-sm font-medium tracking-wide uppercase flex items-center justify-center gap-3 group"
              >
                <Clock className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                <span>{t("cta.timeline")}</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-2xl font-medium text-black-deep mb-12">
              {t("expertise.title")}
            </h3>

            <ExpertiseTimeline expertise={expertise} />
          </motion.div>
        </div>

        {/* Technologies Marquee - Full Width */}
      </div>

      {/* Technologies Section - Outside container for full width */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mbt-20 bg-black-deep py-20"
      >
        <div className="section-container mb-16">
          <h3 className="text-3xl font-medium text-white-pure text-center">
            {t("technologies.title")}
          </h3>
        </div>
        <EnhancedMarquee
          speed={30}
          className="py-8"
          pauseOnHover={true}
        >
          {technologies.map((tech) => {
            const isHovered = hoveredTech === tech;
            const isOtherHovered = hoveredTech !== null && hoveredTech !== tech;

            return (
              <motion.div
                key={tech}
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  filter: isOtherHovered ? "blur(4px)" : "blur(0px)",
                  opacity: isOtherHovered ? 0.5 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
                className={`px-8 py-4 border bg-transparent text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
                  isHovered
                    ? 'border-orange-pantone text-orange-pantone shadow-[0_0_20px_rgba(255,87,34,0.6)]'
                    : 'border-white-pure/20 text-white-pure'
                }`}
              >
                {tech}
              </motion.div>
            );
          })}
        </EnhancedMarquee>
      </motion.div>

      <div className="section-container">

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-3xl font-medium text-black-deep text-center mb-20">
            {t("values.title")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(["passion", "performance", "excellence", "collaboration"] as const).map((valueKey, index) => {
              const Icon = valueIcons[valueKey];

              return (
                <motion.div
                  key={valueKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group bg-cream border border-black-deep/10 p-8 hover:border-orange-pantone transition-all duration-500"
                >
                  <div className="mb-6 inline-flex items-center justify-center w-14 h-14 border border-black-deep/20 group-hover:border-orange-pantone group-hover:bg-orange-pantone transition-all duration-500">
                    <Icon className="w-6 h-6 text-black-deep group-hover:text-white-pure transition-colors duration-500" />
                  </div>

                  <h4 className="text-lg font-medium text-black-deep mb-3 group-hover:text-orange-pantone transition-colors duration-500">
                    {t(`values.items.${valueKey}.title`)}
                  </h4>

                  <p className="text-sm text-gray-secondary leading-relaxed">
                    {t(`values.items.${valueKey}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Timeline Modal */}
      <TimelineModal
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
      />
    </section>
  );
}
