'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ConferenceRoomSection() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; images: string[]; index: number } | null>(null);

  const conferenceImages = [
    '/images/events-page/The Conference room /conference-room-new.webp',
    '/images/events-page/The Conference room /conference-room-mobile.webp',
  ];

  return (
    <>
    <section id="conference-room" className="py-8 bg-white scroll-mt-20">
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
                Meeting Space
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{ fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif', color: '#667C58' }}
            >
              Conference Room
            </h2>

            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed"
              style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58', opacity: 0.9 }}
            >
              For small meetings, private events, and professional gatherings without the stuffy vibe.
              Tucked on our first floor with Kinship's modern, cozy style: a large table and chairs,
              flatscreen with easy hookups, and catering options from Homa.
            </p>

            {/* Features */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <rect x="3" y="3" width="18" height="14" rx="1"/>
                  <line x1="3" y1="17" x2="21" y2="17"/>
                  <line x1="10" y1="17" x2="10" y2="21"/>
                  <line x1="14" y1="17" x2="14" y2="21"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <path d="M7 8 L10 11 L17 7"/>
                  <circle cx="7" cy="12" r="0.8" fill="currentColor"/>
                  <circle cx="12" cy="12" r="0.8" fill="currentColor"/>
                  <circle cx="17" cy="12" r="0.8" fill="currentColor"/>
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Capacity: 12-15 guests
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Flatscreen with easy hookups
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#849e74' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs sm:text-sm md:text-base" style={{ fontFamily: '"europa", "Hind", system-ui, sans-serif', color: '#667C58' }}>
                  Catering available from Homa
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="https://portal.tripleseat.com/direct_bookings/rkya23vv6y2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-95"
              style={{
                backgroundColor: '#849e74',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                transform: 'translateZ(0)'
              }}
            >
              Reserve the Room
            </Link>
          </div>

          {/* Venue Images */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div
              className="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden bg-kinship-sage cursor-pointer"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              onClick={() => setSelectedImage({
                src: conferenceImages[0],
                alt: 'Conference Room at Kinship Landing',
                images: conferenceImages,
                index: 0
              })}
            >
              <Image
                src={conferenceImages[0]}
                alt="Kinship Landing conference room"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={92}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Clickable Thumbnail Gallery */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {conferenceImages.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage({
                    src: image,
                    alt: 'Conference Room at Kinship Landing',
                    images: conferenceImages,
                    index: idx
                  })}
                  className="relative h-[60px] sm:h-[70px] md:h-[80px] overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105 bg-kinship-sage focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                  aria-label={`View full size conference room image ${idx + 1}`}
                >
                  <Image
                    src={image}
                    alt={`Conference Room - View ${idx + 1}`}
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
