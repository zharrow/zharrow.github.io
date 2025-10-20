"use client";

import { useRef, useState, MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export function Card3D({
  children,
  className = "",
  glowColor = "rgba(212, 175, 55, 0.3)",
  intensity = 15,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -intensity;
    const rotateYValue = ((x - centerX) / centerX) * intensity;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      className={`relative ${className}`}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
