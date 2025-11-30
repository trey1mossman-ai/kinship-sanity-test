'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Bed, Eye, Sparkles } from '@/components/icons';
import type { RoomTeaser } from '@/lib/data/rooms';
import { content } from '@/content/copy';

interface RoomCardProps {
  room: RoomTeaser;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}

export function RoomCard({ room, checkIn, checkOut, guests }: RoomCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const buildBookingUrl = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set('checkin', checkIn);
    if (checkOut) params.set('checkout', checkOut);
    if (guests) params.set('adults', guests);
    
    const cloudbeds = process.env.NEXT_PUBLIC_CLOUDBEDS_URL;
    if (cloudbeds) {
      return `${cloudbeds}?${params}`;
    }
    return `/rooms/${room.slug}?${params}`;
  };

  const icons = [Bed, Eye, Sparkles];

  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-0 transition-all duration-300 h-full flex flex-col',
        isHovered && 'shadow-soft -translate-y-1'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.heroImage}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        
        {/* Price Pill */}
        <div className="absolute top-4 right-4 bg-bone/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-soft">
          <span className="text-sm font-semibold text-charcoal">
            From ${room.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-serif font-bold text-charcoal mb-4">
          {room.name}
        </h3>
        
        {/* Features List with Icons */}
        <ul className="space-y-2 mb-4 flex-1">
          {room.features.map((feature, idx) => {
            const Icon = icons[idx] || Sparkles;
            return (
              <li key={idx} className="flex items-start text-sm text-charcoal/70 gap-2">
                <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#849e74', stroke: '#849e74' }} />
                <span>{feature}</span>
              </li>
            );
          })}
        </ul>

        {/* Amenity Chips */}
        {room.amenityChips && room.amenityChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {room.amenityChips.map((amenity) => (
              <span
                key={amenity}
                className="inline-block px-2.5 py-1 bg-sand text-charcoal text-xs rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <Button 
          asChild
          className="w-full bg-pine hover:bg-pine/90 text-bone"
        >
          <a 
            href={buildBookingUrl()}
            target={process.env.NEXT_PUBLIC_CLOUDBEDS_URL ? '_blank' : undefined}
            rel={process.env.NEXT_PUBLIC_CLOUDBEDS_URL ? 'noopener noreferrer' : undefined}
          >
            {content.booking.availability}
          </a>
        </Button>
      </div>
    </Card>
  );
}