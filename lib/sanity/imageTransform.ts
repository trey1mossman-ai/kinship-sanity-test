/**
 * Sanity CDN URL Transform Utility
 * 
 * Appends optimization parameters to existing Sanity CDN URLs.
 * Works with URLs already resolved from GROQ queries (asset->url pattern).
 * 
 * Sanity CDN supports these query params:
 * - w=WIDTH: resize width
 * - h=HEIGHT: resize height  
 * - q=QUALITY: 0-100 (default 75)
 * - auto=format: serve WebP/AVIF to supported browsers
 * - fit=MODE: crop, clip, fill, fillmax, max, scale, min
 */

interface TransformOptions {
  width?: number
  height?: number
  quality?: number
  autoFormat?: boolean
  fit?: 'crop' | 'clip' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
}

/**
 * Transform a Sanity CDN URL with optimization parameters
 * 
 * @example
 * transformSanityUrl(url, { width: 800, autoFormat: true })
 * // https://cdn.sanity.io/images/.../image.jpg?w=800&auto=format
 */
export function transformSanityUrl(url: string | undefined, options: TransformOptions): string {
  if (!url) return ''
  
  // Only transform Sanity CDN URLs
  if (!url.includes('cdn.sanity.io')) {
    return url
  }
  
  const params = new URLSearchParams()
  
  if (options.width) params.set('w', options.width.toString())
  if (options.height) params.set('h', options.height.toString())
  if (options.quality) params.set('q', options.quality.toString())
  if (options.autoFormat) params.set('auto', 'format')
  if (options.fit) params.set('fit', options.fit)
  
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${params.toString()}`
}

/**
 * Preset transforms for common use cases
 */
export const imagePresets = {
  // Hero images - large, high quality
  hero: (url: string) => transformSanityUrl(url, { 
    width: 1920, 
    quality: 80, 
    autoFormat: true 
  }),
  
  // Card/grid images - medium size
  card: (url: string) => transformSanityUrl(url, { 
    width: 800, 
    quality: 80, 
    autoFormat: true 
  }),
  
  // Thumbnail images - small
  thumbnail: (url: string) => transformSanityUrl(url, { 
    width: 400, 
    quality: 75, 
    autoFormat: true 
  }),
  
  // Gallery images - responsive
  gallery: (url: string) => transformSanityUrl(url, { 
    width: 1200, 
    quality: 80, 
    autoFormat: true 
  }),
  
  // Background images - large but compressed
  background: (url: string) => transformSanityUrl(url, { 
    width: 1920, 
    quality: 70, 
    autoFormat: true 
  }),
}

/**
 * Generate srcset string for responsive images
 */
export function sanityImageSrcSet(
  url: string | undefined, 
  widths: number[] = [400, 800, 1200, 1600]
): string {
  if (!url || !url.includes('cdn.sanity.io')) return ''
  
  return widths
    .map(w => `${transformSanityUrl(url, { width: w, autoFormat: true, quality: 80 })} ${w}w`)
    .join(', ')
}

/**
 * Deep-transform all Sanity CDN URLs in a data object.
 * Recursively walks the object and applies optimization params
 * to any string that contains 'cdn.sanity.io' and doesn't already
 * have query params.
 *
 * Use this after fetching Sanity data to ensure all images are optimized:
 *   const data = optimizeSanityData(await getEventsPage())
 */
export function optimizeSanityData<T>(data: T, width = 1200, quality = 80): T {
  if (data === null || data === undefined) return data

  if (typeof data === 'string') {
    if (data.includes('cdn.sanity.io') && !data.includes('?')) {
      return `${data}?w=${width}&q=${quality}&auto=format` as T
    }
    return data
  }

  if (Array.isArray(data)) {
    return data.map(item => optimizeSanityData(item, width, quality)) as T
  }

  if (typeof data === 'object') {
    const result = {} as Record<string, unknown>
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      result[key] = optimizeSanityData(value, width, quality)
    }
    return result as T
  }

  return data
}
