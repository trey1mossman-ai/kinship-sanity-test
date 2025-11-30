'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FireplaceSection() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; images: string[]; index: number } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fireplaceImages = [
    '/images/events-page/The Fireplace/aligarciaphotography-36.webp',
    '/images/events-page/The Fireplace/aligarciaphotography-37 (1).webp',
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % fireplaceImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [fireplaceImages.length]);

  return (
    <>
    <section id="the-fireplace" className="py-8 bg-white scroll-mt-20">
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
                Indoor Venue
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{ fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif', color: '#667C58' }}
            >
              Café Fireplace
            </h2>

            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed"
              style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58', opacity: 0.9 }}
            >
              A cozy, semi-private space with mixed seating for up to 20 guests. Perfect for intimate gatherings, small meetings, or casual celebrations. Order from Homa Café or book full catering to make your event complete.
            </p>

            {/* Features */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Capacity: Up to 20 guests
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <rect x="6" y="18" width="12" height="4" rx="0.5"/>
                  <path d="M6 18 L6 10 L9 6 L12 10 L15 6 L18 10 L18 18"/>
                  <path d="M12 13 C12 11, 10 9, 10 7 C10 9, 8 11, 8 13"/>
                  <path d="M16 13 C16 11, 14 9, 14 7 C14 9, 12 11, 12 13"/>
                  <line x1="4" y1="22" x2="20" y2="22"/>
                  <line x1="5" y1="18" x2="19" y2="18"/>
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Semi-private space
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <path d="M8 20 L8 10 C8 8, 9 7, 10 7 L14 7 C15 7, 16 8, 16 10 L16 20"/>
                  <line x1="6" y1="20" x2="18" y2="20"/>
                  <circle cx="12" cy="20" r="0.8" fill="currentColor"/>
                  <path d="M10 4 C10 3, 10.5 2, 11 2 C11.3 2, 11.6 2.3, 11.8 3"/>
                  <path d="M12 3 C12 2, 12.5 1, 13 1 C13.5 1, 14 2, 14 3"/>
                  <path d="M14 4 C14 3, 14.5 2, 15 2 C15.5 2, 16 3, 16 4"/>
                  <rect x="10" y="12" width="4" height="3" rx="0.5"/>
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Order from Homa or book full catering
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="https://portal.tripleseat.com/direct_bookings/mfdrdz7es8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-95"
              style={{
                backgroundColor: '#849e74',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                transform: 'translateZ(0)'
              }}
            >
              Book Now
            </Link>
          </div>

          {/* Venue Images */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Carousel Image */}
            <div
              className="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden bg-kinship-sage cursor-pointer"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              onClick={() => setSelectedImage({
                src: fireplaceImages[currentImageIndex],
                alt: 'Café Fireplace at Kinship Landing',
                images: fireplaceImages,
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
                    src={fireplaceImages[currentImageIndex]}
                    alt="Café Fireplace at Kinship Landing"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    quality={92}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Clickable Thumbnail Gallery */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {fireplaceImages.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentImageIndex(idx);
                    setSelectedImage({
                      src: image,
                      alt: 'Café Fireplace at Kinship Landing',
                      images: fireplaceImages,
                      index: idx
                    });
                  }}
                  className="relative h-[60px] sm:h-[70px] md:h-[80px] overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105 bg-kinship-sage focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                  aria-label={`View full size café fireplace image ${idx + 1}`}
                >
                  <Image
                    src={image}
                    alt={`Café Fireplace - View ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
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
    </section>

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

          {/* Kinship Branded Label */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 pointer-events-none">
            <div
              className="inline-flex flex-col gap-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/95 backdrop-blur-sm shadow-xl"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            >
              <p
                className="text-xs uppercase tracking-wider font-semibold"
                style={{ color: '#849e74', fontFamily: '"europa", "Hind", system-ui, sans-serif' }}
              >
                Kinship Landing
              </p>
              <p
                className="text-xs sm:text-sm font-medium"
                style={{ color: '#667C58', fontFamily: '"europa", "Hind", system-ui, sans-serif' }}
              >
                {selectedImage.alt}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
