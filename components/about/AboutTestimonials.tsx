'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import employeeReviewsData from '@/data/employee-reviews.json';
import { KINSHIP_FONTS } from '@/lib/config/brand';

/**
 * AboutTestimonials Component
 * Purpose: Show rotating employee/guest reviews below About hero text
 * Pattern: Matches HOMA and homepage testimonials exactly
 * Brand: Authentic voices proving outrageous hospitality
 */
export function AboutTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showingSEO, setShowingSEO] = useState(true);

  // Get the 5 featured reviews
  const featuredReviews = employeeReviewsData.reviews.filter(review => review.featured);

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
      <div className="h-20 sm:h-24 flex items-start justify-center">
        <div className="text-center max-w-2xl pt-2">
          <p
            className="text-white text-lg sm:text-xl md:text-2xl font-light leading-relaxed"
            style={{
              fontFamily: KINSHIP_FONTS.body,
              textShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 4px',
            }}
          >
            Outrageous hospitality delivered by locals who love Colorado Springs
          </p>
        </div>
      </div>
    );
  }

  const currentReview = featuredReviews[currentIndex];

  return (
    <div className="h-20 sm:h-24 flex items-start justify-center">
      <AnimatePresence mode="wait">
        {showingSEO ? (
          <motion.div
            key="seo"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-center max-w-2xl pt-2"
          >
            {/* SEO Subtext - positioned higher than testimonials */}
            <p
              className="text-white text-lg sm:text-xl md:text-2xl font-light leading-relaxed"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                textShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 4px',
              }}
            >
              Outrageous hospitality delivered by locals who love Colorado Springs
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-center max-w-2xl min-h-[60px] flex flex-col justify-center"
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
