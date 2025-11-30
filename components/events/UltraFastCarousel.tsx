'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

/**
 * KINSHIP LANDING - ULTRA-FAST MANUAL CAROUSEL
 *
 * ZERO LAG optimizations:
 * - NO skeleton loaders (instant display)
 * - NO opacity transitions (no repaints)
 * - NO loading state tracking (minimal re-renders)
 * - NO intersection observers (zero overhead)
 * - Minimal JavaScript (just click handlers)
 * - Priority loading for first image
 * - Lower quality thumbnails (40) for instant load
 * - Pure CSS for everything visual
 */

interface UltraFastCarouselProps {
  images: string[];
  alt: string;
  onImageClick: (index: number) => void;
  gridCols?: 3 | 4 | 5;
}

export function UltraFastCarousel({
  images,
  alt,
  onImageClick,
  gridCols = 3,
}: UltraFastCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const gridColsClass = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }[gridCols];

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Hero Image - ZERO LAG */}
      <div
        className="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden cursor-pointer bg-kinship-sage/5"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
        onClick={() => onImageClick(currentIndex)}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={currentIndex === 0}
          quality={75}
          unoptimized={false}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Thumbnail Grid - INSTANT LOAD */}
      <div className={`grid ${gridColsClass} gap-2 sm:gap-3`}>
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => {
              handleThumbnailClick(idx);
              onImageClick(idx);
            }}
            className="relative h-[60px] sm:h-[70px] md:h-[80px] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-150 focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2 bg-kinship-sage/5"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            }}
            aria-label={`View ${alt} image ${idx + 1}`}
          >
            {/* Thumbnail - LOW quality for instant load */}
            <Image
              src={image}
              alt={`${alt} - View ${idx + 1}`}
              fill
              sizes={`(max-width: 640px) ${100 / gridCols}vw, ${50 / gridCols}vw`}
              className="object-cover"
              loading={idx < 9 ? "eager" : "lazy"}
              quality={40}
            />

            {/* Active indicator - Pure CSS */}
            {idx === currentIndex && (
              <div
                className="absolute inset-0 border-2 pointer-events-none"
                style={{ borderColor: '#667C58' }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
