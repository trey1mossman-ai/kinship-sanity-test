#!/usr/bin/env node
/**
 * Seed Site Settings to Sanity
 *
 * This seeds global site configuration used across all pages:
 * - Site name and tagline
 * - Contact information (phone, email, address)
 * - Booking URL
 * - Social media links
 * - Footer text
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-site-settings.js
 */

const { createClient } = require('@sanity/client');

// Check for API token
const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('\n❌ ERROR: SANITY_API_TOKEN environment variable is required');
  console.error('   Get a token from: https://www.sanity.io/manage/project/u2qzrboc/api#tokens\n');
  process.exit(1);
}

// Sanity client with write access
const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token,
});

/**
 * SITE SETTINGS DATA
 * Source: Various components across the codebase
 * - Footer.tsx
 * - HeaderNav.tsx
 * - CallToBook.tsx
 * - MapBlock.tsx
 */
const siteSettingsData = {
  _id: 'siteSettings',
  _type: 'siteSettings',

  // Basic Info
  siteName: 'Kinship Landing',
  tagline: 'Outrageous hospitality, crafted by locals',

  // Contact Information
  phone: '(719) 203-9309',
  email: 'hello@kinshiplanding.com',
  address: {
    street: '415 S Nevada Ave',
    city: 'Colorado Springs',
    state: 'CO',
    zip: '80903'
  },

  // External Links
  googleMapsUrl: 'https://www.google.com/maps/place/Kinship+Landing/@38.8284,-104.8253,17z',
  bookingUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E',

  // Social Media Links
  socialLinks: [
    { _key: 'instagram', platform: 'instagram', url: 'https://instagram.com/kinshiplanding' },
    { _key: 'facebook', platform: 'facebook', url: 'https://facebook.com/kinshiplanding' },
    { _key: 'tripadvisor', platform: 'tripadvisor', url: 'https://www.tripadvisor.com/Hotel_Review-g33364-d23462185-Reviews-Kinship_Landing-Colorado_Springs_El_Paso_County_Colorado.html' },
    { _key: 'google', platform: 'google', url: 'https://g.page/r/CZkQXxxxxxxxxxxx/review' }
  ],

  // Footer
  footerText: '© 2024 Kinship Landing. All rights reserved.'
};

async function seedSiteSettings() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║           SEEDING SITE SETTINGS TO SANITY                  ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  try {
    const result = await client.createOrReplace(siteSettingsData);

    console.log('✅ Successfully seeded Site Settings!');
    console.log('\n📋 Document ID:', result._id);

    console.log('\n📊 CONTENT SUMMARY');
    console.log('─────────────────────────────────────────────────────────────');
    console.log(`   Site Name: "${siteSettingsData.siteName}"`);
    console.log(`   Tagline: "${siteSettingsData.tagline}"`);
    console.log(`   Phone: ${siteSettingsData.phone}`);
    console.log(`   Email: ${siteSettingsData.email}`);
    console.log(`   Address: ${siteSettingsData.address.street}, ${siteSettingsData.address.city}, ${siteSettingsData.address.state} ${siteSettingsData.address.zip}`);
    console.log(`   Social Links: ${siteSettingsData.socialLinks.length} platforms`);

    console.log('\n🔗 View in Sanity Studio:');
    console.log('   https://kinship-landing.sanity.studio/structure/siteSettings\n');

  } catch (error) {
    console.error('\n❌ Error seeding content:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\n💡 Make sure your SANITY_API_TOKEN has "Editor" permissions.');
      console.error('   Get a token from: https://www.sanity.io/manage/project/u2qzrboc/api#tokens');
    }
    process.exit(1);
  }
}

seedSiteSettings();
