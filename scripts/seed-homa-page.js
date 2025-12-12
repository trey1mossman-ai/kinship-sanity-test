#!/usr/bin/env node
/**
 * Seed script to populate the HOMA page in Sanity with actual website content
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-homa-page.js
 */

const { createClient } = require('@sanity/client');

// Sanity client with write access
const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// The actual content from the live website
const homaPageContent = {
  _id: 'homaPage',
  _type: 'homaPage',

  // ==================== HERO SECTION ====================
  heroTitle: 'Food made for friends',
  heroCtaMenuText: 'View Menu',
  heroCtaMenuUrl: '#menu',
  heroCtaPromosText: 'View Promos',
  heroCtaPromosUrl: '#promos',

  // ==================== ABOUT SECTION ====================
  aboutParagraph1: 'HOMA, food for the people! Serving hearty, healthy, and delicious dishes inspired by foods we have loved from traveling around the world. Brought together with a little fresh Colorado style, each dish is crafted with the hungry and the healthy in mind.',
  aboutParagraph2: "Our house made, freshly prepared, and locally sourced ingredients showcase local faves and new dishes sure to delight. Featuring nutrient rich grain bowls or salads, stacked sandwiches with housemade bread, the perfect breakfast, small bites, and signature hand pies, you'll love every yummy bite.",
  aboutParagraph3: "Paired with our full Bar, coffee offerings, and good vibes, you can't go wrong!",

  // ==================== SPECIALS & EVENTS ====================
  specialsSectionTitle: 'Specials & Events',

  // Happy Hour
  happyHourTitle: 'The Happiest Hour',
  happyHourBadge: 'Happy Hour',
  happyHourTime: '3 - 6pm, Monday - Friday',
  happyHourSpecials: [
    { _key: 'beer', price: '$4', item: 'Draft Beer' },
    { _key: 'wine', price: '$5', item: 'House Glass of Wine' },
    { _key: 'cocktail', price: '$9', item: 'Signature Cocktail or Mocktail' },
    { _key: 'food', price: 'Half Price', item: 'Cauli Pop or Fries' },
  ],
  happyHourCtaText: 'View Hours',

  // Brunch
  brunchTitle: 'Sunday Brunch',
  brunchBadge: 'Weekends',
  brunchTime: '10am - 2pm, Saturday & Sunday',
  brunchDescription: "Start your weekend right with our full brunch menu featuring fluffy pancakes, savory eggs, fresh pastries, and bottomless mimosas. Join us for the perfect leisurely morning in our cozy café.",
  brunchCtaText: 'View Menu',

  // Events
  eventsTitle: 'Private Events',
  eventsBadge: 'Events',
  eventsDescription: "Looking to host a private gathering? Homa's unique spaces offer the perfect backdrop for celebrations, team gatherings, and intimate events. From our cozy fireplace corner to our sun-drenched café, we'll help create an unforgettable experience.",
  eventsCtaText: 'Inquire Now',
  eventsCtaUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',

  // ==================== PROMOS ====================
  promos: [
    {
      _key: 'homa-homies',
      title: 'Join HOMA Homies & Get $5!',
      description: 'Sign up for our loyalty program and get $5 off your next order. Earn points on every purchase and unlock exclusive rewards.',
      badge: 'Loyalty Program',
      ctaText: 'Sign Up Now',
      ctaUrl: 'https://www.toasttab.com/homa-cafe-bar-415-s-nevada-ave/rewards'
    }
  ],

  // ==================== HOURS SECTION ====================
  hoursSectionTitle: 'Hours & Location',
  hoursSubtitle: 'Visit us at Kinship Landing',
  address: '415 S Nevada Ave, Colorado Springs, CO 80903',
  phone: '(719) 203-9309',
  hours: [
    { _key: 'cafe', label: 'Café', days: 'Daily', hours: '7am - 3pm' },
    { _key: 'bar', label: 'Bar', days: 'Mon-Thu', hours: '3pm - 10pm' },
    { _key: 'bar-weekend', label: 'Bar', days: 'Fri-Sat', hours: '3pm - 11pm' },
    { _key: 'bar-sun', label: 'Bar', days: 'Sunday', hours: '10am - 9pm' },
    { _key: 'kitchen', label: 'Kitchen', days: 'Daily', hours: '7am - 9pm' },
  ],

  // ==================== SEATING SECTION ====================
  seatingSectionTitle: 'Fireplace Lounge',
  seatingDescription: 'Cozy up by the fire with your favorite drink in our intimate fireplace lounge. Perfect for catching up with friends or getting some work done in a relaxed atmosphere.',

  // ==================== SEO ====================
  seoTitle: 'Homa Café + Bar | Kinship Landing',
  seoDescription: 'Great coffee. Solid cocktails. Real food. Open to neighbors and travelers alike in downtown Colorado Springs.',
};

async function seedHomaPage() {
  console.log('🌱 Seeding HOMA page content to Sanity...\n');

  try {
    // Use createOrReplace to update the singleton document
    const result = await client.createOrReplace(homaPageContent);

    console.log('✅ Successfully seeded HOMA page content!');
    console.log('\n📋 Document ID:', result._id);
    console.log('\n🔗 View in Sanity Studio: https://kinship-landing.sanity.studio/structure/homaPage');
    console.log('\n📝 Fields populated:');
    console.log('   - Hero: title, CTAs');
    console.log('   - About: 3 paragraphs');
    console.log('   - Specials: Happy Hour, Brunch, Events');
    console.log('   - Promos: HOMA Homies loyalty program');
    console.log('   - Hours: all operating hours');
    console.log('   - Seating: Fireplace lounge description');
    console.log('   - SEO: title, description');
    console.log('\n⚠️  NOTE: Images need to be uploaded manually in Sanity Studio');

  } catch (error) {
    console.error('❌ Error seeding content:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\n💡 Make sure your SANITY_API_TOKEN has "Editor" permissions.');
    }
    process.exit(1);
  }
}

// Run the seed function
seedHomaPage();
