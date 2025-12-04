// Fix Offers in Sanity
// Creates real offers from the website with images
// Run with: SANITY_TOKEN="your_token" node scripts/fix-offers.js

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('ERROR: SANITY_TOKEN environment variable is required');
  process.exit(1);
}

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: token,
  useCdn: false,
});

// Real offers from the website (app/offers/page.tsx)
const offers = [
  {
    title: 'Ring in the New Year',
    description: '', // Empty - can be edited in Sanity Studio
    imagePath: 'public/images/Offers/NYE Promo (1080 x 566 px).webp',
    bookingUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E',
    displayOrder: 1
  },
  {
    title: 'Take the Elevator Home',
    description: '', // Empty - can be edited in Sanity Studio
    imagePath: 'public/images/Offers/Take the Elevator Home (1080 x 1080 px) (1).webp',
    bookingUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E',
    displayOrder: 2
  }
];

async function uploadImage(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`   ⚠️  File not found: ${filePath}`);
    return null;
  }

  try {
    const imageBuffer = fs.readFileSync(fullPath);
    const filename = path.basename(filePath);

    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });

    return asset._id;
  } catch (error) {
    console.log(`   ❌ Failed to upload: ${error.message}`);
    return null;
  }
}

async function fixOffers() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║              FIXING OFFERS IN SANITY                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Step 1: Delete any existing offers (should be 0)
  console.log('STEP 1: Checking for existing offers...');
  const existingOffers = await client.fetch(`*[_type == "offer"] { _id, title }`);
  console.log(`   Found ${existingOffers.length} existing offers`);

  for (const offer of existingOffers) {
    await client.delete(offer._id);
    console.log(`   ✅ Deleted: ${offer.title}`);
  }

  // Step 2: Create real offers with images
  console.log('\nSTEP 2: Creating real offers from website...\n');

  for (const offer of offers) {
    console.log(`📦 ${offer.title}`);

    // Upload image
    console.log(`   Uploading image...`);
    const assetId = await uploadImage(offer.imagePath);

    if (assetId) {
      // Create offer document
      try {
        const slug = offer.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');

        await client.create({
          _type: 'offer',
          title: offer.title,
          slug: { _type: 'slug', current: slug },
          description: offer.description,
          bookingUrl: offer.bookingUrl,
          displayOrder: offer.displayOrder,
          isActive: true,
          heroImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: assetId }
          }
        });
        console.log(`   ✅ Created offer with image`);
      } catch (error) {
        console.log(`   ❌ Failed to create: ${error.message}`);
      }
    } else {
      console.log(`   ❌ Skipped - no image`);
    }
  }

  // Step 3: Verify
  console.log('\nSTEP 3: Verifying...');
  const finalOffers = await client.fetch(`*[_type == "offer"] { title, description, bookingUrl, "hasImage": defined(heroImage) }`);
  console.log(`   Total offers in Sanity: ${finalOffers.length}`);
  finalOffers.forEach(o => {
    console.log(`   ✅ ${o.title}`);
    console.log(`      Image: ${o.hasImage ? 'Yes' : 'No'}`);
    console.log(`      Description: ${o.description || '(empty - editable in Sanity)'}`);
    console.log(`      Booking URL: ${o.bookingUrl}`);
  });

  console.log('\n');
}

fixOffers().catch(console.error);
