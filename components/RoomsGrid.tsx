'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { roomTeasers } from '@/lib/data/rooms';
import { RoomCard } from './RoomCard';
import { RoomCardSkeleton } from './RoomCardSkeleton';
import { Section } from './Section';

export function RoomsGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const checkIn = searchParams.get('checkin') || undefined;
  const checkOut = searchParams.get('checkout') || undefined;
  const guests = searchParams.get('guests') || undefined;

  // Display first 3 rooms on homepage, add mobile swipe
  const displayRooms = roomTeasers.slice(0, 3);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section className="bg-bone">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal text-center mb-12">
          Our Rooms
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto auto-rows-fr">
          {isLoading
            ? [...Array(3)].map((_, i) => <RoomCardSkeleton key={i} />)
            : displayRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  guests={guests}
                />
              ))
          }
        </div>

        {/* Mobile Swipe */}
        <div className="md:hidden overflow-x-auto scroll-snap-x">
          <div className="flex gap-4 px-4 pb-4">
            {isLoading
              ? [...Array(3)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-80 scroll-snap-start">
                    <RoomCardSkeleton />
                  </div>
                ))
              : displayRooms.map((room) => (
                  <div key={room.id} className="flex-shrink-0 w-80 scroll-snap-start">
                    <RoomCard
                      room={room}
                      checkIn={checkIn}
                      checkOut={checkOut}
                      guests={guests}
                    />
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </Section>
  );
}