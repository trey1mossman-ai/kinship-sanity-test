'use client';

import { useState, useEffect } from 'react';
import { FAQItem } from './FAQItem';
import { FAQChips } from './FAQChips';
import { faqs } from './faq-data';

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        // On mobile, close other items when opening a new one
        if (isMobile) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });

    // Track FAQ open event for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'faq_open', {
        faq_id: id,
        page_location: window.location.href
      });
    }
  };

  // Global chips to display above accordion
  const globalChips = [
    'Pet-friendly',
    'Downtown location',
    'On-site dining',
    'Event spaces',
    'Free Wi-Fi'
  ];

  return (
    <section
      id="faq"
      className="py-24 px-6 md:px-8 lg:px-12 relative overflow-hidden"
      style={{
        backgroundColor: 'white',
        backgroundImage: 'url("/textures/KL-Pikes-Peak-Topo-Map-Gray.webp")',
        backgroundSize: '380%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'multiply'
      }}
      aria-labelledby="faq-heading"
    >
      {/* Subtle texture overlay - most subdued */}
      <div className="absolute inset-0 bg-white/[0.85] z-0" />
      
      <div className="max-w-3xl mx-auto relative">
        {/* Section Header - More elegant */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-kinship-evergreen/30" />
            <div className="mx-4 w-2 h-2 rounded-full bg-kinship-evergreen/40" />
            <div className="h-px w-12 bg-kinship-evergreen/30" />
          </div>
          <h2 
            id="faq-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-light text-kinship-text mb-4 tracking-tight"
          >
            Frequently Asked <span className="font-bold" style={{ color: '#849e74' }}>Questions</span>
          </h2>
          <p className="text-base text-kinship-text/60 max-w-xl mx-auto font-light">
            Quick answers to help you plan your perfect stay
          </p>
        </div>

        {/* Global Chips - More subtle */}
        <FAQChips chips={globalChips} className="justify-center mb-10" />

        {/* FAQ Accordion - Cleaner spacing */}
        <div className="divide-y-0" role="region" aria-label="Frequently asked questions">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isExpanded={openItems.has(faq.id)}
              onToggle={() => handleToggle(faq.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}