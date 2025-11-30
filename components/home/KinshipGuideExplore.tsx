'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function KinshipGuideExplore() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Simple intersection observer for fade-in
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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden"
    >
      {/* Background Image - Full immersive */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/background for stay explore gather drink eat.webp"
          alt="Colorado Springs mountain landscape"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={75}
        />
      </div>

      {/* Gradient overlay for text readability - lighter for green text */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/40 to-transparent z-10" />

      {/* Content Container */}
      <div className="relative z-20 container h-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
        <div className="h-full flex flex-col justify-center py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Kinship Guide Text */}
            <div className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-6"
                  style={{ color: '#667C58' }}>
                Kinship is Your Guide
              </h2>

              <div className="space-y-4 text-lg" style={{ color: '#3A3A3A' }}>
                <p>
                  It makes a difference landing in a place where you know a friend.
                  Consider us your personal insider guide to exploring the real gems
                  of Colorado Springs.
                </p>
                <p>
                  Whether it's hiking, rock climbing or fishing you're after, or you
                  want a taste of the food, arts and culture that are literally steps
                  away from our hotel in downtown Colorado Springs, we'll connect you
                  to an authentic way to experience our city.
                </p>
                <p>
                  Seriously, our favorite thing to do is helping people have an amazing
                  time, and we'll gladly point you in the right direction. Hey, we may
                  even come along with you for the ride!
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-kinship-green text-white
                    font-bold uppercase tracking-wider transition-all duration-300
                    hover:bg-kinship-evergreen shadow-xl"
                  style={{ backgroundColor: '#667C58' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#556649';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#667C58';
                  }}
                >
                  Explore Like a Local
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Stay Explore Gather Visual - Smaller */}
            <div className={`flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="relative w-64 lg:w-72">
                <Image
                  src="/images/home/STAY EXPLORE GATHER DRINK EAT.webp"
                  alt="Stay Explore Gather Drink Eat"
                  width={288}
                  height={72}
                  className="w-full h-auto"
                  style={{
                    filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.5))',
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent z-30" />
    </section>
  );
}