'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KINSHIP_FONTS } from '@/lib/config/brand';

/**
 * EventsTestimonials Component
 * Purpose: Show rotating event guest reviews below Events hero text
 * Pattern: Matches HOMA, About, and homepage testimonials exactly
 * Brand: Authentic voices proving exceptional event experiences
 */
export function EventsTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showingSEO, setShowingSEO] = useState(true);

  // Event-specific featured reviews (shorter ones for mobile compatibility)
  const featuredReviews = [
    {
      quote: "Our experience was absolutely wonderful from the venue itself to the attentive and responsive staff! Highly recommend Kinship to future brides!",
      name: "Aubrey S"
    },
    {
      quote: "Every part of the experience was top notch. The room was beautiful, the bed comfortable, the food delicious and the service exceptional.",
      name: "Beth G"
    },
    {
      quote: "The evening was a huge success thanks to Brad and his staff! They were so accommodating with every request and need.",
      name: "Mary B"
    }
  ];

  // Show SEO text for 4 seconds, then start review rotation
  useEffect(() => {
    if (featuredReviews.length === 0) return;

    let intervalId: NodeJS.Timeout | null = null;

    // First timer: Switch from SEO to reviews after 4 seconds
    const initialTimer = setTimeout(() => {
      setShowingSEO(false);
    }, 4000);

    // Second timer: Start review rotation after SEO is hidden
    const rotationTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
      }, 5000);
    }, 4000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(rotationTimer);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [featuredReviews.length]);

  if (featuredReviews.length === 0) {
    // Fallback to SEO text if no reviews
    return (
      <div className="h-20 sm:h-24 flex items-start justify-center lg:justify-start">
        <div className="text-center lg:text-left max-w-2xl pt-2">
          <p
            className="text-white text-lg sm:text-xl md:text-2xl font-light leading-relaxed"
            style={{
              fontFamily: KINSHIP_FONTS.body,
              textShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 4px',
            }}
          >
            Unforgettable events in the heart of downtown Colorado Springs
          </p>
        </div>
      </div>
    );
  }

  const currentReview = featuredReviews[currentIndex];

  return (
    <div className="h-20 sm:h-24 flex items-start justify-center lg:justify-start">
      <AnimatePresence mode="wait">
        {showingSEO ? (
          <motion.div
            key="seo"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-center lg:text-left max-w-2xl pt-2"
          >
            {/* SEO Subtext - positioned higher than testimonials */}
            <p
              className="text-white text-lg sm:text-xl md:text-2xl font-light leading-relaxed"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                textShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 4px',
              }}
            >
              Unforgettable events in the heart of downtown Colorado Springs
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-center lg:text-left max-w-2xl min-h-[60px] flex flex-col justify-center"
          >
            {/* Guest Quote */}
            <blockquote
              className="text-white/95 text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                textShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 4px',
              }}
            >
              "{currentReview.quote}"
            </blockquote>

            {/* Minimal attribution */}
            <p
              className="text-white/80 text-sm mt-2 font-medium"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                textShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px',
              }}
            >
              – {currentReview.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
