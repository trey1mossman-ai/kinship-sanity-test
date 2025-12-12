#!/usr/bin/env node
/**
 * Seed script to populate the Rooms page in Sanity with actual website content
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-rooms-page.js
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
const roomsPageContent = {
  _id: 'roomsPage',
  _type: 'roomsPage',

  // ==================== HERO SECTION ====================
  heroTitle: 'Stay With Us',
  heroSubtitle: 'Your Colorado Springs basecamp',

  // ==================== FILTER LABELS ====================
  filterAllLabel: 'All Rooms',
  filterKingLabel: 'King Rooms',
  filterQueenLabel: 'Queen Rooms',
  filterFamilyLabel: 'Family Rooms',
  filterCampDeckLabel: 'Camp Deck',

  // ==================== ROOM BLOCKS SECTION ====================
  roomBlocksTitle: 'Book a Bunch of Rooms',
  roomBlocksTagline: 'Keep Your Crew Close',
  roomBlocksDescription1: "Keep your favorite people close. Whether it's a wedding weekend, a family reunion, or a team retreat, reserving a room block at Kinship makes it easy for everyone to stay together under one roof.",
  roomBlocksDescription2: "Your crew will love our unique rooms, downtown location, and the chance to gather around the fire pit, share a meal at Homa Café, or head out on an adventure right from our front door.",
  roomBlocksDescription3: 'Ask us about setting up a block so your group can focus on making memories, not logistics.',
  roomBlocksCtaText: 'Book Your Gathering at Kinship Landing',
  roomBlocksCtaUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',

  // ==================== SEO ====================
  seoTitle: 'Rooms & Suites | Kinship Landing Boutique Hotel',
  seoDescription: 'Explore our unique rooms and suites at Kinship Landing. From cozy king suites to family rooms and the one-of-a-kind Camp Deck, find your perfect Colorado Springs basecamp.',
};

async function seedRoomsPage() {
  console.log('🌱 Seeding Rooms page content to Sanity...\n');

  try {
    // Use createOrReplace to update the singleton document
    const result = await client.createOrReplace(roomsPageContent);

    console.log('✅ Successfully seeded Rooms page content!');
    console.log('\n📋 Document ID:', result._id);
    console.log('\n🔗 View in Sanity Studio: https://kinship-landing.sanity.studio/structure/roomsPage');
    console.log('\n📝 Fields populated:');
    console.log('   - Hero: title, subtitle');
    console.log('   - Filter Labels: all, king, queen, family, camp deck');
    console.log('   - Room Blocks: title, tagline, descriptions, CTA');
    console.log('   - SEO: title, description');
    console.log('\n⚠️  NOTE: Hero images need to be uploaded manually in Sanity Studio');

  } catch (error) {
    console.error('❌ Error seeding content:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\n💡 Make sure your SANITY_API_TOKEN has "Editor" permissions.');
      console.error('   Get a token from: https://www.sanity.io/manage/project/u2qzrboc/api#tokens');
    }
    process.exit(1);
  }
}

// Run the seed function
seedRoomsPage();
