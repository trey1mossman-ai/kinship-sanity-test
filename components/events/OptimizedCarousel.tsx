'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

/**
 * KINSHIP LANDING - OPTIMIZED EVENT CAROUSEL
 *
 * Performance optimizations:
 * - CSS transitions instead of Framer Motion (lighter bundle)
 * - Skeleton loading states (no white flashing)
 * - Delayed auto-advance (after images load)
 * - Intersection Observer (only animate when visible)
 * - Staggered image loading (main first, thumbnails after)
 */

interface OptimizedCarouselProps {
  images: string[];
  alt: string;
  onImageClick: (index: number) => void;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  gridCols?: 3 | 4 | 5;
}

export function OptimizedCarousel({
  images,
  alt,
  onImageClick,
  autoAdvance = true,
  autoAdvanceDelay = 5000,
  gridCols = 3,
}: OptimizedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);
  const [loadedThumbnails, setLoadedThumbnails] = useState<Set<number>>(new Set());
  const [isInView, setIsInView] = useState(false);
  const [canAutoAdvance, setCanAutoAdvance] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer - only animate when in viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Enable auto-advance only after main image loads
  useEffect(() => {
    if (isMainImageLoaded && isInView) {
      // Small delay to ensure smooth initial render
      const timer = setTimeout(() => {
        setCanAutoAdvance(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isMainImageLoaded, isInView]);

  // Auto-advance carousel (only when visible and loaded)
  useEffect(() => {
    if (!autoAdvance || !canAutoAdvance || !isInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoAdvanceDelay);

    return () => clearInterval(interval);
  }, [autoAdvance, canAutoAdvance, isInView, images.length, autoAdvanceDelay]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleMainImageLoad = useCallback(() => {
    setIsMainImageLoaded(true);
  }, []);

  const handleThumbnailLoad = useCallback((index: number) => {
    setLoadedThumbnails((prev) => new Set(prev).add(index));
  }, []);

  const gridColsClass = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }[gridCols];

  return (
    <div ref={containerRef} className="space-y-3 sm:space-y-4">
      {/* Main Carousel Image */}
      <div
        className="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden cursor-pointer"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          backgroundColor: 'rgba(102, 124, 88, 0.1)'
        }}
        onClick={() => onImageClick(currentIndex)}
      >
        {/* Skeleton loader - shows until image loads */}
        {!isMainImageLoaded && (
          <div className="absolute inset-0 bg-kinship-sage/10">
            <div className="shimmer" />
          </div>
        )}

        {/* Main image */}
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-300 ${
            isMainImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
          quality={75}
          fetchPriority="high"
          onLoad={handleMainImageLoad}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Thumbnail Grid */}
      <div className={`grid ${gridColsClass} gap-2 sm:gap-3`}>
        {images.map((image, idx) => {
          const isLoaded = loadedThumbnails.has(idx);
          const isFirst6 = idx < 6; // Load first 6 eagerly

          return (
            <button
              key={idx}
              onClick={() => {
                handleThumbnailClick(idx);
                onImageClick(idx);
              }}
              className="relative h-[60px] sm:h-[70px] md:h-[80px] overflow-hidden cursor-pointer thumbnail-hover focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                backgroundColor: 'rgba(102, 124, 88, 0.08)'
              }}
              aria-label={`View ${alt} image ${idx + 1}`}
            >
              {/* Skeleton - shows until thumbnail loads */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-kinship-sage/8">
                  {idx < 3 && <div className="shimmer" />}
                </div>
              )}

              {/* Thumbnail image */}
              <Image
                src={image}
                alt={`${alt} - View ${idx + 1}`}
                fill
                sizes={`(max-width: 640px) ${100 / gridCols}vw, ${50 / gridCols}vw`}
                className={`object-cover transition-opacity duration-300 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading={isFirst6 ? "eager" : "lazy"}
                quality={65}
                fetchPriority={isFirst6 ? "high" : "auto"}
                onLoad={() => handleThumbnailLoad(idx)}
              />

              {/* Active indicator */}
              {idx === currentIndex && (
                <div
                  className="absolute inset-0 border-2"
                  style={{ borderColor: '#667C58' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
