"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Home, User, Briefcase, FolderKanban, MessageSquare, Workflow } from "lucide-react";
import MenuGrid from "./menu-grid";

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
  delay?: number;
}

const BentoCard = ({ title, description, icon, href, className = "", delay = 0 }: BentoCardProps) => {
  return (
    <Link href={href} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className={`
          group relative cursor-pointer overflow-hidden rounded-3xl h-full
          bg-gradient-to-br from-neutral-900 to-neutral-950
          border border-neutral-800 hover:border-neutral-700
          transition-all duration-300
          ${className}
        `}
      >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative h-full p-8 flex flex-col justify-between">
        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10
                     flex items-center justify-center text-blue-400 group-hover:text-blue-300
                     border border-blue-500/20 group-hover:border-blue-500/40
                     transition-all duration-300"
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          {icon}
        </motion.div>

        {/* Text content */}
        <div className="mt-auto">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-neutral-400 text-sm group-hover:text-neutral-300 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Arrow icon */}
        <motion.div
          className="absolute top-8 right-8 text-neutral-600 group-hover:text-blue-400 transition-colors duration-300"
          initial={{ x: 0, y: 0 }}
          whileHover={{ x: 5, y: -5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.div>
      </div>

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />
      </div>
      </motion.div>
    </Link>
  );
};

export default function BentoGrid() {
  const cards = [
    {
      title: "À Propos",
      description: "Découvrez mon parcours, mes valeurs et mon expertise en développement web",
      icon: <User size={28} />,
      href: "/about-hero",
      className: "col-span-1 row-span-2",
      delay: 0.1
    },
    {
      title: "Services",
      description: "E-commerce, sites web, applications SaaS - Des solutions complètes sur-mesure",
      icon: <Briefcase size={28} />,
      href: "/services-portfolio-process",
      className: "col-span-1 row-span-1",
      delay: 0.2
    },
    {
      title: "Portfolio",
      description: "Explorez mes réalisations et projets clients avec études de cas détaillées",
      icon: <FolderKanban size={28} />,
      href: "/services-portfolio-process#portfolio",
      className: "col-span-1 row-span-1",
      delay: 0.3
    },
    {
      title: "Processus",
      description: "Ma méthodologie éprouvée en 5 étapes pour garantir la réussite de vos projets",
      icon: <Workflow size={28} />,
      href: "/services-portfolio-process#process",
      className: "col-span-1 row-span-1",
      delay: 0.4
    },
    {
      title: "Contact",
      description: "Une idée de projet ? Discutons-en ensemble et donnons vie à votre vision",
      icon: <MessageSquare size={28} />,
      href: "/contact",
      className: "col-span-1 row-span-1",
      delay: 0.5
    }
  ];

  return (
    <>
      <MenuGrid />
      <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-8">
        <div className="max-w-7xl w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <Home size={18} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Portfolio Florent Detres</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Explorez mon
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                univers digital
              </span>
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
              Choisissez une section pour découvrir mes services, projets et compétences
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
            {cards.map((card, index) => (
              <BentoCard key={index} {...card} />
            ))}
          </div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center text-neutral-600 text-sm mt-12"
          >
            Navigation fluide et chargement instantané entre les pages
          </motion.p>
        </div>
      </div>
    </>
  );
}
