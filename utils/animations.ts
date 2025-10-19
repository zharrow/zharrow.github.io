import { Variants } from "framer-motion";

/**
 * Animation variants réutilisables pour Framer Motion
 * Conformes à l'esprit "luxe discret" du portfolio
 */

// Fade In from bottom
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom ease for smooth, elegant motion
    },
  },
};

// Fade In from top
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Fade In from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Fade In from right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Scale In (for cards, images)
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Simple fade
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Stagger container (for lists and grids)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Stagger item (to use with staggerContainer)
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Slide and fade (for modals, overlays)
export const slideAndFade: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// Rotate and scale (for icons, buttons)
export const rotateScale: Variants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
    rotate: -5,
  },
};

// Floating animation (for decorative elements)
export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Pulse animation (for badges, notifications)
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Slide from bottom (for drawers, bottom sheets)
export const slideFromBottom: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

/**
 * Transition presets
 */
export const transitions = {
  smooth: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
  },
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },
  gentle: {
    duration: 0.8,
    ease: "easeOut",
  },
  quick: {
    duration: 0.3,
    ease: "easeOut",
  },
};

/**
 * Viewport settings for scroll-triggered animations
 */
export const viewport = {
  once: true, // Animation triggers only once
  amount: 0.3, // Trigger when 30% of element is visible
  margin: "0px 0px -100px 0px", // Trigger slightly before element enters viewport
};
