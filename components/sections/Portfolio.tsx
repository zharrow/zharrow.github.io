"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import { Card3D } from "@/components/ui/card-3d";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "Plateforme e-commerce complète avec panier, paiement sécurisé et dashboard admin.",
    image: "/projects/ecommerce.jpg",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
    links: {
      github: "https://github.com",
      live: "https://example.com",
    },
    color: "from-accent-gold to-accent-copper",
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    category: "UI/UX Design",
    description:
      "Dashboard moderne pour application SaaS avec analytics et gestion utilisateurs.",
    image: "/projects/saas.jpg",
    tags: ["React", "Chart.js", "Material-UI", "Firebase"],
    links: {
      github: "https://github.com",
      live: "https://example.com",
    },
    color: "from-accent-copper to-accent-sage",
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    category: "Mobile",
    description:
      "Application mobile de suivi fitness avec plans d'entraînement personnalisés.",
    image: "/projects/fitness.jpg",
    tags: ["React Native", "Redux", "Node.js", "MongoDB"],
    links: {
      github: "https://github.com",
      live: "https://example.com",
    },
    color: "from-accent-sage to-accent-gold",
  },
  {
    id: 4,
    title: "Portfolio Designer",
    category: "Web Development",
    description:
      "Portfolio élégant pour designer avec galerie interactive et animations.",
    image: "/projects/portfolio.jpg",
    tags: ["Next.js", "Framer Motion", "Sanity CMS"],
    links: {
      github: "https://github.com",
      live: "https://example.com",
    },
    color: "from-accent-gold to-accent-copper",
  },
  {
    id: 5,
    title: "Real Estate Platform",
    category: "Web Development",
    description:
      "Plateforme immobilière avec recherche avancée, cartes interactives et visites virtuelles.",
    image: "/projects/realestate.jpg",
    tags: ["Vue.js", "Mapbox", "GraphQL", "PostgreSQL"],
    links: {
      github: "https://github.com",
      live: "https://example.com",
    },
    color: "from-accent-copper to-accent-sage",
  },
  {
    id: 6,
    title: "Task Management Tool",
    category: "SaaS",
    description:
      "Outil de gestion de tâches collaboratif avec kanban, timeline et notifications.",
    image: "/projects/taskmanager.jpg",
    tags: ["React", "Supabase", "Tailwind", "WebSocket"],
    links: {
      github: "https://github.com",
      live: "https://example.com",
    },
    color: "from-accent-sage to-accent-gold",
  },
];

const categories = ["Tous", "Web Development", "UI/UX Design", "Mobile", "SaaS"];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredProjects =
    selectedCategory === "Tous"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-dark-950 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-accent-sage rounded-full blur-3xl"></div>
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
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-50 mb-6">
            Mes dernières{" "}
            <span className="gradient-text">réalisations</span>
          </h2>
          <p className="text-xl text-primary-300 max-w-2xl mx-auto">
            Une sélection de projets qui illustrent mon expertise et ma passion
            pour le développement
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-accent-gold text-dark-900"
                  : "bg-dark-800 text-primary-300 hover:bg-dark-700 hover:text-accent-gold"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card3D
                className="h-full"
                glowColor="rgba(212, 175, 55, 0.3)"
                intensity={8}
              >
                <div className="group relative bg-dark-800/50 rounded-2xl overflow-hidden border border-dark-700 hover:border-accent-gold/50 transition-all duration-300 h-full">
                  {/* Project Image */}
                  <div className="relative h-64 bg-gradient-to-br from-dark-700 to-dark-900 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl font-bold text-dark-600 group-hover:scale-110 transition-transform duration-300">
                        {project.id}
                      </div>
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-dark-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-accent-gold text-dark-900 flex items-center justify-center hover:bg-accent-copper transition-colors"
                      >
                        <Github size={20} />
                      </motion.a>
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-accent-gold text-dark-900 flex items-center justify-center hover:bg-accent-copper transition-colors"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="text-sm text-accent-gold mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-primary-50 mb-3 group-hover:text-accent-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-primary-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs bg-dark-700 text-primary-400 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-primary-300 mb-6">
            Vous voulez voir plus de projets ?
          </p>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-accent-gold text-accent-gold rounded-full font-semibold hover:bg-accent-gold hover:text-dark-900 transition-all duration-300"
          >
            <Github size={20} />
            Voir mon GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
