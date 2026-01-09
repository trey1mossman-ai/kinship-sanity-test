export const imageLoader = ({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) => {
  // Apply Sanity CDN transforms for optimization
  if (src && src.includes('cdn.sanity.io')) {
    const q = quality || 80;
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}w=${width}&q=${q}&auto=format`;
  }
  return src;
};

/**
 * Transform a Sanity CDN URL with optimization parameters
 * Use this for static/SSG where Next.js Image loader isn't called
 */
export function optimizeSanityUrl(
  url: string | undefined,
  options: { width?: number; quality?: number; height?: number } = {}
): string {
  if (!url) return '';
  if (!url.includes('cdn.sanity.io')) return url;

  const { width = 1200, quality = 80, height } = options;
  const separator = url.includes('?') ? '&' : '?';
  let params = `w=${width}&q=${quality}&auto=format`;
  if (height) params += `&h=${height}`;

  return `${url}${separator}${params}`;
}

/**
 * Image presets for common use cases
 */
export const imagePresets = {
  hero: (url: string) => optimizeSanityUrl(url, { width: 1920, quality: 80 }),
  card: (url: string) => optimizeSanityUrl(url, { width: 800, quality: 80 }),
  thumbnail: (url: string) => optimizeSanityUrl(url, { width: 400, quality: 75 }),
  gallery: (url: string) => optimizeSanityUrl(url, { width: 1200, quality: 80 }),
};

export const imageSizes = {
  thumbnail: { width: 400, height: 300 },
  card: { width: 600, height: 400 },
  hero: { width: 1920, height: 1080 },
  gallery: { width: 800, height: 600 },
};

export const getResponsiveSizes = (type: keyof typeof imageSizes) => {
  switch (type) {
    case 'hero': return '100vw';
    case 'gallery': return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'card': return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'thumbnail': return '(max-width: 640px) 50vw, 25vw';
    default: return '100vw';
  }
};

export default imageLoader;
