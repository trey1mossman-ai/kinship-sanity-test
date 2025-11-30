'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReviewCarousel } from '@/components/home/ReviewCarousel';
import { KINSHIP_COLORS } from '@/lib/config/brand';
import homaReviewsData from '@/data/homa-reviews.json';

/**
 * HomaReviews Component
 * Purpose: Display HOMA Google reviews in same style as homepage
 * Pattern: Matches homepage PressAndReviews structure exactly
 * Data: Uses 15 HOMA-specific reviews from homa-reviews.json
 * Priority: Featured reviews (5) first, then remaining reviews (10)
 */
export function HomaReviews() {
  // Sort reviews: featured first, then the rest
  const sortedReviews = [
    ...homaReviewsData.reviews.filter(r => r.featured),
    ...homaReviewsData.reviews.filter(r => !r.featured)
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden" style={{ backgroundColor: KINSHIP_COLORS.latte }}>
      <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-6">
            {/* Combined Title and Google Badge */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ color: KINSHIP_COLORS.greenDark }}
              >
                HOMA Reviews
              </h2>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>

            {/* Rating Summary */}
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-base font-semibold" style={{ color: KINSHIP_COLORS.greenDark }}>
                {homaReviewsData.meta.averageRating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-600">
                ({homaReviewsData.meta.totalReviews}+ reviews)
              </span>
            </div>
          </div>

          {/* Review Cards Carousel */}
          <div className="max-w-6xl mx-auto mb-8">
            <ReviewCarousel reviews={sortedReviews} showGoogleBranding={true} />
          </div>

          {/* Guest Photos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-[300px] md:h-[400px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src="/images/HOMA Page/samantha-baldwin-14.webp"
                  alt="HOMA Café atmosphere"
                  fill
                  className="object-cover"
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-[300px] md:h-[400px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src="/images/HOMA Page/samantha-baldwin-12.webp"
                  alt="HOMA Café interior"
                  fill
                  className="object-cover"
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
