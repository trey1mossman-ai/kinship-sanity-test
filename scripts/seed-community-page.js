#!/usr/bin/env node
/**
 * Seed script to populate the Community page in Sanity with actual website content
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-community-page.js
 */

const { createClient } = require('@sanity/client');

// Sanity client with write access
const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// The actual content from the live website
const communityPageContent = {
  _id: 'communityPage',
  _type: 'communityPage',

  // ==================== HERO SECTION ====================
  heroTitle: 'Community Events',
  heroSubtitle: 'Join us for gatherings, workshops, and experiences that bring our community together',

  // ==================== INTRODUCTION SECTION ====================
  introBadge: "What's Happening",
  introTitle: 'Upcoming Events',
  introText: 'Join us for gatherings, workshops, and experiences that bring our community together. Click any event below to view full details.',
  description: 'Community happenings at Kinship Landing',

  // ==================== EVENTS ====================
  // Note: Images need to be uploaded manually in Sanity Studio
  events: [
    {
      _key: 'event-1',
      title: 'November 24th Event',
      description: 'Join us for an exciting community gathering at Kinship Landing.',
      alt: 'Community Event - November 24th',
      buttonText: 'Learn More',
      isActive: true
    },
    {
      _key: 'event-2',
      title: 'Everything But the Turkey',
      description: 'Let HOMA handle the sides this Thanksgiving! Pre-order our delicious holiday dishes and spend more time with family.',
      alt: 'Community Event - November 26th',
      eventUrl: 'https://www.eventbrite.com/e/everything-but-the-turkey-from-homa-cafe-bar-registration-1908375365089?aff=oddtdtcreator',
      buttonText: 'Reserve a Spot',
      isActive: true
    },
    {
      _key: 'event-3',
      title: 'Holiday Gathering',
      description: 'Celebrate the season with our community at this special holiday event.',
      alt: 'Community Event - Holiday Gathering',
      eventUrl: 'https://www.eventbrite.com/e/everything-but-the-turkey-from-homa-cafe-bar-registration-1908375365089?aff=oddtdtcreator',
      buttonText: 'Reserve a Spot',
      isActive: true
    }
  ],

  // ==================== SEO ====================
  seoTitle: 'Community Events | Kinship Landing',
  seoDescription: 'Join us for gatherings, workshops, and experiences at Kinship Landing in downtown Colorado Springs.',
};

async function seedCommunityPage() {
  console.log('Starting Community page seed script...\n');

  try {
    // Use createOrReplace to update the singleton document
    const result = await client.createOrReplace(communityPageContent);

    console.log('Successfully seeded Community page content!');
    console.log('\nDocument ID:', result._id);
    console.log('\nView in Sanity Studio: https://kinship-landing.sanity.studio/structure/communityPage');
    console.log('\nFields populated:');
    console.log('   - Hero: title, subtitle');
    console.log('   - Introduction: badge, title, text');
    console.log('   - Events: 3 community events (images need upload)');
    console.log('   - SEO: title, description');
    console.log('\nIMPORTANT: Upload event images in Sanity Studio:');
    console.log('   1. Go to Community Page > Events tab');
    console.log('   2. Click each event');
    console.log('   3. Upload the corresponding image:');
    console.log('      - Event 1: /images/Community Page/Nov. 24.webp');
    console.log('      - Event 2: /images/Community Page/Nov. 26.webp');
    console.log('      - Event 3: /images/Community Page/Nov.26 -.webp');
    console.log('   4. Also upload Hero Image: /images/Community Page/GetOutsideEvent6_26-SamStarrMedia (1).webp');

  } catch (error) {
    console.error('Error seeding content:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\nMake sure your SANITY_API_TOKEN has "Editor" permissions.');
    }
    process.exit(1);
  }
}

// Run the seed function
seedCommunityPage();
