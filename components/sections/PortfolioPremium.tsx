"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Luxury E-Commerce",
    category: "Shopify",
    description: "Boutique haut de gamme avec expérience d'achat premium",
    stack: ["Shopify", "Liquid", "Custom Apps"],
    result: "+180% conversion",
    image: "/projects/project-1.jpg", // Placeholder
  },
  {
    id: 2,
    title: "Corporate Website",
    category: "WordPress",
    description: "Site vitrine élégant pour cabinet d'avocats",
    stack: ["WordPress", "Custom Theme", "ACF"],
    result: "Score 95/100",
    image: "/projects/project-2.jpg",
  },
  {
    id: 3,
    title: "Task Management SaaS",
    category: "SaaS",
    description: "Application de gestion de projets avec dashboard analytics",
    stack: ["Next.js", "PostgreSQL", "Prisma"],
    result: "1000+ users",
    image: "/projects/project-3.jpg",
  },
  {
    id: 4,
    title: "Fashion Brand Store",
    category: "Shopify",
    description: "Boutique mode avec collections dynamiques",
    stack: ["Shopify Plus", "React", "Storefront API"],
    result: "+250% revenus",
    image: "/projects/project-4.jpg",
  },
  {
    id: 5,
    title: "Restaurant Website",
    category: "WordPress",
    description: "Site avec réservation en ligne et menu interactif",
    stack: ["WordPress", "WooCommerce", "Custom Dev"],
    result: "500+ réservations/mois",
    image: "/projects/project-5.jpg",
  },
  {
    id: 6,
    title: "CRM Platform",
    category: "SaaS",
    description: "Solution CRM sur mesure pour PME",
    stack: ["React", "Node.js", "MongoDB"],
    result: "50+ entreprises",
    image: "/projects/project-6.jpg",
  },
];

export default function PortfolioPremium() {
  const t = useTranslations("portfolio");

  return (
    <section id="portfolio" className="py-32 md:py-40 bg-gray-light px-6 md:px-12">
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-white-pure overflow-hidden cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-gray-light overflow-hidden">
                {/* Placeholder gradient - remplacer par vraies images */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-secondary to-black-deep opacity-20 group-hover:opacity-0 transition-opacity duration-700" />

                {/* Number overlay */}
                <div className="absolute top-8 left-8 text-[120px] font-medium leading-none text-white-pure/10 group-hover:text-orange-pantone/20 transition-colors duration-700 z-10">
                  {String(project.id).padStart(2, '0')}
                </div>

                {/* Hover overlay with links */}
                <div className="absolute inset-0 bg-black-deep/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6 z-20">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 flex items-center justify-center border border-white-pure/30 hover:border-orange-pantone hover:bg-orange-pantone text-white-pure transition-all duration-500"
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 flex items-center justify-center border border-white-pure/30 hover:border-orange-pantone hover:bg-orange-pantone text-white-pure transition-all duration-500"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Category badge */}
                <div className="inline-block px-3 py-1 border border-black-deep/10 text-xs uppercase tracking-[0.15em] text-gray-secondary mb-4">
                  {project.category}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-medium text-black-deep mb-3 group-hover:text-orange-pantone transition-colors duration-500">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-secondary text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-gray-secondary border border-black-deep/10 px-3 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Result */}
                <div className="flex items-center justify-between pt-4 border-t border-black-deep/10">
                  <span className="text-xs uppercase tracking-[0.15em] text-gray-secondary">
                    Résultat
                  </span>
                  <span className="text-sm font-medium text-orange-pantone">
                    {project.result}
                  </span>
                </div>
              </div>

              {/* Bottom line animation */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-orange-pantone group-hover:w-full transition-all duration-700" />
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-gray-secondary mb-6">
            {t("cta.text")}
          </p>
          <a
            href="https://github.com/zharrow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black-deep text-white-pure hover:bg-orange-pantone transition-all duration-500 text-sm font-medium tracking-wide uppercase group"
          >
            <Github size={20} />
            <span>{t("cta.button")}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
