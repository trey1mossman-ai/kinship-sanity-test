// Optimized ResponsiveImage using Next.js Image with proper srcSet
import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function ResponsiveImage({
  src,
  alt,
  fill = false,
  className = '',
  priority = false,
  sizes,
  width,
  height,
  placeholder,
  blurDataURL
}: ResponsiveImageProps) {
  // Generate mobile src for picture element
  const mobileSrc = src.includes('/home/')
    ? src.replace(/\.(webp|jpg|png)$/, '-mobile.webp')
    : src;

  // Default sizes for responsive images
  const defaultSizes = fill
    ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes || defaultSizes}
        className={className}
        priority={priority}
        quality={80}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width!}
      height={height!}
      sizes={sizes || defaultSizes}
      className={className}
      priority={priority}
      quality={80}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
    />
  );
}