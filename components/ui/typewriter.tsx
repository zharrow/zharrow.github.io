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
  speed = 100,
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
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts, delay, speed]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-[1em] bg-current ml-1 align-middle"
      />
    </span>
  );
}
