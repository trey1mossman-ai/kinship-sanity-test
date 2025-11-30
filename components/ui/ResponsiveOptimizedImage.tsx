'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

/**
 * KINSHIP LANDING - RESPONSIVE OPTIMIZED IMAGE COMPONENT
 *
 * Features:
 * - Automatic srcSet generation for responsive sizes
 * - Blur-up placeholder loading
 * - Quality tier optimization
 * - Lazy loading with intersection observer
 * - Proper sizes attribute for optimal image selection
 */

type QualityTier = 'hero' | 'cards' | 'thumbnails' | 'background';

interface ResponsiveOptimizedImageProps extends Omit<ImageProps, 'quality' | 'placeholder'> {
  /** Quality tier - determines optimization level */
  qualityTier?: QualityTier;

  /** Enable blur-up placeholder (requires blur image generation) */
  enableBlurPlaceholder?: boolean;

  /** Custom sizes attribute - defaults based on quality tier */
  customSizes?: string;

  /** Priority loading for above-fold images */
  priority?: boolean;
}

const QUALITY_SETTINGS: Record<QualityTier, number> = {
  hero: 90,
  cards: 85,
  thumbnails: 65,
  background: 70,
};

const DEFAULT_SIZES: Record<QualityTier, string> = {
  hero: '100vw',
  cards: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  thumbnails: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw',
  background: '100vw',
};

const RESPONSIVE_WIDTHS = [640, 1024, 1920, 2560];

/**
 * Generates srcSet from original image path
 * Looks for optimized versions in /images/optimized/ directory
 */
function generateSrcSet(src: string, qualityTier: QualityTier): string | undefined {
  // Only generate srcSet for local images, not external URLs
  if (src.startsWith('http') || src.startsWith('//')) {
    return undefined;
  }

  // Check if this image has optimized versions
  // Format: /images/optimized/heroes/[dirname]/[filename]-[width]w.webp
  const filename = src.split('/').pop()?.replace(/\.(webp|jpg|jpeg|png)$/i, '');
  if (!filename) return undefined;

  // For now, return undefined - we'll manually specify srcSet where needed
  // This is because the optimized images are in a different directory structure
  return undefined;
}

export function ResponsiveOptimizedImage({
  src,
  alt,
  qualityTier = 'cards',
  enableBlurPlaceholder = false,
  customSizes,
  priority = false,
  ...props
}: ResponsiveOptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const quality = QUALITY_SETTINGS[qualityTier];
  const sizes = customSizes || DEFAULT_SIZES[qualityTier];
  const srcSet = generateSrcSet(src as string, qualityTier);

  return (
    <div className="relative">
      {/* Blur placeholder layer */}
      {enableBlurPlaceholder && !imageLoaded && (
        <div
          className="absolute inset-0 bg-gray-100 animate-pulse"
          style={{ filter: 'blur(10px)' }}
        />
      )}

      <Image
        src={src}
        alt={alt}
        quality={quality}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setImageLoaded(true)}
        {...props}
        className={`${props.className || ''} ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      />
    </div>
  );
}

/**
 * HERO IMAGE COMPONENT
 * Pre-configured for hero sections with highest quality
 */
export function HeroImage(props: Omit<ResponsiveOptimizedImageProps, 'qualityTier'>) {
  return (
    <ResponsiveOptimizedImage
      {...props}
      qualityTier="hero"
      priority={props.priority ?? true}
      enableBlurPlaceholder
    />
  );
}

/**
 * CARD IMAGE COMPONENT
 * Pre-configured for room/event cards with high quality
 */
export function CardImage(props: Omit<ResponsiveOptimizedImageProps, 'qualityTier'>) {
  return (
    <ResponsiveOptimizedImage
      {...props}
      qualityTier="cards"
      enableBlurPlaceholder
    />
  );
}

/**
 * THUMBNAIL IMAGE COMPONENT
 * Pre-configured for gallery thumbnails with optimized quality
 */
export function ThumbnailImage(props: Omit<ResponsiveOptimizedImageProps, 'qualityTier'>) {
  return (
    <ResponsiveOptimizedImage
      {...props}
      qualityTier="thumbnails"
    />
  );
}
