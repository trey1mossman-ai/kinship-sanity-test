'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Section } from './Section';

const pressMentions = [
  { name: 'AFAR', file: '/press/afar.svg' },
  { name: 'Forbes', file: '/press/forbes.svg' },
  { name: 'Condé Nast Traveler', file: '/press/cntraveler.svg' },
  { name: 'Denver Post', file: '/press/denverpost.svg' },
];

export function PressStrip() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Section className="bg-sand">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-charcoal/60 mb-8 uppercase tracking-wider">
          As featured in
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {pressMentions.map((press, idx) => (
            <div
              key={press.name}
              className="relative w-28 h-10 opacity-40 hover:opacity-60 transition-opacity"
              style={{
                animation: loaded ? `fadeIn 0.5s ${idx * 0.1}s both` : 'none',
              }}
            >
              <Image
                src={press.file}
                alt={press.name}
                fill
                className="object-contain"
                loading="lazy"
                aria-label={`Featured in ${press.name}`}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}