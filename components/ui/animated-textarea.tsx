"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

interface AnimatedTextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  className?: string;
  placeholder?: string;
}

export function AnimatedTextarea({
  id,
  name,
  value,
  onChange,
  required = false,
  rows = 8,
  className = "",
  placeholder = "",
}: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const particleIdRef = useRef(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);

    // Create particles when typing
    if (textareaRef.current) {
      const newParticle: Particle = {
        id: particleIdRef.current++,
        x: Math.random() * textareaRef.current.offsetWidth,
        y: Math.random() * textareaRef.current.offsetHeight,
      };

      setParticles(prev => [...prev, newParticle]);

      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 1000);
    }
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        rows={rows}
        className={`${className} relative z-10`}
        placeholder={placeholder}
      />

      {/* Animated bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-orange-pantone"
        initial={{ width: "0%" }}
        animate={{
          width: isFocused ? "100%" : "0%",
          boxShadow: isFocused ? "0 0 8px rgba(255, 87, 34, 0.6)" : "0 0 0px rgba(255, 87, 34, 0)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1.5 h-1.5 rounded-full bg-orange-pantone/40 pointer-events-none"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 1,
              scale: 0
            }}
            animate={{
              y: particle.y - 40,
              x: particle.x + (Math.random() - 0.5) * 20,
              opacity: 0,
              scale: [0, 1.5, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
