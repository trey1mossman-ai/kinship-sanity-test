'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KINSHIP_COLORS, KINSHIP_FONTS } from '@/lib/config/brand';

interface FAQ {
  question: string;
  answer_short: string;
  answer_long: string;
}

interface HomaFAQProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  faqItems?: Array<{
    question: string;
    answerShort: string;
    answerLong: string;
  }>;
}

const defaultHomaFaqs: FAQ[] = [
  {
    question: "What are the hours for Homa Café + Bar?",
    answer_short: "We're open daily from 7:00 AM to 9:00 PM, serving breakfast, lunch, and dinner.",
    answer_long: "Breakfast runs from 7:00–11:00 AM. Lunch and dinner menus are available throughout the day. Hours may shift seasonally or for private events, so check our website or call ahead if you're planning a visit. We're closed on Thanksgiving and Christmas Day."
  },
  {
    question: "Does Homa Café + Bar take reservations?",
    answer_short: "Walk-ins are always welcome. Reservations are available for groups of 6 or more.",
    answer_long: "For parties of 1-5, just walk in and grab a seat. For groups of 6+, we recommend calling ahead or emailing homa@kinshiplanding.com so we can set aside space for you. Large groups or private events require advance coordination."
  },
  {
    question: "What type of food does Homa serve?",
    answer_short: "We serve modern, globally inspired cuisine with a focus on fresh, seasonal ingredients.",
    answer_long: "Think grain bowls, creative salads, hearty sandwiches, and rotating seasonal specials. Breakfast highlights include pancakes, eggs, and hand pies. Lunch and dinner feature favorites like the Club Scout sandwich, fried cauliflower bowl, and Mediterranean-inspired plates. Everything is made in-house by our culinary team."
  },
  {
    question: "Does Homa offer vegetarian, vegan, or gluten-free options?",
    answer_short: "Yes. We have plenty of plant-based options and can accommodate most dietary needs.",
    answer_long: "Many of our bowls, salads, and sides are vegetarian or easily modified. Vegan and gluten-free dishes are available—just ask your server or the counter staff for recommendations. We're happy to work with food allergies and dietary preferences whenever possible."
  },
  {
    question: "What are the best menu items at Homa?",
    answer_short: "Guest favorites include the fried cauliflower bowl, Club Scout sandwich, hand pies, and seasonal grain bowls.",
    answer_long: "At breakfast, people love the pancakes and eggs. For lunch and dinner, the fried cauliflower bowl and Club Scout are top sellers. The grain bowls and salads rotate seasonally, so there's always something new. Our hand pies, kombucha on tap, and craft cocktails are also huge hits."
  },
  {
    question: "Can I work or study at Homa Café + Bar?",
    answer_short: "Yes. We have free Wi-Fi, plenty of outlets, and a relaxed atmosphere perfect for remote work or studying.",
    answer_long: "The space is designed for lingering. Communal tables, cozy nooks, and natural light make Homa a popular spot for laptop workers and students. We don't rush anyone out—just order something, settle in, and stay as long as you need."
  },
  {
    question: "Is Homa Café + Bar kid-friendly?",
    answer_short: "Absolutely. Families are welcome, and we have high chairs and kid-friendly menu options.",
    answer_long: "The open layout and casual vibe make Homa a great spot for families. Kids love the swinging chairs and plant-filled greenhouse room. We offer kid-friendly portions and can customize dishes to suit picky eaters. High chairs are available."
  },
  {
    question: "Does Homa serve coffee, beer, and cocktails?",
    answer_short: "Yes. We serve espresso drinks, drip coffee, craft beer, wine, and creative cocktails all day.",
    answer_long: "Start your morning with espresso or drip coffee. Throughout the day, enjoy rotating kombucha on tap, local craft beer, and natural wines. Our cocktail menu features seasonal drinks made with fresh ingredients. Happy hour specials are available select days—ask your server for details."
  },
  {
    question: "Can I host a private event at Homa Café + Bar?",
    answer_short: "Yes. We host private dinners, receptions, company gatherings, and celebrations with custom menus.",
    answer_long: "Homa works for intimate dinners, birthday parties, corporate events, and rehearsal dinners. We can customize menus, arrange seating layouts, and provide bar service. For larger events, consider booking adjacent spaces like The Greenhaus or The Yard. Email homa@kinshiplanding.com to start planning."
  },
  {
    question: "Where is Homa Café + Bar located?",
    answer_short: "We're on the ground floor of Kinship Landing at 421 S. Nevada Ave in downtown Colorado Springs.",
    answer_long: "Homa is walkable from most downtown attractions, museums, and hotels. There's paid parking on-site via the Metropolis app, plus street parking and nearby garages. If you're staying at Kinship Landing, just take the elevator or stairs down to the lobby."
  },
  {
    question: "Is Homa pet-friendly?",
    answer_short: "Leashed pets are welcome on our outdoor patio. Service animals are allowed inside.",
    answer_long: "Bring your dog to the patio and we'll bring them water. Inside, only service animals are permitted per ADA guidelines. If you're hosting a private event and want to include pets, let us know in advance so we can discuss options."
  },
  {
    question: "What do guests say about Homa Café + Bar?",
    answer_short: "Guests love the fresh food, friendly staff, plant-filled atmosphere, and consistently great service.",
    answer_long: "Reviews highlight generous portions, reasonable prices, creative menus, and a relaxed vibe. People return for the seasonal specials, excellent coffee, and the greenhouse-style space filled with natural light and greenery. It's become a neighborhood favorite for both locals and hotel guests."
  }
];

export default function HomaFAQ({ sectionTitle, sectionSubtitle, faqItems }: HomaFAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  // Use Sanity data or fallback to default FAQs
  const faqs = faqItems?.length ? faqItems.map(item => ({
    question: item.question,
    answer_short: item.answerShort,
    answer_long: item.answerLong,
  })) : defaultHomaFaqs;

  // Show first 5 FAQs initially, or all if showAll is true
  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

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
            {sectionTitle || "Homa FAQs"}
          </h2>
          <p
            className="text-lg"
            style={{
              fontFamily: KINSHIP_FONTS.body,
              color: KINSHIP_COLORS.greenDark,
              opacity: 0.8
            }}
          >
            {sectionSubtitle || "Everything you need to know about Homa Café + Bar"}
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
