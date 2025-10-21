"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface GrainTextureProps {
  opacity?: number;
  className?: string;
}

export function GrainTexture({ opacity = 0.03, className = "" }: GrainTextureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Generate grain texture
    const generateGrain = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        const value = Math.random() * 255;
        buffer[i] = (255 << 24) | (value << 16) | (value << 8) | value;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Animate grain
    let animationId: number;
    let lastTime = 0;
    const fps = 12; // Lower FPS for subtle animation
    const interval = 1000 / fps;

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;
      if (deltaTime > interval) {
        lastTime = currentTime - (deltaTime % interval);
        generateGrain();
      }
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-10 ${className}`}
      style={{ opacity, mixBlendMode: "overlay" }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1 }}
    />
  );
}
