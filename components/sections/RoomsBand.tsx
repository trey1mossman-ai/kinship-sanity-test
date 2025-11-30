'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from '@/components/icons';
import { roomsHero } from '@/lib/data/roomsHero';

export function RoomsBand() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((index: number) => {
    if (scrollRef.current) {
      const slideWidth = scrollRef.current.scrollWidth / roomsHero.length;
      scrollRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  }, []);

  const nextSlide = useCallback(() => {
    const next = currentSlide === roomsHero.length - 1 ? 0 : currentSlide + 1;
    scrollTo(next);
  }, [currentSlide, scrollTo]);

  const prevSlide = useCallback(() => {
    const prev = currentSlide === 0 ? roomsHero.length - 1 : currentSlide - 1;
    scrollTo(prev);
  }, [currentSlide, scrollTo]);

  return (
    <section className="section-spacing bg-primary-bg section-marker">
      <div className="container">
        {/* Section Header - Minimal for rooms teaser */}
        <div className="content-center mb-8 sm:mb-12">
          <h2 className="heading-3 font-serif text-primary-text font-bold">
            Rooms & Suites
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - Hidden on mobile, visible on tablet+ */}
          <Button
            onClick={prevSlide}
            variant="ghost"
            size="icon"
            className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md rounded-full h-10 w-10 sm:h-12 sm:w-12 items-center justify-center"
            aria-label="Previous room"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <Button
            onClick={nextSlide}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md rounded-full h-12 w-12"
            aria-label="Next room"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-4 scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {roomsHero.map((room, index) => (
              <div
                key={room.id}
                className="flex-none w-[320px] md:w-[400px] snap-start"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-soft h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-300"
                      sizes="(max-width: 768px) 320px, 400px"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <span className="inline-block text-white text-xs font-bold px-2.5 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-sm" style={{ backgroundColor: 'var(--cta-bg)' }}>
                        {room.category}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-primary-text mb-2">
                        {room.title}
                      </h3>
                      <p className="text-secondary-text font-normal leading-relaxed mb-4">
                        {room.longDescription}
                      </p>
                    </div>
                    
                    {/* CTAs */}
                    <div className="flex gap-3 mt-auto">
                      <Button asChild className="btn-primary flex-1">
                        <Link href="/rooms">
                          Suites
                        </Link>
                      </Button>
                      <Button asChild className="btn-ghost">
                        <Link href={`/rooms/${room.id}`}>
                          Read more
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {roomsHero.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-olive w-8' : 'bg-charcoal/20'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentSlide === index ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}