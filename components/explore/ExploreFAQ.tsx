'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KINSHIP_COLORS, KINSHIP_FONTS } from '@/lib/config/brand';

interface ExploreFAQProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  faqItems?: Array<{
    _key: string;
    question: string;
    answerShort: string;
    answerLong: string;
  }>;
}

interface FAQ {
  question: string;
  answer_short: string;
  answer_long: string;
}

const exploreFaqs: FAQ[] = [
  {
    question: "What outdoor activities are near Kinship Landing?",
    answer_short: "Garden of the Gods, Manitou Incline, Pikes Peak, Rampart Reservoir, and Royal Gorge are all nearby.",
    answer_long: "Garden of the Gods and Section 16 offer easy trails with red rock views. The Manitou Incline is a steep, leg-burning climb with panoramic payoff. Pikes Peak Cog Railway takes you to 14,115 feet. For water adventures, try rafting at Royal Gorge or cliff jumping at Paradise Cove (Guffey Gorge). Rampart Reservoir is perfect for paddling and fishing."
  },
  {
    question: "How far is Great Sand Dunes National Park from Kinship Landing?",
    answer_short: "It's about 2.5 hours south. Perfect for a day trip to sled, sandboard, or explore the tallest dunes in North America.",
    answer_long: "The drive takes you through scenic mountain passes and open valleys. Once there, you can hike, sled, or sandboard year-round. The dunes rise up to 750 feet and stretch across 30 square miles. Bring water, sunscreen, and a sled—it's a surreal landscape unlike anything else in Colorado."
  },
  {
    question: "Where can I go white-water rafting near Kinship Landing?",
    answer_short: "Royal Gorge and Arkansas River offer guided rafting trips from mild floats to extreme rapids.",
    answer_long: "Echo Canyon River Expeditions runs trips for all levels—families, beginners, and adrenaline junkies. Use code ECHO10 for a discount when you book. Half-day and full-day trips are available. The Royal Gorge section is the most dramatic, with Class III–V rapids and towering canyon walls. It's one of the best rafting destinations in the country."
  },
  {
    question: "What are the best easy hikes near Kinship Landing?",
    answer_short: "Garden of the Gods, Section 16, Rampart Reservoir, and Cheyenne Mountain State Park offer accessible trails for all abilities.",
    answer_long: "Garden of the Gods has paved paths and short loops through iconic red rock formations. Section 16 is a local favorite with rolling trails, wildflowers, and minimal crowds. Rampart Reservoir features lakeside trails perfect for families. Cheyenne Mountain State Park has well-maintained paths with prairie and mountain views. All are within 30 minutes of the hotel."
  },
  {
    question: "Where can I see fall colors near Kinship Landing?",
    answer_short: "Pikes Peak, Mueller State Park, The Crags, and scenic railways like Royal Gorge Route offer stunning autumn views.",
    answer_long: "Take the Pikes Peak Cog Railway for high-altitude aspen groves. Mueller State Park, Pancake Rocks, and Vindicator Valley Trailhead feature golden aspens and crisp mountain air. Scenic train rides—Cripple Creek & Victor Railroad and Royal Gorge Route Railroad—provide colorful canyon and mountain vistas without the hiking. Peak foliage is late September through early October."
  },
  {
    question: "What winter activities are available near Kinship Landing?",
    answer_short: "Skiing, snowshoeing, cross-country skiing, dog sledding, and Pikes Peak winter tours are all nearby.",
    answer_long: "Snowshoe at Rampart Range or Rainbow Gulch for quiet, snowy trails. Mueller State Park offers cross-country skiing. For downhill skiing, head to nearby resorts like Monarch or Breckenridge (2–3 hours). Dog sledding tours and off-roading excursions are available through local outfitters. Pikes Peak Cog Railway runs year-round, offering winter summit views when the mountain is dusted in snow."
  },
  {
    question: "Are there hidden bars or speakeasies near Kinship Landing?",
    answer_short: "Yes. Downtown Colorado Springs has several hidden cocktail bars, all within minutes of the hotel.",
    answer_long: "Check out Rabbit Hole, District E11even, Shame and Regret, Fifty Niner, Allusion Cocktail Bar, The Archives, and The Tipperary Cocktail Parlour. Each has its own vibe—some tucked behind unmarked doors, others hiding in basements or back rooms. They serve creative cocktails, local spirits, and late-night bites. Ask at the front desk for directions and current hours."
  },
  {
    question: "What live music and performing arts venues are near Kinship Landing?",
    answer_short: "Lulu's Live Music, Boot Barn Hall, Pikes Peak Center, and Fine Arts Center are all nearby.",
    answer_long: "Lulu's Live Music & Bar and The Black Sheep host local and touring bands in intimate settings. Boot Barn Hall brings bigger names and country acts. For performing arts, visit Pikes Peak Center for Broadway shows and concerts, Fine Arts Center for theater and exhibitions, ENT Center for the Arts, and Millibo Art Theatre for indie productions. Check schedules online before your visit."
  },
  {
    question: "Where can I find great coffee near Kinship Landing?",
    answer_short: "Loyal Coffee, The Exchange, Story Coffee Co., and Switchback Coffee Roasters are all within walking distance.",
    answer_long: "Loyal Coffee and The Exchange on Tejon are downtown favorites with strong espresso and cozy vibes. The Perk Downtown offers drip coffee and pastries. Story Coffee Co. roasts its own beans and serves creative lattes. Bird Tree Café has a chill, artsy atmosphere. Switchback Coffee Roasters and The Wild Goose Meeting House round out the scene. All are walkable or a short drive from the hotel."
  },
  {
    question: "What dessert spots are close to Kinship Landing?",
    answer_short: "Josh & John's Ice Cream, Cacao Chemistry, Provision Bread, and Sasquatch Cookies are local favorites.",
    answer_long: "Josh & John's serves artisan ice cream with rotating seasonal flavors. Cacao Chemistry specializes in handmade chocolates and truffles. Provision Bread & Bakery bakes sourdough, croissants, and pastries daily. Sasquatch Cookies makes oversized, gooey cookies in unique flavors. Drive-In Tasty Freeze is a retro soft-serve spot perfect for a summer treat. Most are within 10 minutes of Kinship Landing."
  },
  {
    question: "Are there dog-friendly trails and bars near Kinship Landing?",
    answer_short: "Yes. Trails like Garden of the Gods, Section 16, and Red Rock Canyon welcome leashed dogs. Several breweries are dog-friendly too.",
    answer_long: "Dog-friendly trails include Fox Run, Mount Cutler, Section 16, Rampart Reservoir, Red Rock Canyon, The Crags, and the Garden of the Gods Off-Leash Area. For post-hike pints, bring your pup to Homa Café + Bar (patio), Pub Dog Colorado, Goat Patch Brewing, Metric Brewing, Cerberus Brewing, and FH Beerworks. Water bowls and dog treats are usually on hand."
  },
  {
    question: "What unique experiences or tours does Kinship Landing recommend?",
    answer_short: "Rafting with Echo Canyon, fly-fishing with Angler's Covey, and the U.S. Olympic & Paralympic Museum are top picks.",
    answer_long: "Book rafting with Echo Canyon River Expeditions and use code ECHO10 for a discount. Angler's Covey offers guided fly-fishing trips on local rivers—use code KINSHIP when booking. The U.S. Olympic & Paralympic Museum is a world-class, interactive experience downtown. Other unique options include Pikes Peak Cog Railway, hot air balloon rides, and rock climbing at Garden of the Gods."
  },
  {
    question: "How can I travel sustainably while staying at Kinship Landing?",
    answer_short: "Walk or bike to downtown attractions, skip single-use plastics, and support local businesses.",
    answer_long: "Kinship Landing was designed with sustainability in mind—featuring recycled materials, locally sourced finishes, minimal single-use plastics, and energy-efficient systems. Downtown Colorado Springs is walkable from the hotel, so leave the car parked and explore on foot. Rent bikes, support local shops and restaurants, and bring a reusable water bottle. We're committed to reducing our environmental footprint and encourage guests to do the same."
  }
];

export function ExploreFAQ({ sectionTitle, sectionSubtitle, faqItems }: ExploreFAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  // Use CMS data if available, otherwise fall back to hardcoded data
  const faqs: FAQ[] = faqItems?.length
    ? faqItems.map(item => ({
        question: item.question,
        answer_short: item.answerShort,
        answer_long: item.answerLong
      }))
    : exploreFaqs;

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
            Explore FAQs
          </h2>
          <p
            className="text-lg"
            style={{
              fontFamily: KINSHIP_FONTS.body,
              color: KINSHIP_COLORS.greenDark,
              opacity: 0.8
            }}
          >
            Everything you need to know about exploring Colorado Springs
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
