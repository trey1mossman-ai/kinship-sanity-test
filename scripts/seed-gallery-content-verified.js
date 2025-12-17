#!/usr/bin/env node

/**
 * GALLERY PAGE - VERIFIED CONTENT SEED SCRIPT
 *
 * This script seeds all Gallery page text content to Sanity.
 * Each value has been verified by reading the component fallbacks.
 *
 * AUDIT DATE: December 2024
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-gallery-content-verified.js
 */

const { createClient } = require('@sanity/client');

// Sanity configuration
const SANITY_PROJECT_ID = 'u2qzrboc';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

const SANITY_TOKEN = process.env.SANITY_API_TOKEN;
if (!SANITY_TOKEN) {
  console.error('Error: SANITY_API_TOKEN environment variable is required');
  console.error('Run with: SANITY_API_TOKEN=your_token node scripts/seed-gallery-content-verified.js');
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
 * Source: app/gallery/GalleryPageClient.tsx:108-109
 */
const HERO_CONTENT = {
  heroTitle: 'Gallery',
  heroSubtitle: 'Explore Kinship Landing',
};

/**
 * INTRO SECTION
 * Source: app/gallery/GalleryPageClient.tsx:112-114
 */
const INTRO_CONTENT = {
  introBadge: 'See It For Yourself',
  introTitle: 'Your Colorado Springs Basecamp',
  introText: 'From cozy rooms with mountain views to vibrant gathering spaces and locally-crafted dishes at HOMA, explore what makes Kinship Landing the perfect place to stay, gather, and launch your Colorado adventures.',
};

/**
 * FILTER LABELS
 * Source: app/gallery/GalleryPageClient.tsx:117-123
 */
const FILTER_CONTENT = {
  filterAllLabel: 'All',
  filterRoomsLabel: 'Rooms',
  filterVenuesLabel: 'Venues',
  filterHomaLabel: 'Homa Cafe',
  filterOutdoorsLabel: 'Outdoors',
  filterWeddingsLabel: 'Weddings',
};

/**
 * FAQ SECTION
 * Source: components/gallery/GalleryFAQ.tsx:14-55
 */
const FAQ_CONTENT = {
  faqSectionTitle: 'Gallery FAQs',
  faqSectionSubtitle: 'Everything you need to know about our gallery and photography',
  faqItems: [
    {
      _key: 'faq1',
      question: 'What types of images are in the Kinship Landing gallery?',
      answerShort: 'The gallery features guest rooms, event spaces, Homa Cafe + Bar, outdoor areas, weddings, and mountain views.',
      answerLong: "You'll find interior room shots, suites with wooden decor, junior suites, family suites with bunk beds, and bathroom vanities. There are also images of food and drinks from Homa, outdoor views of The Yard and Camp Deck, the Greenhaus event space, and candid moments from weddings and gatherings. Mountain views and exterior shots round out the collection.",
    },
    {
      _key: 'faq2',
      question: 'Does the gallery include photos of all room types?',
      answerShort: 'Yes. The gallery showcases suites, junior suites, and family suites to help you visualize each room style.',
      answerLong: "We include images of every room category: standard suites with queen beds, junior suites with desks and ottomans, and family suites featuring bunk beds. You'll also see details like bathroom vanities, bedding, and room layouts to give you a clear sense of what to expect before you book.",
    },
    {
      _key: 'faq3',
      question: 'Are there images of event spaces like The Greenhaus, Yard, and Camp Deck?',
      answerShort: 'Yes. The gallery features photos of all event spaces, including setups and real events.',
      answerLong: "You'll see guests relaxing in The Greenhaus, ceremony and reception setups in The Yard, and intimate gatherings on The Camp Deck. We've included both styled shots and candid moments from actual weddings and corporate events to help you envision your own celebration.",
    },
    {
      _key: 'faq4',
      question: 'Does the gallery feature weddings and special events?',
      answerShort: 'Yes. We showcase real weddings, receptions, and social gatherings throughout the gallery.',
      answerLong: "Wedding couples, reception setups, and candid moments from celebrations are all featured. These images highlight how our venues—The Yard, Greenhaus, and Camp Deck—transform for ceremonies, cocktail hours, and receptions. They're a great way to see Kinship Landing in action as a wedding and event destination.",
    },
    {
      _key: 'faq5',
      question: 'Can I view food and drink offerings in the gallery?',
      answerShort: 'Yes. The gallery highlights signature dishes and drinks from Homa Cafe + Bar.',
      answerLong: "You'll find images of popular menu items like grain bowls, cauliflower pops, hand pies, salads, sandwiches, and seasonal specials. Drink photos include espresso drinks, craft cocktails, kombucha on tap, and local beer. It's a visual preview of what you can enjoy during your stay.",
    },
    {
      _key: 'faq6',
      question: 'Are there photos of mountain views and outdoor areas?',
      answerShort: 'Yes. The gallery features mountain views, exterior shots, and outdoor seating areas.',
      answerLong: "Expect to see mountain range views from guest rooms, exterior hotel shots at night with string lights, and outdoor seating in The Yard. We've captured the natural beauty surrounding Kinship Landing, including Pikes Peak views and the relaxed outdoor atmosphere that makes our property special.",
    },
    {
      _key: 'faq7',
      question: 'Can I take photos inside Kinship Landing?',
      answerShort: "Yes. Guests are welcome to take photos, but please be respectful of other guests' privacy.",
      answerLong: "Feel free to snap photos in your room, common areas, and outdoor spaces. We just ask that you avoid using flash in public areas and large equipment that might disrupt other guests. If you're planning a professional shoot or content creation session, check with the front desk first.",
    },
    {
      _key: 'faq8',
      question: 'How can I request high-resolution images for press or marketing use?',
      answerShort: 'Email hello@kinshiplanding.com with your request and usage details.',
      answerLong: "Media inquiries and requests for high-resolution images should be sent to hello@kinshiplanding.com. Let us know what images you need, how you plan to use them, and any publication or campaign details. We're happy to provide assets for press, partnerships, and approved marketing uses.",
    },
  ],
};

/**
 * SEO CONTENT
 * Source: app/gallery/page.tsx:6-7
 */
const SEO_CONTENT = {
  seoTitle: 'Gallery | Kinship Landing',
  seoDescription: 'Explore our boutique hotel in downtown Colorado Springs. View our guest rooms, event spaces, HOMA Cafe + Bar, and mountain views.',
};

async function main() {
  console.log('\n🚀 GALLERY PAGE - Content Seed Script (Verified)\n');
  console.log('='.repeat(50));

  // Combine all content
  const allContent = {
    ...HERO_CONTENT,
    ...INTRO_CONTENT,
    ...FILTER_CONTENT,
    ...FAQ_CONTENT,
    ...SEO_CONTENT,
  };

  console.log('\n📝 Content sections to seed:');
  console.log('  - Hero Section (2 fields)');
  console.log('  - Intro Section (3 fields)');
  console.log('  - Filter Labels (6 fields)');
  console.log(`  - FAQ Section (2 fields + ${FAQ_CONTENT.faqItems.length} FAQ items)`);
  console.log('  - SEO (2 fields)');

  console.log('\n📤 Updating Sanity document...');

  await client.patch('galleryPage').set(allContent).commit();

  console.log('\n✅ COMPLETE! All Gallery page content seeded to Sanity.');
  console.log('\n📊 SUMMARY:');
  console.log(`  - Total fields updated: ${Object.keys(allContent).length}`);
  console.log(`  - FAQ items: ${FAQ_CONTENT.faqItems.length}`);
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/galleryPage');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
