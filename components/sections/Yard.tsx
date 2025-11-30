'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { content } from '@/content/copy';

export function Yard() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden section-spacing-tight section-fade-in">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=90"
          alt="The Yard outdoor space at Kinship Landing"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Strong Bottom Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, rgba(15,18,19,.85) 0%, rgba(15,18,19,.45) 35%, rgba(15,18,19,.15) 65%, rgba(15,18,19,0) 100%)',
          }}
        />
      </div>

      {/* Content Card */}
      <div className="relative z-10 px-4 md:px-6">
        <div className="glass-card p-8 md:p-12 max-w-lg mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-text mb-4">
            {content.yard.title}
          </h2>
          <p className="text-lg text-secondary-text font-medium mb-8 leading-relaxed">
            {content.yard.description}
          </p>
          
          <Button 
            asChild 
            className="btn-primary px-8 py-3 text-base"
          >
            <Link href="/events/host">
              {content.yard.cta}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}