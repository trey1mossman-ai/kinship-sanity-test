#!/usr/bin/env node
/**
 * Upload Explore Page section break images to Sanity
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-explore-images.js
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const IMAGES_DIR = path.join(__dirname, '../public/images/Explore Page');

// Image configuration: field name -> filename
const imagesToUpload = {
  heroImage: 'explore-hero-optimized.webp',
  speakeasiesBreakImage: 'speakeasies-break.webp',
  entertainmentBreakImage: 'entertainment-break.webp',
  eatsBreakImage: 'eats-break.webp',
  wellnessBreakImage: 'wellness-break.webp',
  coffeeBreakImage: 'coffee-break.webp',
  dessertsBreakImage: 'desserts-break.webp',
};

async function uploadImage(filepath, fieldName) {
  const filename = path.basename(filepath);
  console.log(`Uploading ${fieldName}: ${filename}`);

  const imageBuffer = fs.readFileSync(filepath);
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: filename,
    contentType: 'image/webp'
  });

  console.log(`  ✓ Uploaded as: ${asset._id}`);
  return asset;
}

async function main() {
  console.log('🌄 Starting Explore Page image upload...\n');

  try {
    // Upload all images
    const imageRefs = {};

    for (const [fieldName, filename] of Object.entries(imagesToUpload)) {
      const filepath = path.join(IMAGES_DIR, filename);

      // Check if file exists
      if (!fs.existsSync(filepath)) {
        console.error(`❌ File not found: ${filepath}`);
        continue;
      }

      const asset = await uploadImage(filepath, fieldName);

      // Store the image reference for the document
      imageRefs[fieldName] = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      };
    }

    // Fetch the existing explorePage document to preserve other content
    console.log('\n📄 Fetching existing explorePage document...');
    const existingDoc = await client.getDocument('explorePage');

    if (!existingDoc) {
      console.error('❌ explorePage document not found. Run seed-explore-page.js first.');
      process.exit(1);
    }

    // Update the document with image references
    console.log('📝 Updating explorePage with image references...');

    const result = await client.createOrReplace({
      ...existingDoc,
      ...imageRefs
    });

    console.log('\n✅ Success! Explore page images uploaded and linked.\n');
    console.log('📋 Uploaded images:');
    console.log('   ✓ Hero image: explore-hero-optimized.webp');
    console.log('   ✓ Speakeasies break: speakeasies-break.webp');
    console.log('   ✓ Entertainment break: entertainment-break.webp');
    console.log('   ✓ Eats break: eats-break.webp');
    console.log('   ✓ Wellness break: wellness-break.webp');
    console.log('   ✓ Coffee break: coffee-break.webp');
    console.log('   ✓ Desserts break: desserts-break.webp');
    console.log('\n🔗 View in Sanity Studio:');
    console.log('   https://kinship-landing.sanity.studio/structure/explorePage');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.message.includes('ENOENT')) {
      console.error('\n💡 Make sure the image files exist in:', IMAGES_DIR);
    }
    if (error.message.includes('Insufficient permissions')) {
      console.error('\n💡 Make sure your SANITY_API_TOKEN has "Editor" permissions.');
    }
    process.exit(1);
  }
}

main();
