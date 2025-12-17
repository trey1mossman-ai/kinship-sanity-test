#!/usr/bin/env node

/**
 * EXPLORE PAGE - VERIFIED IMAGE SEED SCRIPT
 *
 * This script uploads all Explore page images to Sanity.
 * Each image path has been verified by reading the component fallbacks.
 *
 * AUDIT DATE: December 2024
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-explore-images-verified.js
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
  console.error('Run with: SANITY_API_TOKEN=your_token node scripts/seed-explore-images-verified.js');
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
 * IMAGE PATHS - VERIFIED FROM COMPONENT
 * Source: app/explore/ExplorePageClient.tsx
 */
const IMAGES = {
  // Line 464
  heroImage: 'public/images/Explore Page/explore-hero-optimized.webp',
  // Line 576
  speakeasiesBreakImage: 'public/images/Explore Page/speakeasies-break.webp',
  // Line 719
  entertainmentBreakImage: 'public/images/Explore Page/entertainment-break.webp',
  // Line 1029
  eatsBreakImage: 'public/images/Explore Page/eats-break.webp',
  // Line 1141
  wellnessBreakImage: 'public/images/Explore Page/wellness-break.webp',
  // Line 1291
  coffeeBreakImage: 'public/images/Explore Page/coffee-break.webp',
  // Line 1403
  dessertsBreakImage: 'public/images/Explore Page/desserts-break.webp',
};

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
  console.log('\n🚀 EXPLORE PAGE - Image Seed Script (Verified)\n');
  console.log('='.repeat(50));

  const uploadedAssets = {};

  // Upload all images
  console.log('\n📸 UPLOADING IMAGES');
  console.log('Source: app/explore/ExplorePageClient.tsx');

  for (const [key, imagePath] of Object.entries(IMAGES)) {
    const assetId = await uploadImage(imagePath);
    if (assetId) {
      uploadedAssets[key] = assetId;
    }
  }

  // Update Sanity document
  console.log('\n📝 UPDATING SANITY DOCUMENT...');
  console.log('='.repeat(50));

  const updateData = {};

  if (uploadedAssets.heroImage) {
    updateData.heroImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: uploadedAssets.heroImage },
    };
    console.log('  ✅ Hero image set');
  }

  if (uploadedAssets.speakeasiesBreakImage) {
    updateData.speakeasiesBreakImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: uploadedAssets.speakeasiesBreakImage },
    };
    console.log('  ✅ Speakeasies break image set');
  }

  if (uploadedAssets.entertainmentBreakImage) {
    updateData.entertainmentBreakImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: uploadedAssets.entertainmentBreakImage },
    };
    console.log('  ✅ Entertainment break image set');
  }

  if (uploadedAssets.eatsBreakImage) {
    updateData.eatsBreakImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: uploadedAssets.eatsBreakImage },
    };
    console.log('  ✅ Eats break image set');
  }

  if (uploadedAssets.wellnessBreakImage) {
    updateData.wellnessBreakImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: uploadedAssets.wellnessBreakImage },
    };
    console.log('  ✅ Wellness break image set');
  }

  if (uploadedAssets.coffeeBreakImage) {
    updateData.coffeeBreakImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: uploadedAssets.coffeeBreakImage },
    };
    console.log('  ✅ Coffee break image set');
  }

  if (uploadedAssets.dessertsBreakImage) {
    updateData.dessertsBreakImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: uploadedAssets.dessertsBreakImage },
    };
    console.log('  ✅ Desserts break image set');
  }

  await client.patch('explorePage').set(updateData).commit();

  console.log('\n✅ COMPLETE! Explore page images uploaded to Sanity.');
  console.log('\n📊 SUMMARY:');
  console.log(`  - Hero Image: 1`);
  console.log(`  - Section Break Images: 6`);
  console.log(`  - Total Images: ${Object.keys(uploadedAssets).length}`);
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/explorePage');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
