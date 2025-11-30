'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Users, Tag } from '@/components/icons';
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';
import { content } from '@/content/copy';

interface BookingMiniProps {
  variant?: 'full' | 'sticky';
  className?: string;
}

export function BookingMini({ variant = 'full', className }: BookingMiniProps) {
  const [checkIn, setCheckIn] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 2), 'yyyy-MM-dd'));
  const [guests, setGuests] = useState('2');
  const [promo, setPromo] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (variant === 'sticky') {
      const handleScroll = () => {
        setIsVisible(window.scrollY > 200);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [variant]);

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'checkIn':
        const checkInDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (checkInDate < today) {
          newErrors.checkIn = 'Check-in date must be in the future';
        } else {
          delete newErrors.checkIn;
        }
        break;
      case 'checkOut':
        if (new Date(value) <= new Date(checkIn)) {
          newErrors.checkOut = 'Check-out must be after check-in';
        } else {
          delete newErrors.checkOut;
        }
        break;
      case 'guests':
        if (parseInt(value) < 1 || parseInt(value) > 8) {
          newErrors.guests = 'Guests must be between 1 and 8';
        } else {
          delete newErrors.guests;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleBooking = () => {
    if (Object.keys(errors).length > 0) return;
    
    // Analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'submit_booking', {
        check_in: checkIn,
        check_out: checkOut,
        guests: guests,
      });
    }

    const cloudbeds = process.env.NEXT_PUBLIC_CLOUDBEDS_URL;
    if (cloudbeds) {
      const params = new URLSearchParams({
        checkin: checkIn,
        checkout: checkOut,
        adults: guests,
        ...(promo && { promo: promo }),
      });
      window.open(`${cloudbeds}?${params}`, '_blank');
    } else {
      window.location.href = `/rooms?checkin=${checkIn}&checkout=${checkOut}&guests=${guests}${promo ? `&promo=${promo}` : ''}`;
    }
  };

  if (variant === 'sticky' && !isVisible) {
    return null;
  }

  const isSticky = variant === 'sticky';

  return (
    <div
      className={cn(
        'transition-all duration-300',
        isSticky ? [
          'fixed top-16 left-0 right-0 z-40',
          'bg-white/92 backdrop-blur border-b border-black/5 shadow-hairline',
        ] : [
          'absolute top-24 right-4 md:right-6 z-30',
          'backdrop-blur-md bg-white/65 border border-white/40 shadow-lg',
          'rounded-2xl w-80 max-w-sm',
        ],
        className
      )}
    >
      <div className={cn(
        isSticky ? 'max-w-container mx-auto py-3 px-4 md:px-6' : 'p-4 md:p-5'
      )}>
        {/* Best Rate Badge - only on full variant */}
        {!isSticky && (
          <div className="absolute -top-2 -right-2 bg-olive text-chip text-[10px] font-bold px-2 py-1 rounded-full shadow-md uppercase tracking-wider">
            BOOK HERE FOR BEST RATE
          </div>
        )}

        <div className={cn(
          'flex gap-3',
          isSticky ? 'flex-row items-center' : 'flex-col'
        )}>
          {/* Date Inputs */}
          <div className={cn(
            'grid grid-cols-2 gap-2',
            isSticky && 'flex-1 max-w-sm'
          )}>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/50 pointer-events-none" />
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  validateField('checkIn', e.target.value);
                }}
                className={cn(
                  'pl-10 h-10 text-sm bg-white/50',
                  errors.checkIn && 'border-red-500'
                )}
                aria-label="Check-in date"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/50 pointer-events-none" />
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                  validateField('checkOut', e.target.value);
                }}
                className={cn(
                  'pl-10 h-10 text-sm bg-white/50',
                  errors.checkOut && 'border-red-500'
                )}
                aria-label="Check-out date"
              />
            </div>
          </div>

          {/* Guests & Promo */}
          <div className={cn(
            'flex gap-2',
            isSticky && 'flex-1 max-w-xs'
          )}>
            <div className="relative flex-1">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/50 pointer-events-none" />
              <Input
                type="number"
                min="1"
                max="8"
                value={guests}
                onChange={(e) => {
                  setGuests(e.target.value);
                  validateField('guests', e.target.value);
                }}
                className={cn(
                  'pl-10 h-10 text-sm bg-white/50',
                  errors.guests && 'border-red-500'
                )}
                placeholder="Guests"
                aria-label="Number of guests"
              />
            </div>
            
            {!isSticky && (
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/50 pointer-events-none" />
                <Input
                  type="text"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="pl-10 h-10 text-sm bg-white/50"
                  placeholder="Promo code"
                  aria-label="Promo code"
                />
              </div>
            )}
          </div>

          {/* Book Button */}
          <Button 
            onClick={handleBooking}
            disabled={Object.keys(errors).length > 0}
            className={cn(
              'bg-pine hover:bg-pine/90 text-bone font-medium',
              isSticky ? 'px-6' : 'w-full'
            )}
          >
            CHECK AVAILABILITY
          </Button>
        </div>

        {/* Error Messages - only on full variant */}
        {!isSticky && Object.keys(errors).length > 0 && (
          <div className="mt-2 text-xs text-red-600">
            {Object.values(errors)[0]}
          </div>
        )}
      </div>
    </div>
  );
}