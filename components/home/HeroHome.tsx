'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { TrustPills } from '@/components/trust/TrustPills';
import { Button } from '@/components/ui/button';

interface HeroHomeProps {
  reviewsData: {
    meta: {
      googleRating: number;
      googleReviewCountApprox: number;
      bbb: {
        rating: string;
        accreditedSince: string;
      };
    };
  };
}

export function HeroHome({ reviewsData }: HeroHomeProps) {
  useEffect(() => {
    // Analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_home');
    }
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=90"
          alt="Colorado Springs landscape with mountain views"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(8,8,6,0.75) 0%, rgba(8,8,6,0.5) 50%, rgba(8,8,6,0.3) 75%, rgba(8,8,6,0.15) 100%)',
          }}
        />
        {/* Brand Color Overlay */}
        <div className="absolute inset-0 bg-kinship-green/10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-wrap mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 
            className="text-kinship-white mb-6 font-serif font-bold"
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em', 
              textShadow: '0 2px 8px rgba(0,0,0,0.8)' 
            }}
          >
            Experience Colorado Springs like a local
          </h1>
          
          {/* Trust Pills */}
          <div className="flex justify-center mb-8">
            <TrustPills 
              googleRating={reviewsData.meta.googleRating}
              googleReviewCount={reviewsData.meta.googleReviewCountApprox}
              bbbRating={reviewsData.meta.bbb.rating}
              bbbYear={2021}
            />
          </div>
          
          {/* Subheadline */}
          <p 
            className="text-kinship-white font-normal max-w-2xl mx-auto mb-10"
            style={{ 
              fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
              lineHeight: '1.6', 
              textShadow: '0 1px 4px rgba(0,0,0,0.8)' 
            }}
          >
            Your guide to insider adventures and authentic experiences in downtown Colorado Springs. 
            Sleep well. Meet locals. Launch adventures.
          </p>
          
          {/* Primary CTA */}
          <div className="flex justify-center">
            <Button 
              asChild
              className="btn-primary px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <a href="#availability">
                Check Availability
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span 
            className="text-kinship-white text-xs uppercase tracking-wider font-semibold" 
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
          >
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-kinship-white/80 bg-black/20 flex items-start justify-center p-2 animate-bounce">
            <div className="w-1.5 h-3 bg-kinship-white rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}