'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [aboutDropdownLocked, setAboutDropdownLocked] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const dropdown = document.getElementById('about-dropdown');
      const button = document.getElementById('about-button');

      if (aboutDropdownLocked && dropdown && button) {
        if (!dropdown.contains(target) && !button.contains(target)) {
          setAboutDropdownLocked(false);
          setAboutDropdownOpen(false);
        }
      }
    };

    if (aboutDropdownLocked) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [aboutDropdownLocked]);

  const handleAboutClick = () => {
    if (aboutDropdownLocked) {
      // If locked, close it
      setAboutDropdownLocked(false);
      setAboutDropdownOpen(false);
    } else {
      // If not locked, lock it open
      setAboutDropdownLocked(true);
      setAboutDropdownOpen(true);
    }
  };

  const handleAboutMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }

    if (!aboutDropdownLocked) {
      setAboutDropdownOpen(true);
    }
  };

  const handleAboutMouseLeave = () => {
    if (!aboutDropdownLocked) {
      // Add a delay before closing to give users time to move mouse to dropdown
      const timeout = setTimeout(() => {
        setAboutDropdownOpen(false);
      }, 400); // 400ms delay - generous but not too slow
      setCloseTimeout(timeout);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 max-w-[1600px] mx-auto">
          {/* Logos - Kinship + Homa - Exact original sizes with overflow protection */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/"
              aria-label="Kinship Landing Home"
            >
              <img
                src="/brand/KL-Lockup-Logo-GREEN-cropped.svg"
                alt="Kinship Landing"
                width={312}
                height={100}
                className={`h-10 sm:h-12 lg:h-14 w-auto transition-all duration-300 ${
                  !isScrolled && !isMobileMenuOpen ? 'brightness-0 invert' : ''
                }`}
              />
            </Link>
            <Link
              href="/homa"
              aria-label="HOMA Café + Bar"
            >
              <img
                src="/brand/homa-logo.svg"
                alt="Homa Café + Bar"
                width={100}
                height={50}
                className={`h-20 sm:h-24 lg:h-28 w-auto transition-all duration-300 mt-3 sm:mt-4 lg:mt-5 ${
                  !isScrolled && !isMobileMenuOpen ? 'brightness-0 invert' : ''
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation - Compact on tablets, normal on desktop */}
          <nav className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-6 flex-shrink-0">
            <Link
              href="/rooms"
              className={`font-medium transition-colors whitespace-nowrap ${
                isScrolled ? 'text-kinship-text hover:text-kinship-green' : 'text-white hover:text-white/80'
              }`}
            >
              Rooms
            </Link>
            <Link
              href="/events"
              className={`font-medium transition-colors whitespace-nowrap ${
                isScrolled ? 'text-kinship-text hover:text-kinship-green' : 'text-white hover:text-white/80'
              }`}
            >
              Events
            </Link>
            <Link
              href="/homa"
              className={`font-medium transition-colors whitespace-nowrap ${
                isScrolled ? 'text-kinship-text hover:text-kinship-green' : 'text-white hover:text-white/80'
              }`}
            >
              Eat & Drink
            </Link>

            {/* About Link - No Dropdown */}
            <Link
              href="/about"
              className={`font-medium transition-colors whitespace-nowrap ${
                isScrolled ? 'text-kinship-text hover:text-kinship-green' : 'text-white hover:text-white/80'
              }`}
            >
              About
            </Link>

            <Link
              href="/gallery"
              className={`font-medium transition-colors whitespace-nowrap ${
                isScrolled ? 'text-kinship-text hover:text-kinship-green' : 'text-white hover:text-white/80'
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/explore"
              className={`font-medium transition-colors whitespace-nowrap ${
                isScrolled ? 'text-kinship-text hover:text-kinship-green' : 'text-white hover:text-white/80'
              }`}
            >
              Explore
            </Link>

            <Link
              href="/offers"
              className={`font-medium transition-colors whitespace-nowrap ${
                isScrolled ? 'text-kinship-text hover:text-kinship-green' : 'text-white hover:text-white/80'
              }`}
            >
              Offers
            </Link>

            <Link
              href="/community"
              className={`font-medium transition-colors whitespace-nowrap ${
                isScrolled ? 'text-kinship-text hover:text-kinship-green' : 'text-white hover:text-white/80'
              }`}
            >
              Community
            </Link>

            {/* Book Now Button - External Cloudbeds Link */}
            <a
              href="https://hotels.cloudbeds.com/reservation/4nfQ6E"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2 font-bold transition-all duration-300 whitespace-nowrap ${
                isScrolled
                  ? 'bg-[#667C58] text-white hover:bg-[#556649] shadow-md'
                  : 'bg-white text-[#667C58] hover:bg-white/90 shadow-lg'
              }`}
              aria-label="Book your stay at Kinship Landing"
            >
              BOOK NOW
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors flex-shrink-0 ${
              isScrolled || isMobileMenuOpen ? 'text-kinship-text' : 'text-white'
            }`}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-2 pb-4 space-y-1 bg-white shadow-xl border-t border-gray-100">
            <Link
              href="/rooms"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-kinship-text hover:bg-kinship-gray-bg hover:text-kinship-green transition-colors"
            >
              Rooms
            </Link>
            <Link
              href="/events"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-kinship-text hover:bg-kinship-gray-bg hover:text-kinship-green transition-colors"
            >
              Events
            </Link>
            <Link
              href="/homa"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-kinship-text hover:bg-kinship-gray-bg hover:text-kinship-green transition-colors"
            >
              Eat & Drink
            </Link>

            {/* About Link - Mobile */}
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-kinship-text hover:bg-kinship-gray-bg hover:text-kinship-green transition-colors"
            >
              About
            </Link>

            <Link
              href="/gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-kinship-text hover:bg-kinship-gray-bg hover:text-kinship-green transition-colors"
            >
              Gallery
            </Link>

            <Link
              href="/explore"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-kinship-text hover:bg-kinship-gray-bg hover:text-kinship-green transition-colors"
            >
              Explore
            </Link>

            <Link
              href="/offers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-kinship-text hover:bg-kinship-gray-bg hover:text-kinship-green transition-colors"
            >
              Offers
            </Link>

            <Link
              href="/community"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-kinship-text hover:bg-kinship-gray-bg hover:text-kinship-green transition-colors"
            >
              Community
            </Link>

            <a
              href="https://hotels.cloudbeds.com/reservation/4nfQ6E"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 mt-2 text-base font-bold text-white bg-[#849e74] hover:bg-[#667C58] transition-colors text-center rounded"
            >
              BOOK NOW
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
