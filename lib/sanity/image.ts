import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

/**
 * Generate optimized Sanity image URLs with transforms
 * 
 * Usage:
 *   urlForImage(image).width(800).auto('format').url()
 *   urlForImage(image).width(400).height(300).quality(80).url()
 * 
 * Benefits:
 *   - auto('format') serves WebP/AVIF to supported browsers
 *   - width/height resize on Sanity CDN (not client)
 *   - quality reduces file size with minimal visual impact
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Generate a responsive image URL with common defaults
 * - Auto format (WebP/AVIF)
 * - Quality 80 (good balance)
 * - Specified width
 */
export function optimizedImageUrl(source: SanityImageSource, width: number, height?: number) {
  let img = builder.image(source).width(width).auto('format').quality(80)
  if (height) {
    img = img.height(height)
  }
  return img.url()
}

/**
 * Generate srcset for responsive images
 * Returns URLs at multiple sizes for browser to choose
 */
export function imageSrcSet(source: SanityImageSource, sizes: number[] = [400, 800, 1200, 1600]) {
  return sizes
    .map(w => `${urlForImage(source).width(w).auto('format').quality(80).url()} ${w}w`)
    .join(', ')
}
