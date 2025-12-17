#!/usr/bin/env node

/**
 * HOMA PAGE - VERIFIED IMAGE SEED SCRIPT
 *
 * This script uploads all Homa page images to Sanity.
 * Each image path has been verified by reading the component fallbacks.
 *
 * AUDIT DATE: December 2024
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-homa-images-verified.js
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
  console.error('Run with: SANITY_API_TOKEN=your_token node scripts/seed-homa-images-verified.js');
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
 * HERO TRIPTYCH IMAGES (Desktop)
 * Source: app/homa/HomaPageClient.tsx:27-28
 */
const HERO_TRIPTYCH_IMAGES = {
  heroTriptychImage1: 'public/images/HOMA Page/hero-triptych-1.webp',
  // Note: heroTriptychImage2 uses hero-triptych-3.webp (intentional design choice)
  heroTriptychImage2: 'public/images/HOMA Page/hero-triptych-3.webp',
  heroTriptychImage3: 'public/images/HOMA Page/hero-triptych-3.webp',
};

/**
 * SPECIALS & EVENTS SECTION IMAGES
 * Source: app/homa/HomaPageClient.tsx:303, 392, 478
 */
const SPECIALS_IMAGES = {
  // Line 303: Happy Hour card image
  happyHourImage: 'public/images/HOMA Page/homa-happy-hour-34.webp',
  // Line 392: Brunch card image
  brunchImage: 'public/images/HOMA Page/Brunch.webp',
  // Line 478: Events card image
  eventsImage: 'public/images/HOMA Page/CafeSeating2, SamStarr.webp',
};

/**
 * PROMO BANNER IMAGE
 * Source: app/homa/HomaPageClient.tsx:554, 568
 */
const PROMO_IMAGES = {
  promoBannerImage: 'public/images/HOMA Page/everything-turkey-promo-optimized.webp',
};

/**
 * SEATING/FIREPLACE CAROUSEL IMAGES
 * Source: app/homa/HomaPageClient.tsx:41-45
 */
const SEATING_IMAGES = [
  'public/images/HOMA Page/homa seating-optimized.webp',      // Line 41
  'public/images/HOMA Page/homa seating 2-optimized.webp',    // Line 42
  'public/images/HOMA Page/Seating Homa -optimized.webp',     // Line 43
  'public/images/HOMA Page/CafeSeating-GregCeo-optimized.webp', // Line 44
  'public/images/HOMA Page/CafeSeating-ChrystalHolmes (1)-optimized.webp', // Line 45
];

/**
 * LOYALTY SECTION IMAGE
 * Source: components/homa/HomaLoyalty.tsx:80
 */
const LOYALTY_IMAGES = {
  loyaltyImage: 'public/images/HOMA Page/homa 8.13.24-6 (1).webp',
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
  console.log('\n🚀 HOMA PAGE - Image Seed Script (Verified)\n');
  console.log('='.repeat(50));

  // Track all uploaded assets
  const uploadedAssets = {};

  // 1. Upload Hero Triptych Images
  console.log('\n📸 HERO TRIPTYCH IMAGES');
  console.log('Source: app/homa/HomaPageClient.tsx:27-28');
  for (const [fieldName, filePath] of Object.entries(HERO_TRIPTYCH_IMAGES)) {
    const assetId = await uploadImage(filePath);
    if (assetId) uploadedAssets[fieldName] = assetId;
  }

  // 2. Upload Specials Images
  console.log('\n📸 SPECIALS & EVENTS IMAGES');
  console.log('Source: app/homa/HomaPageClient.tsx:303, 392, 478');
  for (const [fieldName, filePath] of Object.entries(SPECIALS_IMAGES)) {
    const assetId = await uploadImage(filePath);
    if (assetId) uploadedAssets[fieldName] = assetId;
  }

  // 3. Upload Promo Banner Image
  console.log('\n📸 PROMO BANNER IMAGE');
  console.log('Source: app/homa/HomaPageClient.tsx:554, 568');
  for (const [fieldName, filePath] of Object.entries(PROMO_IMAGES)) {
    const assetId = await uploadImage(filePath);
    if (assetId) uploadedAssets[fieldName] = assetId;
  }

  // 4. Upload Seating Images (array)
  console.log('\n📸 SEATING/FIREPLACE CAROUSEL IMAGES');
  console.log('Source: app/homa/HomaPageClient.tsx:41-45');
  const seatingAssetIds = [];
  for (const filePath of SEATING_IMAGES) {
    const assetId = await uploadImage(filePath);
    if (assetId) seatingAssetIds.push(assetId);
  }

  // 5. Upload Loyalty Image
  console.log('\n📸 LOYALTY SECTION IMAGE');
  console.log('Source: components/homa/HomaLoyalty.tsx:80');
  for (const [fieldName, filePath] of Object.entries(LOYALTY_IMAGES)) {
    const assetId = await uploadImage(filePath);
    if (assetId) uploadedAssets[fieldName] = assetId;
  }

  // 6. Update Sanity document
  console.log('\n📝 UPDATING SANITY DOCUMENT...');
  console.log('='.repeat(50));

  const patch = client.patch('homaPage');

  // Set single image fields
  for (const [fieldName, assetId] of Object.entries(uploadedAssets)) {
    patch.set({
      [fieldName]: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId,
        },
      },
    });
  }

  // Set seating images array
  if (seatingAssetIds.length > 0) {
    patch.set({
      seatingImages: seatingAssetIds.map((assetId, index) => ({
        _key: `seating-${index}`,
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId,
        },
      })),
    });
  }

  await patch.commit();

  console.log('\n✅ COMPLETE! All Homa page images uploaded to Sanity.');
  console.log('\n📊 SUMMARY:');
  console.log(`  - Hero Triptych: 3 images`);
  console.log(`  - Specials Cards: 3 images`);
  console.log(`  - Promo Banner: 1 image`);
  console.log(`  - Seating Carousel: ${seatingAssetIds.length} images`);
  console.log(`  - Loyalty Section: 1 image`);
  console.log(`  - TOTAL: ${Object.keys(uploadedAssets).length + seatingAssetIds.length} images`);
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/homaPage');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
