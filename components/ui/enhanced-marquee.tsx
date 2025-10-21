"use client";

import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";

interface EnhancedMarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function EnhancedMarquee({
  children,
  speed = 30,
  className = "",
}: EnhancedMarqueeProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex gap-8 hover:[animation-play-state:paused]"
        style={{
          animation: `scroll-left ${speed}s linear infinite`,
        }}
      >
        {/* First set */}
        <div className="flex gap-8 shrink-0">
          {childrenArray.map((child, index) => (
            <motion.div
              key={`first-${index}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
              animate={{
                scale: hoveredIndex === index ? 1.1 : 1,
                y: hoveredIndex === index ? -5 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {child}
              {/* Glow effect on hover */}
              {hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 -z-10 bg-orange-pantone/40 blur-2xl rounded-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div className="flex gap-8 shrink-0" aria-hidden="true">
          {childrenArray.map((child, index) => (
            <motion.div
              key={`second-${index}`}
              onMouseEnter={() => setHoveredIndex(index + childrenArray.length)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
              animate={{
                scale: hoveredIndex === index + childrenArray.length ? 1.1 : 1,
                y: hoveredIndex === index + childrenArray.length ? -5 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {child}
              {/* Glow effect on hover */}
              {hoveredIndex === index + childrenArray.length && (
                <motion.div
                  className="absolute inset-0 -z-10 bg-orange-pantone/40 blur-2xl rounded-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
