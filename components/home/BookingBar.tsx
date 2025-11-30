'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { content } from '@/content/copy';

export function BookingBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState('2');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 lg:top-20 left-0 right-0 bg-white border-b border-kinship-divider shadow-sm z-40 transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Form fields */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="flex items-center gap-2">
              <label htmlFor="checkin" className="text-sm font-medium text-kinship-text">
                {content.booking.checkIn}
              </label>
              <input
                id="checkin"
                type="date"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
                className="px-3 py-1.5 border border-kinship-divider rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-kinship-green-light"
                aria-label="Select check-in date"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <label htmlFor="checkout" className="text-sm font-medium text-kinship-text">
                {content.booking.checkOut}
              </label>
              <input
                id="checkout"
                type="date"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                className="px-3 py-1.5 border border-kinship-divider rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-kinship-green-light"
                aria-label="Select check-out date"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <label htmlFor="guests" className="text-sm font-medium text-kinship-text">
                {content.booking.guests}
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="px-3 py-1.5 border border-kinship-divider rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-kinship-green-light"
                aria-label="Select number of guests"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
          </div>
          
          {/* CTA */}
          <Link 
            href={`/book?checkin=${checkin}&checkout=${checkout}&guests=${guests}`}
            className="btn-primary whitespace-nowrap"
          >
            {content.booking.availability}
          </Link>
        </div>
      </div>
    </div>
  );
}