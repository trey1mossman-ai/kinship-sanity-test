'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin } from '@/components/icons';
import { cn } from '@/lib/utils';

interface BookingBarProps {
  stickyOnScroll?: boolean;
  variant?: 'hero' | 'sticky';
  className?: string;
}

export function BookingBar({ stickyOnScroll = false, variant = 'hero', className }: BookingBarProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  useEffect(() => {
    if (stickyOnScroll) {
      const handleScroll = () => {
        setHasScrolled(window.scrollY > 600);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [stickyOnScroll]);

  // Format date for input
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setCheckIn(formatDate(today));
    setCheckOut(formatDate(tomorrow));
  }, []);

  const handleBooking = () => {
    // Construct booking URL with parameters
    const params = new URLSearchParams({
      checkin: checkIn,
      checkout: checkOut,
      guests: guests
    });
    
    // Replace with actual booking system URL
    window.open(`https://kinshiplanding.com/book?${params}`, '_blank', 'noopener,noreferrer');
  };

  const isSticky = variant === 'sticky';
  const showSticky = stickyOnScroll && hasScrolled;

  if (isSticky && !showSticky) return null;

  return (
    <div
      className={cn(
        'transition-all duration-300',
        isSticky && [
          'fixed top-16 left-0 right-0 z-40 bg-kinship-white/95 backdrop-blur-sm border-b border-kinship-divider shadow-card',
          showSticky ? 'translate-y-0' : '-translate-y-full'
        ],
        !isSticky && 'relative',
        className
      )}
    >
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className={cn(
          'flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4',
          isSticky ? 'py-3' : 'py-4 sm:py-6'
        )}>
          
          {/* Check-in Date */}
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-kinship-text/80 mb-1 uppercase tracking-wider">
              Check In
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kinship-text/60" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-kinship-divider rounded-lg bg-kinship-white text-kinship-text focus:ring-2 focus:ring-kinship-green focus:border-kinship-green"
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-kinship-text/80 mb-1 uppercase tracking-wider">
              Check Out
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kinship-text/60" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-kinship-divider rounded-lg bg-kinship-white text-kinship-text focus:ring-2 focus:ring-kinship-green focus:border-kinship-green"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="sm:w-32">
            <label className="block text-xs font-medium text-kinship-text/80 mb-1 uppercase tracking-wider">
              Guests
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kinship-text/60" />
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-kinship-divider rounded-lg bg-kinship-white text-kinship-text focus:ring-2 focus:ring-kinship-green focus:border-kinship-green appearance-none"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="sm:ml-2">
            {!isSticky && (
              <div className="text-xs font-medium text-kinship-text/80 mb-1 uppercase tracking-wider opacity-0">
                Book
              </div>
            )}
            <Button 
              onClick={handleBooking}
              className="btn-primary w-full sm:w-auto px-8 py-2.5"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}