'use client';

import { motion } from 'framer-motion';
import { BackgroundMedia } from './BackgroundMedia';
import { BookingWidget } from './BookingWidget';
import { InlineTestimonials } from './InlineTestimonials';
import { KINSHIP_FONTS } from '@/lib/config/brand';
import { content } from '@/content/copy';

/**
 * Enhanced HeroSection Component
 * Purpose: Create a welcoming first impression that makes guests feel understood
 * Mobile-first: Stacked layout on mobile, side-by-side on desktop
 * Structure: Background layer -> Content layer (text + booking) + minimal review strip
 */
export function HeroSection() {
  // Hero video with fallback image
  const heroVideo = 'https://storage.googleapis.com/msgsndr/ZSnKlb7yt1OZGmrCwL7T/media/68defb5cd6c63ec71789ef67.mp4';
  const heroImageFallback = '/images/HomePage/event image-optimized.webp';

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* 1. BACKGROUND LAYER with video */}
      <BackgroundMedia
        type="video"
        source={heroVideo}
        fallback={heroImageFallback}
        overlayOpacity={0.25}
      />

      {/* 2. CONTENT LAYER - Mobile-first responsive layout */}
      <div className="relative min-h-screen flex flex-col justify-end sm:justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 pt-10 sm:py-24 lg:py-0">
          <div className="w-full lg:pl-8 lg:pr-8">

            {/* Flex container - Stack on mobile, side-by-side on desktop */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">

              {/* Left Side: Welcome Content (expanded for proper text flow) */}
              <motion.div
                className="flex-1 lg:flex-[0.6] text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1], // Spring easing for welcoming feel
                }}
              >
                {/* Main Headline - Let text flow horizontally with breathing room */}
                <h1
                  className="text-white font-serif font-semibold leading-[1.05] flex items-end sm:items-center pb-2 sm:pb-0"
                  style={{
                    fontFamily: KINSHIP_FONTS.heading,
                    textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 8px',
                    fontSize: 'clamp(32px, 5.5vw, 68px)',
                    minHeight: 'auto',
                    marginBottom: '1rem',
                  }}
                >
                  <span style={{ whiteSpace: 'pre-line' }}>
                    {'Experience Colorado\nSprings like a local'}
                  </span>
                </h1>

                {/* Rotating Testimonials - Replace tagline with authentic guest voices */}
                <InlineTestimonials />

              </motion.div>

              {/* Right Side: Booking Widget - positioned right with breathing room */}
              <div className="flex-1 lg:flex-none flex justify-center lg:justify-end">
                <div className="w-full max-w-md lg:max-w-none">
                  {/* Desktop Booking Widget - pulled further from right */}
                  <div className="hidden lg:block lg:mr-40">
                    <BookingWidget
                      onBookingInitiated={(data) => {
                        // Track booking initiation
                        if (typeof window !== 'undefined' && (window as any).gtag) {
                          (window as any).gtag('event', 'booking_started', {
                            checkin: data.checkIn,
                            checkout: data.checkOut,
                            guests: data.guests,
                            source: 'hero_widget'
                          });
                        }
                      }}
                    />
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}