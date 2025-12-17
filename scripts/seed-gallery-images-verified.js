#!/usr/bin/env node

/**
 * GALLERY PAGE - VERIFIED IMAGE SEED SCRIPT
 *
 * This script uploads all Gallery page images to Sanity.
 * Each image path has been verified by reading the component fallbacks.
 *
 * AUDIT DATE: December 2024
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-gallery-images-verified.js
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
  console.error('Run with: SANITY_API_TOKEN=your_token node scripts/seed-gallery-images-verified.js');
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
 * Source: app/gallery/GalleryPageClient.tsx:235
 */
const HERO_IMAGE = 'public/images/events-page/Make Kinship Yours/HomaNightlife-GregCeo.webp';

/**
 * GALLERY IMAGES - All 43 images with categories
 * Source: app/gallery/GalleryPageClient.tsx:29-97
 */
const GALLERY_IMAGES = [
  // Rooms Category (11 images)
  { path: 'public/images/Rooms Page:section/Book a bunch of rooms/BunkRoom5-SamStarr-optimized.webp', alt: 'Room Block', category: 'rooms' },
  { path: 'public/images/Rooms Page:section/Camp Deck/CampDeck-SamStarrMedia (2)-optimized.webp', alt: 'Camp Deck', category: 'rooms' },
  { path: 'public/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge-optimized.webp', alt: 'Camp Deck Outdoor', category: 'rooms' },
  { path: 'public/images/Rooms Page:section/Double Queen Balcony/DoubleQueenSuite-RichardSeldomridge-optimized.webp', alt: 'Double Queen Balcony Suite', category: 'rooms' },
  { path: 'public/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (1) (1)-optimized.webp', alt: 'King Suite', category: 'rooms' },
  { path: 'public/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (2)-optimized.webp', alt: 'King Suite Interior', category: 'rooms' },
  { path: 'public/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-RichardSeldomridge (4)-optimized.webp', alt: 'Mountain Double Queen', category: 'rooms' },
  { path: 'public/images/Rooms Page:section/Mountain Jr. Queen/MountainJrQueenSuite-RichardSeldomridge-optimized.webp', alt: 'Mountain Jr. Queen Suite', category: 'rooms' },
  { path: 'public/images/Rooms Page:section/Book a bunch of rooms/MountainDoubleQueenSuite-AshleeKay-optimized.webp', alt: 'Mountain Double Queen Suite', category: 'rooms' },
  { path: 'public/images/Rooms Page:section/Family Suite/AK_03363-optimized.webp', alt: 'Family Suite', category: 'rooms' },
  { path: 'public/images/Gallery Page/Family Suite, Ashlee Kay Photography (2)-optimized.webp', alt: 'Family Suite Living Area', category: 'rooms' },

  // Venues Category (16 images)
  { path: 'public/images/events-page/The Fireplace/FireplaceDrinks2, SamStarr-optimized.webp', alt: 'Fireplace Lounge', category: 'venues' },
  { path: 'public/images/events-page/GreenHaus/Greenhaus-SamStarrMedia (1).webp', alt: 'GreenHaus Interior', category: 'venues' },
  { path: 'public/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge.webp', alt: 'GreenHaus Venue', category: 'venues' },
  { path: 'public/images/events-page/The Yard/Yard2, SamStarr.webp', alt: 'The Yard - Gathering Space', category: 'venues' },
  { path: 'public/images/events-page/The Yard/Yard3, SamStarr.webp', alt: 'The Yard - Evening Atmosphere', category: 'venues' },
  { path: 'public/images/events-page/Meetings:Retreats/Kinship-4G3A9437-1 (1).webp', alt: 'GreenHaus Event Space', category: 'venues' },
  { path: 'public/images/events-page/Gatherings/0B1A0328-optimized.webp', alt: 'GreenHaus Gathering', category: 'venues' },
  { path: 'public/images/events-page/GreenHaus/Greenhaus-ErinWinterPhotography-8502.webp', alt: 'GreenHaus Setup', category: 'venues' },
  { path: 'public/images/events-page/The Yard/Yard7, SamStarr.webp', alt: 'The Yard - Outdoor Setting', category: 'venues' },
  { path: 'public/images/events-page/The Yard/Yard8, SamStarr.webp', alt: 'The Yard - Event Setup', category: 'venues' },
  { path: 'public/images/events-page/The Yard/Yard, AshleeKayPhotography.webp', alt: 'The Yard - Outdoor Event Space', category: 'venues' },
  { path: 'public/images/events-page/The Yard/Yard, AshleeKayPhotography (2).webp', alt: 'The Yard - Mountain Views', category: 'venues' },
  { path: 'public/images/events-page/The Yard/4DE0F411-7D69-45F5-90C2-98BF3C106C00_1_201_a.webp', alt: 'The Yard - Venue Space', category: 'venues' },
  { path: 'public/images/events-page/The Yard/D85A8921.webp', alt: 'The Yard - Panoramic View', category: 'venues' },
  { path: 'public/images/events-page/The Yard/D85A8970.webp', alt: 'The Yard - Scenic Backdrop', category: 'venues' },
  { path: 'public/images/events-page/The Yard/DSC_6966.webp', alt: 'The Yard - Colorado Views', category: 'venues' },
  { path: 'public/images/events-page/The Yard/IMG_1484.webp', alt: 'The Yard - Mountain Setting', category: 'venues' },
  { path: 'public/images/events-page/The Yard/IMG_1487 (1).webp', alt: 'The Yard - Outdoor Ambiance', category: 'venues' },
  { path: 'public/images/events-page/The Yard/IMG_1490.webp', alt: 'The Yard - Event Venue', category: 'venues' },
  { path: 'public/images/events-page/The Yard/IMG_1494.webp', alt: 'The Yard - Outdoor Space', category: 'venues' },

  // HOMA Category (14 images)
  { path: 'public/images/HOMA Page/CafeSeating-GregCeo-optimized.webp', alt: 'HOMA Seating Space', category: 'homa' },
  { path: 'public/images/HOMA Page/CafeSeating2, SamStarr.webp', alt: 'HOMA Lounge Seating', category: 'homa' },
  { path: 'public/images/HOMA Page/DSCF8548.webp', alt: 'HOMA Cafe Interior', category: 'homa' },
  { path: 'public/images/HOMA Page/Seating Homa -optimized.webp', alt: 'HOMA Cafe Seating', category: 'homa' },
  { path: 'public/images/HOMA Page/Brunch.webp', alt: 'HOMA Brunch', category: 'homa' },
  { path: 'public/images/HOMA Page/Signature Dishes.webp', alt: 'HOMA Signature Dishes', category: 'homa' },
  { path: 'public/images/HOMA Page/Craft Cocktails.webp', alt: 'HOMA Craft Cocktails', category: 'homa' },
  { path: 'public/images/HOMA Page/Fresh and local.webp', alt: 'HOMA Fresh & Local Ingredients', category: 'homa' },
  { path: 'public/images/HOMA Page/Homa Bar, Jennie Campbell (@fsupecas21)-optimized.webp', alt: 'HOMA Bar', category: 'homa' },
  { path: 'public/images/HOMA Page/Homa Espresso Web Size_-4 (1).webp', alt: 'HOMA Espresso', category: 'homa' },
  { path: 'public/images/HOMA Page/homa 8.13.24-6 (1).webp', alt: 'HOMA Cafe Atmosphere', category: 'homa' },
  { path: 'public/images/HOMA Page/Homa.2.25-29 (1).webp', alt: 'HOMA Dining', category: 'homa' },
  { path: 'public/images/HOMA Page/homa-happy-hour-34.webp', alt: 'HOMA Happy Hour', category: 'homa' },
  { path: 'public/images/HOMA Page/CafeSeating-ChrystalHolmes (1)-optimized.webp', alt: 'HOMA Cafe Seating Area', category: 'homa' },
  { path: 'public/images/HOMA Page/homa seating 2-optimized.webp', alt: 'HOMA Cozy Corner', category: 'homa' },
  { path: 'public/images/HOMA Page/homa seating-optimized.webp', alt: 'HOMA Seating', category: 'homa' },

  // Weddings Category (8 images)
  { path: 'public/images/events-page/Weddings/MountainKingSuite-RichardSeldomridge.webp', alt: 'Wedding at Kinship Landing', category: 'weddings' },
  { path: 'public/images/events-page/Weddings/8F8A1146-optimized.webp', alt: 'Wedding Celebration at Kinship', category: 'weddings' },
  { path: 'public/images/events-page/Weddings/8F8A7820.webp', alt: 'Wedding Reception at Kinship', category: 'weddings' },
  { path: 'public/images/events-page/Weddings/D85A8377-optimized.webp', alt: 'Wedding Ceremony at Kinship', category: 'weddings' },
  { path: 'public/images/events-page/Weddings/event image-optimized.webp', alt: 'Wedding Event at Kinship Landing', category: 'weddings' },
  { path: 'public/images/events-page/Weddings/kinship-38.webp', alt: 'Kinship Wedding Detail', category: 'weddings' },
  { path: 'public/images/events-page/Weddings/kinship-48.webp', alt: 'Kinship Wedding Venue', category: 'weddings' },
  { path: 'public/images/events-page/Weddings/kinship-57_nB2.webp', alt: 'Kinship Wedding Atmosphere', category: 'weddings' },
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
  console.log('\n🚀 GALLERY PAGE - Image Seed Script (Verified)\n');
  console.log('='.repeat(50));

  // 1. Upload Hero Image
  console.log('\n📸 HERO IMAGE');
  console.log('Source: app/gallery/GalleryPageClient.tsx:235');
  const heroAssetId = await uploadImage(HERO_IMAGE);

  // 2. Upload Gallery Images
  console.log('\n📸 GALLERY IMAGES');
  console.log('Source: app/gallery/GalleryPageClient.tsx:29-97');

  const galleryImageItems = [];
  let uploadCount = 0;

  for (const image of GALLERY_IMAGES) {
    const assetId = await uploadImage(image.path);
    if (assetId) {
      uploadCount++;
      galleryImageItems.push({
        _key: `gallery-${uploadCount}`,
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        },
        alt: image.alt,
        category: image.category,
      });
    }
  }

  // 3. Update Sanity document
  console.log('\n📝 UPDATING SANITY DOCUMENT...');
  console.log('='.repeat(50));

  const updateData = {};

  if (heroAssetId) {
    updateData.heroImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: heroAssetId },
    };
    console.log('  ✅ Hero image set');
  }

  if (galleryImageItems.length > 0) {
    updateData.galleryImages = galleryImageItems;
    console.log(`  ✅ Gallery images set (${galleryImageItems.length} images)`);
  }

  await client.patch('galleryPage').set(updateData).commit();

  console.log('\n✅ COMPLETE! Gallery page images uploaded to Sanity.');
  console.log('\n📊 SUMMARY:');
  console.log(`  - Hero Image: 1`);
  console.log(`  - Gallery Images: ${galleryImageItems.length}`);
  console.log(`    - Rooms: ${galleryImageItems.filter(i => i.category === 'rooms').length}`);
  console.log(`    - Venues: ${galleryImageItems.filter(i => i.category === 'venues').length}`);
  console.log(`    - HOMA: ${galleryImageItems.filter(i => i.category === 'homa').length}`);
  console.log(`    - Weddings: ${galleryImageItems.filter(i => i.category === 'weddings').length}`);
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/galleryPage');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
