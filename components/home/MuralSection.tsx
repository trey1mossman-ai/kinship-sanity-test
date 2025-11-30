'use client';

import Image from 'next/image';

export function MuralSection() {
  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Mural Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/Background-mural.webp"
          alt="Kinship Landing mural artwork"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      
      {/* Gradient overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      
      {/* Optional centered content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 drop-shadow-lg">
            Your Colorado Basecamp
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            Where mountain adventures meet downtown convenience
          </p>
        </div>
      </div>
    </section>
  );
}