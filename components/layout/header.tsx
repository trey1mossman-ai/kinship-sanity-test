'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from '@/components/icons';
import { cn } from '@/lib/utils';

const navItems: { href: string; label: string }[] = [
  // Homepage only - no additional navigation items
];

export function Header() {
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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-charcoal px-4 py-2 rounded z-[60]">
        Skip to main content
      </a>
      
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          hasScrolled
            ? 'bg-white/92 backdrop-blur border-b border-black/5 shadow-hairline'
            : 'bg-transparent'
        )}
      >
        <div className="container">
          <nav className="flex items-center justify-between py-4 lg:py-6">
            {/* Logo / Wordmark */}
            <Link
              href="/"
              className={cn(
                'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive rounded',
                hasScrolled ? 'text-charcoal' : 'text-white'
              )}
              aria-label="Kinship Landing - Home"
            >
              <div className="relative">
                <Image
                  src="/brand/kinship-wordmark.svg"
                  alt=""
                  width={112}
                  height={24}
                  priority
                  className={cn(
                    'transition-all duration-300',
                    hasScrolled 
                      ? 'brightness-100 invert-0' 
                      : 'brightness-0 invert'
                  )}
                  style={{
                    filter: hasScrolled 
                      ? 'none' 
                      : 'brightness(0) invert(1)'
                  }}
                />
                {/* Fallback text */}
                <span 
                  className="sr-only font-serif font-bold tracking-[.02em]"
                  aria-hidden="true"
                >
                  Kinship
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Hidden since homepage only */}
            {navItems.length > 0 && (
              <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-[12px] font-medium tracking-[.12em] transition-colors hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive rounded px-2 py-1',
                      hasScrolled 
                        ? 'text-charcoal' 
                        : 'text-white text-shadow-soft'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}

            {/* Mobile Menu Only - No CTA */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu */}
              {navItems.length > 0 && (
              <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'lg:hidden p-2',
                      hasScrolled 
                        ? 'text-charcoal hover:bg-charcoal/10' 
                        : 'text-white hover:bg-white/10 text-shadow-soft'
                    )}
                    aria-label="Open navigation menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                
                <SheetContent 
                  side="right" 
                  className="w-full sm:w-[400px] bg-white border-l border-stone p-0"
                  aria-label="Navigation menu"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Nav Items - Empty for homepage only */}
                    <nav className="flex-1 pt-20 pb-6 px-6" aria-label="Mobile navigation">
                      <div className="space-y-6">
                        {navItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="block text-lg font-medium text-charcoal tracking-[.05em] hover:text-olive transition-colors focus:outline-none focus:ring-2 focus:ring-olive rounded px-2 py-1"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}