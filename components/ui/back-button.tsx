"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Home } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  const locale = useLocale();

  const handleBack = () => {
    router.push(`/${locale}`);
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleBack}
      className="fixed top-6 left-6 z-50 group
                 w-14 h-14 rounded-2xl
                 bg-neutral-900/80 backdrop-blur-lg
                 border border-neutral-800 hover:border-blue-500/50
                 flex items-center justify-center
                 transition-all duration-300
                 shadow-lg hover:shadow-blue-500/20"
      aria-label="Retour à l'accueil"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ x: -3 }}
        transition={{ duration: 0.2 }}
      >
        <Home size={22} className="text-neutral-300 group-hover:text-white transition-colors" />
      </motion.div>

      {/* Animated glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    </motion.button>
  );
}
