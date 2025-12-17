#!/usr/bin/env node

/**
 * COMMUNITY PAGE - VERIFIED IMAGE SEED SCRIPT
 *
 * This script uploads all Community page images to Sanity.
 * Each image path has been verified by reading the component fallbacks.
 *
 * AUDIT DATE: December 2024
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-community-images-verified.js
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
  console.error('Run with: SANITY_API_TOKEN=your_token node scripts/seed-community-images-verified.js');
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
 * HERO IMAGE
 * Source: app/community/CommunityPageClient.tsx:87
 */
const HERO_IMAGE = {
  heroImage: 'public/images/Community Page/GetOutsideEvent6_26-SamStarrMedia (1).webp',
};

/**
 * EVENT IMAGES
 * Source: app/community/CommunityPageClient.tsx:34-60 (fallbackEvents array)
 */
const EVENT_IMAGES = [
  {
    key: 'event-1',
    path: 'public/images/Community Page/Nov. 24.webp',  // Line 39
  },
  {
    key: 'event-2',
    path: 'public/images/Community Page/Nov. 26.webp',  // Line 46
  },
  {
    key: 'event-3',
    path: 'public/images/Community Page/Nov.26 -.webp', // Line 55
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
  console.log('\n🚀 COMMUNITY PAGE - Image Seed Script (Verified)\n');
  console.log('='.repeat(50));

  // 1. Upload Hero Image
  console.log('\n📸 HERO IMAGE');
  console.log('Source: app/community/CommunityPageClient.tsx:87');
  const heroAssetId = await uploadImage(HERO_IMAGE.heroImage);

  // 2. Upload Event Images
  console.log('\n📸 EVENT IMAGES');
  console.log('Source: app/community/CommunityPageClient.tsx:34-60');
  const eventAssets = [];
  for (const event of EVENT_IMAGES) {
    const assetId = await uploadImage(event.path);
    if (assetId) {
      eventAssets.push({ key: event.key, assetId });
    }
  }

  // 3. Update Sanity document - Hero Image
  console.log('\n📝 UPDATING SANITY DOCUMENT...');
  console.log('='.repeat(50));

  if (heroAssetId) {
    await client.patch('communityPage').set({
      heroImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: heroAssetId,
        },
      },
    }).commit();
    console.log('  ✅ Hero image updated');
  }

  // Note: Event images are part of the events array
  // They will be seeded with the content script

  console.log('\n✅ COMPLETE! Community page hero image uploaded to Sanity.');
  console.log('\n📊 SUMMARY:');
  console.log(`  - Hero Image: 1`);
  console.log(`  - Event Images: ${eventAssets.length} (will be linked in content seed)`);
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/communityPage');

  // Return event assets for use in content seed
  return eventAssets;
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
