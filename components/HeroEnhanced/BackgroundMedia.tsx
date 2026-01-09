'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BackgroundMediaProps } from './types';
import { useEffect, useState } from 'react';

/**
 * BackgroundMedia Component
 * Purpose: Create an immersive background with subtle motion that welcomes guests
 * Mobile-first: Reduced motion on mobile, full effects on desktop
 * Future-ready: Easy switch from image to video tomorrow
 */
export function BackgroundMedia({
  type,
  source,
  fallback,
  overlay = true,
  overlayOpacity = 0.25
}: BackgroundMediaProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    // Check for mobile and reduced motion preferences
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    checkMobile();
    setPrefersReducedMotion(mediaQuery.matches);

    const handleResize = () => checkMobile();
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Delay video loading to prioritize poster image for LCP
    const videoTimer = setTimeout(() => setLoadVideo(true), 2000);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
      clearTimeout(videoTimer);
    };
  }, []);

  // Video implementation with performance optimizations
  if (type === 'video') {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Poster image loads first for immediate LCP */}
        {fallback && (
          <Image
            src={fallback}
            alt="Kinship Landing welcomes you"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        {/* Video loads after 2s delay, overlays on top when ready */}
        {loadVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={source} type="video/mp4" />
        </video>
        )}
        {overlay && (
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"
            style={{ opacity: overlayOpacity }}
          />
        )}
      </div>
    );
  }

  // Image with Ken Burns effect
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ken Burns container - subtle zoom for welcoming feel */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={
          prefersReducedMotion || isMobile
            ? {} // No animation on mobile or with reduced motion
            : {
                scale: [1, 1.1], // Subtle 10% zoom
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      >
        <Image
          src={source}
          alt="Welcome to Kinship Landing - Your Colorado Springs basecamp"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </motion.div>

      {/* Overlay for text readability */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
      )}
    </div>
  );
}