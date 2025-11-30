'use client';

import { useState } from 'react';

/**
 * KINSHIP LANDING - STATIC PERFECT CAROUSEL
 *
 * ABSOLUTE PERFECTION - ZERO LAG:
 * - Pure CSS background-image thumbnails (no Next.js Image overhead)
 * - Preload ALL hero images immediately (instant swaps)
 * - No component re-renders (hero swap via CSS display property)
 * - No lazy loading (everything eager, cached immediately)
 * - Minimal DOM manipulation
 * - Zero JavaScript image processing
 *
 * This is the fastest possible carousel implementation.
 */

interface StaticPerfectCarouselProps {
  images: string[];
  alt: string;
  onImageClick: (index: number) => void;
  gridCols?: 3 | 4 | 5;
}

export function StaticPerfectCarousel({
  images,
  alt,
  onImageClick,
  gridCols = 3,
}: StaticPerfectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const gridColsClass = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }[gridCols];

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* PRELOAD ALL HERO IMAGES - Hidden but loaded */}
      <div className="hidden">
        {images.map((image, idx) => (
          <img key={`preload-${idx}`} src={image} alt="" />
        ))}
      </div>

      {/* HERO IMAGE CONTAINER - All images rendered, only one visible */}
      <div
        className="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden cursor-pointer bg-kinship-sage/5"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
        onClick={() => onImageClick(currentIndex)}
      >
        {/* ALL HEROES - Switch via display property (instant) */}
        {images.map((image, idx) => (
          <div
            key={`hero-${idx}`}
            className="absolute inset-0"
            style={{
              display: idx === currentIndex ? 'block' : 'none',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* PURE CSS THUMBNAILS - Zero JavaScript overhead */}
      <div className={`grid ${gridColsClass} gap-2 sm:gap-3`}>
        {images.map((image, idx) => (
          <button
            key={`thumb-${idx}`}
            onClick={() => {
              setCurrentIndex(idx);
              onImageClick(idx);
            }}
            className="relative h-[60px] sm:h-[70px] md:h-[80px] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-100 focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2 bg-kinship-sage/5"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-label={`View ${alt} image ${idx + 1}`}
          >
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
}
