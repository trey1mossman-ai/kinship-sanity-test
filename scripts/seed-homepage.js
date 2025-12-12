#!/usr/bin/env node
/**
 * Seed script to populate the Homepage in Sanity with actual website content
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-homepage.js
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

// The actual content from the live website codebase
const homepageContent = {
  _id: 'homepage',
  _type: 'homepage',

  // ==================== HERO SECTION ====================
  heroTitle: 'Experience Colorado\nSprings like a local',
  heroSubtitle: 'Sleep well. Meet locals. Launch adventures.',
  heroVideo: 'https://storage.googleapis.com/msgsndr/ZSnKlb7yt1OZGmrCwL7T/media/68defb5cd6c63ec71789ef67.mp4',
  heroCtaText: 'Book Your Stay',
  heroCtaUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E',

  // ==================== GUIDE SECTION (Kinship is Your Guide) ====================
  guideTitle: 'Kinship is Your Guide',
  guideParagraph1: 'It makes a difference landing in a place where you know a friend. Consider us your insider guide to exploring the real gems of Colorado Springs.',
  guideParagraph2: "Whether you're excited for an immersion into the local food, arts, and culture scene just steps from our front door, or you are planning to go play outside at our nearby hiking, biking, or outdoor experiences on Pikes Peak, we'll connect you to an authentic way to experience our beloved Colorado Springs area.",
  guideParagraph3: "One of our favorite things to do is help you have an amazing time, and we'll gladly point you in the right direction. Hey, we may even come along with you for the ride!",
  guideCta1Text: 'Events',
  guideCta1Url: '/events',
  guideCta2Text: 'Explore',
  guideCta2Url: '/explore',
  guideCta3Text: 'Book Your Room',
  guideCta3Url: 'https://hotels.cloudbeds.com/reservation/4nfQ6E',

  // ==================== ROOMS SECTION ====================
  roomsSectionTitle: 'Find Your Perfect Room',
  roomsCtaText: 'Explore All Rooms',
  roomsCtaUrl: '/rooms',

  // King Rooms carousel
  kingRoomsLabel: 'King Rooms',
  kingRooms: [
    { _key: 'king-suite', name: 'King Suite', slug: 'king-suite', shortDescription: 'King bed, sunrise views, in-room fireplace and soaking tub.' },
    { _key: 'executive-king-suite', name: 'Executive King Suite', slug: 'executive-king-suite', shortDescription: 'King bed, premium finishes, adjustable work desk, executive amenities.' },
    { _key: 'mountain-king-suite', name: 'Mountain King Suite', slug: 'mountain-king-suite', shortDescription: 'King bed with mountain views, fireplace and soaking tub.' },
  ],

  // Queen Rooms carousel
  queenRoomsLabel: 'Queen Rooms',
  queenRooms: [
    { _key: 'mountain-jr-queen', name: 'Mountain Jr Queen', slug: 'mountain-jr-queen', shortDescription: 'Queen bed, custom touches, Rocky Mountain views' },
    { _key: 'queen-balcony-suite', name: 'Mountain Queen Balcony Suite', slug: 'queen-balcony-suite', shortDescription: 'Queen bed, full balcony to mountain view, plus trundle with two twins' },
    { _key: 'jr-queen-suite', name: 'Jr Queen', slug: 'jr-queen-suite', shortDescription: 'Queen bed, custom touches, cozy and clean' },
    { _key: 'double-queen-balcony-suite', name: 'Double Queen Balcony Suite', slug: 'double-queen-balcony-suite', shortDescription: 'Two queen beds, full balcony with rockers, delightful finishes' },
    { _key: 'mountain-double-queen', name: 'Mountain Double Queen Suite', slug: 'mountain-double-queen', shortDescription: 'Two queen beds, overhead door to mountain views, curated and clean' },
  ],

  // Family Suite
  familyRoomLabel: 'Family',
  familyRoomName: 'Family Suite',
  familyRoomSlug: 'family-suite',
  familyRoomDescription: 'Queen bed + twin bunks, two bathrooms, cozy and functional. Sleeps 6.',

  // Camp Deck
  campDeckLabel: 'Camp Deck',
  campDeckName: 'Camp Deck',
  campDeckSlug: 'camp-deck',
  campDeckDescription: 'Outdoor camping deck with private restroom and mountain views.',

  // ==================== EVENTS SECTION ====================
  eventsSectionTitle: 'Gather Together',
  eventsSectionSubtitle: 'Unique spaces for unforgettable events',
  eventsCtaText: 'Learn More',
  eventsCtaUrl: '/events',

  // ==================== HOMA CAFÉ SECTION ====================
  homaParagraph1: 'Anchoring the public first floor of Kinship Landing is Homa, our craft café and bar. We took fresh, locally sourced ingredients and combined them with our favorite globally inspired dishes to offer nutrient dense and delightfully delicious food and drinks to fuel your adventures from sunrise to late night.',
  homaParagraph2: 'Designed for the hungry and the healthy alike, locals, hotel guests, and old friends gather and enjoy hearty sandwiches, flavorful whole grain or salad bowls, small bites like our signature hand pies, fresh soups, and entrees or brunch and breakfast packed full of yummy goodness. Share it all with a pint of local craft beer, freshly roasted coffee, in house custom cocktails, or the perfect glass of wine, kombucha, or an ice-oat milk latte.',
  homaPromoTitle: 'Join HOMA Homies & Get $5!',
  homaPromoDescription: 'Sign up for our loyalty program and get $5 instantly. Earn points, exclusive specials, and unlock in-room ordering coming soon!',
  homaPromoUrl: 'https://www.toasttab.com/kinship-landing-homa-415-south-nevada-avenue/rewardsSignup',
  homaCtaText: 'View Menu',
  homaCtaUrl: '/homa#menu',

  // ==================== PRESS & REVIEWS SECTION ====================
  pressSectionTitle: 'As Featured In',
  reviewsSectionTitle: 'Guest Reviews',
  googleRating: '4.5',
  googleReviewCount: '600+',

  // ==================== NEWSLETTER SECTION ====================
  newsletterTitle: 'Join the adventure',
  newsletterDescription: 'Follow us on Instagram and sign-up for our newsletter to get the latest updates, local recommendations and special offers (no spam, we promise!)',
  newsletterButtonText: 'Subscribe',
  newsletterDisclaimer: 'We respect your privacy. Unsubscribe at any time.',

  // ==================== MAP SECTION ====================
  mapSectionTitle: 'Location',
  mapSubtitle: 'Convenience to Everything',
  nearbyAttractions: [
    { _key: 'garden-gods', name: 'Garden of the Gods', time: 'Drive ~12 min', link: 'https://www.google.com/maps/dir/?api=1&destination=Garden+of+the+Gods+Colorado+Springs+CO' },
    { _key: 'downtown-dining', name: 'Downtown Dining', time: 'Walk ~5 min', link: '/explore#dining' },
    { _key: 'switchbacks', name: 'Switchbacks FC', time: 'Walk ~14 min', link: 'https://www.switchbacksfc.com/' },
    { _key: 'pikes-peak', name: 'Pikes Peak Highway', time: 'Drive ~27 min', link: 'https://www.google.com/maps/dir/?api=1&destination=Pikes+Peak+Highway+Cascade+CO' },
    { _key: 'speakeasies', name: 'Speakeasies', time: 'Walk ~5 min', link: '/explore#speakeasies' },
    { _key: 'performing-arts', name: 'Performing Arts and Live Music Venues', time: 'Walk ~5 min', link: '/explore#entertainment' },
    { _key: 'comedy-art', name: 'Comedy Shows, Art Classes, and Cooking Classes', time: 'Walk ~5 min', link: '/explore#entertainment' },
  ],
  mapCtaText: 'Book Your Stay',
  mapCtaUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E',

  // ==================== SEO ====================
  seoTitle: 'Experience Colorado Springs like a local | Kinship Landing',
  seoDescription: 'Your guide to insider adventures and authentic experiences in downtown Colorado Springs. Boutique hotel with local connections and mountain views.',
};

async function seedHomepage() {
  console.log('🌱 Seeding Homepage content to Sanity...\n');

  try {
    // Use createOrReplace to update the singleton document
    const result = await client.createOrReplace(homepageContent);

    console.log('✅ Successfully seeded Homepage content!');
    console.log('\n📋 Document ID:', result._id);
    console.log('\n🔗 View in Sanity Studio: https://kinship-landing.sanity.studio/structure/homepage');
    console.log('\n📝 Fields populated:');
    console.log('   - Hero: title, subtitle, video, CTA');
    console.log('   - Guide Section: title, 3 paragraphs, 3 CTAs');
    console.log('   - Rooms Section: title, CTA');
    console.log('   - Events Section: title, subtitle, CTA');
    console.log('   - HOMA Section: 2 paragraphs, promo, CTA');
    console.log('   - Press & Reviews: titles, Google rating');
    console.log('   - Newsletter: title, description, button, disclaimer');
    console.log('   - Map: title, subtitle, 7 nearby attractions, CTA');
    console.log('   - SEO: title, description');
    console.log('\n⚠️  NOTE: Images need to be uploaded manually in Sanity Studio');

  } catch (error) {
    console.error('❌ Error seeding content:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\n💡 Make sure your SANITY_API_TOKEN has "Editor" permissions.');
      console.error('   Get a token from: https://www.sanity.io/manage/project/u2qzrboc/api#tokens');
    }
    process.exit(1);
  }
}

// Run the seed function
seedHomepage();
