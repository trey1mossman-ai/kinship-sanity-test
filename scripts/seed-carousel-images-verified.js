#!/usr/bin/env node

/**
 * VERIFIED Carousel Image Seed Script for Sanity CMS
 *
 * AUDIT DATE: 2025-12-15
 *
 * This script uploads carousel images for GreenHaus and The Yard event spaces.
 * Each image path was extracted directly from the component fallbacks.
 *
 * SOURCE: components/home/EventsSectionDynamic.tsx:45-59
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
// VERIFIED IMAGE PATHS - Source: EventsSectionDynamic.tsx:45-59
// =============================================================================

/**
 * GreenHaus Carousel Images
 * Source: components/home/EventsSectionDynamic.tsx:45-51
 */
const GREENHAUS_CAROUSEL_IMAGES = [
  'public/images/events-page/Meetings:Retreats/Kinship-4G3A9437-1 (1).webp',
  'public/images/events-page/Gatherings/0B1A0328-optimized.webp',
  'public/images/events-page/GreenHaus/Greenhaus-SamStarrMedia (1).webp',
  'public/images/events-page/GreenHaus/Greenhaus-ErinWinterPhotography-8502.webp',
  'public/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge.webp',
];

/**
 * The Yard Carousel Images
 * Source: components/home/EventsSectionDynamic.tsx:54-59
 */
const YARD_CAROUSEL_IMAGES = [
  'public/images/events-page/The Yard/IMG_1494.webp',
  'public/images/events-page/The Yard/DSC_6966.webp',
  'public/images/events-page/The Yard/D85A8970.webp',
  'public/images/events-page/The Yard/IMG_1487 (1).webp',
];

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

async function seedCarouselImages() {
  console.log('\n🌱 Seeding VERIFIED Carousel Images to Sanity CMS\n');
  console.log('━'.repeat(60));
  console.log('Source: EventsSectionDynamic.tsx:45-59');
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
  // 1. GREENHAUS CAROUSEL IMAGES
  // =========================================================================
  console.log('\n📤 1. GREENHAUS CAROUSEL IMAGES (5 images)\n');
  const greenhausImageRefs = [];
  for (let i = 0; i < GREENHAUS_CAROUSEL_IMAGES.length; i++) {
    const filePath = GREENHAUS_CAROUSEL_IMAGES[i];
    console.log(`  Processing: GreenHaus image ${i + 1}`);
    const assetId = await uploadImage(filePath, `greenhaus-carousel-${i + 1}`);
    if (assetId) {
      greenhausImageRefs.push({
        _type: 'image',
        _key: `greenhaus-${i}`,
        asset: { _type: 'reference', _ref: assetId }
      });
    }
  }

  if (greenhausImageRefs.length > 0) {
    patch.set({ greenhausCarouselImages: greenhausImageRefs });
    console.log(`  ✅ ${greenhausImageRefs.length} GreenHaus images prepared for upload`);
  }

  // =========================================================================
  // 2. THE YARD CAROUSEL IMAGES
  // =========================================================================
  console.log('\n📤 2. THE YARD CAROUSEL IMAGES (4 images)\n');
  const yardImageRefs = [];
  for (let i = 0; i < YARD_CAROUSEL_IMAGES.length; i++) {
    const filePath = YARD_CAROUSEL_IMAGES[i];
    console.log(`  Processing: The Yard image ${i + 1}`);
    const assetId = await uploadImage(filePath, `yard-carousel-${i + 1}`);
    if (assetId) {
      yardImageRefs.push({
        _type: 'image',
        _key: `yard-${i}`,
        asset: { _type: 'reference', _ref: assetId }
      });
    }
  }

  if (yardImageRefs.length > 0) {
    patch.set({ yardCarouselImages: yardImageRefs });
    console.log(`  ✅ ${yardImageRefs.length} The Yard images prepared for upload`);
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
  console.log('\n🎉 ALL Carousel images seeded successfully!\n');
  console.log('Summary:');
  console.log(`  - GreenHaus: ${greenhausImageRefs.length} images`);
  console.log(`  - The Yard: ${yardImageRefs.length} images`);
  console.log(`  ─────────────────────`);
  console.log(`  Total: ${greenhausImageRefs.length + yardImageRefs.length} images\n`);
}

seedCarouselImages().catch(console.error);
