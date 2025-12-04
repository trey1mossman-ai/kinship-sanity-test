'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ReviewCarousel } from './ReviewCarousel';
import { KINSHIP_COLORS } from '@/lib/config/brand';

interface PressMention {
  _id: string;
  publication: string;
  logoUrl?: string;
}

interface PressAndReviewsProps {
  reviewData: {
    meta: any;
    themes: string[];
    reviews: any[];
  };
  pressMentions?: PressMention[];
}

// Fallback press data in case Sanity is unavailable
const fallbackPress = [
  { name: 'Forbes', src: '/press/Forbes.jpg' },
  { name: 'TODAY', src: '/press/today-show.webp' },
  { name: 'Denver Post', src: '/press/denverpostlogo-grey.webp' },
  { name: 'USA Today', src: '/press/USA Today.jpg' },
  { name: 'Condé Nast Traveler', src: '/press/conde nast traveler.jpg' },
  { name: 'AFAR', src: '/press/Afar.jpg' },
  { name: 'Globe Traveler', src: '/press/Globe Traveler.jpg' },
  { name: 'The Telegraph', src: '/press/The Telegraph.jpg' },
  { name: 'Out There Colorado', src: '/press/out there colorado.jpg' },
  { name: 'BizBash', src: '/press/bizbash.jpg' },
];

export function PressAndReviews({ reviewData, pressMentions }: PressAndReviewsProps) {
  // Use Sanity data if available, otherwise fallback to hardcoded
  const press = pressMentions && pressMentions.length > 0
    ? pressMentions.map(p => ({ name: p.publication, src: p.logoUrl || '' }))
    : fallbackPress;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll effect - scroll 5 at a time
  useEffect(() => {
    const totalGroups = Math.ceil(press.length / 5);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalGroups);
    }, 6000); // Change every 6 seconds for a more relaxed pace

    return () => clearInterval(interval);
  }, [press.length]);

  return (
    <section className="py-6 md:py-8 relative overflow-hidden" style={{ backgroundColor: KINSHIP_COLORS.white }}>
      {/* Mural Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/HomePage/Background-mural-mobile.webp"
          alt="Kinship Landing mural artwork"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
      </div>

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white/60 z-10" />

      <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Press Section - Auto-scrolling Carousel */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h3
            className="text-lg md:text-xl font-bold uppercase tracking-wider mb-4 text-center"
            style={{ color: KINSHIP_COLORS.greenDark }}
          >
            As Featured In
          </h3>

          {/* Auto-scrolling carousel container - responsive logo count */}
          <div className="relative overflow-hidden w-full mx-auto h-[80px] xs:h-[100px] sm:h-[120px] md:h-[140px] lg:h-[176px]">
            <AnimatePresence mode="wait">
              <motion.div
                className="flex justify-center items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 absolute inset-0 px-2 sm:px-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }}
                exit={{
                  opacity: 0,
                  x: -50,
                  transition: {
                    duration: 0.8,
                    ease: "easeIn"
                  }
                }}
                key={currentIndex}
              >
              {/* Show 3 logos on mobile, 4 on tablet, 5 on desktop */}
              {press
                .slice(currentIndex * 5, currentIndex * 5 + 5)
                .map((outlet, index) => (
                  <div
                    key={outlet.name}
                    className={`flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-500 ${
                      index >= 3 ? 'hidden md:block' : ''
                    } ${index >= 4 ? 'hidden lg:block' : ''}`}
                  >
                    <Image
                      src={outlet.src}
                      alt={outlet.name}
                      width={420}
                      height={140}
                      className="object-contain w-[100px] xs:w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] xl:w-[280px] h-auto max-h-[60px] xs:max-h-[80px] sm:max-h-[100px] md:max-h-[120px] lg:max-h-[140px] grayscale hover:grayscale-0 transition-all duration-300"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-16 h-px mx-auto mb-4" style={{ backgroundColor: KINSHIP_COLORS.greenDark, opacity: 0.2 }} />

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="text-center mb-4">
            {/* Combined Title and Google Badge */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2
                className="text-lg md:text-xl font-bold"
                style={{ color: KINSHIP_COLORS.greenDark }}
              >
                Guest Reviews
              </h2>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold" style={{ color: KINSHIP_COLORS.greenDark }}>
                {reviewData.meta.googleRating}
              </span>
              <span className="text-xs text-gray-500">
                ({reviewData.meta.googleReviewCountApprox}+)
              </span>
            </div>
          </div>

          {/* Review Cards */}
          <div className="max-w-6xl mx-auto">
            <ReviewCarousel reviews={reviewData.reviews} showGoogleBranding={true} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}