'use client';

import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from '@/components/icons';

interface Review {
  source: string;
  name: string;
  rating: number;
  quote: string;
  url: string;
  date?: string;
}

interface ReviewCarouselProps {
  items: Review[];
}

export function ReviewCarousel({ items = [] }: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout>();

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!isPaused && items.length > 0) {
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 6000);
    }

    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
      }
    };
  }, [items.length, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    
    // Resume auto-advance after 10 seconds of manual control
    setTimeout(() => setIsPaused(false), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % items.length);
  };

  const prevSlide = () => {
    goToSlide(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'google':
        return 'bg-blue-100 text-blue-800';
      case 'expedia':
        return 'bg-yellow-100 text-yellow-800';
      case 'travelocity':
        return 'bg-green-100 text-green-800';
      case 'site':
        return 'bg-kinship-sage text-kinship-text';
      default:
        return 'bg-kinship-sage text-kinship-text';
    }
  };

  if (!items.length) return null;

  return (
    <div 
      className="bg-kinship-white border border-kinship-divider rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-kinship-green rounded-full"></div>
          <h3 className="text-xl font-heading font-bold text-kinship-text">
            Guest Stories
          </h3>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2.5 rounded-full bg-kinship-sage hover:bg-kinship-green-light hover:text-kinship-white transition-all duration-200"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2.5 rounded-full bg-kinship-sage hover:bg-kinship-green-light hover:text-kinship-white transition-all duration-200"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Review Content */}
      <div className="relative min-h-[140px] mb-6">
        <div className="absolute inset-0 transition-opacity duration-500">
          <div className="space-y-4">
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < items[currentIndex].rating
                      ? 'fill-kinship-green text-kinship-green'
                      : 'text-kinship-divider'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-kinship-text text-lg leading-relaxed">
              "{items[currentIndex].quote}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-kinship-green-light flex items-center justify-center text-kinship-white text-xs font-medium">
                  {getInitials(items[currentIndex].name)}
                </div>
                <div>
                  <div className="text-sm font-medium text-kinship-text">
                    {items[currentIndex].name}
                  </div>
                  {items[currentIndex].date && (
                    <div className="text-xs text-kinship-text opacity-60">
                      {items[currentIndex].date}
                    </div>
                  )}
                </div>
              </div>

              {/* Source Badge */}
              <a
                href={items[currentIndex].url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors hover:opacity-80 ${getSourceColor(items[currentIndex].source)}`}
                aria-label={`View review on ${items[currentIndex].source}`}
              >
                <span>{items[currentIndex].source}</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index
                ? 'bg-kinship-green w-6'
                : 'bg-kinship-divider hover:bg-kinship-green-light'
            }`}
            aria-label={`Go to review ${index + 1}`}
            aria-current={currentIndex === index ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
}