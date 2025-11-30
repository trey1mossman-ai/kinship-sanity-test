'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  width?: number;
  height?: number;
}

export function ImageWithSkeleton({
  src,
  alt,
  fill = false,
  sizes,
  className = '',
  priority = false,
  quality = 75,
  width,
  height
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      {/* Skeleton loader */}
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} />
      )}

      {/* Actual image */}
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          priority={priority}
          quality={quality}
          onLoad={() => setIsLoading(false)}
          loading={priority ? 'eager' : 'lazy'}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width!}
          height={height!}
          sizes={sizes}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          priority={priority}
          quality={quality}
          onLoad={() => setIsLoading(false)}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
}