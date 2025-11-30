'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import env from '@/lib/config/env';
import { cn } from '@/lib/utils';

interface HeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
  video?: string;
  overlay?: boolean;
  height?: 'full' | 'large' | 'medium' | 'small';
  children?: React.ReactNode;
}

export function Hero({
  title,
  subtitle,
  image = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80',
  video,
  overlay = true,
  height = 'full',
  children,
}: HeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const shouldShowVideo = env.NEXT_PUBLIC_ENABLE_VIDEO_HERO && video;

  const heightClasses = {
    full: 'min-h-screen',
    large: 'min-h-[80vh]',
    medium: 'min-h-[60vh]',
    small: 'min-h-[40vh]',
  };

  return (
    <div className={cn('relative flex items-center justify-center overflow-hidden', heightClasses[height])}>
      {/* Background Media */}
      <div className="absolute inset-0">
        {shouldShowVideo ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              className={cn(
                'absolute inset-0 w-full h-full object-cover transition-opacity duration-1000',
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              )}
            >
              <source src={video} type="video/mp4" />
            </video>
            {!isVideoLoaded && (
              <Image
                src={image}
                alt="Hero background"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            )}
          </>
        ) : (
          <Image
            src={image}
            alt="Hero background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <AnimatePresence>
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4"
            >
              {title}
            </motion.h1>
          )}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}