'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function YardEventsSection() {
  const eventTypes = [
    'Corporate retreats',
    'Wedding celebrations',
    'Private parties',
    'Community gatherings',
    'Product launches',
    'Wellness workshops'
  ];

  return (
    <section className="py-20 lg:py-28 bg-kinship-white">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Content */}
          <div>
            <h2 
              className="font-serif font-bold text-kinship-text mb-6"
              style={{ 
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: '1.2',
                letterSpacing: '-0.01em' 
              }}
            >
              The Yard
            </h2>

            <p 
              className="text-kinship-text/80 leading-relaxed mb-8"
              style={{ 
                fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
                lineHeight: '1.6' 
              }}
            >
              Our versatile outdoor space transforms for intimate gatherings, corporate retreats, 
              and celebration events. With the Rocky Mountains as your backdrop and our expert 
              event team handling every detail, create unforgettable moments in the heart of Colorado Springs.
            </p>

            {/* Event Types */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {eventTypes.map((eventType, index) => (
                <div key={index} className="flex items-center text-kinship-text/70">
                  <svg className="w-4 h-4 text-kinship-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{eventType}</span>
                </div>
              ))}
            </div>

            {/* Capacity Info */}
            <div className="bg-kinship-sage/50 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-kinship-text mb-4">Event Capacity</h3>
              <div className="space-y-2 text-kinship-text/70">
                <div className="flex justify-between">
                  <span>Cocktail Reception</span>
                  <span>Up to 150 guests</span>
                </div>
                <div className="flex justify-between">
                  <span>Seated Dinner</span>
                  <span>Up to 80 guests</span>
                </div>
                <div className="flex justify-between">
                  <span>Meeting Setup</span>
                  <span>Up to 60 guests</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                className="btn-primary px-8 py-4 text-lg font-semibold"
              >
                <a href="/events">
                  Host Your Event
                </a>
              </Button>
              <Button 
                asChild
                className="btn-ghost px-8 py-4 text-lg font-semibold"
              >
                <a href="/contact">
                  Request Quote
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Image */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=90"
                alt="The Yard outdoor event space with mountain views and elegant setup"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}