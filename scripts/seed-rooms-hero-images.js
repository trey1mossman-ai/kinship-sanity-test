#!/usr/bin/env node
/**
 * ROOMS PAGE - HERO IMAGES SEED SCRIPT
 *
 * Source: app/rooms/RoomsPageClient.tsx:51-55
 *
 * Uploads the hero section images for the rooms page carousel.
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('ERROR: SANITY_API_TOKEN required');
  process.exit(1);
}

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token,
});

/**
 * HERO IMAGES
 * Source: app/rooms/RoomsPageClient.tsx:51-55 (HERO_IMAGES_FALLBACK)
 */
const HERO_IMAGES = [
  {
    path: 'public/images/Gallery Page/Textiles-RichardSeldomridge-optimized.webp',
    alt: 'Kinship Landing room textiles and details'
  },
  {
    path: 'public/images/Gallery Page/Family Suite, Ashlee Kay Photography (2)-optimized.webp',
    alt: 'Kinship Landing Family Suite'
  },
  {
    path: 'public/images/Gallery Page/PetFriendlyJrQueenSuite-ExploreWithMedia (2)-optimized.webp',
    alt: 'Kinship Landing Pet Friendly Jr Queen Suite'
  }
];

async function uploadImage(filePath, filename) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`  ⚠️ File not found: ${filePath}`);
    return null;
  }

  const buffer = fs.readFileSync(fullPath);
  console.log(`  📤 Uploading: ${filename}`);

  const asset = await client.assets.upload('image', buffer, {
    filename: filename,
  });

  console.log(`  ✅ Uploaded: ${asset._id}`);
  return asset._id;
}

async function seedRoomsHeroImages() {
  console.log('🚀 ROOMS PAGE - Hero Images Seed Script\n');
  console.log('==================================================\n');

  // Upload main hero image (first image used as heroImage)
  console.log('📸 MAIN HERO IMAGE');
  const mainHeroAssetId = await uploadImage(
    HERO_IMAGES[0].path,
    'rooms-hero-main.webp'
  );

  // Upload all images for the heroImages array
  console.log('\n📸 HERO GALLERY IMAGES');
  const heroImagesData = [];

  for (let i = 0; i < HERO_IMAGES.length; i++) {
    const img = HERO_IMAGES[i];
    const assetId = await uploadImage(img.path, `rooms-hero-${i + 1}.webp`);
    if (assetId) {
      heroImagesData.push({
        _key: `hero-${i + 1}`,
        _type: 'image',
        alt: img.alt,
        asset: { _type: 'reference', _ref: assetId }
      });
    }
  }

  // Update roomsPage document
  console.log('\n📝 UPDATING SANITY DOCUMENT...');
  console.log('==================================================');

  const patch = client.patch('roomsPage');

  if (mainHeroAssetId) {
    patch.set({
      heroImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: mainHeroAssetId }
      }
    });
    console.log('  ✅ Hero image set');
  }

  if (heroImagesData.length > 0) {
    patch.set({ heroImages: heroImagesData });
    console.log(`  ✅ Hero images array set (${heroImagesData.length} images)`);
  }

  await patch.commit();

  console.log('\n✅ COMPLETE! Rooms page hero images uploaded to Sanity.\n');
  console.log('📊 SUMMARY:');
  console.log(`  - Main Hero Image: ${mainHeroAssetId ? '1' : '0'}`);
  console.log(`  - Hero Gallery Images: ${heroImagesData.length}`);
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/roomsPage');
}

seedRoomsHeroImages().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
