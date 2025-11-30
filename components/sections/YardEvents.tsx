'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function YardEvents() {
  return (
    <section className="section-spacing bg-kinship-grayBg">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-kinship-text mb-6">
              The Yard
            </h2>

            <p className="text-lg text-kinship-text/80 leading-relaxed mb-8">
              Our versatile outdoor space transforms for intimate gatherings, corporate retreats, 
              and celebration events. With the Rocky Mountains as your backdrop and our expert 
              event team handling every detail, create unforgettable moments in the heart of Colorado Springs.
            </p>

            <Button asChild className="btn-primary">
              <Link href="/events">
                Host your event at Kinship
              </Link>
            </Button>
          </div>

          {/* Right: Image */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=90"
                alt="The Yard outdoor event space with mountain views"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}