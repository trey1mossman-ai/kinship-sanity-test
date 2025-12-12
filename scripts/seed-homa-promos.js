#!/usr/bin/env node
/**
 * Seed script to populate HOMA page promos in Sanity
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-homa-promos.js
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Sanity client with write access
const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function uploadImage(imagePath, filename) {
  console.log(`Uploading image: ${filename}...`);
  const imageBuffer = fs.readFileSync(imagePath);
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: filename,
  });
  console.log(`  Uploaded: ${asset._id}`);
  return asset._id;
}

async function seedHomaPromos() {
  console.log('Seeding HOMA page promos...\n');

  try {
    // Upload the promo image
    const promoImagePath = path.join(__dirname, '../public/images/HOMA Page/everything-turkey-promo-optimized.webp');
    let promoImageId = null;

    if (fs.existsSync(promoImagePath)) {
      promoImageId = await uploadImage(promoImagePath, 'everything-turkey-promo.webp');
    } else {
      console.log('Warning: Promo image not found at', promoImagePath);
      console.log('Skipping image upload - you can add the image manually in Sanity Studio.');
    }

    // Patch the existing HOMA page document to add promos
    const patchData = {
      promos: [
        {
          _key: 'thanksgiving-special',
          title: 'Everything but the Turkey',
          description: 'Skip the stress this holiday season and let us handle your side dishes! Introducing "Everything but the Turkey"—a curated selection of delicious, ready-to-serve sides that will make your Thanksgiving meal unforgettable. From creamy mashed potatoes to savory sage stuffing, and of course, classic pies, we\'ve got you covered. Just cook the turkey, and we\'ll take care of the rest!',
          badge: 'Thanksgiving Special',
          ctaText: 'Reserve a Spot',
          ctaUrl: 'https://www.eventbrite.com/e/everything-but-the-turkey-from-homa-cafe-bar-registration-1908375365089?aff=oddtdtcreator',
          ...(promoImageId && {
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: promoImageId
              }
            }
          })
        }
      ]
    };

    const result = await client
      .patch('homaPage')
      .set(patchData)
      .commit();

    console.log('\nSuccessfully added promos to HOMA page!');
    console.log('\nDocument ID:', result._id);
    console.log('\nView in Sanity Studio: https://kinship-landing.sanity.studio/structure/homaPage');
    console.log('\nPromo added:');
    console.log('   - Title: Everything but the Turkey');
    console.log('   - Badge: Thanksgiving Special');
    console.log('   - CTA: Reserve a Spot');
    console.log('   - Image:', promoImageId ? 'Uploaded' : 'Not uploaded (add manually)');

  } catch (error) {
    console.error('Error seeding content:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\nMake sure your SANITY_API_TOKEN has "Editor" permissions.');
    }
    process.exit(1);
  }
}

// Run the seed function
seedHomaPromos();
