'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { BookingBar } from '@/components/booking/BookingBar';
import { TrustPills } from '@/components/trust/TrustPills';

export function HeroConversion() {
  useEffect(() => {
    // Analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_home');
    }
  }, []);

  return (
    <>
      <section 
        id="main-content"
        className="relative min-h-screen flex items-center justify-center overflow-hidden" 
        aria-label="Hero section"
      >
        {/* Hero Background - Single full-bleed image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=90"
            alt="Kinship Landing Hotel exterior"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(8,8,6,0.75) 0%, rgba(8,8,6,0.5) 50%, rgba(8,8,6,0.3) 75%, rgba(8,8,6,0.15) 100%)',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-wrap mx-auto px-4 sm:px-6">
          <div className="text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-kinship-white mb-6 leading-tight"
              style={{ letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
            >
              Experience Colorado Springs like a local
            </h1>
            
            {/* Trust Pills */}
            <TrustPills
              googleRating={4.5}
              googleReviewCount={600}
              bbbRating="A+"
              bbbYear={2021}
            />
            
            <p 
              className="text-lg lg:text-xl text-kinship-white font-normal max-w-2xl mx-auto lg:mx-0 mt-6 mb-8 leading-relaxed"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
            >
              Your guide to insider adventures and authentic experiences in downtown Colorado Springs.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Bar - In Hero and Sticky */}
      <BookingBar className="bg-kinship-white/95 backdrop-blur-sm border-b border-kinship-divider shadow-card" />
      <BookingBar stickyOnScroll variant="sticky" />
    </>
  );
}