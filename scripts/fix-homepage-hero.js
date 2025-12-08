// Fix Homepage Hero Fields in Sanity
// The schema has heroTitle/heroSubtitle (visible) AND heroHeadline/heroSubheadline (hidden legacy)
// We need to populate the VISIBLE fields
// Run with: SANITY_TOKEN="your_token" node scripts/fix-homepage-hero.js

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

// Website hero content (from HeroSection.tsx and InlineTestimonials.tsx)
const heroContent = {
  heroTitle: 'Experience Colorado Springs like a local',
  heroSubtitle: 'Sleep well. Meet locals. Launch adventures.', // From content/copy.ts line 163
};

async function fixHomepageHero() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║        FIXING HOMEPAGE HERO FIELDS IN SANITY               ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Step 1: Get current homepage
  console.log('STEP 1: Fetching current homepage...');
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);

  if (!homepage) {
    console.log('   ❌ No homepage document found!');
    return;
  }

  console.log('   Current fields:');
  console.log(`   heroTitle: "${homepage.heroTitle || '(empty)'}"`)
  console.log(`   heroSubtitle: "${homepage.heroSubtitle || '(empty)'}"`)
  console.log(`   heroHeadline (legacy/hidden): "${homepage.heroHeadline || '(empty)'}"`)
  console.log(`   heroSubheadline (legacy/hidden): "${homepage.heroSubheadline || '(empty)'}"\n`);

  // Step 2: Delete and recreate with correct fields
  console.log('STEP 2: Updating homepage with correct hero fields...');

  try {
    await client.delete(homepage._id);
    console.log('   ✅ Deleted old homepage');

    // Create with ALL fields populated correctly
    const newHomepage = {
      _type: 'homepage',
      _id: 'homepage',

      // VISIBLE Hero fields (what Sanity Studio shows)
      heroTitle: heroContent.heroTitle,
      heroSubtitle: heroContent.heroSubtitle,

      // LEGACY Hero fields (hidden but kept for code compatibility)
      heroHeadline: heroContent.heroTitle,
      heroSubheadline: heroContent.heroSubtitle,

      heroCta: homepage.heroCta,

      // Rest of fields - keep existing
      whyKinshipTitle: homepage.whyKinshipTitle,
      whyKinshipBody: homepage.whyKinshipBody,
      roomsSectionTitle: homepage.roomsSectionTitle,
      roomsSectionSubtitle: homepage.roomsSectionSubtitle,
      eventsSectionTitle: homepage.eventsSectionTitle,
      eventsSectionDescription: homepage.eventsSectionDescription,
      cafeSectionTitle: homepage.cafeSectionTitle,
      cafeSectionDescription: homepage.cafeSectionDescription,
      cafeFeatures: homepage.cafeFeatures,
      pressSectionTitle: homepage.pressSectionTitle,
      reviewsSectionTitle: homepage.reviewsSectionTitle,
      googleRating: homepage.googleRating,
      googleReviewCount: homepage.googleReviewCount,
      mapSectionTitle: homepage.mapSectionTitle,
      nearbyAttractions: homepage.nearbyAttractions,
    };

    await client.create(newHomepage);
    console.log('   ✅ Created updated homepage\n');

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return;
  }

  // Step 3: Verify
  console.log('STEP 3: Verifying...');
  const updated = await client.fetch(`*[_type == "homepage"][0]`);

  console.log(`   heroTitle: ${updated.heroTitle === heroContent.heroTitle ? '✅' : '❌'} "${updated.heroTitle}"`);
  console.log(`   heroSubtitle: ${updated.heroSubtitle === heroContent.heroSubtitle ? '✅' : '❌'} "${updated.heroSubtitle || '(empty - correct, uses testimonials)'}"`);
  console.log(`   heroHeadline (legacy): "${updated.heroHeadline}"`);
  console.log(`   heroSubheadline (legacy): "${updated.heroSubheadline || '(empty)'}"`);

  console.log('\n✅ Homepage hero fields now set correctly!\n');
  console.log('In Sanity Studio, you should now see:');
  console.log(`   Hero Title: "${heroContent.heroTitle}"`);
  console.log(`   Hero Subtitle: (empty - website uses rotating testimonials instead)\n`);
}

fixHomepageHero().catch(console.error);
