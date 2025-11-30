'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FAQItem as FAQData } from './faq-data';
import { FAQChips } from './FAQChips';

interface FAQItemProps {
  faq: FAQData;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

export function FAQItem({ faq, isExpanded, onToggle, index }: FAQItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#faq-${faq.id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse answer for internal links
  const parseAnswer = (text: string) => {
    // Replace first mentions with links
    return text
      .replace(/Homa Café \+ Bar/i, '<a href="/dining" class="text-kinship-evergreen underline hover:opacity-80">Homa Café + Bar</a>')
      .replace(/Rooms/i, '<a href="/rooms" class="text-kinship-evergreen underline hover:opacity-80">Rooms</a>')
      .replace(/Contact/i, '<a href="/contact" class="text-kinship-evergreen underline hover:opacity-80">Contact</a>')
      .replace(/Parking/i, '<a href="#parking" class="text-kinship-evergreen underline hover:opacity-80">Parking</a>');
  };

  // Get FAQ-specific chips based on the question
  const getFAQChips = () => {
    switch (faq.id) {
      case 'check-in-out':
        return ['Mountain Time', 'Late checkout $10'];
      case 'parking':
        return ['Metropolis app', 'In/out privileges'];
      case 'pets':
        return ['2nd floor rooms', '$49 per night'];
      case 'accessibility':
        return ['Wheelchair accessible', 'ADA compliant'];
      case 'dining':
        return ['All-day menu', 'Lobby café'];
      case 'nearby-attractions':
        return ['0.2 mi to museums', 'Walkable downtown'];
      default:
        return [];
    }
  };

  return (
    <div 
      id={`faq-${faq.id}`}
      className="transition-all duration-300 mx-4 md:mx-0"
      style={{
        borderBottom: '1px solid rgba(132, 158, 116, 0.15)',
        backgroundColor: isExpanded ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
        marginBottom: isExpanded ? '8px' : '0',
        marginTop: isExpanded ? '8px' : '0'
      }}
    >
      <h3>
        <button
          id={`${faq.id}-control`}
          aria-expanded={isExpanded}
          aria-controls={`${faq.id}-panel`}
          onClick={onToggle}
          className="w-full px-6 md:px-8 py-6 text-left flex items-start justify-between gap-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kinship-evergreen focus-visible:ring-offset-2"
        >
          <div className="flex-grow">
            <span className="text-lg font-medium text-kinship-text leading-relaxed block">
              {faq.question}
            </span>
            {isExpanded && (
              <div className="mt-1 text-sm" style={{ color: '#849e74' }}>
                Quick answer
              </div>
            )}
          </div>
          <div
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-all duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            style={{
              backgroundColor: isExpanded ? '#667C58' : 'rgba(132, 158, 116, 0.1)',
              marginTop: '-2px'
            }}
          >
            <svg
              className="w-4 h-4"
              style={{ color: isExpanded ? '#ffffff' : '#667C58' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
            </svg>
          </div>
        </button>
      </h3>

      <div
        id={`${faq.id}-panel`}
        role="region"
        aria-labelledby={`${faq.id}-control`}
        hidden={!isExpanded}
        className={`transition-all duration-300 ${isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="px-6 md:px-8 pb-6 pt-2">
          {/* Answer short - the direct answer */}
          <p className="text-base text-kinship-text leading-relaxed mb-4 font-medium pr-12">
            {faq.answer_short}
          </p>

          {/* Answer long - supporting details */}
          {faq.answer_long && faq.answer_long.length > 0 && (
            <div className="mb-5">
              <p
                className="text-sm text-kinship-text/70 leading-6 pr-12"
                dangerouslySetInnerHTML={{ __html: parseAnswer(faq.answer_long.replace(/\n/g, ' ')) }}
              />
            </div>
          )}

          {/* FAQ-specific chips */}
          {getFAQChips().length > 0 && (
            <FAQChips chips={getFAQChips()} className="mb-5" />
          )}

          {/* Copy link button - more subtle */}
          <div className="pt-2">
            <button
              onClick={handleCopyLink}
              className="text-xs hover:opacity-100 transition-opacity inline-flex items-center gap-1.5"
              style={{ color: 'rgba(132, 158, 116, 0.6)' }}
              aria-label="Copy link to this FAQ"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {copied ? 'Link copied' : 'Share'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}