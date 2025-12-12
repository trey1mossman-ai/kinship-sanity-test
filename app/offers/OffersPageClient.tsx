'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { OffersPage } from '@/lib/sanity/queries';

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

// Fallback offers data (used when Sanity data is not available)
const fallbackOffers = [
  {
    _key: 'nye-offer',
    title: 'Ring in the New Year',
    description: 'Celebrate the New Year in style at Kinship Landing. Book your stay and enjoy a memorable celebration in downtown Colorado Springs.',
    imageUrl: '/images/Offers/NYE Promo (1080 x 566 px).webp',
    alt: 'New Year\'s Eve Special Offer',
    bookingUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E'
  },
  {
    _key: 'elevator-offer',
    title: 'Take the Elevator Home',
    description: 'Enjoy dinner and drinks at HOMA, then take the elevator up to your room. No designated driver needed when you stay with us.',
    imageUrl: '/images/Offers/Take the Elevator Home (1080 x 1080 px) (1).webp',
    alt: 'Take the Elevator Home - Special Accommodation Offer',
    bookingUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E'
  }
];

interface OffersPageClientProps {
  data: OffersPage | null;
}

export default function OffersPageClient({ data }: OffersPageClientProps) {
  const [selectedOffer, setSelectedOffer] = useState<{ src: string; alt: string } | null>(null);

  // Use Sanity data with fallbacks
  const heroTitle = data?.heroTitle || 'Special Offers';
  const heroSubtitle = data?.heroSubtitle || 'Discover exclusive deals and packages for your Colorado Springs adventure';
  const heroImageUrl = data?.heroImageUrl || '/images/Offers/aligarciaphotography-72.webp';
  const introTitle = data?.introTitle || 'Current Promotions';
  const introText = data?.introText || 'Take advantage of our limited-time offers and experience outrageous hospitality at special rates. Click any offer to view full details.';
  const introBadge = data?.introBadge || 'Save on Your Stay';

  // Use Sanity offers or fallback - only use Sanity data if offers have images
  const sanityOffersHaveImages = data?.offers?.some(offer => offer.imageUrl);
  const offers = (data?.offers && data.offers.length > 0 && sanityOffersHaveImages) ? data.offers : fallbackOffers;

  return (
    <ScrollEffectsWrapper>
      <HeaderNav />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-screen overflow-hidden bg-kinship-sage">
        <div className="absolute inset-0">
          <Image
            src={heroImageUrl}
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
              {introBadge}
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: KINSHIP_FONTS.heading,
                color: '#667C58'
              }}
            >
              {introTitle}
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                color: KINSHIP_COLORS.greenDark,
                opacity: 0.85
              }}
            >
              {introText}
            </p>
          </div>
        </div>
      </section>

      {/* Offers Stacked Cards Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stacked Offers */}
          <div className="space-y-8 md:space-y-12">
            {offers.map((offer, index) => (
              <motion.div
                key={offer._key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="group grid md:grid-cols-2 gap-6 md:gap-8 items-center border-2 p-4 sm:p-6 md:p-8 transition-shadow duration-200 hover:shadow-lg bg-white"
                style={{
                  borderColor: '#667C58',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}
              >
                {/* Offer Info - Left Side */}
                <div className="space-y-4 order-2 md:order-1">
                  <div>
                    <h2
                      className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3"
                      style={{
                        fontFamily: KINSHIP_FONTS.heading,
                        color: '#667C58'
                      }}
                    >
                      {offer.title}
                    </h2>
                    {offer.description && (
                      <p
                        className="text-kinship-text/80 text-base sm:text-lg leading-relaxed"
                        style={{ fontFamily: KINSHIP_FONTS.body }}
                      >
                        {offer.description}
                      </p>
                    )}
                  </div>

                  <a
                    href={offer.bookingUrl || 'https://hotels.cloudbeds.com/reservation/4nfQ6E'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0"
                    style={{
                      backgroundColor: '#849e74',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    }}
                  >
                    Book This Offer
                  </a>
                </div>

                {/* Offer Image - Right Side */}
                <div className="order-1 md:order-2">
                  <button
                    onClick={() => setSelectedOffer({ src: offer.imageUrl || '', alt: offer.alt || offer.title })}
                    className="relative w-full h-[280px] sm:h-[320px] md:h-[380px] overflow-hidden cursor-pointer bg-kinship-sage focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                    aria-label={`View full size ${offer.title} image`}
                  >
                    <Image
                      src={offer.imageUrl || '/images/placeholder.webp'}
                      alt={offer.alt || offer.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading={index < 2 ? 'eager' : 'lazy'}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                    {/* Zoom icon overlay on hover */}
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
                  </button>
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
