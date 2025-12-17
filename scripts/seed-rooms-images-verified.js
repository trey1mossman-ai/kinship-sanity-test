#!/usr/bin/env node
/**
 * ROOMS PAGE - VERIFIED IMAGE SEED SCRIPT
 *
 * AUDIT DATE: December 2024
 * Source: lib/data/rooms.ts and app/rooms/RoomsPageClient.tsx
 *
 * Each image path verified by reading component fallbacks.
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
 * ROOM HERO IMAGES
 * Source: lib/data/rooms.ts - heroImage fields
 */
const ROOM_IMAGES = [
  {
    id: 'mountain-king-suite',
    heroImage: 'public/images/Rooms Page:section/Mountain King Suite/MountainKingSuite-RichardSeldomridge (1)-optimized.webp',
  },
  {
    id: 'king-suite',
    heroImage: 'public/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (1) (1)-optimized.webp',
  },
  {
    id: 'executive-king-suite',
    heroImage: 'public/images/Rooms Page:section/executive-king/exec-king-3-optimized.webp',
  },
  {
    id: 'queen-balcony-suite',
    heroImage: 'public/images/Rooms Page:section/Queen Balcony Suite/MountainQueenBalconySuite-AshleeKay (1)-optimized.webp',
  },
  {
    id: 'double-queen-balcony-suite',
    heroImage: 'public/images/Rooms Page:section/Double Queen Balcony/DoubleQueenSuite-RichardSeldomridge-optimized.webp',
  },
  {
    id: 'mountain-double-queen',
    heroImage: 'public/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-RichardSeldomridge (4)-optimized.webp',
  },
  {
    id: 'mountain-jr-queen',
    heroImage: 'public/images/Rooms Page:section/Mountain Jr. Queen/MountainJrQueenSuite-RichardSeldomridge-optimized.webp',
  },
  {
    id: 'jr-queen-suite',
    heroImage: 'public/images/Rooms Page:section/Jr. Queen/junior-queen-suite-optimized.webp',
  },
  {
    id: 'family-suite',
    heroImage: 'public/images/Rooms Page:section/Family Suite/AK_03363-optimized.webp',
  },
  {
    id: 'camp-deck',
    heroImage: 'public/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge-optimized.webp',
  },
];

/**
 * PAGE-LEVEL IMAGES
 * Source: app/rooms/RoomsPageClient.tsx
 */
const PAGE_IMAGES = {
  // Visual break image - Line ~480
  visualBreakImage: 'public/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (3)-optimized.webp',
  // Room blocks images - Lines ~560, ~575
  roomBlocksImage1: 'public/images/Rooms Page:section/Book a bunch of rooms/BunkRoom5-SamStarr-optimized.webp',
  roomBlocksImage2: 'public/images/Rooms Page:section/Book a bunch of rooms/MountainDoubleQueenSuite-AshleeKay-optimized.webp',
};

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

async function seedRoomsImages() {
  console.log('🚀 ROOMS PAGE - Image Seed Script (Verified)\n');
  console.log('==================================================\n');

  // First, get the current rooms array
  const roomsPage = await client.fetch('*[_type == "roomsPage"][0] { rooms }');
  const rooms = roomsPage?.rooms || [];

  if (rooms.length === 0) {
    console.log('❌ No rooms found in roomsPage. Run seed-rooms-page.js first.');
    process.exit(1);
  }

  console.log(`Found ${rooms.length} rooms in Sanity\n`);

  // Upload room hero images
  console.log('📸 ROOM HERO IMAGES');
  console.log('Source: lib/data/rooms.ts');

  const roomImageAssets = {};

  for (const roomData of ROOM_IMAGES) {
    const filename = path.basename(roomData.heroImage);
    const assetId = await uploadImage(roomData.heroImage, filename);
    if (assetId) {
      roomImageAssets[roomData.id] = assetId;
    }
  }

  // Upload page-level images
  console.log('\n📸 PAGE-LEVEL IMAGES');
  console.log('Source: app/rooms/RoomsPageClient.tsx');

  const visualBreakAssetId = await uploadImage(PAGE_IMAGES.visualBreakImage, 'visual-break-king-suite.webp');
  const roomBlocksAsset1 = await uploadImage(PAGE_IMAGES.roomBlocksImage1, 'room-blocks-bunk.webp');
  const roomBlocksAsset2 = await uploadImage(PAGE_IMAGES.roomBlocksImage2, 'room-blocks-double-queen.webp');

  // Update rooms with hero images
  console.log('\n📝 UPDATING ROOM IMAGES...');
  console.log('==================================================');

  const updatedRooms = rooms.map(room => {
    const assetId = roomImageAssets[room.id];
    if (assetId) {
      console.log(`  ✅ ${room.name} - image set`);
      return {
        ...room,
        heroImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId }
        }
      };
    }
    console.log(`  ⚠️ ${room.name} - no image found`);
    return room;
  });

  // Build patch
  const patch = client.patch('roomsPage');

  // Set rooms with images
  patch.set({ rooms: updatedRooms });

  // Set page-level images
  if (visualBreakAssetId) {
    patch.set({
      visualBreakImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: visualBreakAssetId }
      }
    });
    console.log('  ✅ Visual break image set');
  }

  if (roomBlocksAsset1) {
    patch.set({
      roomBlocksImage1: {
        _type: 'image',
        asset: { _type: 'reference', _ref: roomBlocksAsset1 }
      }
    });
    console.log('  ✅ Room blocks image 1 set');
  }

  if (roomBlocksAsset2) {
    patch.set({
      roomBlocksImage2: {
        _type: 'image',
        asset: { _type: 'reference', _ref: roomBlocksAsset2 }
      }
    });
    console.log('  ✅ Room blocks image 2 set');
  }

  await patch.commit();

  console.log('\n✅ COMPLETE! Rooms page images uploaded to Sanity.\n');
  console.log('📊 SUMMARY:');
  console.log(`  - Room Hero Images: ${Object.keys(roomImageAssets).length}/10`);
  console.log('  - Visual Break Image: 1');
  console.log('  - Room Blocks Images: 2');
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/roomsPage');
}

seedRoomsImages().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
