"use client";

import { motion } from "framer-motion";
import { Code, Palette, Rocket, Settings, Smartphone, Zap } from "lucide-react";
import { Card3D } from "@/components/ui/card-3d";

const services = [
  {
    icon: Code,
    title: "Développement Web",
    description:
      "Création de sites web et applications modernes, rapides et responsive avec les dernières technologies.",
    features: ["React & Next.js", "TypeScript", "API REST & GraphQL"],
    color: "from-accent-gold to-accent-copper",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Conception d'interfaces élégantes et intuitives centrées sur l'expérience utilisateur.",
    features: ["Design System", "Prototypage", "Tests utilisateurs"],
    color: "from-accent-copper to-accent-sage",
  },
  {
    icon: Smartphone,
    title: "Applications Mobile",
    description:
      "Développement d'applications mobiles performantes pour iOS et Android.",
    features: ["React Native", "Progressive Web App", "Cross-platform"],
    color: "from-accent-sage to-accent-gold",
  },
  {
    icon: Rocket,
    title: "Performance & SEO",
    description:
      "Optimisation des performances et du référencement pour une visibilité maximale.",
    features: ["Core Web Vitals", "SEO technique", "Analytics"],
    color: "from-accent-gold to-accent-copper",
  },
  {
    icon: Settings,
    title: "Maintenance & Support",
    description:
      "Maintenance continue, mises à jour et support technique pour vos projets.",
    features: ["Monitoring 24/7", "Updates régulières", "Support réactif"],
    color: "from-accent-copper to-accent-sage",
  },
  {
    icon: Zap,
    title: "Consulting",
    description:
      "Accompagnement stratégique et conseils techniques pour vos projets digitaux.",
    features: ["Audit technique", "Stratégie digitale", "Formation"],
    color: "from-accent-sage to-accent-gold",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-dark-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-copper rounded-full blur-3xl"></div>
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
            Services
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-50 mb-6">
            Ce que je peux faire{" "}
            <span className="gradient-text">pour vous</span>
          </h2>
          <p className="text-xl text-primary-300 max-w-2xl mx-auto">
            Des solutions complètes et sur-mesure pour donner vie à vos projets
            digitaux
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group"
            >
              <Card3D
                className="h-full"
                glowColor={service.color.includes("gold") ? "rgba(212, 175, 55, 0.4)" : service.color.includes("copper") ? "rgba(184, 115, 51, 0.4)" : "rgba(138, 154, 91, 0.4)"}
                intensity={10}
              >
                <div className="h-full bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700 hover:border-accent-gold/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent-gold/20">
                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full bg-dark-800 rounded-xl flex items-center justify-center">
                      <service.icon className="text-primary-50" size={28} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-primary-50 mb-4 group-hover:text-accent-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-primary-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-primary-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-gold"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                  {/* Hover Effect Border */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                  ></div>
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
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-primary-300 mb-6">
            Vous avez un projet en tête ?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-accent-gold text-dark-900 rounded-full font-semibold hover:bg-accent-copper transition-all duration-300 shadow-lg hover:shadow-accent-gold/50"
          >
            Discutons-en ensemble
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
