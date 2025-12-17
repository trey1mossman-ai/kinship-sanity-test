#!/usr/bin/env node

/**
 * CAREERS PAGE - VERIFIED IMAGE SEED SCRIPT
 *
 * This script uploads all Careers page images to Sanity.
 * Each image path has been verified by reading the component fallbacks.
 *
 * AUDIT DATE: December 2024
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-careers-images-verified.js
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
  console.error('Run with: SANITY_API_TOKEN=your_token node scripts/seed-careers-images-verified.js');
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
 * Source: app/careers/page.tsx:43 (defaultContent.heroImage)
 */
const HERO_IMAGE = {
  heroImage: 'public/images/events-page/Gatherings/kinship-119.webp',
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
  console.log('\n🚀 CAREERS PAGE - Image Seed Script (Verified)\n');
  console.log('='.repeat(50));

  // 1. Upload Hero Image
  console.log('\n📸 HERO IMAGE');
  console.log('Source: app/careers/page.tsx:43');
  const heroAssetId = await uploadImage(HERO_IMAGE.heroImage);

  // 2. Update Sanity document
  console.log('\n📝 UPDATING SANITY DOCUMENT...');
  console.log('='.repeat(50));

  if (heroAssetId) {
    await client.patch('careersPage').set({
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

  console.log('\n✅ COMPLETE! Careers page image uploaded to Sanity.');
  console.log('\n📊 SUMMARY:');
  console.log(`  - Hero Image: 1`);
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/careersPage');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
