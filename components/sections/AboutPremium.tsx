"use client";

import { motion } from "framer-motion";
import { Award, Coffee, Heart, Zap, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { EnhancedMarquee } from "@/components/ui/enhanced-marquee";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AnimatedSkillGraph } from "@/components/ui/animated-skill-graph";
import { TimelineModal } from "@/components/ui/timeline-modal";

const valueIcons = {
  passion: Heart,
  performance: Zap,
  excellence: Award,
  collaboration: Coffee,
};

const skillLevels = [
  { key: "frontend", level: 95 },
  { key: "backend", level: 90 },
  { key: "uiux", level: 85 },
  { key: "ecommerce", level: 92 },
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

export default function AboutPremium() {
  const t = useTranslations("about");
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

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
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-black-deep/10">
              {[
                { number: 5, suffix: "+", labelKey: "years" },
                { number: 50, suffix: "+", labelKey: "projects" },
                { number: 100, suffix: "%", labelKey: "satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-4xl font-medium text-orange-pantone mb-2">
                    <AnimatedCounter
                      from={0}
                      to={stat.number}
                      duration={2}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-sm text-gray-secondary uppercase tracking-[0.15em]">
                    {t(`stats.${stat.labelKey}`)}
                  </div>
                </motion.div>
              ))}
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

            <div className="space-y-8">
              {skillLevels.map((skill, index) => (
                <AnimatedSkillGraph
                  key={skill.key}
                  skillKey={skill.key}
                  label={t(`expertise.skills.${skill.key}`)}
                  level={skill.level}
                  index={index}
                />
              ))}
            </div>

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
              <span>Voir mon parcours</span>
            </motion.button>
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
        <EnhancedMarquee speed={30} className="py-8">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="px-8 py-4 border border-white-pure/20 bg-transparent text-white-pure text-sm font-medium tracking-wide whitespace-nowrap hover:border-orange-pantone hover:text-orange-pantone transition-all duration-500"
            >
              {tech}
            </div>
          ))}
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
