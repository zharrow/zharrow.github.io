"use client";

import { useState, useRef } from "react";
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
    <div className="relative overflow-visible">
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
        style={{
          caretColor: '#FF5722',
        }}
      />

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none z-20"
            style={{
              width: '3px',
              height: '3px',
              backgroundColor: '#FF5722',
              boxShadow: '0 0 6px rgba(255, 87, 34, 0.8), 0 0 3px rgba(255, 87, 34, 1)',
            }}
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 1,
              scale: 0
            }}
            animate={{
              y: particle.y - 25,
              x: particle.x + (Math.random() - 0.5) * 20,
              opacity: 0,
              scale: [0, 1.2, 0.8, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
