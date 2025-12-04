'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CommunityPage as CommunityPageData } from '@/lib/sanity/queries';

// Critical above-fold components
import { HeaderNav } from '@/components/layout/HeaderNav';
import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';

// Dynamic imports for below-fold components
const Newsletter = dynamic(() => import('@/components/sections/Newsletter').then(mod => ({ default: mod.Newsletter })));
const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })));
const CallToBook = dynamic(() => import('@/components/CallToBook').then(mod => ({ default: mod.CallToBook })));

// Kinship brand constants
const KINSHIP_COLORS = {
  green: '#4A7C59',
  greenDark: '#2C4A3A',
  sage: '#E8EBE4',
  latte: '#F5F1E8',
  white: '#FFFFFF',
  black: '#1A1A1A'
};

const KINSHIP_FONTS = {
  heading: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
  body: '"utopia-std", "Source Serif Pro", Georgia, serif'
};

interface CommunityPageClientProps {
  communityData: CommunityPageData | null;
}

export function CommunityPageClient({ communityData }: CommunityPageClientProps) {
  // Use Sanity data with fallbacks
  const heroTitle = communityData?.heroTitle || 'Community Events';
  const heroSubtitle = communityData?.heroSubtitle || 'Join us for gatherings, workshops, and experiences that bring our community together';
  const [selectedFlyer, setSelectedFlyer] = useState<{ src: string; alt: string } | null>(null);

  const flyers = [
    {
      src: '/images/Community Page/Nov. 24.webp',
      alt: 'Community Event - November 24th',
      title: 'November 24th Event'
    },
    {
      src: '/images/Community Page/Nov. 26.webp',
      alt: 'Community Event - November 26th',
      title: 'November 26th Event',
      eventbriteUrl: 'https://www.eventbrite.com/e/everything-but-the-turkey-from-homa-cafe-bar-registration-1908375365089?aff=oddtdtcreator'
    },
    {
      src: '/images/Community Page/Nov.26 -.webp',
      alt: 'Community Event - November 26th',
      title: 'November 26th Event',
      eventbriteUrl: 'https://www.eventbrite.com/e/everything-but-the-turkey-from-homa-cafe-bar-registration-1908375365089?aff=oddtdtcreator'
    }
  ];

  return (
    <ScrollEffectsWrapper>
      <HeaderNav />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-screen overflow-hidden bg-kinship-sage">
        <div className="absolute inset-0">
          <Image
            src="/images/Community Page/GetOutsideEvent6_26-SamStarrMedia (1).webp"
            alt="Kinship Landing Community Events"
            fill
            className="object-cover"
            priority
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA="
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 min-h-[85vh] md:min-h-screen flex flex-col justify-end sm:justify-center">
          <div className="w-full px-4 sm:px-6 lg:px-8 pb-16 pt-10 sm:py-24 lg:py-0">
            <div className="w-full lg:pl-8">
              <div className="text-center lg:text-left">
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
                  style={{
                    fontFamily: KINSHIP_FONTS.heading,
                    textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 8px'
                  }}
                >
                  {heroTitle}
                </h1>
                <p
                  className="text-white font-light text-lg sm:text-xl md:text-2xl leading-relaxed"
                  style={{
                    fontFamily: KINSHIP_FONTS.body,
                    textShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 4px'
                  }}
                >
                  {heroSubtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className="inline-block px-3 sm:px-4 py-1 text-white text-xs uppercase tracking-wider font-semibold mb-6"
              style={{
                backgroundColor: '#667C58',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              }}
            >
              What's Happening
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: KINSHIP_FONTS.heading,
                color: '#667C58'
              }}
            >
              Upcoming Events
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                color: KINSHIP_COLORS.greenDark,
                opacity: 0.85
              }}
            >
              Join us for gatherings, workshops, and experiences that bring our community together. Click any flyer below to view full details.
            </p>
          </div>
        </div>
      </section>

      {/* Flyers Grid Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Flyers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {flyers.map((flyer, index) => (
              <motion.div
                key={flyer.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="group cursor-pointer"
                onClick={() => setSelectedFlyer({ src: flyer.src, alt: flyer.alt })}
              >
                <div
                  className="relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-white border-2 p-3 sm:p-4"
                  style={{
                    borderColor: '#667C58',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  <div className="relative aspect-[8.5/11] overflow-hidden mb-3">
                    <Image
                      src={flyer.src}
                      alt={flyer.alt}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      quality={75}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={index < 3 ? 'eager' : 'lazy'}
                    />
                  </div>

                  {/* Eventbrite Button */}
                  {flyer.eventbriteUrl && (
                    <div className="mt-3">
                      <a
                        href={flyer.eventbriteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="block w-full py-3 text-center text-white text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:brightness-110"
                        style={{
                          backgroundColor: '#667C58',
                          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                        }}
                      >
                        Reserve a Spot
                      </a>
                    </div>
                  )}

                  {/* Click to view indicator */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all duration-300 pointer-events-none">
                    <div
                      className="px-4 py-2 text-white text-sm font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundColor: '#667C58',
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}
                    >
                      View Full Size
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedFlyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 sm:p-6"
            onClick={() => setSelectedFlyer(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedFlyer(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close flyer view"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[90vh]">
                <Image
                  src={selectedFlyer.src}
                  alt={selectedFlyer.alt}
                  fill
                  className="object-contain"
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
              </div>
            </motion.div>

            {/* Click outside hint */}
            <p className="absolute bottom-4 text-white/70 text-sm">
              Click outside image to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Call to Book */}
      <CallToBook />

      {/* Footer */}
      <Footer />
    </ScrollEffectsWrapper>
  );
}
