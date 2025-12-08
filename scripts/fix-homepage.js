// Fix Homepage Content in Sanity
// Updates homepage fields to match actual website content
// Run with: SANITY_TOKEN="your_token" node scripts/fix-homepage.js

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

// Content from the actual website (ground truth)
const websiteContent = {
  // Hero Section - matches website HeroSection.tsx
  heroHeadline: 'Experience Colorado Springs like a local',
  heroSubheadline: '', // Website uses rotating testimonials, not a static subheadline

  // Events Section - from EventsSectionDynamic.tsx lines 115-118
  eventsSectionTitle: 'Gather Together',
  eventsSectionDescription: 'Unique spaces for unforgettable events',

  // HOMA/Cafe Section - from HomaSectionEnhanced.tsx lines 75-76
  cafeSectionTitle: 'HOMA Café + Bar',
  cafeSectionDescription: 'Anchoring the public first floor of Kinship Landing is Homa, our craft café and bar. We took fresh, locally sourced ingredients and combined them with our favorite globally inspired dishes to offer nutrient dense and delightfully delicious food and drinks to fuel your adventures from sunrise to late night.',

  // Note: There's a second paragraph in the website too:
  // "Designed for the hungry and the healthy alike, locals, hotel guests, and old friends gather and enjoy hearty sandwiches, flavorful whole grain or salad bowls, small bites like our signature hand pies, fresh soups, and entrees or brunch and breakfast packed full of yummy goodness. Share it all with a pint of local craft beer, freshly roasted coffee, in house custom cocktails, or the perfect glass of wine, kombucha, or an ice-oat milk latte."
};

async function fixHomepage() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║        FIXING HOMEPAGE CONTENT IN SANITY                   ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Step 1: Get current homepage
  console.log('STEP 1: Fetching current homepage...');
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);

  if (!homepage) {
    console.log('   ❌ No homepage document found!');
    return;
  }

  console.log('   ✅ Found homepage document\n');

  // Step 2: Show what will be changed
  console.log('STEP 2: Changes to be made:\n');

  console.log('   HERO SECTION:');
  console.log(`   Current headline: "${homepage.heroHeadline}"`);
  console.log(`   Website headline: "${websiteContent.heroHeadline}"`);
  console.log(`   Match: ${homepage.heroHeadline === websiteContent.heroHeadline ? '✅' : '❌'}\n`);

  console.log('   EVENTS SECTION:');
  console.log(`   Current title: "${homepage.eventsSectionTitle}"`);
  console.log(`   Website title: "${websiteContent.eventsSectionTitle}"`);
  console.log(`   Match: ${homepage.eventsSectionTitle === websiteContent.eventsSectionTitle ? '✅' : '❌'}`);
  console.log(`   Current desc: "${homepage.eventsSectionDescription}"`);
  console.log(`   Website desc: "${websiteContent.eventsSectionDescription}"`);
  console.log(`   Match: ${homepage.eventsSectionDescription === websiteContent.eventsSectionDescription ? '✅' : '❌'}\n`);

  console.log('   HOMA/CAFE SECTION:');
  console.log(`   Current desc: "${homepage.cafeSectionDescription?.substring(0, 50)}..."`);
  console.log(`   Website desc: "${websiteContent.cafeSectionDescription.substring(0, 50)}..."`);
  console.log(`   Match: ${homepage.cafeSectionDescription === websiteContent.cafeSectionDescription ? '✅' : '❌'}\n`);

  // Step 3: Delete and recreate (since we can't patch)
  console.log('STEP 3: Updating homepage (delete + recreate)...');

  try {
    // Delete existing
    await client.delete(homepage._id);
    console.log('   ✅ Deleted old homepage');

    // Create new with correct content
    const newHomepage = {
      _type: 'homepage',
      _id: 'homepage',

      // Hero
      heroHeadline: websiteContent.heroHeadline,
      heroSubheadline: websiteContent.heroSubheadline,
      heroCta: homepage.heroCta, // Keep existing CTA

      // Why Kinship - keep existing (already matches)
      whyKinshipTitle: homepage.whyKinshipTitle,
      whyKinshipBody: homepage.whyKinshipBody,

      // Rooms - keep existing
      roomsSectionTitle: homepage.roomsSectionTitle,
      roomsSectionSubtitle: homepage.roomsSectionSubtitle,

      // Events - UPDATE to match website
      eventsSectionTitle: websiteContent.eventsSectionTitle,
      eventsSectionDescription: websiteContent.eventsSectionDescription,

      // Cafe/HOMA - UPDATE to match website
      cafeSectionTitle: websiteContent.cafeSectionTitle,
      cafeSectionDescription: websiteContent.cafeSectionDescription,
      cafeFeatures: homepage.cafeFeatures,

      // Press & Reviews - keep existing
      pressSectionTitle: homepage.pressSectionTitle,
      reviewsSectionTitle: homepage.reviewsSectionTitle,
      googleRating: homepage.googleRating,
      googleReviewCount: homepage.googleReviewCount,

      // Map - keep existing
      mapSectionTitle: homepage.mapSectionTitle,
      nearbyAttractions: homepage.nearbyAttractions,
    };

    await client.create(newHomepage);
    console.log('   ✅ Created updated homepage\n');

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return;
  }

  // Step 4: Verify
  console.log('STEP 4: Verifying...');
  const updated = await client.fetch(`*[_type == "homepage"][0]`);

  console.log(`   Hero headline: ${updated.heroHeadline === websiteContent.heroHeadline ? '✅' : '❌'} "${updated.heroHeadline}"`);
  console.log(`   Events title: ${updated.eventsSectionTitle === websiteContent.eventsSectionTitle ? '✅' : '❌'} "${updated.eventsSectionTitle}"`);
  console.log(`   Events desc: ${updated.eventsSectionDescription === websiteContent.eventsSectionDescription ? '✅' : '❌'} "${updated.eventsSectionDescription}"`);
  console.log(`   Cafe desc: ${updated.cafeSectionDescription === websiteContent.cafeSectionDescription ? '✅' : '❌'} (long text)`);

  console.log('\n✅ Homepage content now matches website!\n');
}

fixHomepage().catch(console.error);
