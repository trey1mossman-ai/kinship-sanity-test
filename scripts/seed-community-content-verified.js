#!/usr/bin/env node

/**
 * COMMUNITY PAGE - VERIFIED CONTENT SEED SCRIPT
 *
 * This script seeds all Community page content to Sanity.
 * Each value has been verified by reading the component fallbacks.
 *
 * AUDIT DATE: December 2024
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-community-content-verified.js
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Sanity configuration
const SANITY_PROJECT_ID = 'u2qzrboc';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

const SANITY_TOKEN = process.env.SANITY_API_TOKEN;
if (!SANITY_TOKEN) {
  console.error('Error: SANITY_API_TOKEN environment variable is required');
  console.error('Run with: SANITY_API_TOKEN=your_token node scripts/seed-community-content-verified.js');
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
 * Source: app/community/CommunityPageClient.tsx:68-69
 */
const HERO_CONTENT = {
  heroTitle: 'Community Events',
  heroSubtitle: 'Join us for gatherings, workshops, and experiences that bring our community together',
};

/**
 * INTRO SECTION
 * Source: app/community/CommunityPageClient.tsx:70-72
 */
const INTRO_CONTENT = {
  introBadge: "What's Happening",
  introTitle: 'Upcoming Events',
  introText: 'Join us for gatherings, workshops, and experiences that bring our community together. Click any event below to view full details.',
};

/**
 * SEO CONTENT
 * Source: app/community/page.tsx:9-10
 */
const SEO_CONTENT = {
  seoTitle: 'Community Events | Kinship Landing',
  seoDescription: 'Join Kinship Landing for community events, gatherings, workshops, and experiences that bring the Colorado Springs community together.',
};

/**
 * EVENT IMAGES - Need to upload first
 * Source: app/community/CommunityPageClient.tsx:34-60
 */
const EVENT_IMAGE_PATHS = [
  'public/images/Community Page/Nov. 24.webp',
  'public/images/Community Page/Nov. 26.webp',
  'public/images/Community Page/Nov.26 -.webp',
];

/**
 * EVENTS DATA
 * Source: app/community/CommunityPageClient.tsx:34-60 (fallbackEvents array)
 */
const EVENTS_DATA = [
  {
    _key: 'event-1',
    title: 'November 24th Event',
    description: 'Join us for an exciting community gathering at Kinship Landing.',
    alt: 'Community Event - November 24th',
    isActive: true,
    // image will be added after upload
  },
  {
    _key: 'event-2',
    title: 'Everything But the Turkey',
    description: 'Let HOMA handle the sides this Thanksgiving! Pre-order our delicious holiday dishes and spend more time with family.',
    alt: 'Community Event - November 26th',
    eventUrl: 'https://www.eventbrite.com/e/everything-but-the-turkey-from-homa-cafe-bar-registration-1908375365089?aff=oddtdtcreator',
    buttonText: 'Reserve a Spot',
    isActive: true,
    // image will be added after upload
  },
  {
    _key: 'event-3',
    title: 'Holiday Gathering',
    description: 'Celebrate the season with our community at this special holiday event.',
    alt: 'Community Event - November 26th',
    eventUrl: 'https://www.eventbrite.com/e/everything-but-the-turkey-from-homa-cafe-bar-registration-1908375365089?aff=oddtdtcreator',
    buttonText: 'Reserve a Spot',
    isActive: true,
    // image will be added after upload
  },
];

async function uploadImage(filePath) {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`  ❌ File not found: ${absolutePath}`);
    return null;
  }

  const imageBuffer = fs.readFileSync(absolutePath);
  const fileName = path.basename(filePath);

  console.log(`  📤 Uploading: ${fileName}`);

  const asset = await client.assets.upload('image', imageBuffer, {
    filename: fileName,
  });

  console.log(`  ✅ Uploaded: ${asset._id}`);
  return asset._id;
}

async function main() {
  console.log('\n🚀 COMMUNITY PAGE - Content Seed Script (Verified)\n');
  console.log('='.repeat(50));

  // 1. Upload event images first
  console.log('\n📸 UPLOADING EVENT IMAGES');
  console.log('Source: app/community/CommunityPageClient.tsx:34-60');

  const eventAssetIds = [];
  for (const imagePath of EVENT_IMAGE_PATHS) {
    const assetId = await uploadImage(imagePath);
    eventAssetIds.push(assetId);
  }

  // 2. Build events array with images
  console.log('\n📝 BUILDING EVENTS DATA');
  const eventsWithImages = EVENTS_DATA.map((event, index) => ({
    ...event,
    image: eventAssetIds[index] ? {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: eventAssetIds[index],
      },
    } : undefined,
  }));

  // 3. Combine all content
  const allContent = {
    ...HERO_CONTENT,
    ...INTRO_CONTENT,
    ...SEO_CONTENT,
    events: eventsWithImages,
  };

  console.log('\n📝 Content sections to seed:');
  console.log('  - Hero Section (2 fields)');
  console.log('  - Intro Section (3 fields)');
  console.log('  - SEO (2 fields)');
  console.log(`  - Events (${eventsWithImages.length} events with images)`);

  console.log('\n📤 Updating Sanity document...');

  await client.patch('communityPage').set(allContent).commit();

  console.log('\n✅ COMPLETE! All Community page content seeded to Sanity.');
  console.log('\n📊 SUMMARY:');
  console.log(`  - Total fields updated: ${Object.keys(allContent).length}`);
  console.log(`  - Events: ${eventsWithImages.length}`);
  console.log(`  - Event images uploaded: ${eventAssetIds.filter(id => id).length}`);
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/communityPage');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
