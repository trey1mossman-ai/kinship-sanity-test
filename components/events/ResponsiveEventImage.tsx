'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ResponsiveEventImageProps {
  src: string; // Base path without extension (e.g., '/images/events-page/Gatherings/kinship-119')
  alt: string;
  priority?: boolean;
  className?: string;
  onClick?: () => void;
  sizes?: string;
}

/**
 * ResponsiveEventImage Component
 *
 * Automatically serves optimized responsive variants:
 * - Mobile (< 768px): xs variant (640px, ~50-80KB)
 * - Tablet (768-1024px): md variant (1024px, ~150-250KB)
 * - Desktop (> 1024px): lg variant (1920px, ~300-500KB)
 *
 * Falls back to original if variants don't exist
 */
export function ResponsiveEventImage({
  src,
  alt,
  priority = false,
  className = '',
  onClick,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
}: ResponsiveEventImageProps) {
  const [imageError, setImageError] = useState(false);

  // Remove file extension if present
  const basePath = src.replace(/\.(webp|jpg|jpeg|png)$/i, '');

  // Use responsive variants with srcset
  const srcSet = imageError
    ? `${src}`
    : `${basePath}-xs.webp 640w, ${basePath}-md.webp 1024w, ${basePath}-lg.webp 1920w`;

  // Default to md variant for src (good middle ground)
  const defaultSrc = imageError ? src : `${basePath}-md.webp`;

  return (
    <Image
      src={defaultSrc}
      srcSet={srcSet}
      alt={alt}
      fill
      className={className}
      onClick={onClick}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      quality={75}
      sizes={sizes}
      onError={() => {
        // Fallback to original if responsive variants don't exist
        if (!imageError) {
          setImageError(true);
        }
      }}
    />
  );
}
