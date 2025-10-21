"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MorphingIconProps {
  Icon: LucideIcon;
  isHovered: boolean;
  className?: string;
}

export function MorphingIcon({ Icon, isHovered, className = "" }: MorphingIconProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        scale: isHovered ? 1.2 : 1,
        rotate: isHovered ? 360 : 0,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Icon with morphing effect */}
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? [1, 0.5, 1] : 1,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        <Icon className={`w-8 h-8 transition-colors duration-500`} />
      </motion.div>

      {/* Morphing background circles */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          scale: isHovered ? [1, 1.5, 1] : 1,
          opacity: isHovered ? [0, 0.3, 0] : 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-orange-pantone blur-md" />
      </motion.div>

      {/* Rotating ring effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          rotate: isHovered ? 180 : 0,
          scale: isHovered ? 1.4 : 0,
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10 5"
            className="text-orange-pantone"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
