"use client";

import { motion } from "framer-motion";
import { Award, Book, Code2, Coffee, Heart, Lightbulb } from "lucide-react";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "UI/UX Design", level: 80 },
  { name: "Python", level: 75 },
  { name: "DevOps", level: 70 },
];

const values = [
  {
    icon: Code2,
    title: "Code Propre",
    description: "J'écris du code maintenable, testé et documenté.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Toujours à l'affût des dernières technologies.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Chaque projet est une opportunité d'excellence.",
  },
  {
    icon: Coffee,
    title: "Collaboration",
    description: "Communication transparente et travail d'équipe.",
  },
  {
    icon: Award,
    title: "Qualité",
    description: "Standards élevés et attention aux détails.",
  },
  {
    icon: Book,
    title: "Apprentissage",
    description: "Formation continue et veille technologique.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Développeur Full Stack Senior",
    company: "Freelance",
    description: "Accompagnement de startups et PME dans leurs projets digitaux.",
  },
  {
    year: "2022-2023",
    title: "Lead Developer",
    company: "Tech Company",
    description: "Direction technique et architecture de solutions web complexes.",
  },
  {
    year: "2020-2022",
    title: "Développeur Full Stack",
    company: "Digital Agency",
    description: "Développement d'applications web et mobile pour divers clients.",
  },
  {
    year: "2018-2020",
    title: "Développeur Junior",
    company: "Startup",
    description: "Premiers pas dans le développement professionnel.",
  },
];

export default function About() {
  return (
    <section id="apropos" className="py-20 md:py-32 bg-dark-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-copper rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-accent-gold text-sm font-semibold tracking-wider uppercase mb-4"
          >
            À propos
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-50 mb-6">
            Développeur passionné par{" "}
            <span className="gradient-text">l'innovation</span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-primary-300 leading-relaxed mb-6">
                Bonjour ! Je suis <span className="text-accent-gold font-semibold">Florent Detres</span>,
                un développeur web full stack avec plus de 5 ans d'expérience dans
                la création d'applications web et mobile modernes.
              </p>
              <p className="text-primary-300 leading-relaxed mb-6">
                Ma passion pour le développement a commencé avec une simple curiosité
                pour la technologie, qui s'est transformée en une carrière dédiée à
                la création de solutions digitales innovantes et performantes.
              </p>
              <p className="text-primary-300 leading-relaxed mb-6">
                Je me spécialise dans le développement d'interfaces utilisateur
                élégantes et d'architectures backend robustes. Mon approche combine
                expertise technique, créativité et attention méticuleuse aux détails.
              </p>
              <p className="text-primary-300 leading-relaxed">
                Quand je ne code pas, vous me trouverez probablement en train
                d'explorer de nouvelles technologies, de contribuer à des projets
                open source, ou de partager mes connaissances avec la communauté.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-primary-50 mb-8">
              Compétences Techniques
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-primary-100 font-medium">
                      {skill.name}
                    </span>
                    <span className="text-accent-gold">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-accent-gold to-accent-copper rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-primary-50 mb-12 text-center">
            Mes <span className="gradient-text">Valeurs</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-dark-700 hover:border-accent-gold/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-gold to-accent-copper p-0.5 mb-4">
                  <div className="w-full h-full bg-dark-800 rounded-lg flex items-center justify-center">
                    <value.icon className="text-primary-50" size={24} />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-primary-50 mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-primary-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-primary-50 mb-12 text-center">
            Mon <span className="gradient-text">Parcours</span>
          </h3>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline Line */}
                {index !== timeline.length - 1 && (
                  <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-accent-gold to-transparent"></div>
                )}

                {/* Timeline Dot */}
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-accent-gold shadow-lg shadow-accent-gold/50"></div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-dark-700 hover:border-accent-gold/50 transition-all duration-300">
                  <div className="text-accent-gold font-bold mb-2">
                    {item.year}
                  </div>
                  <h4 className="text-xl font-bold text-primary-50 mb-1">
                    {item.title}
                  </h4>
                  <div className="text-primary-300 mb-3">{item.company}</div>
                  <p className="text-primary-400 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
