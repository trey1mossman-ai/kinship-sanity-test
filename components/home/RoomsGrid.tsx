'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { roomTeasers } from '@/lib/data/rooms';

export function RoomsGrid() {
  const [filter, setFilter] = useState<'all' | 'suites' | 'junior'>('all');
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({});
  const cardsRef = useRef<Map<string, HTMLElement>>(new Map());
  const titleRef = useRef<HTMLDivElement>(null);

  // Intersection observer for staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const roomId = entry.target.getAttribute('data-room-id');
            if (roomId) {
              // Add staggered delay based on index
              const index = parseInt(entry.target.getAttribute('data-index') || '0');
              setTimeout(() => {
                setVisibleCards(prev => new Set([...prev, roomId]));
              }, index * 100); // 100ms delay between each card
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Observe title
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    // Observe cards
    cardsRef.current.forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filter]);

  // Filter rooms based on selected category and limit to 6
  let filteredRooms;
  if (filter === 'all') {
    filteredRooms = roomTeasers.slice(0, 6);
  } else {
    filteredRooms = roomTeasers.filter(room => room.category === filter).slice(0, 6);
  }

  const filterLabels = {
    all: 'All Rooms',
    suites: 'Suites',
    junior: 'Junior Suites'
  };

  const categoryDescriptions = {
    all: "Take a deep breath, you have made it. Choose your basecamp for Colorado adventures.",
    suites: 'Take coziness to the next level in our uniquely designed rooms, styled with boutique art and textiles.',
    junior: 'Designed with travelers in mind, individually styled with boutique art and handpicked essentials.'
  };

  const handleImageLoad = (roomId: string) => {
    setImageLoadStates(prev => ({ ...prev, [roomId]: true }));
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden"
      style={{
        backgroundColor: 'white',
        backgroundImage: 'url("/textures/KL-Pikes-Peak-Topo-Map-Gray.webp")',
        backgroundSize: '340%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'multiply'
      }}>
      {/* Subtle texture overlay - balanced visibility */}
      <div className="absolute inset-0 bg-white/[0.83] z-0" />

      <div className="container relative z-10">
        {/* Section Header - Warm and welcoming */}
        <div
          ref={titleRef}
          data-room-id="title"
          className={`text-center transition-all duration-1000 ${
            visibleCards.has('title')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl mb-4"
              style={{ color: '#667C58' }}>
            Find Your Perfect Room
          </h2>

          {/* Mobile-only CTA RIGHT BELOW HEADING */}
          <div className="sm:hidden mb-4">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 px-6 py-2.5 font-semibold transition-all duration-300"
              style={{
                backgroundColor: '#667C58',
                color: '#ffffff',
                borderRadius: '4px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#556649';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#667C58';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Explore All Rooms
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <p className="text-base md:text-lg text-kinship-text/70 max-w-2xl mx-auto mb-6 md:mb-8">
            {categoryDescriptions[filter]}
          </p>
        </div>

        {/* Filter Pills - Simple and confident */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(Object.keys(filterLabels) as Array<keyof typeof filterLabels>).map((filterType) => (
            <button
              key={filterType}
              onClick={() => {
                setFilter(filterType);
                // Reset visible cards for re-animation
                setVisibleCards(new Set(['title']));
              }}
              className={`relative px-6 py-2 text-sm font-semibold transition-all duration-300 ${
                filter === filterType
                  ? 'shadow-md scale-[1.02]'
                  : 'bg-white hover:shadow-md hover:scale-[1.02]'
              }`}
              style={{
                backgroundColor: filter === filterType ? '#667C58' : '#ffffff',
                color: filter === filterType ? '#ffffff' : '#667C58',
                border: filter === filterType ? '1px solid #667C58' : '1px solid #667C58',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              aria-label={`Filter rooms: ${filterLabels[filterType]}`}
              aria-pressed={filter === filterType}
            >
              {filter === filterType && (
                <span className="absolute inset-0 bg-white/10" />
              )}
              <span className="relative">{filterLabels[filterType]}</span>
            </button>
          ))}
        </div>

        {/* Mobile-only CTA #2 above rooms grid */}
        <div className="sm:hidden text-center mb-6">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-6 py-2.5 font-semibold transition-all duration-300"
            style={{
              backgroundColor: '#667C58',
              color: '#ffffff'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#556649';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#667C58';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Explore All Rooms
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Rooms Grid - Clean and approachable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {filteredRooms.map((room, index) => (
            <article
              key={room.id}
              ref={(el) => {
                if (el) cardsRef.current.set(room.id, el);
              }}
              data-room-id={room.id}
              data-index={index}
              className={`group relative transition-all duration-700 ${
                visibleCards.has(room.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: `${index * 50}ms`
              }}
            >
              {/* Card - Professional yet approachable */}
              <div
                className="bg-white overflow-hidden transition-all duration-300 group flex flex-col h-full shadow-md"
                style={{
                  border: '1px solid rgba(132, 158, 116, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(132, 158, 116, 0.2), 0 8px 10px -6px rgba(132, 158, 116, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(132, 158, 116, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(132, 158, 116, 0.2)';
                }}
              >
                {/* Image container - Warm and inviting */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={room.heroImage}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onLoad={() => handleImageLoad(room.id)}
                    priority={index < 3}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    quality={75}
                  />

                  {/* Category Badge - Simple and confident */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider shadow-lg"
                          style={{ color: '#667C58', borderLeft: '3px solid #849e74' }}>
                      {room.category === 'junior' ? 'Junior Suite' : room.category === 'family' ? 'Family' : 'Suite'}
                    </span>
                  </div>
                </div>

                {/* Content area - Clear and purposeful */}
                <div className="p-2.5 flex flex-col bg-white">
                  <h3 className="font-heading font-bold text-base mb-1.5" style={{
                    color: '#667C58',
                    minHeight: '2.5rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {room.name}
                  </h3>

                  {/* CTA - Inviting exploration */}
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="block w-full text-center py-1.5 px-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-kinship-evergreen"
                    style={{
                      backgroundColor: 'transparent',
                      color: '#667C58',
                      border: '1px solid #849e74'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#667C58';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#667C58';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Explore Room
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA - Clear and confident */}
        <div className="text-center mt-8 md:mt-10">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all"
            style={{
              backgroundColor: '#ffffff',
              color: '#667C58',
              border: '1px solid #849e74'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#667C58';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#667C58';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Explore All Rooms
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}