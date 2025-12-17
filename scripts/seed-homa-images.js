/**
 * HOMA Page Image Seeding Script
 *
 * This script uploads images from public/images/HOMA Page/ to Sanity
 * and updates the homaPage document with the image references.
 *
 * Usage:
 *   SANITY_TOKEN=your_token node scripts/seed-homa-images.js
 *
 * Prerequisites:
 *   - Sanity project ID: u2qzrboc
 *   - Dataset: production
 *   - A valid Sanity auth token with write permissions
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Initialize Sanity client
const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN || process.env.SANITY_AUTH_TOKEN,
});

// Base path to HOMA images
const IMAGES_BASE_PATH = path.join(__dirname, '..', 'public', 'images', 'HOMA Page');

// Image mapping configuration
const IMAGE_MAPPINGS = {
  // Hero Triptych (3 images for carousel)
  heroTriptychImage1: 'hero-triptych-1.webp',
  heroTriptychImage2: 'hero-triptych-3.webp',
  heroTriptychImage3: 'Fresh and local.webp',

  // Specials & Events Section
  happyHourImage: 'homa-happy-hour-34.webp',
  brunchImage: 'Brunch.webp',
  eventsImage: 'CafeSeating2, SamStarr.webp',

  // Promo Section
  promoBannerImage: 'everything-turkey-promo-optimized.webp',
  loyaltyCardImage: 'megaphone-promo.webp',

  // Seating/Fireplace Gallery (array of images)
  seatingImages: [
    'homa seating-optimized.webp',
    'homa seating 2-optimized.webp',
    'Seating Homa -optimized.webp',
    'CafeSeating-GregCeo-optimized.webp',
    'CafeSeating-ChrystalHolmes (1)-optimized.webp',
  ],
};

/**
 * Upload an image to Sanity
 */
async function uploadImage(imagePath, imageName) {
  try {
    const fullPath = path.join(IMAGES_BASE_PATH, imagePath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  Image not found: ${fullPath}`);
      return null;
    }

    console.log(`📤 Uploading: ${imageName}...`);

    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: imageName,
    });

    console.log(`✅ Uploaded: ${imageName} (ID: ${asset._id})`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Error uploading ${imageName}:`, error.message);
    return null;
  }
}

/**
 * Main seeding function
 */
async function seedHomaImages() {
  console.log('\n🚀 Starting HOMA Page Image Seeding...\n');

  if (!client.config().token) {
    console.error('❌ Error: SANITY_TOKEN or SANITY_AUTH_TOKEN environment variable is required');
    console.error('Usage: SANITY_TOKEN=your_token node scripts/seed-homa-images.js');
    process.exit(1);
  }

  try {
    // Check if homaPage document exists
    const existingDoc = await client.fetch(`*[_type == "homaPage"][0]`);

    if (!existingDoc) {
      console.error('❌ Error: homaPage document not found in Sanity');
      console.error('Please create a homaPage document in Sanity Studio first');
      process.exit(1);
    }

    console.log('✅ Found homaPage document\n');

    // Upload images and collect references
    const imageRefs = {};

    // Upload single images
    for (const [fieldName, imagePath] of Object.entries(IMAGE_MAPPINGS)) {
      if (fieldName === 'seatingImages') continue; // Handle separately

      const assetId = await uploadImage(imagePath, imagePath);
      if (assetId) {
        imageRefs[fieldName] = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId,
          },
        };
      }
    }

    // Upload seating gallery images
    const seatingImageRefs = [];
    for (const imagePath of IMAGE_MAPPINGS.seatingImages) {
      const assetId = await uploadImage(imagePath, imagePath);
      if (assetId) {
        seatingImageRefs.push({
          _type: 'image',
          _key: imagePath.replace(/[^a-zA-Z0-9]/g, '_'),
          asset: {
            _type: 'reference',
            _ref: assetId,
          },
        });
      }
    }

    if (seatingImageRefs.length > 0) {
      imageRefs.seatingImages = seatingImageRefs;
    }

    // Update homaPage document
    console.log('\n📝 Updating homaPage document...');

    await client
      .patch(existingDoc._id)
      .set(imageRefs)
      .commit();

    console.log('✅ homaPage document updated successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Hero Triptych Images: 3`);
    console.log(`   - Specials Images: 3`);
    console.log(`   - Promo Images: 2`);
    console.log(`   - Seating Gallery Images: ${seatingImageRefs.length}`);
    console.log(`   - Total Images Uploaded: ${Object.keys(imageRefs).length - 1 + seatingImageRefs.length}`);
    console.log('\n✨ HOMA Page image seeding complete!\n');

  } catch (error) {
    console.error('\n❌ Error during seeding:', error);
    process.exit(1);
  }
}

// Run the seed script
seedHomaImages();
