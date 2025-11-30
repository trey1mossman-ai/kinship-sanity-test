'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Coffee, Users, Utensils } from '@/components/icons';

export function HomaCafeBar() {
  const highlights = [
    {
      icon: Coffee,
      text: "Locally roasted coffee & craft cocktails"
    },
    {
      icon: Utensils,
      text: "Seasonal menu featuring Colorado ingredients"
    },
    {
      icon: Users,
      text: "Community table for meeting fellow travelers"
    }
  ];

  return (
    <section className="section-spacing bg-kinship-white">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=90"
                alt="Homa Café + Bar interior with guests enjoying coffee and conversation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-kinship-text mb-6">
              Homa Café + Bar
            </h2>

            <div className="space-y-4 mb-8">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-kinship-sage rounded-full flex items-center justify-center mt-0.5">
                      <IconComponent className="w-4 h-4 text-kinship-green" />
                    </div>
                    <p className="text-kinship-text/80 leading-relaxed">
                      {highlight.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-kinship-text/70 leading-relaxed mb-8">
              Where neighbors and travelers connect over exceptional coffee, craft cocktails, 
              and locally-sourced cuisine in the heart of downtown Colorado Springs.
            </p>

            <Button asChild className="btn-primary">
              <Link href="/homa/menu">
                See Menu
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}