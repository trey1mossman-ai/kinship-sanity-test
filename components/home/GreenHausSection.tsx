'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Props interface for Sanity data
interface GreenHausSectionProps {
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
  '/images/events-page/GreenHaus/Greenhaus-SamStarrMedia (1).webp',
  '/images/events-page/GreenHaus/Greenhaus5-SamStarr.webp',
  '/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge (4).webp',
  '/images/events-page/GreenHaus/Greenhaus-GregCeo.webp',
  '/images/events-page/GreenHaus/aligarciaphotography-2.webp',
];

export function GreenHausSection({ sanityData }: GreenHausSectionProps) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; images: string[]; index: number } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use Sanity data with fallbacks
  const venueName = sanityData?.name || 'GreenHaus';
  const venueDescription = sanityData?.description || 'A truly one-of-a-kind venue in Colorado Springs a greenhouse flooded with light in the heart of downtown. A beautiful backdrop for events, weddings, retreats, and gatherings.';
  const venueCapacity = sanityData?.capacity?.standing || 80;

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
    <section id="greenhaus" className="py-8 bg-white scroll-mt-20">
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
                Event Venue
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
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Up to {venueCapacity} Guests
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <path d="M4 12 L12 4 L20 12 L20 20 L4 20 L4 12 Z"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <line x1="12" y1="4" x2="12" y2="12"/>
                  <path d="M8 16 C8 14 9 13 10 13 C11 13 12 14 12 16"/>
                  <path d="M12 16 C12 14 13 13 14 13 C15 13 16 14 16 16"/>
                  <line x1="10" y1="16" x2="10" y2="20"/>
                  <line x1="14" y1="16" x2="14" y2="20"/>
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Light-filled greenhouse atmosphere
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <path d="M12 20 C12 18, 10 16, 10 14"/>
                  <path d="M14 20 C14 18, 16 16, 16 14"/>
                  <circle cx="12" cy="10" r="6"/>
                  <path d="M9 9 L15 9"/>
                  <path d="M9 9 C9 7, 10 6, 12 6 C14 6, 15 7, 15 9"/>
                  <circle cx="12" cy="13" r="1.5" fill="currentColor"/>
                  <circle cx="12" cy="13" r="0.8"/>
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Events, weddings, retreats, gatherings
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
                alt: 'Green Haus at Kinship Landing',
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
                    alt={`Green Haus at Kinship Landing - Image ${currentImageIndex + 1}`}
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

            {/* Thumbnail Gallery - 1 row of 5 */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {galleryImages.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage({
                    src: image,
                    alt: 'Green Haus',
                    images: galleryImages,
                    index: idx
                  })}
                  className="relative h-[60px] sm:h-[70px] md:h-[80px] overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105 bg-kinship-sage focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                  aria-label={`View full size image ${idx + 1} of Green Haus`}
                >
                  <Image
                    src={image}
                    alt={`Green Haus - View ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
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

