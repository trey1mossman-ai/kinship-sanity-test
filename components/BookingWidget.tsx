'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Users, Tag } from '@/components/icons';
import { cn } from '@/lib/utils';
import { content } from '@/content/copy';

interface BookingWidgetProps {
  variant?: 'hero' | 'sticky';
  className?: string;
}

export function BookingWidget({ variant = 'hero', className }: BookingWidgetProps) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    promo: ''
  });
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get Cloudbeds URL from env if available
    const cloudbedsUrl = process.env.NEXT_PUBLIC_CLOUDBEDS_URL;
    
    if (cloudbedsUrl) {
      const params = new URLSearchParams({
        checkin: formData.checkIn,
        checkout: formData.checkOut,
        adults: formData.guests,
        ...(formData.promo && { promo: formData.promo })
      });
      
      window.open(`${cloudbedsUrl}?${params.toString()}`, '_blank');
    } else {
      // Fallback to basic booking page
      window.location.href = '/book';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (variant === 'sticky') {
    return (
      <div className={cn(
        'fixed bottom-0 left-0 right-0 z-40 transform translate-y-full transition-transform duration-300',
        'bg-white/95 backdrop-blur-md border-t border-black/10 shadow-lg px-4 py-3',
        'booking-sticky-visible:translate-y-0', // Custom class for reveal
        className
      )}>
        <form onSubmit={handleSubmit} className="container">
          <div className="flex flex-wrap items-center gap-3 lg:gap-4">
            {/* Compact form fields */}
            <div className="flex-1 min-w-[120px]">
              <Input
                type="date"
                value={formData.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                className="text-sm border-stone"
                aria-label="Check-in date"
                required
              />
            </div>
            <div className="flex-1 min-w-[120px]">
              <Input
                type="date"
                value={formData.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                className="text-sm border-stone"
                aria-label="Check-out date"
                required
              />
            </div>
            <div className="flex-1 min-w-[80px]">
              <Input
                type="number"
                min="1"
                max="8"
                value={formData.guests}
                onChange={(e) => handleInputChange('guests', e.target.value)}
                className="text-sm border-stone"
                aria-label="Number of guests"
                required
              />
            </div>
            <div className="flex-1 min-w-[100px]">
              <Input
                type="text"
                placeholder="Promo"
                value={formData.promo}
                onChange={(e) => handleInputChange('promo', e.target.value)}
                className="text-sm border-stone"
                aria-label="Promo code"
              />
            </div>
            <Button 
              type="submit"
              className="bg-olive hover:bg-olive-dark text-white px-6 py-2 text-sm font-medium tracking-[.05em]"
            >
              {content.booking.availability}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={cn(
      'glass-card w-[280px] sm:w-[320px] lg:w-[360px]',
      className
    )}>
      {/* Best Rate Badge */}
      <div className="text-center mb-4">
        <span className="inline-block bg-olive text-white text-xs font-bold tracking-[.08em] px-3 py-1.5 rounded-full uppercase shadow-md">
          {content.booking.badge}
        </span>
      </div>

      <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
        {/* Date Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="hero-checkin" className="text-sm font-semibold text-charcoal mb-1.5 block">
              {content.booking.checkIn}
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal" />
              <Input
                id="hero-checkin"
                type="date"
                value={formData.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                className="pl-10 bg-white border border-charcoal/30 focus:bg-white focus:border-olive focus:ring-2 focus:ring-olive/20"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="hero-checkout" className="text-sm font-semibold text-charcoal mb-1.5 block">
              {content.booking.checkOut}
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal" />
              <Input
                id="hero-checkout"
                type="date"
                value={formData.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                className="pl-10 bg-white border border-charcoal/30 focus:bg-white focus:border-olive focus:ring-2 focus:ring-olive/20"
                required
              />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div>
          <Label htmlFor="hero-guests" className="text-sm font-semibold text-charcoal mb-1.5 block">
            {content.booking.guests}
          </Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal" />
            <Input
              id="hero-guests"
              type="number"
              min="1"
              max="8"
              value={formData.guests}
              onChange={(e) => handleInputChange('guests', e.target.value)}
              className="pl-10 bg-white/80 border-white/60 focus:bg-white focus:border-olive"
              required
            />
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <Label htmlFor="hero-promo" className="text-sm font-semibold text-charcoal mb-1.5 block">
            {content.booking.promo}
          </Label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal" />
            <Input
              id="hero-promo"
              type="text"
              placeholder="Optional"
              value={formData.promo}
              onChange={(e) => handleInputChange('promo', e.target.value)}
              className="pl-10 bg-white/80 border-white/60 focus:bg-white focus:border-olive"
            />
          </div>
        </div>

        {/* CTA Button */}
        <Button
          type="submit"
          className="w-full btn-primary text-sm font-bold tracking-[.08em]"
        >
          {content.booking.availability}
        </Button>
      </form>
    </div>
  );
}

// Preconnect to Cloudbeds if URL is set
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_CLOUDBEDS_URL) {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = new URL(process.env.NEXT_PUBLIC_CLOUDBEDS_URL).origin;
  document.head.appendChild(link);
}