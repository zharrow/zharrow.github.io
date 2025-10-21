"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { useCornerButtonGroup } from "./corner-button-group";

interface CornerButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  id?: string;
}

export function CornerButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  id = "",
}: CornerButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { hoveredButton, setHoveredButton } = useCornerButtonGroup();
  const Component = href ? motion.a : motion.button;

  const isPrimary = variant === "primary";
  const borderColor = isPrimary ? "bg-orange-pantone" : "bg-orange-pantone";
  const bgColor = isPrimary ? "bg-black-deep" : "bg-orange-pantone";

  // Si un autre bouton primary est hover, forcer la disparition du background du bouton secondary
  const isOtherPrimaryHovered = !isPrimary && hoveredButton === "primary";

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isPrimary) {
      setHoveredButton("primary");
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isPrimary) {
      setHoveredButton(null);
    }
  };

  return (
    <Component
      href={href}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-block px-8 py-6 text-base font-medium no-underline ${className}`}
    >
      <motion.span
        className="relative z-10"
        animate={{
          color: isPrimary
            ? (isHovered ? "#FAFAFA" : "#0A0A0A")
            : (isHovered || isOtherPrimaryHovered ? "#FF5722" : "#FAFAFA")
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>

      {/* Background fill */}
      <motion.span
        className={`absolute inset-0 ${bgColor} origin-center`}
        animate={{
          scale: isPrimary
            ? (isHovered ? 1 : 0)
            : (isHovered || isOtherPrimaryHovered ? 0 : 1)
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Top border */}
      <motion.span
        className={`absolute top-0 left-0 h-[2px] ${borderColor}`}
        animate={{
          width: isPrimary
            ? (isHovered ? "100%" : "0%")
            : (isHovered || isOtherPrimaryHovered ? "0%" : "100%")
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Right border */}
      <motion.span
        className={`absolute top-0 right-0 w-[2px] ${borderColor}`}
        animate={{
          height: isPrimary
            ? (isHovered ? "100%" : "0%")
            : (isHovered || isOtherPrimaryHovered ? "0%" : "100%")
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />

      {/* Bottom border */}
      <motion.span
        className={`absolute bottom-0 right-0 h-[2px] ${borderColor}`}
        animate={{
          width: isPrimary
            ? (isHovered ? "100%" : "0%")
            : (isHovered || isOtherPrimaryHovered ? "0%" : "100%")
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />

      {/* Left border */}
      <motion.span
        className={`absolute bottom-0 left-0 w-[2px] ${borderColor}`}
        animate={{
          height: isPrimary
            ? (isHovered ? "100%" : "0%")
            : (isHovered || isOtherPrimaryHovered ? "0%" : "100%")
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
    </Component>
  );
}
