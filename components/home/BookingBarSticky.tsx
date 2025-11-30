'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function BookingBarSticky() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 bg-kinship-white border-t border-kinship-divider shadow-card transform transition-all duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-wrap mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Property info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-serif font-bold text-kinship-text truncate">
              Kinship Landing
            </h3>
            <p className="text-sm text-kinship-text/70">
              Boutique hotel in Colorado Springs
            </p>
          </div>

          {/* Center: Quick booking form (hidden on mobile) */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 justify-center">
            <div className="flex items-center space-x-2">
              <label htmlFor="checkin-sticky" className="text-sm font-medium text-kinship-text">
                Check-in
              </label>
              <input
                id="checkin-sticky"
                type="date"
                className="px-3 py-2 border border-kinship-divider rounded-lg text-sm focus:ring-2 focus:ring-kinship-green focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="checkout-sticky" className="text-sm font-medium text-kinship-text">
                Check-out
              </label>
              <input
                id="checkout-sticky"
                type="date"
                className="px-3 py-2 border border-kinship-divider rounded-lg text-sm focus:ring-2 focus:ring-kinship-green focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="guests-sticky" className="text-sm font-medium text-kinship-text">
                Guests
              </label>
              <select
                id="guests-sticky"
                className="px-3 py-2 border border-kinship-divider rounded-lg text-sm focus:ring-2 focus:ring-kinship-green focus:border-transparent"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>
          </div>

          {/* Right: CTA Button */}
          <div className="flex-shrink-0 ml-4">
            <Button 
              asChild
              className="btn-primary px-6 py-3 font-semibold"
            >
              <a href="/book" aria-label="Check availability and book your stay">
                Check Availability
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile booking form (visible on small screens) */}
        <div className="lg:hidden mt-4 pt-4 border-t border-kinship-divider">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label htmlFor="checkin-mobile" className="block text-xs font-medium text-kinship-text mb-1">
                Check-in
              </label>
              <input
                id="checkin-mobile"
                type="date"
                className="w-full px-3 py-2 border border-kinship-divider rounded-lg text-sm focus:ring-2 focus:ring-kinship-green focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="checkout-mobile" className="block text-xs font-medium text-kinship-text mb-1">
                Check-out
              </label>
              <input
                id="checkout-mobile"
                type="date"
                className="w-full px-3 py-2 border border-kinship-divider rounded-lg text-sm focus:ring-2 focus:ring-kinship-green focus:border-transparent"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="guests-mobile" className="block text-xs font-medium text-kinship-text mb-1">
              Number of guests
            </label>
            <select
              id="guests-mobile"
              className="w-full px-3 py-2 border border-kinship-divider rounded-lg text-sm focus:ring-2 focus:ring-kinship-green focus:border-transparent"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}