'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KINSHIP_COLORS, KINSHIP_FONTS } from '@/lib/config/brand';
import { faqs as fallbackFaqs } from './faq-data';

interface FAQAccordionProps {
  sectionTitle?: string;
  faqItems?: {
    id: string;
    question: string;
    answerShort: string;
    answerLong: string;
  }[];
}

export function FAQAccordion({ sectionTitle, faqItems }: FAQAccordionProps) {
  // Use CMS data if available, otherwise fallback to hardcoded
  const faqs = faqItems?.length ? faqItems.map(item => ({
    id: item.id,
    question: item.question,
    answer_short: item.answerShort,
    answer_long: item.answerLong,
    updated_at: '',
    sources: []
  })) : fallbackFaqs;
  
  const displayTitle = sectionTitle || 'Frequently Asked Questions';
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  // Show first 5 FAQs initially, or all if showAll is true
  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  // Auto-open FAQ from hash on mount (e.g., #parking)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    // Find FAQ index by ID
    const faqIndex = faqs.findIndex(faq => faq.id === hash);
    if (faqIndex === -1) return;

    // If FAQ is beyond first 5, show all
    if (faqIndex >= 5) {
      setShowAll(true);
    }

    // Open the FAQ
    setOpenItems(new Set([faqIndex]));

    // Scroll to FAQ after a brief delay (allow rendering)
    setTimeout(() => {
      const element = document.getElementById('faq');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-12 md:py-16 bg-kinship-sage/10" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2
            className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{
              fontFamily: KINSHIP_FONTS.heading,
              color: KINSHIP_COLORS.greenDark,
            }}
          >
            {displayTitle}
          </h2>
          <p
            className="text-lg"
            style={{
              fontFamily: KINSHIP_FONTS.body,
              color: KINSHIP_COLORS.greenDark,
              opacity: 0.8
            }}
          >
            Everything you need to know about your stay
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {displayedFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="border border-kinship-divider bg-white"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', // Blocky, no rounding
              }}
            >
              {/* Question Header - Blocky Button */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-kinship-sage/5 transition-colors duration-200"
                style={{
                  borderBottom: openItems.has(index) ? `1px solid ${KINSHIP_COLORS.divider}` : 'none',
                }}
              >
                <h3
                  className="font-semibold text-lg pr-4"
                  style={{
                    fontFamily: KINSHIP_FONTS.body,
                    color: KINSHIP_COLORS.greenDark,
                  }}
                >
                  {faq.question}
                </h3>

                {/* Blocky Plus/Minus Icon */}
                <motion.div
                  animate={{ rotate: openItems.has(index) ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
                  style={{
                    backgroundColor: openItems.has(index) ? KINSHIP_COLORS.greenDark : KINSHIP_COLORS.divider,
                    color: openItems.has(index) ? 'white' : KINSHIP_COLORS.greenDark,
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </motion.div>
              </button>

              {/* Answer Content */}
              <AnimatePresence initial={false}>
                {openItems.has(index) && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <motion.div
                      className="px-6 py-5 space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        fontFamily: KINSHIP_FONTS.body,
                        color: KINSHIP_COLORS.greenDark,
                      }}
                    >
                      {/* Short Answer - Bold and Prominent */}
                      <div
                        className="text-base font-semibold leading-relaxed"
                        style={{
                          color: KINSHIP_COLORS.greenDark,
                        }}
                      >
                        {faq.answer_short}
                      </div>

                      {/* Divider Line */}
                      <div
                        className="w-16 h-px"
                        style={{
                          backgroundColor: KINSHIP_COLORS.sage,
                          opacity: 0.4,
                        }}
                      />

                      {/* Long Answer - Text Block */}
                      <div
                        className="text-sm leading-relaxed"
                        style={{
                          color: KINSHIP_COLORS.greenDark,
                          opacity: 0.85,
                        }}
                      >
                        {faq.answer_long.replace(/\n/g, ' ')}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Show More/Less Button - Blocky Design */}
        {faqs.length > 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold transition-all duration-300"
              style={{
                backgroundColor: showAll ? KINSHIP_COLORS.sage : KINSHIP_COLORS.greenDark,
                color: showAll ? KINSHIP_COLORS.greenDark : 'white',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {showAll ? 'Show Less' : `Show All ${faqs.length} Questions`}
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}