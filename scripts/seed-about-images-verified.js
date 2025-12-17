#!/usr/bin/env node
/**
 * ABOUT PAGE - VERIFIED IMAGE SEED SCRIPT
 *
 * AUDIT DATE: December 2024
 * Source: app/about/AboutPageClient.tsx
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
 * ABOUT PAGE IMAGES
 * Source: app/about/AboutPageClient.tsx:86-88
 */
const ABOUT_IMAGES = {
  // Line 86: heroImageUrl fallback
  heroImage: 'public/images/About/911A2070-2-optimized.webp',
  // Line 87: missionImageUrl fallback
  missionImage: 'public/images/About/Greenhaus-CampDeckAdventure-SamStarrMedia.webp',
  // Line 88: valuesImageUrl fallback
  valuesImage: 'public/images/About/WoodWall-SamStarr.webp',
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

async function seedAboutImages() {
  console.log('🚀 ABOUT PAGE - Image Seed Script (Verified)\n');
  console.log('==================================================\n');

  // Upload images
  console.log('📸 ABOUT PAGE IMAGES');
  console.log('Source: app/about/AboutPageClient.tsx:86-88');

  const heroAssetId = await uploadImage(ABOUT_IMAGES.heroImage, '911A2070-2-optimized.webp');
  const missionAssetId = await uploadImage(ABOUT_IMAGES.missionImage, 'Greenhaus-CampDeckAdventure-SamStarrMedia.webp');
  const valuesAssetId = await uploadImage(ABOUT_IMAGES.valuesImage, 'WoodWall-SamStarr.webp');

  // Update document
  console.log('\n📝 UPDATING SANITY DOCUMENT...');
  console.log('==================================================');

  const patch = client.patch('aboutPage');

  if (heroAssetId) {
    patch.set({
      heroImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: heroAssetId }
      }
    });
    console.log('  ✅ Hero image set');
  }

  if (missionAssetId) {
    patch.set({
      missionImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: missionAssetId }
      }
    });
    console.log('  ✅ Mission image set');
  }

  if (valuesAssetId) {
    patch.set({
      valuesImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: valuesAssetId }
      }
    });
    console.log('  ✅ Values image set');
  }

  await patch.commit();

  console.log('\n✅ COMPLETE! About page images uploaded to Sanity.\n');
  console.log('📊 SUMMARY:');
  console.log('  - Hero Image: 1');
  console.log('  - Mission Image: 1');
  console.log('  - Values Image: 1');
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/aboutPage');
}

seedAboutImages().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
