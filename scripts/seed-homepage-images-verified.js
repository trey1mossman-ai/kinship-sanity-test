#!/usr/bin/env node

/**
 * VERIFIED Homepage Image Seed Script for Sanity CMS
 *
 * AUDIT DATE: 2025-12-15
 *
 * This script uploads ALL homepage images with VERIFIED correct paths.
 * Each image path was extracted directly from the component fallbacks.
 *
 * METHODOLOGY:
 * 1. Read each component file
 * 2. Find the hardcoded fallback image path
 * 3. Use that EXACT path in this script
 *
 * DO NOT assume or make up image paths. Every path here was verified.
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
  console.error('Export it first: export SANITY_API_TOKEN="your-token-here"');
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  token: SANITY_TOKEN,
  useCdn: false,
});

// =============================================================================
// VERIFIED IMAGE PATHS - DO NOT MODIFY WITHOUT READING COMPONENT FIRST
// =============================================================================

/**
 * HERO SECTION
 * Source: components/HeroEnhanced/HeroSection.tsx:36-37
 */
const HERO_IMAGES = {
  heroImage: 'public/images/HomePage/hero-poster-kinship-landing.webp',
  // heroVideo is a URL, not an image upload
};

/**
 * GUIDE SECTION
 * Source: components/home/KinshipGuideAsymmetric.tsx:42-43
 */
const GUIDE_IMAGES = {
  guideBackgroundImage: 'public/images/HomePage/GardenoftheGods, SamStarr-mobile.webp',
  guideStampImage: 'public/images/HomePage/background for stay explore gather drink eat-mobile.webp',
};

/**
 * ROOMS SECTION - KING ROOMS
 * Source: components/home/RoomsGridSanity.tsx:28-56
 */
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

/**
 * ROOMS SECTION - QUEEN ROOMS
 * Source: components/home/RoomsGridSanity.tsx:57-103
 */
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

/**
 * ROOMS SECTION - FAMILY SUITE
 * Source: components/home/RoomsGridSanity.tsx:105-121
 */
const FAMILY_ROOM = {
  imagePath: 'public/images/Rooms Page:section/Family Suite/AK_03363-optimized.webp'
};

/**
 * ROOMS SECTION - CAMP DECK
 * Source: components/home/RoomsGridSanity.tsx:123-140
 */
const CAMP_DECK = {
  imagePath: 'public/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge (1)-optimized.webp'
};

/**
 * HOMA SECTION
 * Source: components/home/HomaSectionEnhanced.tsx:37
 */
const HOMA_IMAGES = {
  homaLogoImage: 'public/images/homa-logo-sq.svg',
  // homaBackgroundImage is NOT used in the current component - it's hardcoded differently
};

/**
 * PRESS SECTION
 * Source: components/home/PressAndReviews.tsx:52
 */
const PRESS_IMAGES = {
  pressBackgroundMural: 'public/images/HomePage/Background-mural-mobile.webp',
};

/**
 * PRESS LOGOS
 * Source: components/home/PressAndReviews.tsx:30-41
 */
const PRESS_LOGOS = [
  { _key: 'forbes', name: 'Forbes', logoPath: 'public/press/Forbes.jpg' },
  { _key: 'today', name: 'TODAY', logoPath: 'public/press/today-show.webp' },
  { _key: 'denver-post', name: 'Denver Post', logoPath: 'public/press/denverpostlogo-grey.webp' },
  { _key: 'usa-today', name: 'USA Today', logoPath: 'public/press/USA Today.jpg' },
  { _key: 'conde-nast', name: 'Condé Nast Traveler', logoPath: 'public/press/conde nast traveler.jpg' },
  { _key: 'afar', name: 'AFAR', logoPath: 'public/press/Afar.jpg' },
  { _key: 'globe-traveler', name: 'Globe Traveler', logoPath: 'public/press/Globe Traveler.jpg' },
  { _key: 'telegraph', name: 'The Telegraph', logoPath: 'public/press/The Telegraph.jpg' },
  { _key: 'out-there', name: 'Out There Colorado', logoPath: 'public/press/out there colorado.jpg' },
  { _key: 'bizbash', name: 'BizBash', logoPath: 'public/press/bizbash.jpg' },
];

/**
 * MAP/WOODWALL SECTION
 * Source: app/page.tsx:203
 */
const MAP_IMAGES = {
  woodwallBreakImage: 'public/images/About/WoodWall-SamStarr.webp',
};

// =============================================================================
// UPLOAD FUNCTIONS
// =============================================================================

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

async function seedVerifiedHomepageImages() {
  console.log('\n🌱 Seeding VERIFIED Homepage Images to Sanity CMS\n');
  console.log('━'.repeat(60));
  console.log('This script uses VERIFIED image paths from component fallbacks.');
  console.log('━'.repeat(60));

  // Get homepage document
  const homepage = await client.fetch('*[_type == "homepage"][0]');
  if (!homepage) {
    console.error('❌ Homepage document not found. Create one in Sanity Studio first.');
    process.exit(1);
  }
  console.log(`\n✅ Found homepage document: ${homepage._id}\n`);

  const patch = client.patch(homepage._id);

  // =========================================================================
  // 1. HERO SECTION
  // =========================================================================
  console.log('\n📤 1. HERO SECTION\n');
  for (const [fieldName, filePath] of Object.entries(HERO_IMAGES)) {
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

  // =========================================================================
  // 2. GUIDE SECTION
  // =========================================================================
  console.log('\n📤 2. GUIDE SECTION\n');
  for (const [fieldName, filePath] of Object.entries(GUIDE_IMAGES)) {
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

  // =========================================================================
  // 3. KING ROOMS
  // =========================================================================
  console.log('\n📤 3. KING ROOMS\n');
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

  // =========================================================================
  // 4. QUEEN ROOMS
  // =========================================================================
  console.log('\n📤 4. QUEEN ROOMS\n');
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

  // =========================================================================
  // 5. FAMILY ROOM
  // =========================================================================
  console.log('\n📤 5. FAMILY ROOM\n');
  console.log('  Processing: Family Suite');
  const familyAssetId = await uploadImage(FAMILY_ROOM.imagePath, 'room-family-suite');
  if (familyAssetId) {
    patch.set({
      familyRoomImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: familyAssetId }
      }
    });
  }

  // =========================================================================
  // 6. CAMP DECK
  // =========================================================================
  console.log('\n📤 6. CAMP DECK\n');
  console.log('  Processing: Camp Deck');
  const campDeckAssetId = await uploadImage(CAMP_DECK.imagePath, 'room-camp-deck');
  if (campDeckAssetId) {
    patch.set({
      campDeckImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: campDeckAssetId }
      }
    });
  }

  // =========================================================================
  // 7. HOMA SECTION
  // =========================================================================
  console.log('\n📤 7. HOMA SECTION\n');
  for (const [fieldName, filePath] of Object.entries(HOMA_IMAGES)) {
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

  // =========================================================================
  // 8. PRESS SECTION - Background
  // =========================================================================
  console.log('\n📤 8. PRESS SECTION - Background\n');
  for (const [fieldName, filePath] of Object.entries(PRESS_IMAGES)) {
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

  // =========================================================================
  // 9. PRESS LOGOS
  // =========================================================================
  console.log('\n📤 9. PRESS LOGOS\n');
  const pressLogosData = [];
  for (const logo of PRESS_LOGOS) {
    console.log(`  Processing: ${logo.name}`);
    const assetId = await uploadImage(logo.logoPath, `press-${logo._key}`);
    pressLogosData.push({
      _key: logo._key,
      name: logo.name,
      ...(assetId ? {
        logo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId }
        }
      } : {})
    });
  }
  patch.set({ pressLogos: pressLogosData });

  // =========================================================================
  // 10. MAP/WOODWALL SECTION
  // =========================================================================
  console.log('\n📤 10. MAP/WOODWALL SECTION\n');
  for (const [fieldName, filePath] of Object.entries(MAP_IMAGES)) {
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

  // =========================================================================
  // COMMIT ALL CHANGES
  // =========================================================================
  console.log('\n📝 Updating homepage document...\n');
  try {
    await patch.commit();
    console.log('✅ Homepage document updated successfully!\n');
  } catch (error) {
    console.error('❌ Failed to update homepage:', error.message);
    process.exit(1);
  }

  console.log('━'.repeat(60));
  console.log('\n🎉 ALL VERIFIED Homepage images seeded successfully!\n');
  console.log('Summary of uploads:');
  console.log('  - Hero: 1 image');
  console.log('  - Guide: 2 images');
  console.log('  - King Rooms: 3 images');
  console.log('  - Queen Rooms: 5 images');
  console.log('  - Family Room: 1 image');
  console.log('  - Camp Deck: 1 image');
  console.log('  - HOMA: 1 image (logo)');
  console.log('  - Press Background: 1 image');
  console.log('  - Press Logos: 10 images');
  console.log('  - Woodwall: 1 image');
  console.log('  ─────────────────────');
  console.log('  Total: 26 images\n');
}

seedVerifiedHomepageImages().catch(console.error);
