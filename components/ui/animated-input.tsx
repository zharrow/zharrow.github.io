"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

interface AnimatedInputProps {
  type?: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

export function AnimatedInput({
  type = "text",
  id,
  name,
  value,
  onChange,
  required = false,
  className = "",
  placeholder = "",
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const particleIdRef = useRef(0);

  // Create particles when typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    // Create particle
    if (inputRef.current) {
      const newParticle: Particle = {
        id: particleIdRef.current++,
        x: Math.random() * inputRef.current.offsetWidth,
        y: inputRef.current.offsetHeight / 2,
      };

      setParticles(prev => [...prev, newParticle]);

      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 1000);
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
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

      {/* Blinking cursor effect when focused */}
      {isFocused && (
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-orange-pantone"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-orange-pantone/60 pointer-events-none"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 1,
              scale: 0
            }}
            animate={{
              y: particle.y - 30,
              opacity: 0,
              scale: [0, 1.5, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
