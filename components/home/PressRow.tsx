'use client';

import Image from 'next/image';
import { content } from '@/content/copy';

export function PressRow() {
  const press = [
    { name: 'Forbes', src: '/press/forbes-grey.webp' },
    { name: 'TODAY', src: '/press/today-show.webp' },
    { name: 'Denver Post', src: '/press/denverpostlogo-grey.webp' },
    { name: 'USA Today', src: '/press/usa-today-kl-homepage-1.webp' },
    { name: 'Traveler', src: '/press/Traveler.webp' },
  ];

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Mural Background - Very Pronounced */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/Background-mural.webp"
          alt="Kinship Landing mural artwork"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
        />
      </div>
      
      {/* Minimal overlay for maximum background visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/40 z-10" />
      
      <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-6">
        <h2 className="font-heading font-bold text-kinship-text text-center mb-8">
          {content.home.press.title}
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10">
          {press.map((outlet) => (
            <div key={outlet.name} className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kinship-green focus-visible:ring-offset-2 rounded-lg" tabIndex={0}>
              <Image
                src={outlet.src}
                alt={outlet.name}
                width={160}
                height={48}
                className="object-contain w-[120px] sm:w-[160px] h-auto grayscale hover:grayscale-0 transition-all duration-300"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
