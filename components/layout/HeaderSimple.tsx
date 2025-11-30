'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from '@/components/icons';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/rooms', label: 'Rooms' },
  { href: '/homa', label: 'Café + Bar' },
  { href: '/events', label: 'Events' },
  { href: '/community', label: 'Community' }
];

export function HeaderSimple() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-kinship-white text-kinship-text px-4 py-2 rounded z-[60]">
        Skip to main content
      </a>
      
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          hasScrolled
            ? 'bg-kinship-white/95 backdrop-blur-sm border-b border-kinship-divider shadow-card'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-wrap mx-auto px-4 sm:px-6">
          <nav className="flex items-center justify-between py-4 lg:py-5">
            {/* Left-aligned Wordmark */}
            <Link
              href="/"
              className={cn(
                'text-2xl font-serif font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kinship-green rounded',
                hasScrolled ? 'text-kinship-text' : 'text-kinship-white'
              )}
              style={{ letterSpacing: '0.02em' }}
            >
              Kinship Landing
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-kinship-green',
                    hasScrolled ? 'text-kinship-text' : 'text-kinship-white'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="btn-primary ml-4">
                Book Now
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={cn(
                      'transition-colors',
                      hasScrolled ? 'text-kinship-text hover:bg-kinship-sage' : 'text-kinship-white hover:bg-kinship-white/20'
                    )}
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-kinship-white border-l-kinship-divider">
                  <div className="flex flex-col gap-6 pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-serif font-bold text-kinship-text">
                        Menu
                      </span>
                    </div>
                    
                    <nav className="flex flex-col gap-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-kinship-text hover:text-kinship-green transition-colors py-2"
                          onClick={() => setIsMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                    
                    <Button className="btn-primary w-full mt-4" onClick={() => setIsMobileOpen(false)}>
                      Book Now
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}