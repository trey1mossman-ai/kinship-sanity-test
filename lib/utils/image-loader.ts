export const imageLoader = ({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) => {
  // In production, you might use a CDN or image optimization service
  // For now, we'll return the source as-is
  return src;
};

export const imageSizes = {
  thumbnail: {
    width: 400,
    height: 300,
  },
  card: {
    width: 600,
    height: 400,
  },
  hero: {
    width: 1920,
    height: 1080,
  },
  gallery: {
    width: 800,
    height: 600,
  },
};

export const getResponsiveSizes = (type: keyof typeof imageSizes) => {
  switch (type) {
    case 'hero':
      return '100vw';
    case 'gallery':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'card':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'thumbnail':
      return '(max-width: 640px) 50vw, 25vw';
    default:
      return '100vw';
  }
};