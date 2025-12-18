'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import type { PortableTextBlock } from '@portabletext/types';

// Props interface for Sanity data
interface YardSectionProps {
  sanityData?: {
    name?: string;
    description?: string | PortableTextBlock[];
    heroImage?: string;
    gallery?: string[];
    capacity?: { seated?: number; standing?: number };
    features?: string[];
    idealFor?: string[];
  };
}

// Fallback images (used when Sanity data not provided)
const FALLBACK_IMAGES = [
  '/images/events-page/The Yard/IMG_1494.webp',
  '/images/events-page/The Yard/DSC_6966.webp',
  '/images/events-page/The Yard/D85A8970.webp',
  '/images/events-page/The Yard/IMG_1487 (1).webp',
  '/images/events-page/The Yard/Yard, AshleeKayPhotography.webp',
  '/images/events-page/The Yard/Yard2, SamStarr.webp',
  '/images/events-page/The Yard/Yard3, SamStarr.webp',
  '/images/events-page/The Yard/Yard7, SamStarr.webp',
  '/images/events-page/The Yard/D85A8921.webp',
  '/images/events-page/The Yard/4DE0F411-7D69-45F5-90C2-98BF3C106C00_1_201_a.webp',
];

export function YardSection({ sanityData }: YardSectionProps) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; images: string[]; index: number } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use Sanity data with fallbacks
  const venueName = sanityData?.name || 'The Yard';
  const venueDescription = sanityData?.description;
  const venueDescriptionFallback = 'Our expansive outdoor event space wraps around the hotel, offering flexible areas for ceremonies, receptions, and private gatherings under the Colorado sky.';
  const venueCapacity = sanityData?.capacity?.standing || 200;

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
    <section id="the-yard" className="py-8 bg-white scroll-mt-20">
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
                Outdoor Venue
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{ fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif', color: '#667C58' }}
            >
              {venueName}
            </h2>

            <div
              className="text-sm sm:text-base md:text-lg leading-relaxed"
              style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58', opacity: 0.9 }}
            >
              {Array.isArray(venueDescription) ? (
                <RichTextRenderer value={venueDescription} />
              ) : (
                <p>{venueDescription || venueDescriptionFallback}</p>
              )}
            </div>

            {/* Features */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Capacity: Up to 100 guests
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <rect x="3" y="10" width="5" height="8" rx="1"/>
                  <rect x="16" y="10" width="5" height="8" rx="1"/>
                  <rect x="9" y="13" width="6" height="5" rx="1"/>
                  <path d="M2 6 C4 4, 8 3, 12 3 C16 3, 20 4, 22 6"/>
                  <circle cx="5" cy="5" r="0.8" fill="currentColor"/>
                  <circle cx="9" cy="4.5" r="0.8" fill="currentColor"/>
                  <circle cx="12" cy="4" r="0.8" fill="currentColor"/>
                  <circle cx="15" cy="4.5" r="0.8" fill="currentColor"/>
                  <circle cx="19" cy="5" r="0.8" fill="currentColor"/>
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  String lights & mountain views
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Fire pits & yard games
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
                alt: 'The Yard at Kinship Landing',
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
                    alt={`The Yard at Kinship Landing - Image ${currentImageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="eager"
                    priority={currentImageIndex === 0}
                    quality={92}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Thumbnail Gallery - 10 images in 5x5 grid (2 rows of 5) */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {galleryImages.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage({
                    src: image,
                    alt: 'The Yard',
                    images: galleryImages,
                    index: idx
                  })}
                  className="relative h-[60px] sm:h-[70px] md:h-[80px] overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105 bg-kinship-sage focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                  aria-label={`View full size image ${idx + 1} of The Yard`}
                >
                  <Image
                    src={image}
                    alt={`The Yard - View ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 20vw, (max-width: 768px) 12vw, 8vw"
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

            {/* Image container */}
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
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
