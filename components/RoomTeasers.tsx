'use client';

import { useState, useRef } from 'react';
import { roomTeasers } from '@/lib/data/rooms';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Bed, Eye, Sparkles } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function RoomTeasers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      const newScrollPosition = direction === 'left'
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });

      const newIndex = direction === 'left'
        ? Math.max(0, currentIndex - 1)
        : Math.min(roomTeasers.length - 1, currentIndex + 1);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section className="py-20 bg-bone">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal">
            Our Rooms
          </h2>
          
          <div className="flex gap-2">
            <Button
              onClick={() => scroll('left')}
              size="icon"
              variant="outline"
              className="rounded-full border-charcoal/20"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => scroll('right')}
              size="icon"
              variant="outline"
              className="rounded-full border-charcoal/20"
              disabled={currentIndex === roomTeasers.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {roomTeasers.map((room) => (
            <Card
              key={room.id}
              className="min-w-[340px] flex-shrink-0 overflow-hidden group cursor-pointer border-0 shadow-soft"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Link href={`/rooms/${room.slug}`}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.heroImage}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-bone/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-sm font-nav font-semibold text-charcoal tracking-kinship-nav">
                      From ${room.price}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-charcoal mb-3">
                    {room.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4" />
                      <span>{room.bedType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{room.view}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>{room.perk}</span>
                    </div>
                  </div>

                  <Button 
                    className="mt-4 w-full bg-pine hover:bg-pine/90 text-bone"
                  >
                    View Room
                  </Button>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}