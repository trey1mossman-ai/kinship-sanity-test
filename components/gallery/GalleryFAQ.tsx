'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KINSHIP_COLORS, KINSHIP_FONTS } from '@/lib/config/brand';
import { buildFAQSchema } from '@/lib/utils/faq-schema';

interface FAQ {
  question: string;
  answer_short: string;
  answer_long: string;
}

const galleryFaqs: FAQ[] = [
  {
    question: "What types of images are in the Kinship Landing gallery?",
    answer_short: "The gallery features guest rooms, event spaces, Homa Café + Bar, outdoor areas, weddings, and mountain views.",
    answer_long: "You'll find interior room shots, suites with wooden decor, junior suites, family suites with bunk beds, and bathroom vanities. There are also images of food and drinks from Homa, outdoor views of The Yard and Camp Deck, the Greenhaus event space, and candid moments from weddings and gatherings. Mountain views and exterior shots round out the collection."
  },
  {
    question: "Does the gallery include photos of all room types?",
    answer_short: "Yes. The gallery showcases suites, junior suites, and family suites to help you visualize each room style.",
    answer_long: "We include images of every room category: standard suites with queen beds, junior suites with desks and ottomans, and family suites featuring bunk beds. You'll also see details like bathroom vanities, bedding, and room layouts to give you a clear sense of what to expect before you book."
  },
  {
    question: "Are there images of event spaces like The Greenhaus, Yard, and Camp Deck?",
    answer_short: "Yes. The gallery features photos of all event spaces, including setups and real events.",
    answer_long: "You'll see guests relaxing in The Greenhaus, ceremony and reception setups in The Yard, and intimate gatherings on The Camp Deck. We've included both styled shots and candid moments from actual weddings and corporate events to help you envision your own celebration."
  },
  {
    question: "Does the gallery feature weddings and special events?",
    answer_short: "Yes. We showcase real weddings, receptions, and social gatherings throughout the gallery.",
    answer_long: "Wedding couples, reception setups, and candid moments from celebrations are all featured. These images highlight how our venues—The Yard, Greenhaus, and Camp Deck—transform for ceremonies, cocktail hours, and receptions. They're a great way to see Kinship Landing in action as a wedding and event destination."
  },
  {
    question: "Can I view food and drink offerings in the gallery?",
    answer_short: "Yes. The gallery highlights signature dishes and drinks from Homa Café + Bar.",
    answer_long: "You'll find images of popular menu items like grain bowls, cauliflower pops, hand pies, salads, sandwiches, and seasonal specials. Drink photos include espresso drinks, craft cocktails, kombucha on tap, and local beer. It's a visual preview of what you can enjoy during your stay."
  },
  {
    question: "Are there photos of mountain views and outdoor areas?",
    answer_short: "Yes. The gallery features mountain views, exterior shots, and outdoor seating areas.",
    answer_long: "Expect to see mountain range views from guest rooms, exterior hotel shots at night with string lights, and outdoor seating in The Yard. We've captured the natural beauty surrounding Kinship Landing, including Pikes Peak views and the relaxed outdoor atmosphere that makes our property special."
  },
  {
    question: "Can I take photos inside Kinship Landing?",
    answer_short: "Yes. Guests are welcome to take photos, but please be respectful of other guests' privacy.",
    answer_long: "Feel free to snap photos in your room, common areas, and outdoor spaces. We just ask that you avoid using flash in public areas and large equipment that might disrupt other guests. If you're planning a professional shoot or content creation session, check with the front desk first."
  },
  {
    question: "How can I request high-resolution images for press or marketing use?",
    answer_short: "Email hello@kinshiplanding.com with your request and usage details.",
    answer_long: "Media inquiries and requests for high-resolution images should be sent to hello@kinshiplanding.com. Let us know what images you need, how you plan to use them, and any publication or campaign details. We're happy to provide assets for press, partnerships, and approved marketing uses."
  }
];

export function GalleryFAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  // Show first 5 FAQs initially, or all if showAll is true
  const displayedFaqs = showAll ? galleryFaqs : galleryFaqs.slice(0, 5);

  // Inject JSON-LD schema for SEO/AEO
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(buildFAQSchema(
      galleryFaqs,
      'https://kinshiplanding.com/gallery',
      'Kinship Landing Gallery FAQs'
    ));
    script.id = 'gallery-faq-schema';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('gallery-faq-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
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
            Gallery FAQs
          </h2>
          <p
            className="text-lg"
            style={{
              fontFamily: KINSHIP_FONTS.body,
              color: KINSHIP_COLORS.greenDark,
              opacity: 0.8
            }}
          >
            Everything you need to know about our gallery and photography
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
        {galleryFaqs.length > 5 && (
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
              {showAll ? 'Show Less' : `Show All ${galleryFaqs.length} Questions`}
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
