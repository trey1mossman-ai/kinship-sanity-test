#!/usr/bin/env node

/**
 * HOMA PAGE - VERIFIED TEXT CONTENT SEED SCRIPT
 *
 * This script seeds all text content for the Homa page to Sanity.
 * Each value has been verified by reading the component fallbacks.
 *
 * AUDIT DATE: December 2024
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-homa-content-verified.js
 */

const { createClient } = require('@sanity/client');

// Sanity configuration
const SANITY_PROJECT_ID = 'u2qzrboc';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

const SANITY_TOKEN = process.env.SANITY_API_TOKEN;
if (!SANITY_TOKEN) {
  console.error('Error: SANITY_API_TOKEN environment variable is required');
  console.error('Run with: SANITY_API_TOKEN=your_token node scripts/seed-homa-content-verified.js');
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
 * HERO SECTION
 * Source: app/homa/HomaPageClient.tsx:201-228
 */
const HERO_CONTENT = {
  heroTitle: 'Food made for friends',
  heroCtaMenuText: 'View Menu',
  heroCtaMenuUrl: '#menu',
  heroCtaPromosText: 'View Promos',
  heroCtaPromosUrl: '#promos',
};

/**
 * ABOUT SECTION
 * Source: app/homa/HomaPageClient.tsx:249-269
 */
const ABOUT_CONTENT = {
  aboutParagraph1: 'HOMA, food for the people! Serving hearty, healthy, and delicious dishes inspired by foods we have loved from traveling around the world. Brought together with a little fresh Colorado style, each dish is crafted with the hungry and the healthy in mind.',
  aboutParagraph2: 'Our house made, freshly prepared, and locally sourced ingredients showcase local faves and new dishes sure to delight. Featuring nutrient rich grain bowls or salads, stacked sandwiches with housemade bread, the perfect breakfast, small bites, and signature hand pies, you\'ll love every yummy bite.',
  aboutParagraph3: 'Paired with our full Bar, coffee offerings, and good vibes, you can\'t go wrong!',
};

/**
 * SPECIALS SECTION
 * Source: app/homa/HomaPageClient.tsx:286-535
 */
const SPECIALS_CONTENT = {
  specialsSectionTitle: 'Specials & Events',
  // Happy Hour Card
  happyHourBadge: 'Happy Hour',
  happyHourTitle: 'The Happiest Hour',
  happyHourTime: '3 - 6pm, Monday - Friday',
  happyHourSpecials: [
    { _key: 'hh1', price: '$4', item: 'Draft Beer' },
    { _key: 'hh2', price: '$5', item: 'House Glass of Wine' },
    { _key: 'hh3', price: '$9', item: 'Signature Cocktail or Mocktail' },
    { _key: 'hh4', price: 'Half Price', item: 'Cauli Pop or Fries' },
  ],
  happyHourCtaText: 'View Hours',
  // Brunch Card
  brunchBadge: 'Sundays',
  brunchTitle: 'Brunch. Every Sunday.',
  brunchTime: '8:00am - 2:00pm',
  brunchDescription: 'Created by our chefs featuring the best ingredients the season has to offer!',
  brunchCtaText: 'View Brunch Menu',
  // Events Card
  eventsBadge: 'Community',
  eventsTitle: 'Upcoming Events',
  eventsDescription: 'Find cool stuff to do in Colorado Springs. Meet like-minded folks. Learn from experts.',
  eventsCtaText: 'View Events at Kinship',
  eventsCtaUrl: '/community',
};

/**
 * FIREPLACE/SEATING SECTION
 * Source: app/homa/HomaPageClient.tsx:694-706
 */
const FIREPLACE_CONTENT = {
  seatingSectionTitle: 'Café Fireplace',
  seatingDescription: 'A cozy, semi-private space with mixed seating for up to 20 guests. Perfect for intimate gatherings, small meetings, or casual celebrations. Order from Homa Café or book full catering to make your event complete.',
};

/**
 * LOYALTY SECTION
 * Source: components/homa/HomaLoyalty.tsx:29-73
 */
const LOYALTY_CONTENT = {
  loyaltyTitle: 'HOMA Loyalty and Rewards',
  loyaltyDescription: 'Become a Homa Homie for FREE and get $5 right off the bat plus $0.10 per dollar spent towards future purchase, special deals, event invites, free birthday goodies, and more.',
  loyaltyCtaText: 'Join HOMA Rewards',
  loyaltyCtaUrl: 'https://www.toasttab.com/kinship-landing-homa-415-south-nevada-avenue/rewardsSignup',
  loyaltyFineprint: 'Sign up takes less than a minute. Start earning rewards today!',
};

/**
 * FAQ SECTION
 * Source: components/homa/HomaFAQ.tsx:24-85
 */
const FAQ_CONTENT = {
  faqSectionTitle: 'Homa FAQs',
  faqSectionSubtitle: 'Everything you need to know about Homa Café + Bar',
  faqItems: [
    {
      _key: 'faq1',
      question: 'What are the hours for Homa Café + Bar?',
      answerShort: "We're open daily from 7:00 AM to 9:00 PM, serving breakfast, lunch, and dinner.",
      answerLong: "Breakfast runs from 7:00–11:00 AM. Lunch and dinner menus are available throughout the day. Hours may shift seasonally or for private events, so check our website or call ahead if you're planning a visit. We're closed on Thanksgiving and Christmas Day.",
    },
    {
      _key: 'faq2',
      question: 'Does Homa Café + Bar take reservations?',
      answerShort: 'Walk-ins are always welcome. Reservations are available for groups of 6 or more.',
      answerLong: 'For parties of 1-5, just walk in and grab a seat. For groups of 6+, we recommend calling ahead or emailing homa@kinshiplanding.com so we can set aside space for you. Large groups or private events require advance coordination.',
    },
    {
      _key: 'faq3',
      question: 'What type of food does Homa serve?',
      answerShort: 'We serve modern, globally inspired cuisine with a focus on fresh, seasonal ingredients.',
      answerLong: 'Think grain bowls, creative salads, hearty sandwiches, and rotating seasonal specials. Breakfast highlights include pancakes, eggs, and hand pies. Lunch and dinner feature favorites like the Club Scout sandwich, fried cauliflower bowl, and Mediterranean-inspired plates. Everything is made in-house by our culinary team.',
    },
    {
      _key: 'faq4',
      question: 'Does Homa offer vegetarian, vegan, or gluten-free options?',
      answerShort: 'Yes. We have plenty of plant-based options and can accommodate most dietary needs.',
      answerLong: "Many of our bowls, salads, and sides are vegetarian or easily modified. Vegan and gluten-free dishes are available—just ask your server or the counter staff for recommendations. We're happy to work with food allergies and dietary preferences whenever possible.",
    },
    {
      _key: 'faq5',
      question: 'What are the best menu items at Homa?',
      answerShort: 'Guest favorites include the fried cauliflower bowl, Club Scout sandwich, hand pies, and seasonal grain bowls.',
      answerLong: "At breakfast, people love the pancakes and eggs. For lunch and dinner, the fried cauliflower bowl and Club Scout are top sellers. The grain bowls and salads rotate seasonally, so there's always something new. Our hand pies, kombucha on tap, and craft cocktails are also huge hits.",
    },
    {
      _key: 'faq6',
      question: 'Can I work or study at Homa Café + Bar?',
      answerShort: 'Yes. We have free Wi-Fi, plenty of outlets, and a relaxed atmosphere perfect for remote work or studying.',
      answerLong: "The space is designed for lingering. Communal tables, cozy nooks, and natural light make Homa a popular spot for laptop workers and students. We don't rush anyone out—just order something, settle in, and stay as long as you need.",
    },
    {
      _key: 'faq7',
      question: 'Is Homa Café + Bar kid-friendly?',
      answerShort: 'Absolutely. Families are welcome, and we have high chairs and kid-friendly menu options.',
      answerLong: 'The open layout and casual vibe make Homa a great spot for families. Kids love the swinging chairs and plant-filled greenhouse room. We offer kid-friendly portions and can customize dishes to suit picky eaters. High chairs are available.',
    },
    {
      _key: 'faq8',
      question: 'Does Homa serve coffee, beer, and cocktails?',
      answerShort: 'Yes. We serve espresso drinks, drip coffee, craft beer, wine, and creative cocktails all day.',
      answerLong: 'Start your morning with espresso or drip coffee. Throughout the day, enjoy rotating kombucha on tap, local craft beer, and natural wines. Our cocktail menu features seasonal drinks made with fresh ingredients. Happy hour specials are available select days—ask your server for details.',
    },
    {
      _key: 'faq9',
      question: 'Can I host a private event at Homa Café + Bar?',
      answerShort: 'Yes. We host private dinners, receptions, company gatherings, and celebrations with custom menus.',
      answerLong: 'Homa works for intimate dinners, birthday parties, corporate events, and rehearsal dinners. We can customize menus, arrange seating layouts, and provide bar service. For larger events, consider booking adjacent spaces like The Greenhaus or The Yard. Email homa@kinshiplanding.com to start planning.',
    },
    {
      _key: 'faq10',
      question: 'Where is Homa Café + Bar located?',
      answerShort: "We're on the ground floor of Kinship Landing at 421 S. Nevada Ave in downtown Colorado Springs.",
      answerLong: "Homa is walkable from most downtown attractions, museums, and hotels. There's paid parking on-site via the Metropolis app, plus street parking and nearby garages. If you're staying at Kinship Landing, just take the elevator or stairs down to the lobby.",
    },
    {
      _key: 'faq11',
      question: 'Is Homa pet-friendly?',
      answerShort: 'Leashed pets are welcome on our outdoor patio. Service animals are allowed inside.',
      answerLong: "Bring your dog to the patio and we'll bring them water. Inside, only service animals are permitted per ADA guidelines. If you're hosting a private event and want to include pets, let us know in advance so we can discuss options.",
    },
    {
      _key: 'faq12',
      question: 'What do guests say about Homa Café + Bar?',
      answerShort: 'Guests love the fresh food, friendly staff, plant-filled atmosphere, and consistently great service.',
      answerLong: "Reviews highlight generous portions, reasonable prices, creative menus, and a relaxed vibe. People return for the seasonal specials, excellent coffee, and the greenhouse-style space filled with natural light and greenery. It's become a neighborhood favorite for both locals and hotel guests.",
    },
  ],
};

/**
 * SEO CONTENT
 * Source: app/homa/page.tsx:6-7
 */
const SEO_CONTENT = {
  seoTitle: 'Homa Café + Bar | Kinship Landing',
  seoDescription: 'Great coffee. Solid cocktails. Real food. Open to neighbors and travelers alike in downtown Colorado Springs.',
};

async function main() {
  console.log('\n🚀 HOMA PAGE - Text Content Seed Script (Verified)\n');
  console.log('='.repeat(50));

  // Combine all content
  const allContent = {
    ...HERO_CONTENT,
    ...ABOUT_CONTENT,
    ...SPECIALS_CONTENT,
    ...FIREPLACE_CONTENT,
    ...LOYALTY_CONTENT,
    ...FAQ_CONTENT,
    ...SEO_CONTENT,
  };

  console.log('\n📝 Content sections to seed:');
  console.log('  - Hero Section (5 fields)');
  console.log('  - About Section (3 fields)');
  console.log('  - Specials Section (12 fields)');
  console.log('  - Fireplace Section (2 fields)');
  console.log('  - Loyalty Section (5 fields)');
  console.log('  - FAQ Section (2 fields + 12 FAQ items)');
  console.log('  - SEO (2 fields)');

  console.log('\n📤 Updating Sanity document...');

  await client.patch('homaPage').set(allContent).commit();

  console.log('\n✅ COMPLETE! All Homa page text content seeded to Sanity.');
  console.log('\n📊 SUMMARY:');
  console.log(`  - Total fields updated: ${Object.keys(allContent).length}`);
  console.log(`  - FAQ items: 12`);
  console.log(`  - Happy Hour specials: 4`);
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/homaPage');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
