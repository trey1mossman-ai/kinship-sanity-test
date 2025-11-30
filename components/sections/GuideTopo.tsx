'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { content } from '@/content/copy';

export function GuideTopo() {
  return (
    <section className="section-spacing relative overflow-hidden bg-section-alt section-divider">
      {/* Topo Map Background */}
      <div 
        className="absolute inset-0 opacity-8 sm:opacity-12 mix-blend-multiply"
        style={{ color: 'var(--secondary-text)' }}
        style={{
          backgroundImage: "url('/textures/topo-map.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
        }}
      />
      
      <div className="container relative z-10">
        <div className="content-center">
          {/* Heading */}
          <h2 className="heading-2 font-serif text-primary-text font-bold mb-6 sm:mb-8 text-balance">
            {content.guide.title}
          </h2>
          
          {/* Two Short Paragraphs */}
          <div className="prose-container stack mb-8 sm:mb-12">
            <p className="body-large text-secondary-text font-medium">
              More than just a place to crash. We're your basecamp for Colorado adventures, your connection to local culture, and your home in the heart of downtown.
            </p>
            <p className="body-large text-secondary-text font-medium">
              From insider tips on the best hiking trails to recommendations for local breweries, we're here to make your stay unforgettable.
            </p>
          </div>
          
          {/* CTAs - Removed since no other pages exist */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              className="btn-primary"
            >
              Explore Rooms
            </Button>
            <Button 
              className="btn-ghost"
            >
              Plan Your Stay
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}