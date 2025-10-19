"use client";

import { motion } from "framer-motion";
import { Award, Coffee, Heart, Zap } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Chaque projet est traité avec soin et dévouement",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Code optimisé pour des expériences ultra-rapides",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Standards élevés et attention aux moindres détails",
  },
  {
    icon: Coffee,
    title: "Collaboration",
    description: "Communication claire et transparente tout au long",
  },
];

const skills = [
  { name: "Frontend Development", level: 95 },
  { name: "Backend Architecture", level: 90 },
  { name: "UI/UX Design", level: 85 },
  { name: "E-commerce", level: 92 },
];

export default function AboutPremium() {
  return (
    <section id="apropos" className="py-32 md:py-40 bg-white-pure px-6 md:px-12">
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
            À propos
          </span>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-tight tracking-[-0.02em] text-black-deep">
            Développeur passionné par{" "}
            <span className="text-orange-pantone">l'excellence</span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-black-deep">
              Bonjour, je suis{" "}
              <span className="font-medium text-orange-pantone">
                Florent Detres
              </span>
              , développeur web full stack avec une passion pour la création d'expériences digitales premium.
            </p>

            <p className="text-gray-secondary leading-relaxed">
              Depuis plus de 5 ans, j'accompagne des entreprises dans leur transformation digitale en créant des solutions sur mesure qui allient esthétique et performance.
            </p>

            <p className="text-gray-secondary leading-relaxed">
              Mon approche se concentre sur trois piliers : <strong className="text-black-deep">design épuré</strong>, <strong className="text-black-deep">code de qualité</strong> et <strong className="text-black-deep">résultats mesurables</strong>.
            </p>

            <p className="text-gray-secondary leading-relaxed">
              Que ce soit pour une boutique Shopify, un site WordPress ou une application SaaS, je m'assure que chaque pixel et chaque ligne de code servent votre vision.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-black-deep/10">
              {[
                { number: "5+", label: "Années" },
                { number: "50+", label: "Projets" },
                { number: "100%", label: "Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-4xl font-medium text-orange-pantone mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-secondary uppercase tracking-[0.15em]">
                    {stat.label}
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
              Expertise
            </h3>

            <div className="space-y-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-black-deep">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-secondary">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1 bg-black-deep/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full bg-orange-pantone"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-2xl font-medium text-black-deep text-center mb-16">
            Mes valeurs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 border border-black-deep/20 flex items-center justify-center group-hover:border-orange-pantone group-hover:bg-orange-pantone transition-all duration-500">
                    <Icon className="w-7 h-7 text-black-deep group-hover:text-white-pure transition-colors duration-500" />
                  </div>

                  <h4 className="text-lg font-medium text-black-deep mb-3 group-hover:text-orange-pantone transition-colors duration-500">
                    {value.title}
                  </h4>

                  <p className="text-sm text-gray-secondary leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
