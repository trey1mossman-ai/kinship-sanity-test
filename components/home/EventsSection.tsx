'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const venues = [
    {
      id: 'events-overview',
      name: 'Events & Gatherings',
      shortDesc: 'Create your perfect Colorado celebration',
      image: '/images/event image.webp',
      cta: 'Explore Events',
      link: '/events',
      isOverview: true
    },
    {
      id: 'the-yard',
      name: 'The Yard',
      shortDesc: 'Outdoor space for up to 200 guests',
      image: '/images/home/kinship yard.webp',
      cta: 'View Space',
      link: '/venues/the-yard'
    },
    {
      id: 'greenhaus',
      name: 'GreenHaus',
      shortDesc: 'Glass-walled venue for 75 guests',
      image: '/images/home/green-haus.webp',
      cta: 'View Space',
      link: '/venues/greenhaus'
    },
    {
      id: 'conference-room',
      name: 'Conference Room',
      shortDesc: 'Professional meeting space',
      image: '/images/home/conference-room.webp',
      cta: 'Reserve Room',
      link: '/venues/conference-room'
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-8 md:py-12 lg:py-16 bg-white"
    >
      <div className="container">
        {/* Section Header - Minimal */}
        <div className={`text-center mb-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl"
              style={{ color: '#667C58' }}>
            Host Your Next Event
          </h2>
        </div>

        {/* Venue Cards Grid - Image focused */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {venues.map((venue, index) => (
            <Link
              key={venue.id}
              href={venue.link}
              className={`group block bg-white overflow-hidden shadow-md transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 75}ms`,
                border: '1px solid rgba(132, 158, 116, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(132, 158, 116, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Large Image Focus */}
              <div className="relative h-64 lg:h-72 overflow-hidden bg-gray-100">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Venue Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-heading font-bold text-lg text-white mb-0.5">
                    {venue.name}
                  </h3>
                  <p className="text-xs text-white/90">
                    {venue.shortDesc}
                  </p>
                </div>
              </div>

              {/* Minimal CTA Bar */}
              <div className="px-3 py-2.5 flex items-center justify-between"
                   style={{ backgroundColor: '#FBF7F4' }}>
                <span className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: '#849e74' }}>
                  {venue.cta}
                </span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: '#849e74' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}