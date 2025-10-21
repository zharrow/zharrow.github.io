"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  texts: string[];
  className?: string;
  delay?: number;
  speed?: number;
}

export function Typewriter({
  texts,
  className = "",
  delay = 2000,
  speed = 80,
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentFullText.length) {
            setDisplayText(currentFullText.slice(0, displayText.length + 1));
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(currentFullText.slice(0, displayText.length - 1));
          } else {
            // Finished deleting, move to next text
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? speed * 0.5 : speed + Math.random() * 40
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts, delay, speed]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span className="relative whitespace-nowrap">
        {displayText.split("").map((char, index) => (
          <motion.span
            key={`${currentTextIndex}-char-${index}`}
            initial={{
              opacity: 0,
              y: 10,
              filter: "blur(4px)"
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)"
            }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
              delay: 0
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>

      {/* Curseur avec effet premium */}
      <motion.span
        animate={{
          opacity: [1, 0.3, 1],
          scaleY: [1, 0.9, 1]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="inline-block w-[3px] h-[1em] bg-current ml-1.5 rounded-full"
        style={{
          boxShadow: "0 0 8px currentColor"
        }}
      />
    </span>
  );
}
