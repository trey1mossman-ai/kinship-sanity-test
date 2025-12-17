#!/usr/bin/env node

/**
 * Complete Homepage Image Seed Script for Sanity CMS
 * Uploads ALL homepage images including room carousel images
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
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  token: SANITY_TOKEN,
  useCdn: false,
});

// ALL Homepage standalone images
const STANDALONE_IMAGES = {
  // Hero
  heroImage: 'public/images/HomePage/GardenoftheGods, SamStarr-mobile.webp',

  // Guide Section
  guideBackgroundImage: 'public/images/HomePage/GardenoftheGods, SamStarr-mobile.webp',
  guideStampImage: 'public/images/HomePage/background for stay explore gather drink eat-mobile.webp',

  // Events Section
  eventsSectionImage: 'public/images/HomePage/event image-optimized.webp',

  // HOMA Section
  homaBackgroundImage: 'public/images/HOMA Page/CafeSeating-GregCeo-optimized.webp',
  homaLogoImage: 'public/images/homa-logo-sq.svg',

  // Press & Reviews
  pressBackgroundMural: 'public/images/HomePage/Background-mural-mobile.webp',

  // Map Section
  woodwallBreakImage: 'public/images/About/WoodWall-SamStarr.webp',
  mapImage: 'public/images/HomePage/GardenoftheGods, SamStarr-mobile.webp',

  // Family Room
  familyRoomImage: 'public/images/Rooms Page:section/Family Suite/AK_03363-optimized.webp',

  // Camp Deck
  campDeckImage: 'public/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge (1)-optimized.webp',
};

// King Rooms with images
const KING_ROOMS = [
  {
    _key: 'king-suite',
    name: 'King Suite',
    slug: 'king-suite',
    shortDescription: 'King bed, sunrise views, in-room fireplace and soaking tub.',
    imagePath: 'public/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (1) (1)-optimized.webp'
  },
  {
    _key: 'executive-king-suite',
    name: 'Executive King Suite',
    slug: 'executive-king-suite',
    shortDescription: 'King bed, premium finishes, adjustable work desk, executive amenities.',
    imagePath: 'public/images/Rooms Page:section/executive-king/exec-king-3-optimized.webp'
  },
  {
    _key: 'mountain-king-suite',
    name: 'Mountain King Suite',
    slug: 'mountain-king-suite',
    shortDescription: 'King bed with mountain views, fireplace and soaking tub.',
    imagePath: 'public/images/Rooms Page:section/Mountain King Suite/MountainKingSuite-RichardSeldomridge (1)-optimized.webp'
  }
];

// Queen Rooms with images
const QUEEN_ROOMS = [
  {
    _key: 'mountain-jr-queen',
    name: 'Mountain Jr Queen',
    slug: 'mountain-jr-queen',
    shortDescription: 'Queen bed, custom touches, Rocky Mountain views',
    imagePath: 'public/images/Rooms Page:section/Mountain Jr. Queen/MountainJrQueenSuite-RichardSeldomridge-optimized.webp'
  },
  {
    _key: 'queen-balcony-suite',
    name: 'Mountain Queen Balcony Suite',
    slug: 'queen-balcony-suite',
    shortDescription: 'Queen bed, full balcony to mountain view, plus trundle with two twins',
    imagePath: 'public/images/Rooms Page:section/Queen Balcony Suite/MountainQueenBalconySuite-AshleeKay (1)-optimized.webp'
  },
  {
    _key: 'jr-queen-suite',
    name: 'Jr Queen',
    slug: 'jr-queen-suite',
    shortDescription: 'Queen bed, custom touches, cozy and clean',
    imagePath: 'public/images/Rooms Page:section/Jr. Queen/junior-queen-suite-optimized.webp'
  },
  {
    _key: 'double-queen-balcony-suite',
    name: 'Double Queen Balcony Suite',
    slug: 'double-queen-balcony-suite',
    shortDescription: 'Two queen beds, full balcony with rockers, delightful finishes',
    imagePath: 'public/images/Rooms Page:section/Double Queen Balcony/DoubleQueenSuite-RichardSeldomridge-optimized.webp'
  },
  {
    _key: 'mountain-double-queen',
    name: 'Mountain Double Queen Suite',
    slug: 'mountain-double-queen',
    shortDescription: 'Two queen beds, overhead door to mountain views, curated and clean',
    imagePath: 'public/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-RichardSeldomridge (4)-optimized.webp'
  }
];

async function uploadImage(filePath, filename) {
  const absolutePath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    console.warn(`  ⚠️  File not found: ${filePath}`);
    return null;
  }

  try {
    const imageBuffer = fs.readFileSync(absolutePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename || path.basename(filePath),
    });
    console.log(`  ✅ Uploaded: ${filename || path.basename(filePath)}`);
    return asset._id;
  } catch (error) {
    console.error(`  ❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

async function seedAllHomepageImages() {
  console.log('\n🌱 Seeding ALL Homepage Images to Sanity CMS\n');
  console.log('━'.repeat(60));

  // Get homepage document
  const homepage = await client.fetch('*[_type == "homepage"][0]');
  if (!homepage) {
    console.error('❌ Homepage document not found');
    process.exit(1);
  }
  console.log(`✅ Found homepage document: ${homepage._id}\n`);

  const patch = client.patch(homepage._id);

  // 1. Upload standalone images
  console.log('📤 Uploading standalone images...\n');
  for (const [fieldName, filePath] of Object.entries(STANDALONE_IMAGES)) {
    console.log(`  Processing: ${fieldName}`);
    const assetId = await uploadImage(filePath, `homepage-${fieldName}`);
    if (assetId) {
      patch.set({
        [fieldName]: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId }
        }
      });
    }
  }

  // 2. Upload King Room images
  console.log('\n📤 Uploading King Room images...\n');
  const kingRoomsData = [];
  for (const room of KING_ROOMS) {
    console.log(`  Processing: ${room.name}`);
    const assetId = await uploadImage(room.imagePath, `room-${room.slug}`);
    kingRoomsData.push({
      _key: room._key,
      name: room.name,
      slug: room.slug,
      shortDescription: room.shortDescription,
      ...(assetId ? {
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId }
        }
      } : {})
    });
  }
  patch.set({ kingRooms: kingRoomsData });

  // 3. Upload Queen Room images
  console.log('\n📤 Uploading Queen Room images...\n');
  const queenRoomsData = [];
  for (const room of QUEEN_ROOMS) {
    console.log(`  Processing: ${room.name}`);
    const assetId = await uploadImage(room.imagePath, `room-${room.slug}`);
    queenRoomsData.push({
      _key: room._key,
      name: room.name,
      slug: room.slug,
      shortDescription: room.shortDescription,
      ...(assetId ? {
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId }
        }
      } : {})
    });
  }
  patch.set({ queenRooms: queenRoomsData });

  // Commit all changes
  console.log('\n📝 Updating homepage document...\n');
  try {
    await patch.commit();
    console.log('✅ Homepage document updated successfully!\n');
  } catch (error) {
    console.error('❌ Failed to update homepage:', error.message);
    process.exit(1);
  }

  console.log('━'.repeat(60));
  console.log('\n🎉 ALL Homepage images seeded successfully!\n');
}

seedAllHomepageImages().catch(console.error);
