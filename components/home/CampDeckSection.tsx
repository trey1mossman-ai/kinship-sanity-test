'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Props interface for Sanity data
interface CampDeckSectionProps {
  sanityData?: {
    name?: string;
    description?: string;
    heroImage?: string;
    gallery?: string[];
    capacity?: { seated?: number; standing?: number };
    features?: string[];
    idealFor?: string[];
  };
}

// Fallback images (used when Sanity data not provided)
const FALLBACK_IMAGES = [
  '/images/Rooms Page:section/Camp Deck/CampDeck-SamStarrMedia (7).webp',
  '/images/Rooms Page:section/Camp Deck/CampDeck-SamStarrMedia (17).webp',
  '/images/Rooms Page:section/Camp Deck/Kinship Landing-67.webp',
];

export function CampDeckSection({ sanityData }: CampDeckSectionProps) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; images: string[]; index: number } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use Sanity data with fallbacks
  const venueName = sanityData?.name || 'Camp Deck';
  const venueDescription = sanityData?.description || 'A truly unique overnight experience our outdoor camping deck offers mountain views, private restroom access, and hammock hooks for the ultimate urban camping adventure. Flat turf camping area perfect for bringing your own tent and sleeping gear while staying in the heart of downtown Colorado Springs.';

  // Use Sanity gallery if available, otherwise fallback
  const galleryImages = (sanityData?.gallery && sanityData.gallery.length > 0)
    ? sanityData.gallery
    : FALLBACK_IMAGES;

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <section id="camp-deck" className="py-8 bg-white scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="group grid md:grid-cols-2 gap-6 md:gap-8 items-center border-2 p-4 sm:p-6 md:p-8 transition-shadow duration-200 hover:shadow-lg bg-white"
          style={{
            borderColor: '#667C58',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          }}
        >
          {/* Venue Info */}
          <div className="space-y-4">
            <div>
              <span
                className="inline-block px-3 sm:px-4 py-1 text-white text-xs uppercase tracking-wider font-semibold"
                style={{
                  backgroundColor: '#667C58',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}
              >
                Camping Experience
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{ fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif', color: '#667C58' }}
            >
              {venueName}
            </h2>

            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed"
              style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58', opacity: 0.9 }}
            >
              {venueDescription}
            </p>

            {/* Features */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <path d="M3 20 L12 4 L21 20 Z"/>
                  <line x1="6" y1="16" x2="18" y2="16"/>
                  <path d="M2 2 L4 6"/>
                  <circle cx="3" cy="2" r="0.5" fill="currentColor"/>
                  <path d="M19 2 L21 6"/>
                  <circle cx="20" cy="2" r="0.5" fill="currentColor"/>
                  <path d="M10 2 L12 6"/>
                  <circle cx="11" cy="2" r="0.5" fill="currentColor"/>
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Outdoor camping deck
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Mountain views
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Private restroom access
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <path d="M4 8 C4 6, 5 4, 7 4 C9 4, 10 6, 10 8"/>
                  <path d="M14 8 C14 6, 15 4, 17 4 C19 4, 20 6, 20 8"/>
                  <path d="M7 8 Q7 12, 12 14 Q17 12, 17 8"/>
                  <circle cx="7" cy="8" r="1" fill="currentColor"/>
                  <circle cx="17" cy="8" r="1" fill="currentColor"/>
                  <path d="M10 14 Q12 15, 14 14"/>
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Hammock hooks included
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://kinshiplanding.tripleseat.com/booking_request/42351"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-95"
              style={{
                backgroundColor: '#849e74',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                transform: 'translateZ(0)'
              }}
            >
              Let's Start Planning
            </a>
          </div>

          {/* Venue Images */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Hero Image - Rotating Carousel */}
            <div
              className="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden cursor-pointer bg-kinship-sage"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              onClick={() => setSelectedImage({
                src: galleryImages[currentImageIndex],
                alt: 'Camp Deck at Kinship Landing',
                images: galleryImages,
                index: currentImageIndex
              })}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{
                    opacity: 1,
                    scale: 1.02,
                    transition: {
                      opacity: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
                      scale: { duration: 5, ease: "linear" }
                    }
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={galleryImages[currentImageIndex]}
                    alt={`Camp Deck at Kinship Landing - Image ${currentImageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                    quality={92}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {galleryImages.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage({
                    src: image,
                    alt: 'Camp Deck',
                    images: galleryImages,
                    index: idx
                  })}
                  className="relative h-[80px] sm:h-[100px] md:h-[120px] overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105 bg-kinship-sage focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                  aria-label={`View full size image ${idx + 1} of Camp Deck`}
                >
                  <Image
                    src={image}
                    alt={`Camp Deck - View ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                    quality={60}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 p-2 text-white hover:text-kinship-green transition-colors z-[101] cursor-pointer"
              aria-label="Close image viewer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-[101] pointer-events-none">
              <div className="px-3 py-2 bg-white/95 backdrop-blur-sm rounded-md">
                <p className="text-sm font-semibold" style={{ color: '#667C58', fontFamily: '"europa", "Hind", system-ui, sans-serif' }}>
                  {selectedImage.index + 1} / {selectedImage.images.length}
                </p>
              </div>
            </div>

            {/* Previous button */}
            {selectedImage.index > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage({
                    ...selectedImage,
                    index: selectedImage.index - 1,
                    src: selectedImage.images[selectedImage.index - 1]
                  });
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-200 z-[101] shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" style={{ color: '#667C58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next button */}
            {selectedImage.index < selectedImage.images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage({
                    ...selectedImage,
                    index: selectedImage.index + 1,
                    src: selectedImage.images[selectedImage.index + 1]
                  });
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-200 z-[101] shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label="Next image"
              >
                <svg className="w-6 h-6" style={{ color: '#667C58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image container - OPTIMIZED: High quality for lightbox */}
            <motion.div
              key={selectedImage.index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                quality={75}
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
