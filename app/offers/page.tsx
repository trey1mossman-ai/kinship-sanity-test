'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Critical above-fold components
import { HeaderNav } from '@/components/layout/HeaderNav';
import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';

// Dynamic imports for below-fold components
const Newsletter = dynamic(() => import('@/components/sections/Newsletter').then(mod => ({ default: mod.Newsletter })));
const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })));
const CallToBook = dynamic(() => import('@/components/CallToBook').then(mod => ({ default: mod.CallToBook })));

// Kinship brand constants
const KINSHIP_COLORS = {
  green: '#849e74',
  greenDark: '#667C58',
  sage: '#EEF0EB',
  latte: '#efe7dd',
  white: '#FFFFFF',
  text: '#080806'
};

const KINSHIP_FONTS = {
  heading: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
  body: '"europa", "Hind", system-ui, sans-serif'
};

export default function OffersPage() {
  const [selectedOffer, setSelectedOffer] = useState<{ src: string; alt: string } | null>(null);

  const offers = [
    {
      src: '/images/Offers/NYE Promo (1080 x 566 px).webp',
      alt: 'New Year\'s Eve Special Offer',
      title: 'Ring in the New Year',
      bookingUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E'
    },
    {
      src: '/images/Offers/Take the Elevator Home (1080 x 1080 px) (1).webp',
      alt: 'Take the Elevator Home - Special Accommodation Offer',
      title: 'Take the Elevator Home',
      bookingUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E'
    }
  ];

  return (
    <ScrollEffectsWrapper>
      <HeaderNav />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-screen overflow-hidden bg-kinship-sage">
        <div className="absolute inset-0">
          <Image
            src="/images/Offers/aligarciaphotography-72.webp"
            alt="Kinship Landing Special Offers"
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
                  Special Offers
                </h1>
                <p
                  className="text-white font-light text-lg sm:text-xl md:text-2xl leading-relaxed"
                  style={{
                    fontFamily: KINSHIP_FONTS.body,
                    textShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 4px'
                  }}
                >
                  Discover exclusive deals and packages for your Colorado Springs adventure
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
              Save on Your Stay
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: KINSHIP_FONTS.heading,
                color: '#667C58'
              }}
            >
              Current Promotions
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                color: KINSHIP_COLORS.greenDark,
                opacity: 0.85
              }}
            >
              Take advantage of our limited-time offers and experience outrageous hospitality at special rates. Click any offer to view full details.
            </p>
          </div>
        </div>
      </section>

      {/* Offers Grid Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Offers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="group cursor-pointer"
                onClick={() => setSelectedOffer({ src: offer.src, alt: offer.alt })}
              >
                <div
                  className="relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-white border-2 p-3 sm:p-4"
                  style={{
                    borderColor: '#667C58',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  <div className="relative aspect-square overflow-hidden mb-3">
                    <Image
                      src={offer.src}
                      alt={offer.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      quality={75}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={index < 3 ? 'eager' : 'lazy'}
                    />
                  </div>

                  {/* Book Now Button */}
                  <div className="mt-3">
                    <a
                      href={offer.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="block w-full py-3 text-center text-white text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:brightness-110"
                      style={{
                        backgroundColor: '#667C58',
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                      }}
                    >
                      Book Now
                    </a>
                  </div>

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
        {selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 sm:p-6"
            onClick={() => setSelectedOffer(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedOffer(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close offer view"
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
                  src={selectedOffer.src}
                  alt={selectedOffer.alt}
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
