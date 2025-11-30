'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play } from '@/components/icons';
import reviewsData from '@/data/reviews.seed.json';
import { ReviewItem } from './types';

/**
 * ReviewCarousel Component
 * Purpose: Build trust through authentic guest experiences
 * Mobile-first: Simplified on mobile, full features on desktop
 * Uses REAL customer reviews from our data
 */

// Brand statements to intersperse with reviews
const brandStatements = [
  "Colorado Springs' gathering place for adventurers",
  "Where every stay becomes a story",
  "Your basecamp for Colorado exploration",
  "Sleep well. Meet locals. Launch adventures.",
  "Outrageous hospitality, crafted by locals"
];

export function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [carouselItems, setCarouselItems] = useState<ReviewItem[]>([]);

  // Prepare carousel items with real reviews and brand statements
  useEffect(() => {
    const items: ReviewItem[] = [];

    // Add real customer reviews (only 4-5 star for positive sentiment)
    reviewsData.reviews
      .filter(review => review.rating >= 4)
      .forEach((review, index) => {
        items.push({
          id: `review-${index}`,
          type: 'review',
          content: review.quote,
          author: review.name,
          rating: review.rating,
          source: review.source,
          date: review.date
        });

        // Add a brand statement every 2 reviews for variety
        if ((index + 1) % 2 === 0 && index < brandStatements.length * 2) {
          const statementIndex = Math.floor((index + 1) / 2) - 1;
          if (brandStatements[statementIndex]) {
            items.push({
              id: `statement-${statementIndex}`,
              type: 'statement',
              content: brandStatements[statementIndex]
            });
          }
        }
      });

    setCarouselItems(items);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!isPaused && carouselItems.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isPaused, carouselItems.length]);

  const handlePauseToggle = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  const goToItem = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    // Resume after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  }, []);

  if (carouselItems.length === 0) return null;

  const currentItem = carouselItems[currentIndex];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-30"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div
        className="backdrop-blur-[8px] border-t border-white/20"
        style={{
          backgroundColor: 'rgba(255, 253, 250, 0.9)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">

            {/* Review Content */}
            <div className="flex-1 min-h-[50px] sm:min-h-[60px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="w-full"
                >
                  {currentItem.type === 'review' ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      {/* Avatar - Hidden on mobile for space */}
                      <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full
                        bg-gradient-to-br from-[#849e74] to-[#667C58] text-white text-sm font-medium flex-shrink-0">
                        {currentItem.author?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>

                      {/* Review Text */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                          {/* Stars - Mobile responsive */}
                          <div className="flex items-center gap-0.5 flex-shrink-0">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                  i < (currentItem.rating || 5)
                                    ? 'text-[#849e74]'
                                    : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>

                          {/* Quote - Truncated on mobile */}
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed flex-1
                            line-clamp-2 sm:line-clamp-none">
                            "{currentItem.content}"
                          </p>
                        </div>

                        {/* Author info - Simplified on mobile */}
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span className="font-medium">{currentItem.author}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline">{currentItem.source}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Brand Statement - Centered and italic
                    <div className="text-center py-1">
                      <p className="text-sm sm:text-base lg:text-lg font-medium text-[#667C58] italic">
                        {currentItem.content}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-3 ml-3 sm:ml-4">
              {/* Pause/Play Button */}
              <button
                onClick={handlePauseToggle}
                className="p-1.5 sm:p-2 rounded-full bg-white/50 hover:bg-white/80
                  transition-colors focus:outline-none focus:ring-2 focus:ring-[#849e74]/50"
                aria-label={isPaused ? 'Resume rotation' : 'Pause rotation'}
              >
                {isPaused ? (
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                ) : (
                  <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                )}
              </button>

              {/* Progress dots - Hidden on smallest mobile */}
              <div className="hidden xs:flex items-center gap-1">
                {carouselItems.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToItem(index)}
                    className={`transition-all focus:outline-none focus:ring-2 focus:ring-[#849e74]/50 rounded-full
                      ${currentIndex % 5 === index
                        ? 'w-4 sm:w-5 h-1.5 bg-[#849e74]'
                        : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to item ${index + 1}`}
                    aria-current={currentIndex % 5 === index ? 'true' : 'false'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}