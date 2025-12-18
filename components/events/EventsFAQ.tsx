'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KINSHIP_COLORS, KINSHIP_FONTS } from '@/lib/config/brand';

interface FAQ {
  question: string;
  answer_short: string;
  answer_long: string;
}

interface EventsFAQProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  faqItems?: Array<{
    _key: string;
    question: string;
    answerShort: string;
    answerLong: string;
  }>;
}

const defaultEventsFaqs: FAQ[] = [
  {
    question: "What event venues does Kinship Landing offer?",
    answer_short: "We have four unique spaces: The Yard (200 guests), The Greenhaus (50-70), Conference Room (2-10), and The Camp Deck (10-20).",
    answer_long: "The Yard is a 6,900 sq ft outdoor lawn with shade trees and mountain views. The Greenhaus is a light-filled indoor venue with lush greenery. The Conference Room is fully equipped for small meetings with A/V and catering. The Camp Deck offers indoor-outdoor flow perfect for intimate gatherings."
  },
  {
    question: "Does Kinship Landing offer full buyouts for weddings or corporate retreats?",
    answer_short: "Yes. A Kinship Takeover gives you exclusive use of all 40 rooms, event spaces, and Homa Café + Bar.",
    answer_long: "With 40 guest rooms and 58 beds, we can host up to 99 overnight guests for your wedding, retreat, or group event. The Takeover includes private access to The Yard, Greenhaus, Conference Room, and café, plus custom food and beverage packages. It's perfect for multi-day celebrations or executive retreats where you need privacy, team bonding, and zero distractions."
  },
  {
    question: "What's included with event catering at Kinship Landing?",
    answer_short: "All event packages include custom food and beverage from Homa Café + Bar, with local ingredients and seasonal menus.",
    answer_long: "Our in-house culinary team designs menus tailored to your event. We offer everything from passed appetizers and plated dinners to cocktail receptions and family-style feasts. Bar service includes wine, beer, cocktails, and non-alcoholic options. Tables, chairs, linens, glassware, and professional staff are all part of the package."
  },
  {
    question: "Can I host an outdoor wedding ceremony or reception at Kinship Landing?",
    answer_short: "Yes. The Yard is our signature outdoor space for ceremonies and receptions, with capacity for up to 200 guests.",
    answer_long: "The Yard features mature shade trees, views of Pikes Peak, and 6,900 sq ft of lawn space. It's ideal for ceremonies, cocktail hours, and tented receptions. Couples often combine The Yard with The Greenhaus for indoor-outdoor flow. We also have The Camp Deck, a smaller outdoor space perfect for micro-weddings or intimate sunset gatherings."
  },
  {
    question: "What wedding packages are available?",
    answer_short: "We offer three tiers: Wedding Takeover (full buyout), Reception + Rooms (venue + lodging), and Reception + Catering (venue only).",
    answer_long: "The Wedding Takeover includes exclusive use of the hotel for up to 99 guests. Reception + Rooms gives you access to The Yard or Greenhaus plus a block of guest rooms. Reception + Catering is venue rental with custom menus and bar service. All packages include event planning support, setup, breakdown, and coordination with your vendors."
  },
  {
    question: "What types of corporate events can Kinship Landing host?",
    answer_short: "We host meetings, product launches, retreats, team-building events, holiday parties, and private dinners.",
    answer_long: "The Conference Room is perfect for board meetings, workshops, and presentations with 2-10 people. The Greenhaus works well for larger groups, keynote sessions, or networking receptions. For multi-day retreats, book a room block or full buyout and combine workspace with lodging. All spaces include Wi-Fi, A/V equipment, catering, and event support."
  },
  {
    question: "Are group room blocks available for events?",
    answer_short: "Yes. We offer group rates for 10+ rooms, plus a custom booking link for your guests.",
    answer_long: "Group bookings come with discounted room rates, flexible booking windows, and a dedicated link your guests can use to reserve. We can accommodate up to 99 overnight guests across 40 rooms. For full buyouts, you get exclusive access to the entire property. Our team will work with you on rooming lists, VIP upgrades, and special requests."
  },
  {
    question: "Does Kinship Landing provide event planning and coordination?",
    answer_short: "Yes. Our events team provides planning support, vendor coordination, and day-of execution for all bookings.",
    answer_long: "From your first inquiry to the final toast, our team is here to help. We'll walk you through venue options, design custom menus, coordinate logistics, and ensure everything runs smoothly. We work with your preferred vendors or connect you with trusted local partners for florals, photography, music, and more."
  },
  {
    question: "What amenities are included with event spaces?",
    answer_short: "All spaces include Wi-Fi, A/V equipment, climate control, tables, chairs, and on-site catering from Homa.",
    answer_long: "The Greenhaus and Conference Room have air conditioning and heating. The Yard offers shade, string lights, and mountain views. The Camp Deck has indoor-outdoor access and cozy fire pit seating. All venues come with professional event setup, cleanup, and support staff. Add-ons like linens, florals, and rentals can be arranged through our preferred vendors."
  },
  {
    question: "Can I bring my own vendors (photographer, DJ, florist)?",
    answer_short: "Yes. You're welcome to bring your own vendors, or we can recommend trusted local partners.",
    answer_long: "We love working with outside vendors and have no exclusive contracts. Bring your photographer, DJ, florist, or planner—just let us know in advance so we can coordinate load-in and setup. If you need recommendations, we're happy to connect you with talented local pros we've worked with before."
  },
  {
    question: "Are pets allowed at events?",
    answer_short: "Service dogs are always welcome. For private events, pet policies can be customized with advance notice.",
    answer_long: "If you're booking a full buyout or private event, we're happy to discuss pet-friendly arrangements. Many couples include their dogs in wedding ceremonies, and we love that. Just check with our events team ahead of time so we can plan accordingly and ensure a safe, comfortable experience for everyone."
  },
  {
    question: "How do I request a quote or book an event?",
    answer_short: "Fill out our Request a Quote form online, or email events@kinshiplanding.com to start the conversation.",
    answer_long: "Our events team will respond within 1-2 business days with availability, pricing, and next steps. We'll schedule a call or site visit to walk through your vision, show you the spaces, and design a custom proposal. Once you're ready, we'll send a contract and collect a deposit to lock in your date."
  }
];

export function EventsFAQ({ sectionTitle, sectionSubtitle, faqItems }: EventsFAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  // Use Sanity data if available, otherwise use defaults
  const title = sectionTitle || 'Events FAQs';
  const subtitle = sectionSubtitle || 'Everything you need to know about hosting events at Kinship';

  const eventsFaqs: FAQ[] = faqItems && faqItems.length > 0
    ? faqItems.map(item => ({
        question: item.question,
        answer_short: item.answerShort,
        answer_long: item.answerLong,
      }))
    : defaultEventsFaqs;

  // Show first 5 FAQs initially, or all if showAll is true
  const displayedFaqs = showAll ? eventsFaqs : eventsFaqs.slice(0, 5);

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
            {title}
          </h2>
          <p
            className="text-lg"
            style={{
              fontFamily: KINSHIP_FONTS.body,
              color: KINSHIP_COLORS.greenDark,
              opacity: 0.8
            }}
          >
            {subtitle}
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
        {eventsFaqs.length > 5 && (
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
              {showAll ? 'Show Less' : `Show All ${eventsFaqs.length} Questions`}
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
