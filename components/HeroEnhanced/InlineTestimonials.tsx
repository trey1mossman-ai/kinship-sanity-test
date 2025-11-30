'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import reviewsData from '@/data/reviews.seed.json';
import { KINSHIP_FONTS } from '@/lib/config/brand';
import { content } from '@/content/copy';

/**
 * InlineTestimonials Component
 * Purpose: Replace marketing tagline with authentic guest voices
 * Brilliant UX: Let guests speak instead of marketing copy
 * Brand: Clean, minimal, authentic proof of "sleep well, meet locals, launch adventures"
 */
export function InlineTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showingOriginal, setShowingOriginal] = useState(true);

  // Get the most impactful 5-star reviews that prove our value prop
  const powerReviews = reviewsData.reviews
    .filter(review => review.rating === 5)
    .slice(0, 4); // Just the best 4 for rotation

  // Show original tagline for 4 seconds, then start testimonial rotation
  useEffect(() => {
    if (powerReviews.length === 0) return;

    let intervalId: NodeJS.Timeout | null = null;

    // First timer: Switch from original to testimonials after 4 seconds
    const initialTimer = setTimeout(() => {
      setShowingOriginal(false);
    }, 4000);

    // Second timer: Start testimonial rotation after original is hidden
    const rotationTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % powerReviews.length);
      }, 3500);
    }, 4000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(rotationTimer);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [powerReviews.length]);

  if (powerReviews.length === 0) {
    // Fallback to original copy if no reviews
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
            {content.home.hero.subhead}
          </p>
        </div>
      </div>
    );
  }

  const currentReview = powerReviews[currentIndex];

  return (
    <div className="h-20 sm:h-24 flex items-start justify-center lg:justify-start">
      <AnimatePresence mode="wait">
        {showingOriginal ? (
          <motion.div
            key="original"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-center lg:text-left max-w-2xl pt-2"
          >
            {/* Original tagline - positioned higher than testimonials */}
            <p
              className="text-white text-lg sm:text-xl md:text-2xl font-light leading-relaxed"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                textShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 4px',
              }}
            >
              {content.home.hero.subhead}
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
            {/* Guest Quote - This IS our tagline */}
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