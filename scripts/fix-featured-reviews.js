// Fix Featured Reviews in Sanity Homepage
// Populates the featuredReviews array from current reviews.seed.json
// Run with: SANITY_TOKEN="your_token" node scripts/fix-featured-reviews.js

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

// Reviews from reviews.seed.json - these are the REAL reviews from the website
const featuredReviews = [
  {
    _key: 'review-1',
    quote: 'Aesthetics, kind staff, comfortable bed, convenient onsite parking, excellent restaurant, and great location. Would definitely stay again.',
    author: 'Sydnee',
    source: 'Expedia',
    rating: 5
  },
  {
    _key: 'review-2',
    quote: 'Beautiful property with great amenities and restaurants nearby.',
    author: 'Verified traveler',
    source: 'Expedia',
    rating: 5
  },
  {
    _key: 'review-3',
    quote: 'Wonderful place with a great location, great food, amazing staff. So clean and roomy.',
    author: 'Cindy',
    source: 'Expedia',
    rating: 5
  },
  {
    _key: 'review-4',
    quote: 'Outdoor seating with a firepit, a welcoming café, and a simple, very accommodating room. Everything was next-level terrific.',
    author: 'Thomas',
    source: 'Expedia',
    rating: 5
  },
  {
    _key: 'review-5',
    quote: 'Relaxing stay and a peaceful atmosphere. Friendly team, beautiful common areas, amazing café, and gorgeous rooms. I would return.',
    author: 'Ernest',
    source: 'Expedia',
    rating: 5
  }
];

async function fixFeaturedReviews() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║      POPULATING FEATURED REVIEWS IN SANITY HOMEPAGE        ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Step 1: Get current homepage
  console.log('STEP 1: Fetching current homepage...');
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);

  if (!homepage) {
    console.log('   ❌ No homepage document found!');
    return;
  }

  console.log('   Current featuredReviews:', homepage.featuredReviews?.length || 0, 'reviews');

  // Step 2: Delete and recreate with featured reviews
  console.log('\nSTEP 2: Updating homepage with featured reviews...');

  try {
    await client.delete(homepage._id);
    console.log('   ✅ Deleted old homepage');

    // Create with ALL fields including featuredReviews
    const newHomepage = {
      _type: 'homepage',
      _id: 'homepage',

      // Hero fields (both visible and legacy)
      heroTitle: homepage.heroTitle,
      heroSubtitle: homepage.heroSubtitle,
      heroHeadline: homepage.heroHeadline,
      heroSubheadline: homepage.heroSubheadline,
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

      // NEW: Featured Reviews for Hero testimonials rotation
      featuredReviews: featuredReviews,

      // Map
      mapSectionTitle: homepage.mapSectionTitle,
      nearbyAttractions: homepage.nearbyAttractions,
    };

    await client.create(newHomepage);
    console.log('   ✅ Created updated homepage with', featuredReviews.length, 'featured reviews\n');

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return;
  }

  // Step 3: Verify
  console.log('STEP 3: Verifying...');
  const updated = await client.fetch(`*[_type == "homepage"][0] { featuredReviews }`);

  console.log(`   ✅ featuredReviews now has ${updated.featuredReviews?.length || 0} reviews\n`);

  if (updated.featuredReviews?.length > 0) {
    console.log('Reviews in Sanity:');
    updated.featuredReviews.forEach((review, i) => {
      console.log(`   ${i + 1}. "${review.quote.substring(0, 50)}..." - ${review.author}`);
    });
  }

  console.log('\n✅ Featured reviews now editable in Sanity Studio!');
  console.log('   Go to Homepage → Press & Reviews → Featured Reviews\n');
}

fixFeaturedReviews().catch(console.error);
