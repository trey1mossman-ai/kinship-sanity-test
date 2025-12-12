#!/usr/bin/env node
/**
 * Seed script to populate the Offers page in Sanity with actual website content
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-offers-page.js
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
const offersPageContent = {
  _id: 'offersPage',
  _type: 'offersPage',

  // ==================== HERO SECTION ====================
  heroTitle: 'Special Offers',
  heroSubtitle: 'Discover exclusive deals and packages for your Colorado Springs adventure',

  // ==================== INTRODUCTION SECTION ====================
  introBadge: 'Save on Your Stay',
  introTitle: 'Current Promotions',
  introText: 'Take advantage of our limited-time offers and experience outrageous hospitality at special rates. Click any offer to view full details.',

  // ==================== OFFERS ====================
  // Note: Images need to be uploaded manually in Sanity Studio
  // These are placeholder entries - upload actual images via Sanity Studio
  offers: [
    {
      _key: 'nye-offer',
      title: 'Ring in the New Year',
      alt: 'New Year\'s Eve Special Offer',
      description: 'Celebrate the New Year in style at Kinship Landing. Book your stay and enjoy a memorable celebration in downtown Colorado Springs.',
      bookingUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E',
      isActive: true
    },
    {
      _key: 'elevator-offer',
      title: 'Take the Elevator Home',
      alt: 'Take the Elevator Home - Special Accommodation Offer',
      description: 'Enjoy dinner and drinks at HOMA, then take the elevator up to your room. No designated driver needed when you stay with us.',
      bookingUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E',
      isActive: true
    }
  ],

  // ==================== SEO ====================
  seoTitle: 'Special Offers & Packages | Kinship Landing',
  seoDescription: 'Discover exclusive deals and packages for your Colorado Springs adventure at Kinship Landing boutique hotel.',
};

async function seedOffersPage() {
  console.log('Starting Offers page seed script...\n');

  try {
    // Use createOrReplace to update the singleton document
    const result = await client.createOrReplace(offersPageContent);

    console.log('Successfully seeded Offers page content!');
    console.log('\nDocument ID:', result._id);
    console.log('\nView in Sanity Studio: https://kinship-landing.sanity.studio/structure/offersPage');
    console.log('\nFields populated:');
    console.log('   - Hero: title, subtitle');
    console.log('   - Introduction: description, title, text, badge');
    console.log('   - Offers: 2 special offers (images need upload)');
    console.log('   - SEO: title, description');
    console.log('\nIMPORTANT: Upload offer images in Sanity Studio:');
    console.log('   1. Go to Offers Page > Offers tab');
    console.log('   2. Click each offer');
    console.log('   3. Upload the corresponding image:');
    console.log('      - NYE Promo: /images/Offers/NYE Promo (1080 x 566 px).webp');
    console.log('      - Take the Elevator Home: /images/Offers/Take the Elevator Home (1080 x 1080 px) (1).webp');
    console.log('   4. Also upload Hero Image: /images/Offers/aligarciaphotography-72.webp');

  } catch (error) {
    console.error('Error seeding content:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\nMake sure your SANITY_API_TOKEN has "Editor" permissions.');
    }
    process.exit(1);
  }
}

// Run the seed function
seedOffersPage();
