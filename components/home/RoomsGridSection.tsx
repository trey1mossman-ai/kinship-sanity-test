'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function RoomsGridSection() {
  const rooms = [
    {
      id: 'studio',
      name: 'Studio Suite',
      price: 189,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=90',
      features: ['Queen bed', 'Kitchenette', 'Mountain views', 'Private bath'],
      description: 'Thoughtfully designed studio with modern amenities and stunning mountain views. Perfect for couples seeking comfort and style.',
      capacity: '2 guests'
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      price: 249,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=90',
      features: ['King bed', 'Seating area', 'Workspace', 'Premium bath'],
      description: 'Spacious room with premium finishes, perfect for extended stays or those who want extra room to spread out.',
      capacity: '2 guests'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-kinship-white">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 
            className="font-serif font-bold text-kinship-text mb-6"
            style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.01em' 
            }}
          >
            Our Rooms
          </h2>
          <p 
            className="text-kinship-text/80 max-w-3xl mx-auto"
            style={{ 
              fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
              lineHeight: '1.6' 
            }}
          >
            Comfortable accommodations designed for the modern traveler, with thoughtful amenities 
            and mountain views that remind you you're in Colorado.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {rooms.map((room) => (
            <div 
              key={room.id}
              className="group"
            >
              {/* Room Image */}
              <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl shadow-card">
                <Image
                  src={room.image}
                  alt={`${room.name} at Kinship Landing`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-kinship-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-kinship-text font-semibold">
                    From ${room.price}/night
                  </span>
                </div>
              </div>

              {/* Room Content */}
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-serif font-semibold text-kinship-text mb-2">
                      {room.name}
                    </h3>
                    <p className="text-kinship-text/60 font-medium">
                      {room.capacity}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-kinship-text/80 leading-relaxed mb-6">
                  {room.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {room.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-kinship-text/70">
                      <svg className="w-4 h-4 text-kinship-green mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Booking CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    asChild
                    className="btn-primary flex-1"
                  >
                    <a href={`/book?room=${room.id}`}>
                      Book {room.name}
                    </a>
                  </Button>
                  <Button 
                    asChild
                    className="btn-ghost"
                  >
                    <a href={`/rooms/${room.id}`}>
                      View Details
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <Button 
            asChild
            className="btn-ghost px-8 py-4 text-lg font-semibold"
          >
            <a href="/rooms">
              View All Rooms & Rates
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}