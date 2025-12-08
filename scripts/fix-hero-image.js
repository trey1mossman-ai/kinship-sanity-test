// Upload Hero Background Image to Sanity
// Uploads the local image file to Sanity and sets it as heroImage
// Run with: SANITY_TOKEN="your_token" node scripts/fix-hero-image.js

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

// Path to the hero background image
const imagePath = path.join(__dirname, '../public/images/HomePage/event image-optimized.webp');

async function uploadHeroImage() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║       UPLOADING HERO BACKGROUND IMAGE TO SANITY            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Step 1: Check if image file exists
  console.log('STEP 1: Checking image file...');
  if (!fs.existsSync(imagePath)) {
    console.log(`   ❌ Image not found at: ${imagePath}`);
    return;
  }
  console.log(`   ✅ Found: ${imagePath}`);

  // Step 2: Upload image to Sanity
  console.log('\nSTEP 2: Uploading image to Sanity...');
  const imageFile = fs.readFileSync(imagePath);

  let imageAsset;
  try {
    imageAsset = await client.assets.upload('image', imageFile, {
      filename: 'hero-background.webp',
      contentType: 'image/webp'
    });
    console.log(`   ✅ Uploaded! Asset ID: ${imageAsset._id}`);
  } catch (error) {
    console.log(`   ❌ Upload failed: ${error.message}`);
    return;
  }

  // Step 3: Get current homepage and update with image reference
  console.log('\nSTEP 3: Updating homepage with image reference...');
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);

  if (!homepage) {
    console.log('   ❌ No homepage document found!');
    return;
  }

  try {
    await client.delete(homepage._id);
    console.log('   ✅ Deleted old homepage');

    // Create with ALL fields including heroImage reference
    const newHomepage = {
      _type: 'homepage',
      _id: 'homepage',

      // Hero fields
      heroTitle: homepage.heroTitle,
      heroSubtitle: homepage.heroSubtitle,
      heroHeadline: homepage.heroHeadline,
      heroSubheadline: homepage.heroSubheadline,
      heroVideo: homepage.heroVideo,
      heroImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id
        }
      },
      heroCta: homepage.heroCta,

      // Why Kinship
      whyKinshipTitle: homepage.whyKinshipTitle,
      whyKinshipBody: homepage.whyKinshipBody,

      // Rooms
      roomsSectionTitle: homepage.roomsSectionTitle,
      roomsSectionSubtitle: homepage.roomsSectionSubtitle,

      // Events
      eventsSectionTitle: homepage.eventsSectionTitle,
      eventsSectionDescription: homepage.eventsSectionDescription,

      // Cafe
      cafeSectionTitle: homepage.cafeSectionTitle,
      cafeSectionDescription: homepage.cafeSectionDescription,
      cafeFeatures: homepage.cafeFeatures,

      // Press & Reviews
      pressSectionTitle: homepage.pressSectionTitle,
      reviewsSectionTitle: homepage.reviewsSectionTitle,
      googleRating: homepage.googleRating,
      googleReviewCount: homepage.googleReviewCount,
      featuredReviews: homepage.featuredReviews,

      // Map
      mapSectionTitle: homepage.mapSectionTitle,
      nearbyAttractions: homepage.nearbyAttractions,
    };

    await client.create(newHomepage);
    console.log('   ✅ Created updated homepage with hero image\n');

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return;
  }

  // Step 4: Verify
  console.log('STEP 4: Verifying...');
  const updated = await client.fetch(`*[_type == "homepage"][0] { "heroImageUrl": heroImage.asset->url }`);

  if (updated.heroImageUrl) {
    console.log(`   ✅ heroImage URL: ${updated.heroImageUrl}`);
  } else {
    console.log('   ❌ heroImage not set');
  }

  console.log('\n✅ Hero background image now uploaded and set in Sanity!');
  console.log('   View in Sanity Studio: Homepage → Hero Section → Hero Background Image\n');
}

uploadHeroImage().catch(console.error);
