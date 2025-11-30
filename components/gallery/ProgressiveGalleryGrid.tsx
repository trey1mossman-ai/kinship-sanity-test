'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * KINSHIP LANDING - PROGRESSIVE GALLERY GRID
 *
 * Performance optimizations:
 * - Loads only 12 images initially (above-fold)
 * - Intersection Observer for infinite scroll
 * - Preloads next batch 500px before reaching bottom
 * - Thumbnail quality (65) for grid
 * - Proper lazy loading for off-screen images
 *
 * Expected performance:
 * - Initial load: ~2-3s instead of ~15s
 * - 75% reduction in initial page weight
 * - Smooth infinite scroll experience
 */

type GalleryFilter = 'all' | 'rooms' | 'venues' | 'homa' | 'weddings';

type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryFilter[];
};

interface ProgressiveGalleryGridProps {
  images: GalleryImage[];
  activeFilter: GalleryFilter;
  onImageClick: (index: number) => void;
}

const IMAGES_PER_PAGE = 12; // Load 12 at a time (3x4 grid on desktop)
const PRELOAD_THRESHOLD = 500; // Preload 500px before reaching bottom

export function ProgressiveGalleryGrid({
  images,
  activeFilter,
  onImageClick,
}: ProgressiveGalleryGridProps) {
  const [displayedCount, setDisplayedCount] = useState(IMAGES_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Filter images based on active filter
  const filteredImages = images.filter((image) =>
    activeFilter === 'all' ? true : image.category.includes(activeFilter)
  );

  const displayedImages = filteredImages.slice(0, displayedCount);
  const hasMore = displayedCount < filteredImages.length;

  // Load more images
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // Simulate slight delay for smooth UX (images still load instantly)
    setTimeout(() => {
      setDisplayedCount((prev) => Math.min(prev + IMAGES_PER_PAGE, filteredImages.length));
      setIsLoading(false);
    }, 100);
  }, [isLoading, hasMore, filteredImages.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const trigger = loadMoreTriggerRef.current;
    if (!trigger || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: `${PRELOAD_THRESHOLD}px`, // Trigger 500px before reaching bottom
      }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
    };
  }, [loadMore, hasMore]);

  // Reset displayed count when filter changes
  useEffect(() => {
    setDisplayedCount(IMAGES_PER_PAGE);
  }, [activeFilter]);

  return (
    <div className="space-y-8">
      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {displayedImages.map((image, index) => (
            <motion.div
              key={image.src}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative h-[300px] overflow-hidden cursor-pointer group"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              onClick={() => {
                // Find the actual index in the filtered array
                const actualIndex = images.findIndex((img) => img.src === image.src);
                onImageClick(actualIndex);
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                quality={65} // Thumbnail quality
                loading={index < 8 ? 'eager' : 'lazy'} // First 8 eager, rest lazy
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-semibold">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More Trigger (invisible, for intersection observer) */}
      {hasMore && (
        <div ref={loadMoreTriggerRef} className="h-20 flex items-center justify-center">
          {isLoading && (
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 border-3 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: '#667C58', borderTopColor: 'transparent' }}
              />
              <p
                className="text-base"
                style={{
                  fontFamily: '"europa", "Hind", system-ui, sans-serif',
                  color: '#667C58',
                }}
              >
                Loading more images...
              </p>
            </div>
          )}
        </div>
      )}

      {/* No Results State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p
            className="text-xl"
            style={{
              fontFamily: '"europa", "Hind", system-ui, sans-serif',
              color: '#667C58',
            }}
          >
            No images found for this category.
          </p>
        </div>
      )}

      {/* Results Counter */}
      {filteredImages.length > 0 && (
        <div className="text-center pt-4">
          <p
            className="text-sm opacity-70"
            style={{
              fontFamily: '"europa", "Hind", system-ui, sans-serif',
              color: '#667C58',
            }}
          >
            Showing {displayedCount} of {filteredImages.length} images
          </p>
        </div>
      )}
    </div>
  );
}
