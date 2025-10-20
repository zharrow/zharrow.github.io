"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const greetings = [
  "Bonjour",      // Français
  "Hello",        // Anglais
  "Hola",         // Espagnol
  "Ciao",         // Italien
  "Hallo",        // Allemand
  "Olá",          // Portugais
  "Привет",       // Russe
  "こんにちは",    // Japonais
  "你好",         // Chinois
  "안녕하세요",    // Coréen
  "مرحبا",        // Arabe
  "नमस्ते",       // Hindi
  "Hej",          // Suédois
  "Salut",        // Roumain
  "Ahoj",         // Tchèque
  "Γεια σου",     // Grec
  "שלום",         // Hébreu
  "Merhaba",      // Turc
  "Sawubona",     // Zoulou
  "Jambo",        // Swahili
];

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState(0);

  useEffect(() => {
    // Change greeting every 200ms for smoother cycling
    const greetingInterval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 200);

    // Start exit animation after 2 seconds
    const exitTimeout = setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    // Stop loading after exit animation completes (reduced to match animation)
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2900);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(exitTimeout);
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-cream overflow-hidden"
        >
          {/* Top-left corner that expands to reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0, transformOrigin: "top left" }}
            animate={isExiting ? {
              opacity: 1,
              scale: 1,
              width: "100%",
              height: "100%",
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }
            } : {
              opacity: 1,
              scale: 1
            }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-orange-pantone"
            style={{ transformOrigin: "top left" }}
          />

          {/* Bottom-right corner that expands to reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0, transformOrigin: "bottom right" }}
            animate={isExiting ? {
              opacity: 1,
              scale: 1,
              width: "100%",
              height: "100%",
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }
            } : {
              opacity: 1,
              scale: 1
            }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-orange-pantone"
            style={{ transformOrigin: "bottom right" }}
          />

          {/* Main greeting text */}
          <motion.div
            className="relative z-10"
            animate={isExiting ? {
              opacity: 0,
              scale: 0.8,
              transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }
            } : {
              opacity: 1,
              scale: 1
            }}
          >
            <motion.h1
              key={currentGreeting}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.1 }}
              transition={{ duration: 0.15 }}
              className="text-[clamp(3rem,10vw,8rem)] font-medium text-black-deep tracking-tight text-center"
            >
              {greetings[currentGreeting]}
            </motion.h1>

            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-1 bg-orange-pantone mx-auto mt-4"
            />
          </motion.div>

          {/* Final fade out of entire loader */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isExiting ? {
              opacity: 1,
              transition: {
                delay: 0.6,
                duration: 0.3
              }
            } : {
              opacity: 0
            }}
            className="absolute inset-0 bg-cream z-20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
