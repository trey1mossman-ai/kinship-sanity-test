'use client';

import Image from 'next/image';
import { content } from '@/content/copy';

const pressLogos = [
  {
    name: 'Denver Post',
    src: '/press/denverpost.svg',
    alt: 'Denver Post logo'
  },
  {
    name: 'Afar',
    src: '/press/afar.svg',
    alt: 'Afar Magazine logo'
  },
  {
    name: 'Forbes',
    src: '/press/forbes.svg',
    alt: 'Forbes logo'
  },
  {
    name: 'Condé Nast Traveler',
    src: '/press/cntraveler.svg',
    alt: 'Condé Nast Traveler logo'
  }
];

export function Press() {
  return (
    <section className="section-spacing-tight bg-accent-2 section-divider">
      <div className="max-w-container mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-lg font-bold text-primary-text uppercase tracking-[.15em]">
            {content.press.title}
          </h2>
        </div>

        {/* Press Logos */}
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
          {pressLogos.map((logo) => (
            <div
              key={logo.name}
              className="opacity-60 hover:opacity-80 transition-opacity duration-300 text-charcoal/60"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
                loading="lazy"
                style={{ filter: 'grayscale(1)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}