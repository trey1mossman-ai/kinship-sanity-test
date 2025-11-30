'use client';

import { ReactNode, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ScrollEffectsWrapperProps {
  children: ReactNode;
}

/**
 * Global scroll effects wrapper
 * Adds subtle parallax and progress indicators
 */
export function ScrollEffectsWrapper({ children }: ScrollEffectsWrapperProps) {
  const { scrollYProgress } = useScroll();

  // Smooth spring for progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Reactive visibility for scroll-to-top button (matches ScrollTop component behavior)
  const buttonOpacity = useTransform(scrollYProgress, (value) => {
    // Show button when scrolled more than 200px (approximately 0.05-0.1 depending on page height)
    return value > 0.05 ? 1 : 0;
  });

  // Add CSS for diagonal cuts globally
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* The Kinship Angle™ - Global diagonal cuts */
      .kinship-angle {
        clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
      }
      .kinship-angle-reverse {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);
      }
      .kinship-angle-left {
        clip-path: polygon(0 0, 90% 0, 100% 15%, 100% 100%, 0 100%);
      }
      .kinship-angle-right {
        clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 85%);
      }

      /* Parallax performance optimization */
      .parallax-container {
        will-change: transform;
        transform: translateZ(0);
        backface-visibility: hidden;
      }

      /* Smooth scroll behavior */
      html {
        scroll-behavior: smooth;
      }

      /* Disable parallax on mobile for performance */
      @media (max-width: 768px) {
        .parallax-container {
          transform: none !important;
        }
      }

      /* Respect reduced motion preference */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${KINSHIP_COLORS.greenDark}, ${KINSHIP_COLORS.wasabi})`,
        }}
      />

      {/* Scroll to Top Button - Matches ScrollTop component exactly */}
      <motion.button
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed right-4 bottom-24 sm:bottom-8 z-40 inline-flex items-center justify-center w-12 h-12 bg-[#647B56] text-white shadow-xl border-2 border-white hover:bg-[#667C58] hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#647B56]"
        style={{
          opacity: buttonOpacity,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>

      {/* Main Content */}
      {children}
    </>
  );
}

// Import at the end to avoid circular dependency
import { KINSHIP_COLORS } from '@/lib/config/brand';