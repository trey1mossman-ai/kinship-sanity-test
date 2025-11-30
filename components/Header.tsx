'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Menu } from '@/components/icons';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#rooms', label: 'ROOMS' },
  { href: '#room-blocks', label: 'ROOM BLOCKS' },
  { href: '#events', label: 'EVENTS' },
  { href: '#explore', label: 'EXPLORE' },
  { href: '#homa', label: 'HOMA CAFÉ + BAR' },
  { href: '#gallery', label: 'GALLERY' },
  { href: '#reviews', label: 'REVIEWS' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'CONTACT' },
];

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        hasScrolled
          ? 'bg-white/98 backdrop-blur-sm border-b border-borders shadow-sm'
          : 'bg-white/10 backdrop-blur-sm'
      )}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo / Wordmark - Show text at top, logo when scrolled */}
          <Link
            href="/"
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive rounded"
            aria-label="Kinship Landing - Home"
          >
            {hasScrolled ? (
              <div className="flex items-center gap-2">
                <Image
                  src="/brand/kinship-icon.svg"
                  alt="Kinship Landing Icon"
                  width={28}
                  height={28}
                  priority
                  className="w-7 h-7 text-kinship-green"
                  style={{ filter: 'brightness(0) saturate(100%) invert(33%) sepia(9%) saturate(1466%) hue-rotate(60deg) brightness(95%) contrast(86%)' }}
                />
                <span className="text-xl sm:text-2xl font-heading font-bold text-kinship-text tracking-tight hidden sm:inline">
                  Kinship Landing
                </span>
              </div>
            ) : (
              <span className="text-2xl font-heading font-bold text-white drop-shadow-md tracking-tight">
                Kinship Landing
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-xs font-nav font-semibold tracking-kinship-nav uppercase transition-all duration-200 py-2 px-1 relative',
                  'hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-200',
                  hasScrolled 
                    ? 'text-secondary-text hover:text-primary-text after:bg-cta-bg' 
                    : 'text-white/90 hover:text-white after:bg-white',
                  !hasScrolled && 'drop-shadow-sm'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Book Now CTA */}
            <Button
              className="hidden md:inline-flex btn-primary text-xs font-nav uppercase tracking-kinship-button"
            >
              Book Now
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'lg:hidden p-2 rounded-lg',
                    hasScrolled 
                      ? 'text-secondary-text hover:bg-section-alt' 
                      : 'text-white hover:bg-white/20 bg-white/10',
                    'border border-borders/50'
                  )}
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              
              <SheetContent 
                side="right" 
                className="w-full sm:w-[380px] bg-white border-l border-borders p-0"
                aria-label="Navigation menu"
              >
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden>
                <div className="flex flex-col h-full">
                  {/* Mobile Nav Items */}
                  <nav className="flex-1 pt-20 pb-6 px-6" aria-label="Mobile navigation">
                    <div className="space-y-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block py-3 px-2 text-sm font-nav font-semibold text-primary-text hover:text-cta-bg hover:bg-section-alt transition-all rounded-lg tracking-kinship-nav"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </nav>
                  
                  {/* Mobile CTA - Pinned Bottom */}
                  <div className="border-t border-borders p-6">
                    <Button
                      className="w-full btn-primary text-sm font-nav uppercase tracking-kinship-button"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}