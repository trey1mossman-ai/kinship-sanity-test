'use client';

import { useState, useCallback, memo } from 'react';
import Image from 'next/image';

/**
 * KINSHIP LANDING - FAST CAROUSEL
 *
 * Matches Rooms Page Performance:
 * - Next.js Image component (automatic optimization)
 * - Priority loading for first hero
 * - Eager loading for first 6 thumbnails
 * - Maximum quality (85 for hero, 75 for thumbs)
 * - Instant switching via currentIndex
 * - Minimal state (one useState)
 */

interface FastCarouselProps {
  images: string[];
  alt: string;
  onImageClick: (index: number) => void;
  gridCols?: 3 | 4 | 5;
  priority?: boolean; // For above-fold carousels
}

export const FastCarousel = memo(function FastCarousel({
  images,
  alt,
  onImageClick,
  gridCols = 3,
  priority = false,
}: FastCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentIndex(index);
    onImageClick(index);
  }, [onImageClick]);

  const gridColsClass = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }[gridCols];

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* HERO IMAGE - Next.js optimized, priority loading */}
      <button
        onClick={() => onImageClick(currentIndex)}
        className="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden cursor-pointer bg-kinship-sage/5 w-full focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
        aria-label={`View full size ${alt} image ${currentIndex + 1}`}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={priority}
          quality={75}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </button>

      {/* THUMBNAILS GRID - Next.js optimized, eager loading for first 6 */}
      <div className={`grid ${gridColsClass} gap-2 sm:gap-3`}>
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => handleThumbnailClick(idx)}
            className="relative h-[60px] sm:h-[70px] md:h-[80px] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-150 focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2 bg-kinship-sage/5"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            }}
            aria-label={`View ${alt} image ${idx + 1}`}
          >
            <Image
              src={image}
              alt={`${alt} - View ${idx + 1}`}
              fill
              sizes={`(max-width: 640px) ${100 / gridCols}vw, ${50 / gridCols}vw`}
              className="object-cover"
              loading={idx < 6 ? "eager" : "lazy"}
              quality={75}
            />

            {/* Active indicator */}
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
});
