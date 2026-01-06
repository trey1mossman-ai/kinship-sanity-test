'use client';

import Image, { ImageProps } from 'next/image';
import { transformSanityUrl, sanityImageSrcSet } from '@/lib/sanity/imageTransform';

type ImagePreset = 'hero' | 'card' | 'thumbnail' | 'gallery' | 'background';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  preset?: ImagePreset;
  /** Custom width for Sanity transform (overrides preset) */
  sanityWidth?: number;
}

const presetWidths: Record<ImagePreset, number> = {
  hero: 1920,
  card: 800,
  thumbnail: 400,
  gallery: 1200,
  background: 1920,
};

const presetQualities: Record<ImagePreset, number> = {
  hero: 80,
  card: 80,
  thumbnail: 75,
  gallery: 80,
  background: 70,
};

/**
 * OptimizedImage - Wrapper around Next/Image that applies Sanity CDN transforms
 * 
 * For Sanity CDN URLs: Appends ?w=WIDTH&auto=format&q=QUALITY
 * For local images: Passes through unchanged (Next.js handles optimization)
 * 
 * @example
 * <OptimizedImage src={imageUrl} preset="card" alt="Room" fill />
 * <OptimizedImage src={imageUrl} sanityWidth={600} alt="Thumbnail" width={300} height={200} />
 */
export function OptimizedImage({ 
  src, 
  preset = 'card', 
  sanityWidth,
  ...props 
}: OptimizedImageProps) {
  const isSanityUrl = src?.includes('cdn.sanity.io');
  
  // Apply Sanity transforms if it's a Sanity URL
  const optimizedSrc = isSanityUrl 
    ? transformSanityUrl(src, {
        width: sanityWidth || presetWidths[preset],
        quality: presetQualities[preset],
        autoFormat: true,
      })
    : src;
  
  // Generate srcSet for responsive Sanity images
  const srcSet = isSanityUrl ? sanityImageSrcSet(src) : undefined;
  
  return (
    <Image
      src={optimizedSrc}
      {...(srcSet && { srcSet })}
      {...props}
    />
  );
}

export default OptimizedImage;
