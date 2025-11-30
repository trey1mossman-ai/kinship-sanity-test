'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Room {
  id: string;
  name: string;
  bedType: string;
  occupancy: string;
  description: string;
  priceFrom?: number;
  image: string;
}

interface RoomsGridProps {
  items: Room[];
}

const defaultRooms: Room[] = [
  {
    id: 'kinship-suite',
    name: 'Kinship Suite',
    bedType: 'King Bed',
    occupancy: 'Up to 4 guests',
    description: 'Spacious corner suite with city views, separate living area, and premium amenities for the ultimate Colorado Springs experience.',
    priceFrom: 289,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=90'
  },
  {
    id: 'adventure-room',
    name: 'Adventure Room',
    bedType: 'Queen Bed',
    occupancy: 'Up to 2 guests',
    description: 'Thoughtfully designed room featuring local artwork, custom furnishings, and everything needed for your mountain town basecamp.',
    priceFrom: 189,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=90'
  }
];

export function RoomsGrid({ items = defaultRooms }: RoomsGridProps) {
  return (
    <section className="section-spacing bg-kinship-grayBg">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-kinship-text mb-4">
            Rooms & Suites
          </h2>
          <p className="text-lg text-kinship-text/70 max-w-2xl mx-auto">
            Designed for comfort and connection, each space reflects our commitment to authentic Colorado Springs hospitality.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {items.map((room) => (
            <div
              key={room.id}
              className="bg-kinship-white border border-kinship-divider rounded-card shadow-card hover:shadow-deep transition-shadow duration-300"
            >
              {/* Room Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-card">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Room Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-kinship-text mb-1">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-kinship-text/70">
                      <span>{room.bedType}</span>
                      <span>•</span>
                      <span>{room.occupancy}</span>
                    </div>
                  </div>
                  {room.priceFrom && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-kinship-text">
                        ${room.priceFrom}
                      </div>
                      <div className="text-xs text-kinship-text/60 uppercase tracking-wider">
                        from/night
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-kinship-text/80 leading-relaxed mb-6">
                  {room.description}
                </p>

                <Button className="btn-primary w-full">
                  Book
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Pricing Note */}
        <div className="text-center">
          <p className="text-sm text-kinship-text/60 font-medium">
            Transparent pricing. No resort fees.
          </p>
        </div>
      </div>
    </section>
  );
}