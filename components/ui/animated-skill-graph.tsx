"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedSkillGraphProps {
  skillKey: string;
  label: string;
  level: number;
  index: number;
}

export function AnimatedSkillGraph({ skillKey, label, level, index }: AnimatedSkillGraphProps) {
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onViewportEnter={() => setIsInView(true)}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-black-deep">{label}</span>
        <motion.span
          className="text-sm text-gray-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>

      {/* SVG Animated Bar */}
      <div className="relative h-8 bg-black-deep/5 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Background pattern */}
          <defs>
            <pattern id={`pattern-${skillKey}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-orange-pantone/20" />
            </pattern>
          </defs>

          {/* Animated fill */}
          <motion.rect
            x="0"
            y="0"
            height="100"
            fill="url(#gradient-skill)"
            initial={{ width: 0 }}
            animate={{ width: isInView ? level : 0 }}
            transition={{
              duration: 1.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
          />

          {/* Glow effect */}
          <motion.rect
            x="0"
            y="0"
            height="100"
            fill="url(#glow-gradient)"
            opacity="0.5"
            initial={{ width: 0 }}
            animate={{ width: isInView ? level : 0 }}
            transition={{
              duration: 1.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient-skill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF5722" />
              <stop offset="100%" stopColor="#FF8A50" />
            </linearGradient>
            <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF5722" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF5722" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage indicator */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-white-pure shadow-lg"
          initial={{ left: "0%" }}
          animate={{ left: isInView ? `${level}%` : "0%" }}
          transition={{
            duration: 1.5,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
        />
      </div>
    </motion.div>
  );
}
