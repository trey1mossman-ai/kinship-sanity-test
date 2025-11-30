'use client';

import Image from 'next/image';
import Link from 'next/link';
import { content } from '@/content/copy';

export function AllVenuesSection() {
  return (
    <section className="py-2 md:py-3 lg:py-4 relative overflow-hidden bg-white">
      <div className="max-w-[1600px] mx-auto px-2 sm:px-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-2 lg:gap-3">

          {/* The Yard */}
          <div className="bg-white overflow-hidden shadow-md" style={{ border: '1px solid rgba(132, 158, 116, 0.2)' }}>
            {/* Image */}
            <div className="relative h-[350px] lg:h-[400px] overflow-hidden">
              <Image
                src="/images/home/kinship yard.webp"
                alt="The Yard at Kinship Landing - outdoor lawn with string lights and mountain air"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            {/* Content - Compact */}
            <div className="p-3 lg:p-4">
              <h3 className="font-heading font-bold text-lg sm:text-xl mb-1" style={{ color: '#667C58' }}>
                {content.home.yard.title}
              </h3>
              <p className="text-kinship-text text-xs lg:text-sm leading-tight mb-2" style={{ color: '#4f575c' }}>
                Our outdoor living room - string lights, yard games, and that sweet Colorado sunshine.
              </p>
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold transition-all duration-300 w-full"
                style={{
                  backgroundColor: '#667C58',
                  color: '#ffffff',
                  border: '1px solid #667C58'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#556649';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#667C58';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {content.home.yard.cta}
              </Link>
            </div>
          </div>

          {/* Green Haus */}
          <div className="bg-white overflow-hidden shadow-md" style={{ border: '1px solid rgba(132, 158, 116, 0.2)' }}>
            {/* Image */}
            <div className="relative h-[350px] lg:h-[400px] overflow-hidden">
              <Image
                src="/images/home/green-haus.webp"
                alt="Green Haus at Kinship Landing - a lush, light-filled greenhouse venue"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            {/* Content - Compact */}
            <div className="p-3 lg:p-4">
              <h3 className="font-heading font-bold text-lg sm:text-xl mb-1" style={{ color: '#667C58' }}>
                Green Haus
              </h3>
              <p className="text-kinship-text text-xs lg:text-sm leading-tight mb-2" style={{ color: '#4f575c' }}>
                A truly one-of-a-kind venue - a lush greenhouse flooded with light, perfect for weddings and events.
              </p>
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold transition-all duration-300 w-full"
                style={{
                  backgroundColor: '#667C58',
                  color: '#ffffff',
                  border: '1px solid #667C58'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#556649';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#667C58';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Host your event
              </Link>
            </div>
          </div>

          {/* Conference Room */}
          <div className="bg-white overflow-hidden shadow-md" style={{ border: '1px solid rgba(132, 158, 116, 0.2)' }}>
            {/* Image */}
            <div className="relative h-[350px] lg:h-[400px] overflow-hidden">
              <Image
                src="/images/home/conference-room.webp"
                alt="Kinship Landing conference room with large table and flatscreen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            {/* Content - Compact */}
            <div className="p-3 lg:p-4">
              <h3 className="font-heading font-bold text-lg sm:text-xl mb-1" style={{ color: '#667C58' }}>
                Conference Room
              </h3>
              <p className="text-kinship-text text-xs lg:text-sm leading-tight mb-2" style={{ color: '#4f575c' }}>
                For small meetings and professional gatherings - without the stuffy vibe. Catering from Homa.
              </p>
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold transition-all duration-300 w-full"
                style={{
                  backgroundColor: '#667C58',
                  color: '#ffffff',
                  border: '1px solid #667C58'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#556649';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#667C58';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Reserve the room
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}