'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function KinshipGuideSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for simple fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32"
      style={{ backgroundColor: '#FBF7F4' }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text Content - Left Side */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mb-6"
                style={{ color: '#667C58' }}>
              Kinship is Your Guide
            </h2>

            <p className="text-xl text-kinship-text mb-6">
              We're not just a place to sleep. We're your connection to Colorado Springs.
            </p>

            <div className="space-y-4 text-lg text-kinship-text/80">
              <p>
                Our team lives here. We hike these trails, drink at these coffee shops,
                and know exactly where to catch the best sunrise. When you stay with us,
                you get all that local knowledge – no tourist traps, just the real deal.
              </p>
              <p>
                Whether you're here to conquer fourteeners or explore downtown galleries,
                we'll point you in the right direction. Think of us as your friend who
                happens to live in one of the most beautiful places in Colorado.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 bg-kinship-green text-white
                  font-semibold transition-all duration-300 hover:bg-kinship-evergreen"
              >
                Explore Like a Local
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <p className="text-sm text-kinship-text/60">
                Ask us anything. Seriously, we love helping guests discover our city.
              </p>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden">
              <Image
                src="/images/home/local-guide-hero.webp"
                alt="Kinship team member sharing local recommendations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Simple accent box */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-1/3" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-wider mb-2">
                  Local Favorite
                </p>
                <p className="text-lg">
                  Garden of the Gods at sunrise – worth the early wake-up call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}