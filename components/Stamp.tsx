'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function Stamp() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <section className="section-spacing-tight section-marker">
      <div className="container flex items-center justify-center">
        <div 
          className={`relative ${!prefersReducedMotion ? 'hover:rotate-6' : ''} transition-transform duration-500 ease-out`}
          role="img"
          aria-label="Kinship brand stamp: Stay, Gather, Explore, Drink, Eat"
        >
          <Image
            src="/brand/kinship-stamp.webp"
            alt="Stay • Gather • Explore • Drink • Eat"
            width={280}
            height={280}
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
          />
        </div>
      </div>
    </section>
  );
}