'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { content } from '@/content/copy';

export function Homa() {
  return (
    <section className="section-spacing bg-primary-bg section-fade-in">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Text Block */}
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-bold text-charcoal uppercase tracking-[.15em] mb-6">
                EAT & DRINK
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-6 leading-tight">
                {content.homa.title}
              </h3>
              
              <div className="space-y-4 text-lg text-charcoal/70 leading-relaxed">
                <p>
                  Great coffee. Solid cocktails. Real food. Our café and bar welcomes neighbors and travelers alike, creating connections over shared meals and locally-sourced ingredients.
                </p>
                <p>
                  From morning espresso to evening aperitifs, Homa is your gathering place in the heart of downtown Colorado Springs.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                className="bg-olive hover:bg-olive-dark text-white px-8 py-3 font-medium tracking-[.05em]"
              >
                <Link href="/homa/menu">
                  {content.homa.cta.menu}
                </Link>
              </Button>
              <Button 
                asChild 
                variant="ghost" 
                className="text-charcoal hover:bg-charcoal/10 px-8 py-3 font-medium tracking-[.05em]"
              >
                <Link href="/homa">
                  {content.homa.cta.visit}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Image Card */}
          <div className="relative">
            <div className="bg-white rounded-xl overflow-hidden shadow-soft">
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=90"
                  alt="Homa Café + Bar interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              </div>
              
              {/* Caption */}
              <div className="p-4">
                <p className="text-sm text-charcoal/60">
                  Locally-sourced ingredients meet craft cocktails in our welcoming café and bar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}