#!/usr/bin/env node
/**
 * Seed script to populate the Gallery page in Sanity with actual website content
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-gallery-page.js
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
const galleryPageContent = {
  _id: 'galleryPage',
  _type: 'galleryPage',

  // ==================== HERO SECTION ====================
  heroTitle: 'Gallery',
  heroSubtitle: 'Explore Kinship Landing',

  // ==================== INTRODUCTION SECTION ====================
  introBadge: 'See It For Yourself',
  introTitle: 'Your Colorado Springs Basecamp',
  introText: 'From cozy rooms with mountain views to vibrant gathering spaces and locally-crafted dishes at HOMA, explore what makes Kinship Landing the perfect place to stay, gather, and launch your Colorado adventures.',

  // ==================== FILTER LABELS ====================
  filterAllLabel: 'All',
  filterRoomsLabel: 'Rooms',
  filterVenuesLabel: 'Venues',
  filterHomaLabel: 'Homa Café',
  filterOutdoorsLabel: 'Weddings',

  // ==================== SEO ====================
  seoTitle: 'Photo Gallery | Kinship Landing',
  seoDescription: 'Browse photos of our boutique hotel rooms, event spaces, HOMA café, and more at Kinship Landing in downtown Colorado Springs.',
};

async function seedGalleryPage() {
  console.log('Starting Gallery page seed script...\n');

  try {
    // Use createOrReplace to update the singleton document
    const result = await client.createOrReplace(galleryPageContent);

    console.log('Successfully seeded Gallery page content!');
    console.log('\nDocument ID:', result._id);
    console.log('\nView in Sanity Studio: https://kinship-landing.sanity.studio/structure/galleryPage');
    console.log('\nFields populated:');
    console.log('   - Hero: title, subtitle');
    console.log('   - Introduction: badge, title, text');
    console.log('   - Filter Labels: all, rooms, venues, homa, outdoors');
    console.log('   - SEO: title, description');
    console.log('\nIMPORTANT: Upload hero image in Sanity Studio:');
    console.log('   1. Go to Gallery Page > Hero Section tab');
    console.log('   2. Upload Hero Image: /images/events-page/Make Kinship Yours/HomaNightlife-GregCeo.webp');

  } catch (error) {
    console.error('Error seeding content:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\nMake sure your SANITY_API_TOKEN has "Editor" permissions.');
    }
    process.exit(1);
  }
}

// Run the seed function
seedGalleryPage();
