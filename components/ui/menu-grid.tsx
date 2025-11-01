"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Home, User, Briefcase, FolderKanban, MessageSquare, Workflow, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

export default function MenuGrid() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      title: "Accueil",
      description: "Retour à la page principale",
      icon: <Home size={24} />,
      href: "/",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "À Propos",
      description: "Mon parcours et expertise",
      icon: <User size={24} />,
      href: "/about-hero",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Services",
      description: "Solutions sur-mesure",
      icon: <Briefcase size={24} />,
      href: "/services-portfolio-process",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Portfolio",
      description: "Mes réalisations",
      icon: <FolderKanban size={24} />,
      href: "/services-portfolio-process#portfolio",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Processus",
      description: "Ma méthodologie",
      icon: <Workflow size={24} />,
      href: "/services-portfolio-process#process",
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: "Contact",
      description: "Discutons de votre projet",
      icon: <MessageSquare size={24} />,
      href: "/contact",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      rotate: -180,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      rotate: 180,
      y: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, delay: 0.2 }
    }
  };

  return (
    <>
      {/* Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 group
                   w-14 h-14 rounded-2xl
                   bg-neutral-900/80 backdrop-blur-lg
                   border border-neutral-800 hover:border-blue-500/50
                   flex items-center justify-center
                   transition-all duration-300
                   shadow-lg hover:shadow-blue-500/20"
        aria-label="Menu"
      >
        {/* Grid Icon (9 squares) */}
        <div className="grid grid-cols-3 gap-1.5">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-sm bg-neutral-400 group-hover:bg-blue-400 transition-colors"
              whileHover={{ scale: 1.2 }}
              transition={{ delay: i * 0.02 }}
            />
          ))}
        </div>

        {/* Animated glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      </motion.button>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

              {/* Animated grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0"
                     style={{
                       backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                       backgroundSize: '40px 40px'
                     }}
                />
              </div>
            </motion.div>

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-8"
              onClick={() => setIsOpen(false)}
            >
              <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="absolute top-8 right-8 w-14 h-14 rounded-full
                             bg-white/5 hover:bg-white/10 backdrop-blur-lg
                             border border-white/10 hover:border-white/20
                             flex items-center justify-center
                             transition-all duration-300"
                  aria-label="Fermer"
                >
                  <X size={24} className="text-white" />
                </motion.button>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Navigation
                  </h2>
                  <p className="text-neutral-400 text-lg">
                    Explorez mon portfolio
                  </p>
                </motion.div>

                {/* Menu Grid */}
                <motion.div
                  variants={gridVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group block h-full"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative h-full p-8 rounded-3xl overflow-hidden
                                     bg-gradient-to-br from-white/5 to-white/[0.02]
                                     border border-white/10 hover:border-white/20
                                     transition-all duration-300"
                        >
                          {/* Gradient overlay on hover */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                          {/* Icon */}
                          <motion.div
                            className={`w-14 h-14 rounded-2xl mb-6
                                       bg-gradient-to-br ${item.color} bg-opacity-10
                                       flex items-center justify-center text-white
                                       border border-white/10 group-hover:border-white/20
                                       transition-all duration-300`}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                          >
                            {item.icon}
                          </motion.div>

                          {/* Text */}
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-300 transition-all duration-300">
                            {item.title}
                          </h3>
                          <p className="text-neutral-400 text-sm group-hover:text-neutral-300 transition-colors duration-300">
                            {item.description}
                          </p>

                          {/* Arrow indicator */}
                          <motion.div
                            className="absolute bottom-6 right-6 text-neutral-600 group-hover:text-white transition-colors duration-300"
                            initial={{ x: 0, y: 0 }}
                            whileHover={{ x: 5, y: -5 }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </motion.div>

                          {/* Glow effect */}
                          <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.color} blur-2xl opacity-20`} />
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Bottom text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-neutral-600 text-sm mt-12"
                >
                  Appuyez sur <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-neutral-400 font-mono text-xs">ESC</kbd> pour fermer
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ESC key handler */}
      {isOpen && (
        <div
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
          }}
          tabIndex={0}
          className="fixed inset-0 z-[65]"
          style={{ outline: 'none' }}
        />
      )}
    </>
  );
}
