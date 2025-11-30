'use client';

import Image from 'next/image';
import Link from 'next/link';

export function VenuesSection() {
  return (
    <section className="py-2 md:py-3 lg:py-4 relative overflow-hidden" style={{
      background: 'linear-gradient(to bottom, #efe7dd 0%, #ffffff 15%, #ffffff 100%)'
    }}>
      <div className="max-w-[1600px] mx-auto px-2 sm:px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-3">

          {/* Green Haus */}
          <div className="bg-white overflow-hidden shadow-md" style={{ border: '1px solid rgba(132, 158, 116, 0.2)' }}>
            {/* Image */}
            <div className="relative h-[450px] lg:h-[500px] overflow-hidden">
              <Image
                src="/images/home/green-haus.webp"
                alt="Green Haus at Kinship Landing - a lush, light-filled greenhouse venue"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Content - Compact */}
            <div className="p-3 lg:p-4">
              <h3 className="font-heading font-bold text-xl sm:text-2xl mb-1.5" style={{ color: '#667C58' }}>
                Green Haus
              </h3>
              <p className="text-kinship-text text-xs lg:text-sm leading-tight mb-3" style={{ color: '#4f575c' }}>
                A truly one-of-a-kind venue in Colorado Springs - a lush greenhouse flooded with light.
                An urban jungle in the heart of downtown and a beautiful backdrop for weddings,
                events, lectures, or your next great gathering.
              </p>
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold transition-all duration-300"
                style={{
                  backgroundColor: '#667C58',
                  color: '#ffffff',
                  border: '1px solid #667C58',
                  borderRadius: '0'
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
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Conference Room */}
          <div className="bg-white overflow-hidden shadow-md" style={{ border: '1px solid rgba(132, 158, 116, 0.2)' }}>
            {/* Image */}
            <div className="relative h-[450px] lg:h-[500px] overflow-hidden">
              <Image
                src="/images/home/conference-room.webp"
                alt="Kinship Landing conference room with large table and flatscreen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Content - Compact */}
            <div className="p-3 lg:p-4">
              <h3 className="font-heading font-bold text-xl sm:text-2xl mb-1.5" style={{ color: '#667C58' }}>
                Conference Room
              </h3>
              <p className="text-kinship-text text-xs lg:text-sm leading-tight mb-3" style={{ color: '#4f575c' }}>
                For small meetings, private events, and professional gatherings - without the stuffy vibe.
                Tucked on our first floor with Kinship's modern, cozy style: a large table and chairs,
                flatscreen with easy hookups, and catering options from Homa.
              </p>
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold transition-all duration-300"
                style={{
                  backgroundColor: '#667C58',
                  color: '#ffffff',
                  border: '1px solid #667C58',
                  borderRadius: '0'
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
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}