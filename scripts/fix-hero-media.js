// Fix Hero Media in Sanity Homepage
// Populates the heroVideo URL field
// Note: heroImage requires an actual image upload in Sanity Studio
// Run with: SANITY_TOKEN="your_token" node scripts/fix-hero-media.js

const { createClient } = require('@sanity/client');

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

// Current hero video URL from the website
const heroVideoUrl = 'https://storage.googleapis.com/msgsndr/ZSnKlb7yt1OZGmrCwL7T/media/68defb5cd6c63ec71789ef67.mp4';

async function fixHeroMedia() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║          FIXING HERO MEDIA IN SANITY HOMEPAGE              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Step 1: Get current homepage
  console.log('STEP 1: Fetching current homepage...');
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);

  if (!homepage) {
    console.log('   ❌ No homepage document found!');
    return;
  }

  console.log('   Current heroVideo:', homepage.heroVideo || '(empty)');
  console.log('   Current heroImage:', homepage.heroImage ? '(has image)' : '(empty)');

  // Step 2: Delete and recreate with heroVideo
  console.log('\nSTEP 2: Updating homepage with hero video URL...');

  try {
    await client.delete(homepage._id);
    console.log('   ✅ Deleted old homepage');

    // Create with ALL fields including heroVideo
    const newHomepage = {
      _type: 'homepage',
      _id: 'homepage',

      // Hero fields
      heroTitle: homepage.heroTitle,
      heroSubtitle: homepage.heroSubtitle,
      heroHeadline: homepage.heroHeadline,
      heroSubheadline: homepage.heroSubheadline,
      heroVideo: heroVideoUrl,  // NEW: Video URL
      // Note: heroImage needs to be uploaded via Sanity Studio
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
    console.log('   ✅ Created updated homepage with hero video URL\n');

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return;
  }

  // Step 3: Verify
  console.log('STEP 3: Verifying...');
  const updated = await client.fetch(`*[_type == "homepage"][0] { heroVideo }`);

  console.log(`   heroVideo: ${updated.heroVideo === heroVideoUrl ? '✅' : '❌'} ${updated.heroVideo ? 'Set' : 'Empty'}`);

  console.log('\n✅ Hero video URL now set in Sanity!');
  console.log('\n📋 NEXT STEP: Upload the hero background image in Sanity Studio');
  console.log('   1. Go to Homepage → Hero Section');
  console.log('   2. Upload image to "Hero Background Image" field');
  console.log('   3. Use: /images/HomePage/event image-optimized.webp\n');
}

fixHeroMedia().catch(console.error);
