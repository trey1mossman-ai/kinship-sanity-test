#!/usr/bin/env node

/**
 * EVENTS PAGE - VERIFIED CONTENT SEED SCRIPT
 *
 * This script seeds all text content for the Events page, including:
 * - Hero section text
 * - Event type sections (Gatherings, Weddings, Meetings, Room Blocks, Takeover)
 * - Venue sections (GreenHaus, Yard, Conference Room, Fireplace, Camp Deck)
 * - Testimonials (3 items)
 * - FAQs (12 items)
 * - Contact info
 * - SEO metadata
 *
 * AUDIT DATE: December 2024
 * SOURCE: app/events/EventsPageClient.tsx, components/events/EventsFAQ.tsx, components/events/EventsTestimonials.tsx
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-events-content-verified.js
 */

const { createClient } = require('@sanity/client');

// Sanity configuration
const SANITY_PROJECT_ID = 'u2qzrboc';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

const SANITY_TOKEN = process.env.SANITY_API_TOKEN;
if (!SANITY_TOKEN) {
  console.error('Error: SANITY_API_TOKEN environment variable is required');
  console.error('Run with: SANITY_API_TOKEN=your_token node scripts/seed-events-content-verified.js');
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  token: SANITY_TOKEN,
  useCdn: false,
});

/**
 * TESTIMONIALS - 3 featured testimonials
 * Source: components/events/EventsTestimonials.tsx:18-31
 */
const TESTIMONIALS = [
  {
    _key: 'testimonial-1',
    quote: "Our experience was absolutely wonderful from the venue itself to the attentive and responsive staff! Highly recommend Kinship to future brides!",
    name: "Aubrey S"
  },
  {
    _key: 'testimonial-2',
    quote: "Every part of the experience was top notch. The room was beautiful, the bed comfortable, the food delicious and the service exceptional.",
    name: "Beth G"
  },
  {
    _key: 'testimonial-3',
    quote: "The evening was a huge success thanks to Brad and his staff! They were so accommodating with every request and need.",
    name: "Mary B"
  }
];

/**
 * FAQ ITEMS - 12 detailed FAQs
 * Source: components/events/EventsFAQ.tsx:14-75
 */
const FAQ_ITEMS = [
  {
    _key: 'faq-1',
    question: "What event venues does Kinship Landing offer?",
    answerShort: "We have four unique spaces: The Yard (200 guests), The Greenhaus (50-70), Conference Room (2-10), and The Camp Deck (10-20).",
    answerLong: "The Yard is a 6,900 sq ft outdoor lawn with shade trees and mountain views. The Greenhaus is a light-filled indoor venue with lush greenery. The Conference Room is fully equipped for small meetings with A/V and catering. The Camp Deck offers indoor-outdoor flow perfect for intimate gatherings."
  },
  {
    _key: 'faq-2',
    question: "Does Kinship Landing offer full buyouts for weddings or corporate retreats?",
    answerShort: "Yes. A Kinship Takeover gives you exclusive use of all 40 rooms, event spaces, and Homa Café + Bar.",
    answerLong: "With 40 guest rooms and 58 beds, we can host up to 99 overnight guests for your wedding, retreat, or group event. The Takeover includes private access to The Yard, Greenhaus, Conference Room, and café, plus custom food and beverage packages. It's perfect for multi-day celebrations or executive retreats where you need privacy, team bonding, and zero distractions."
  },
  {
    _key: 'faq-3',
    question: "What's included with event catering at Kinship Landing?",
    answerShort: "All event packages include custom food and beverage from Homa Café + Bar, with local ingredients and seasonal menus.",
    answerLong: "Our in-house culinary team designs menus tailored to your event. We offer everything from passed appetizers and plated dinners to cocktail receptions and family-style feasts. Bar service includes wine, beer, cocktails, and non-alcoholic options. Tables, chairs, linens, glassware, and professional staff are all part of the package."
  },
  {
    _key: 'faq-4',
    question: "Can I host an outdoor wedding ceremony or reception at Kinship Landing?",
    answerShort: "Yes. The Yard is our signature outdoor space for ceremonies and receptions, with capacity for up to 200 guests.",
    answerLong: "The Yard features mature shade trees, views of Pikes Peak, and 6,900 sq ft of lawn space. It's ideal for ceremonies, cocktail hours, and tented receptions. Couples often combine The Yard with The Greenhaus for indoor-outdoor flow. We also have The Camp Deck, a smaller outdoor space perfect for micro-weddings or intimate sunset gatherings."
  },
  {
    _key: 'faq-5',
    question: "What wedding packages are available?",
    answerShort: "We offer three tiers: Wedding Takeover (full buyout), Reception + Rooms (venue + lodging), and Reception + Catering (venue only).",
    answerLong: "The Wedding Takeover includes exclusive use of the hotel for up to 99 guests. Reception + Rooms gives you access to The Yard or Greenhaus plus a block of guest rooms. Reception + Catering is venue rental with custom menus and bar service. All packages include event planning support, setup, breakdown, and coordination with your vendors."
  },
  {
    _key: 'faq-6',
    question: "What types of corporate events can Kinship Landing host?",
    answerShort: "We host meetings, product launches, retreats, team-building events, holiday parties, and private dinners.",
    answerLong: "The Conference Room is perfect for board meetings, workshops, and presentations with 2-10 people. The Greenhaus works well for larger groups, keynote sessions, or networking receptions. For multi-day retreats, book a room block or full buyout and combine workspace with lodging. All spaces include Wi-Fi, A/V equipment, catering, and event support."
  },
  {
    _key: 'faq-7',
    question: "Are group room blocks available for events?",
    answerShort: "Yes. We offer group rates for 10+ rooms, plus a custom booking link for your guests.",
    answerLong: "Group bookings come with discounted room rates, flexible booking windows, and a dedicated link your guests can use to reserve. We can accommodate up to 99 overnight guests across 40 rooms. For full buyouts, you get exclusive access to the entire property. Our team will work with you on rooming lists, VIP upgrades, and special requests."
  },
  {
    _key: 'faq-8',
    question: "Does Kinship Landing provide event planning and coordination?",
    answerShort: "Yes. Our events team provides planning support, vendor coordination, and day-of execution for all bookings.",
    answerLong: "From your first inquiry to the final toast, our team is here to help. We'll walk you through venue options, design custom menus, coordinate logistics, and ensure everything runs smoothly. We work with your preferred vendors or connect you with trusted local partners for florals, photography, music, and more."
  },
  {
    _key: 'faq-9',
    question: "What amenities are included with event spaces?",
    answerShort: "All spaces include Wi-Fi, A/V equipment, climate control, tables, chairs, and on-site catering from Homa.",
    answerLong: "The Greenhaus and Conference Room have air conditioning and heating. The Yard offers shade, string lights, and mountain views. The Camp Deck has indoor-outdoor access and cozy fire pit seating. All venues come with professional event setup, cleanup, and support staff. Add-ons like linens, florals, and rentals can be arranged through our preferred vendors."
  },
  {
    _key: 'faq-10',
    question: "Can I bring my own vendors (photographer, DJ, florist)?",
    answerShort: "Yes. You're welcome to bring your own vendors, or we can recommend trusted local partners.",
    answerLong: "We love working with outside vendors and have no exclusive contracts. Bring your photographer, DJ, florist, or planner—just let us know in advance so we can coordinate load-in and setup. If you need recommendations, we're happy to connect you with talented local pros we've worked with before."
  },
  {
    _key: 'faq-11',
    question: "Are pets allowed at events?",
    answerShort: "Service dogs are always welcome. For private events, pet policies can be customized with advance notice.",
    answerLong: "If you're booking a full buyout or private event, we're happy to discuss pet-friendly arrangements. Many couples include their dogs in wedding ceremonies, and we love that. Just check with our events team ahead of time so we can plan accordingly and ensure a safe, comfortable experience for everyone."
  },
  {
    _key: 'faq-12',
    question: "How do I request a quote or book an event?",
    answerShort: "Fill out our Request a Quote form online, or email events@kinshiplanding.com to start the conversation.",
    answerLong: "Our events team will respond within 1-2 business days with availability, pricing, and next steps. We'll schedule a call or site visit to walk through your vision, show you the spaces, and design a custom proposal. Once you're ready, we'll send a contract and collect a deposit to lock in your date."
  }
];

/**
 * Full content data for Events page
 */
const EVENTS_CONTENT = {
  // Hero Section
  heroTitle: 'Meetings & Events',
  heroSubtitle: 'Unforgettable events in the heart of downtown Colorado Springs',

  // Gatherings Section
  gatheringsTitle: 'Gatherings',
  gatheringsDescription: 'Whether it\'s a birthday celebration, anniversary dinner, graduation party, or just an excuse to get friends together, Kinship Landing is the perfect backdrop for gatherings of all sizes. Our versatile spaces and in-house catering from Homa Café + Bar mean you can focus on the people, not the logistics.',
  gatheringsCtaText: 'Host with Us',
  gatheringsCtaUrl: 'https://www.tripleseat.com/kinship-landing',

  // Weddings Section
  weddingsTitle: 'Weddings',
  weddingsDescription: 'Say "I do" with Pikes Peak as your witness. Kinship Landing offers a refreshingly modern, locally-rooted wedding experience in the heart of downtown Colorado Springs. From intimate elopements on The Camp Deck to full-scale celebrations in The Yard, we\'ll help you create a day that feels authentically yours.',
  weddingsDescription2: 'Our venue packages include event planning support, custom catering from Homa Café + Bar, and lodging for you and your guests. Picture this: your wedding party staying together under one roof, morning coffee on the patio, and a sunset ceremony just steps from your suite.',
  weddingsCtaText: 'Start Your Story',
  weddingsCtaUrl: 'https://www.tripleseat.com/kinship-landing',
  weddingsInfoDeckText: 'View Wedding Info Deck',
  weddingsInfoDeckUrl: 'https://drive.google.com/file/d/1JwM3ZGKi4vKzP8QJ5Y4wJ8XoZxG9dNhE/view',

  // Meetings & Retreats Section
  meetingsTitle: 'Meetings & Retreats',
  meetingsDescription: 'Get your team out of the office and into a space that inspires. Kinship Landing\'s boutique hotel vibe, modern amenities, and downtown location make us the ideal setting for corporate offsites, strategy sessions, and creative retreats.',
  meetingsDescription2: 'Book our Conference Room for up to 10, or reserve The Greenhaus for larger groups. Add a room block and give your team the gift of a restful night\'s sleep, followed by fresh coffee and breakfast from Homa.',
  meetingsDescription3: 'We handle the details—A/V equipment, catering, rooming lists, and more—so you can focus on the work that matters.',
  meetingsNote: 'Note: All meeting packages include complimentary Wi-Fi, whiteboard, and A/V setup. Catering is available for groups of any size.',
  meetingsCtaText: "Let's Make it Happen",
  meetingsCtaUrl: 'https://www.tripleseat.com/kinship-landing',

  // Room Blocks Section
  roomBlocksTitle: 'Room Blocks',
  roomBlocksDescription: 'Hosting guests for a wedding, reunion, or corporate event? Kinship Landing offers group room blocks with special rates, flexible booking, and a dedicated link for your guests.',
  roomBlocksDescription2: 'With 40 guest rooms sleeping up to 99, we can accommodate groups of all sizes. Our front desk team handles the details so you can focus on your event.',
  roomBlocksDescription3: 'Block 10+ rooms to unlock exclusive group perks.',
  roomBlocksCtaText: 'Plan Your Stay',
  roomBlocksCtaUrl: 'https://www.tripleseat.com/kinship-landing',

  // Hotel Takeover Section
  takeoverTitle: 'Make Kinship Yours',
  takeoverSubtitle: 'Exclusive Hotel Takeovers',
  takeoverDescription: 'For the ultimate experience, book a Kinship Takeover. You and your guests get exclusive access to all 40 rooms, event spaces, and Homa Café + Bar. It\'s the perfect setting for wedding weekends, executive retreats, and milestone celebrations.',
  takeoverDescription2: 'A Takeover means privacy, flexibility, and a true home-base feel. Customize the experience with branded signage, welcome gifts, and tailored menus. Your event. Your vibe. Your Kinship.',
  takeoverFeatures: [
    'All 40 rooms + 58 beds reserved for your group',
    'Exclusive access to The Yard, Greenhaus, Conference Room, and Camp Deck',
    'Private use of Homa Café + Bar (custom menus available)',
    'Dedicated event manager + on-site support',
    'Flexible check-in/check-out times',
    'Welcome gifts and branded touches available'
  ],
  takeoverCtaText: 'Explore a Kinship Takeover',
  takeoverCtaUrl: 'https://www.tripleseat.com/kinship-landing',

  // GreenHaus Venue
  greenhausTitle: 'GreenHaus',
  greenhausDescription: 'Our signature indoor venue, bathed in natural light and surrounded by lush greenery. The Greenhaus is perfect for receptions, workshops, and intimate dinners. With flexible seating and direct access to Homa Café + Bar, it adapts to your vision.',
  greenhausCapacity: 'Up to 80 Guests',
  greenhausFeatures: [
    'Natural light from floor-to-ceiling windows',
    'Living wall and botanical accents',
    'Climate-controlled year-round',
    'Direct access to Homa bar and café',
    'Flexible seating configurations',
    'A/V and presentation equipment available'
  ],

  // The Yard Venue
  yardTitle: 'The Yard',
  yardDescription: 'Our 6,900 sq ft outdoor lawn is the heart of Kinship Landing. Framed by mature trees, string lights, and mountain views, The Yard is ideal for wedding ceremonies, cocktail receptions, and live music events.',
  yardCapacity: 'Up to 200 Guests',
  yardFeatures: [
    '6,900 sq ft of lawn space',
    'Mature shade trees and string lights',
    'Views of Pikes Peak',
    'Perfect for ceremonies, cocktails, and tented receptions',
    'Access to indoor backup spaces',
    'Outdoor bar service available'
  ],

  // Conference Room Venue
  conferenceRoomTitle: 'Conference Room',
  conferenceRoomDescription: 'A modern, fully-equipped space for focused meetings, workshops, and presentations. Our Conference Room seats up to 10 and includes A/V, whiteboards, and catering options from Homa.',
  conferenceRoomCapacity: 'Up to 12 Guests',
  conferenceRoomFeatures: [
    'Seating for up to 10 (boardroom style)',
    'Large display screen and HDMI connectivity',
    'Whiteboard and markers',
    'High-speed Wi-Fi',
    'Catering from Homa available',
    'Natural light and downtown views'
  ],

  // Fireplace Lounge Venue
  fireplaceTitle: 'The Fireplace Lounge',
  fireplaceDescription: 'A cozy, intimate space for receptions, cocktail hours, and small gatherings. The Fireplace Lounge offers a warm, inviting atmosphere with soft seating and a central fireplace.',
  fireplaceCapacity: 'Up to 30 Guests',
  fireplaceFeatures: [
    'Cozy seating around central fireplace',
    'Perfect for cocktail hours and receptions',
    'Access to Homa bar service',
    'Ambient lighting and music',
    'Can be combined with other spaces'
  ],

  // Camp Deck Venue
  campDeckTitle: 'Camp Deck',
  campDeckDescription: 'An elevated outdoor space with mountain views and fire pit seating. The Camp Deck is perfect for micro-weddings, sunset cocktails, and intimate gatherings under the stars.',
  campDeckCapacity: 'Up to 20 Guests',
  campDeckFeatures: [
    'Elevated outdoor terrace',
    'Fire pit seating',
    'Mountain and city views',
    'Perfect for micro-weddings and sunset events',
    'Indoor-outdoor flow with Greenhaus',
    'String lights and ambient seating'
  ],

  // Contact Info
  inquiryEmail: 'events@kinshiplanding.com',
  inquiryPhone: '(719) 203-9309',
  bookingUrl: 'https://www.tripleseat.com/kinship-landing',

  // Testimonials
  testimonials: TESTIMONIALS,

  // FAQ Section
  faqSectionTitle: 'Events FAQs',
  faqSectionSubtitle: 'Everything you need to know about hosting events at Kinship',
  faqItems: FAQ_ITEMS,

  // SEO
  seoTitle: 'Events & Weddings at Kinship Landing | Colorado Springs Venues',
  seoDescription: 'Host your wedding, corporate retreat, or celebration at Kinship Landing. Unique venues including The Yard, GreenHaus, and Conference Room. Full buyouts available.'
};

async function main() {
  console.log('\n🚀 EVENTS PAGE - Content Seed Script (Verified)\n');
  console.log('='.repeat(60));

  console.log('\n📝 UPDATING SANITY DOCUMENT...');

  try {
    await client.patch('eventsPage').set(EVENTS_CONTENT).commit();

    console.log('\n✅ COMPLETE! Events page content uploaded to Sanity.');
    console.log('\n📊 SUMMARY:');
    console.log('  - Hero section: title + subtitle');
    console.log('  - Gatherings section: title, description, CTA');
    console.log('  - Weddings section: title, 2 paragraphs, 2 CTAs');
    console.log('  - Meetings section: title, 3 paragraphs, note, CTA');
    console.log('  - Room Blocks section: title, 3 paragraphs, CTA');
    console.log('  - Hotel Takeover section: title, subtitle, 2 paragraphs, 6 features, CTA');
    console.log('  - GreenHaus venue: title, description, capacity, 6 features');
    console.log('  - The Yard venue: title, description, capacity, 6 features');
    console.log('  - Conference Room venue: title, description, capacity, 6 features');
    console.log('  - Fireplace Lounge venue: title, description, capacity, 5 features');
    console.log('  - Camp Deck venue: title, description, capacity, 6 features');
    console.log('  - Contact info: email, phone, booking URL');
    console.log(`  - Testimonials: ${TESTIMONIALS.length} items`);
    console.log(`  - FAQs: ${FAQ_ITEMS.length} items`);
    console.log('  - SEO: title + description');
    console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/eventsPage');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
