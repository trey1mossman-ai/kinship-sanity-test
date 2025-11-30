'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { BookingBar } from '@/components/booking/BookingBar';
import { TrustPills } from '@/components/trust/TrustPills';
import { BookingWidget } from '@/components/BookingWidget';
import { PillBadges } from '@/components/social-proof/PillBadges';
import { content } from '@/content/copy';
import reviewsData from '@/data/reviews.seed.json';

export function Hero() {
  useEffect(() => {
    // Analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_home');
    }
  }, []);

  return (
    <section 
      id="main-content"
      className="relative min-h-screen md:min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image with Exact Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=90"
          alt="Colorado Springs landscape"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(8,8,6,0.75) 0%, rgba(8,8,6,0.5) 50%, rgba(8,8,6,0.3) 75%, rgba(8,8,6,0.15) 100%)',
          }}
        />
        {/* Additional overlay for better text contrast */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(100,123,86,0.1)' }} />
      </div>

      {/* Desktop Booking Widget - Positioned absolute */}
      <div className="hidden lg:block absolute top-24 right-8 xl:right-12 z-20">
        <BookingWidget variant="hero" />
      </div>

      {/* Hero Content - Always centered on mobile, optional left on desktop */}
      <div className="relative z-10 container">
        <div className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
          <h1 
            className="heading-1 font-heading text-white mb-6 drop-shadow-lg"
            style={{ letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
          >
            {content.hero.headline}
          </h1>
          
          {/* Social Proof Pills */}
          <PillBadges data={reviewsData.meta} />
          
          <p 
            className="body-large font-body text-white font-normal max-w-2xl mx-auto lg:mx-0 mt-6"
            style={{ lineHeight: '1.7', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
          >
            Sleep well. Meet locals. Launch adventures.
          </p>
          
          {/* Mobile CTA Button */}
          <div className="mt-8 lg:hidden flex justify-center">
            <button className="btn-primary shadow-lg">
              Check Availability
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Centered and visible */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white text-xs uppercase tracking-kinship-nav font-nav font-semibold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/80 bg-black/20 flex items-start justify-center p-2 animate-bounce">
            <div className="w-1.5 h-3 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}