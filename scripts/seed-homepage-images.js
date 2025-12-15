/**
 * Homepage Images Seed Script
 *
 * This script uploads images from the public/images/HomePage directory to Sanity CMS
 * and updates the homepage document with the image references.
 *
 * Usage:
 *   node scripts/seed-homepage-images.js
 *
 * Requirements:
 *   - @sanity/client installed
 *   - Proper environment variables set (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN)
 */

const sanityClient = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Initialize Sanity client
const client = sanityClient.default({
  projectId: 'u2qzrboc',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN,
});

// Image mappings: field name -> local file path
// NOTE: If an image doesn't exist at the specified path, it will be skipped with a warning
const imageMap = {
  // Hero Section
  // Note: hero-poster-kinship-landing.webp may not exist - create from video frame or use alternative
  // heroImage: 'HomePage/hero-poster-kinship-landing.webp',

  // Guide Section (Kinship is Your Guide)
  guideBackgroundImage: 'HomePage/GardenoftheGods, SamStarr-mobile.webp',
  guideStampImage: 'HomePage/background for stay explore gather drink eat-mobile.webp',

  // Events Section
  eventsSectionImage: 'HomePage/event image-optimized.webp',

  // Press & Reviews Section
  pressBackgroundMural: 'HomePage/Background-mural-mobile.webp',

  // Map Section
  woodwallBreakImage: 'About/WoodWall-SamStarr.webp',
};

/**
 * Upload an image to Sanity and return the asset reference
 */
async function uploadImage(imagePath, fieldName) {
  const absolutePath = path.join(__dirname, '..', 'public', 'images', imagePath);

  console.log(`Uploading ${fieldName} from ${imagePath}...`);

  if (!fs.existsSync(absolutePath)) {
    console.warn(`⚠️  Warning: Image not found at ${absolutePath}, skipping ${fieldName}`);
    return null;
  }

  try {
    const imageBuffer = fs.readFileSync(absolutePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });

    console.log(`✓ Uploaded ${fieldName}: ${asset._id}`);

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`✗ Error uploading ${fieldName}:`, error.message);
    return null;
  }
}

/**
 * Main function to seed all homepage images
 */
async function seedHomepageImages() {
  console.log('🚀 Starting homepage images seed...\n');

  try {
    // First, check if homepage document exists
    const homepage = await client.fetch(`*[_type == "homepage"][0]`);

    if (!homepage) {
      console.error('❌ No homepage document found. Please create one in Sanity Studio first.');
      process.exit(1);
    }

    console.log(`Found homepage document: ${homepage._id}\n`);

    // Upload all images
    const imageUploads = {};

    for (const [fieldName, imagePath] of Object.entries(imageMap)) {
      const imageRef = await uploadImage(imagePath, fieldName);
      if (imageRef) {
        imageUploads[fieldName] = imageRef;
      }
    }

    console.log(`\n📤 Uploading complete. Updating homepage document...\n`);

    // Update the homepage document with all image references
    if (Object.keys(imageUploads).length > 0) {
      const result = await client
        .patch(homepage._id)
        .set(imageUploads)
        .commit();

      console.log(`✅ Successfully updated homepage document with ${Object.keys(imageUploads).length} images!\n`);
      console.log('Updated fields:', Object.keys(imageUploads).join(', '));
    } else {
      console.log('⚠️  No images were uploaded. Please check the file paths.');
    }

  } catch (error) {
    console.error('❌ Error seeding homepage images:', error);
    process.exit(1);
  }
}

// Run the seed function
if (require.main === module) {
  if (!process.env.SANITY_API_TOKEN && !process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN or SANITY_WRITE_TOKEN environment variable is required.');
    console.error('Please set it in your .env.local file or pass it when running the script:');
    console.error('  SANITY_API_TOKEN=your-token node scripts/seed-homepage-images.js');
    process.exit(1);
  }

  seedHomepageImages()
    .then(() => {
      console.log('\n🎉 Done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { seedHomepageImages, uploadImage };
