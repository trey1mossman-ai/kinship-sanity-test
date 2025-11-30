/**
 * Kinship Animation Utilities
 * Purpose: Centralized animation patterns following SOP guidelines
 * All animations designed to feel human, confident, and welcoming
 */

import { Variants } from 'framer-motion';

// ================================
// SCROLL-TRIGGERED ANIMATIONS
// ================================

/**
 * Welcome Reveal - Main content reveal animation
 * Uses the signature "welcome bounce" from SOP
 */
export const welcomeReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1], // Welcome bounce
    }
  }
};

/**
 * Staggered Children - For lists and grids
 * Creates a cascade effect that feels natural
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1], // Confident easing
    }
  }
};

/**
 * Fade In From Direction
 * For variety in reveal animations
 */
export const fadeInFrom = (direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom'): Variants => {
  const initial = {
    left: { x: -30 },
    right: { x: 30 },
    top: { y: -30 },
    bottom: { y: 30 },
  };

  return {
    hidden: {
      opacity: 0,
      ...initial[direction]
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94], // Explore easing
      }
    }
  };
};

// ================================
// HOVER ANIMATIONS
// ================================

/**
 * Card Hover Effect
 * Subtle scale with shadow enhancement
 */
export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: {
      duration: 0.3,
      ease: 'ease-out'
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    transition: {
      duration: 0.3,
      ease: 'ease-out'
    }
  }
};

/**
 * Image Ken Burns Effect
 * Slow zoom for images within containers
 */
export const kenBurnsEffect = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.6,
      ease: 'ease-out'
    }
  }
};

/**
 * Button Hover Effect
 * Confident lift with shadow
 */
export const buttonHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    scale: 1.05,
    y: -2,
    boxShadow: '0 4px 12px rgba(132, 158, 116, 0.3)',
    transition: {
      duration: 0.2,
      ease: 'ease-out'
    }
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      duration: 0.1
    }
  }
};

// ================================
// PARALLAX CONFIGURATION
// ================================

export const parallaxConfig = {
  subtle: {
    speed: 0.5,
    offset: 150
  },
  medium: {
    speed: 0.7,
    offset: 200
  },
  strong: {
    speed: 0.9,
    offset: 300
  }
};

// ================================
// SCROLL PROGRESS HOOK
// ================================

export const useScrollProgress = () => {
  if (typeof window === 'undefined') return { scrollYProgress: 0 };

  const { scrollY } = typeof window !== 'undefined' ?
    require('framer-motion').useScroll() :
    { scrollY: { get: () => 0 } };

  const { scrollYProgress } = typeof window !== 'undefined' ?
    require('framer-motion').useScroll() :
    { scrollYProgress: { get: () => 0 } };

  return { scrollY, scrollYProgress };
};

// ================================
// VIEWPORT CONFIGURATION
// ================================

export const viewportConfig = {
  once: true,           // Only animate once
  margin: '-100px',     // Start animation 100px before entering viewport
  amount: 0.3          // Trigger when 30% visible
};

// ================================
// CUSTOM SHAPES (The Kinship Angle™)
// ================================

export const kinshipAngle = {
  /**
   * 7° diagonal cut - subtle but distinctive
   * Creates forward momentum
   */
  diagonal: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',

  /**
   * Reverse diagonal for variety
   */
  diagonalReverse: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)',

  /**
   * Arrow shape for CTAs
   */
  arrow: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)',

  /**
   * Hexagon for special elements
   */
  hexagon: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
};

// ================================
// PERFORMANCE UTILITIES
// ================================

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if device is mobile
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Conditional animation based on device/preferences
 */
export const getAnimationConfig = (animation: any) => {
  if (prefersReducedMotion()) {
    return {}; // No animation
  }
  if (isMobile()) {
    // Simplified animation for mobile
    return {
      ...animation,
      transition: {
        ...animation.transition,
        duration: (animation.transition?.duration || 0.5) * 0.5
      }
    };
  }
  return animation;
};