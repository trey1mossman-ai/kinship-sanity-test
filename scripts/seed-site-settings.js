#!/usr/bin/env node
/**
 * Seed Site Settings to Sanity
 *
 * This seeds ALL site settings - everything your client can edit:
 * - Branding (site name, tagline)
 * - Contact info (phone, email, address)
 * - Social media links (Kinship + HOMA)
 * - Booking URLs
 * - Footer links
 * - HOMA Café info
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-site-settings.js
 */

const { createClient } = require('@sanity/client');

// Try to load dotenv if available
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // dotenv not available, will use env var directly
}

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
 * ALL SITE SETTINGS DATA
 * Source: Production website footer and existing components
 */
const siteSettingsData = {
  _id: 'siteSettings',
  _type: 'siteSettings',

  // ============================================
  // BRANDING
  // ============================================
  siteName: 'Kinship Landing',
  tagline: 'Stay. Gather. Explore.',

  // ============================================
  // CONTACT INFO
  // ============================================
  phone: '(719) 203-9309',
  email: 'hello@kinshiplanding.com',
  address: {
    street: '415 S Nevada Ave',
    city: 'Colorado Springs',
    state: 'CO',
    zip: '80903'
  },
  googleMapsUrl: 'https://www.google.com/maps/place/Kinship+Landing/@38.8284,-104.8253,17z',

  // ============================================
  // SOCIAL MEDIA (Kinship)
  // ============================================
  instagramUrl: 'https://www.instagram.com/kinshiplanding/',
  facebookUrl: 'https://www.facebook.com/kinshiplanding',
  // tripAdvisorUrl: '', // Optional - add when available
  // googleBusinessUrl: '', // Optional - add when available

  // ============================================
  // BOOKING URLS
  // ============================================
  bookingUrl: 'https://direct-book.com/properties/kinshiplanding',
  eventInquiryUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',
  groupBookingUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',

  // ============================================
  // FOOTER
  // ============================================
  footerCopyrightNote: 'Auto-generated using current year + site name',
  footerLinks: [
    { _key: 'home', title: 'Home', url: '/' },
    { _key: 'rooms', title: 'Rooms', url: '/rooms' },
    { _key: 'events', title: 'Events', url: '/events' },
    { _key: 'homa', title: 'HOMA Café + Bar', url: '/homa' },
    { _key: 'explore', title: 'Explore', url: '/explore' },
    { _key: 'gallery', title: 'Gallery', url: '/gallery' },
    { _key: 'about', title: 'About', url: '/about' },
    { _key: 'policies', title: 'Hotel Policies', url: '/policies' },
    { _key: 'privacy', title: 'Privacy Policy', url: '/privacy' },
    { _key: 'accessibility', title: 'Accessibility', url: '/accessibility' },
    { _key: 'careers', title: 'Careers', url: '/careers' },
    { _key: 'eventInquiry', title: 'Event Inquiry', url: 'https://kinshiplanding.tripleseat.com/booking_request/42351' },
    { _key: 'groupBookings', title: 'Group Bookings', url: 'https://kinshiplanding.tripleseat.com/booking_request/42351' },
    { _key: 'parking', title: 'Parking Info', url: '/policies#parking' }
  ],

  // ============================================
  // HOMA CAFÉ + BAR
  // ============================================
  homaPhone: '(719) 245-0046',
  homaEmail: 'homa@kinshiplanding.com',
  homaHours: '7am - 10pm Daily',
  homaInstagramUrl: 'https://www.instagram.com/homacafebar',
  homaFacebookUrl: 'https://www.facebook.com/Homa-Cafe-Bar'
};

async function seedSiteSettings() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║      SEEDING ALL SITE SETTINGS TO SANITY                   ║');
  console.log('║      (Everything editable by your client!)                 ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  try {
    const result = await client.createOrReplace(siteSettingsData);

    console.log('✅ Successfully seeded Site Settings!');
    console.log('\n📋 Document ID:', result._id);

    console.log('\n🏢 BRANDING');
    console.log('─────────────────────────────────────────────────────────────');
    console.log(`   Site Name: "${siteSettingsData.siteName}"`);
    console.log(`   Tagline: "${siteSettingsData.tagline}"`);

    console.log('\n📞 CONTACT INFO');
    console.log('─────────────────────────────────────────────────────────────');
    console.log(`   Phone: ${siteSettingsData.phone}`);
    console.log(`   Email: ${siteSettingsData.email}`);
    console.log(`   Address: ${siteSettingsData.address.street}, ${siteSettingsData.address.city}, ${siteSettingsData.address.state} ${siteSettingsData.address.zip}`);

    console.log('\n📱 SOCIAL MEDIA');
    console.log('─────────────────────────────────────────────────────────────');
    console.log(`   Instagram: ${siteSettingsData.instagramUrl}`);
    console.log(`   Facebook: ${siteSettingsData.facebookUrl}`);

    console.log('\n🔗 BOOKING');
    console.log('─────────────────────────────────────────────────────────────');
    console.log(`   Booking URL: ${siteSettingsData.bookingUrl}`);
    console.log(`   Event Inquiry: ${siteSettingsData.eventInquiryUrl}`);

    console.log('\n📝 FOOTER LINKS');
    console.log('─────────────────────────────────────────────────────────────');
    console.log(`   ${siteSettingsData.footerLinks.length} links configured`);

    console.log('\n☕ HOMA CAFÉ');
    console.log('─────────────────────────────────────────────────────────────');
    console.log(`   Phone: ${siteSettingsData.homaPhone}`);
    console.log(`   Email: ${siteSettingsData.homaEmail}`);
    console.log(`   Hours: ${siteSettingsData.homaHours}`);
    console.log(`   Instagram: ${siteSettingsData.homaInstagramUrl}`);
    console.log(`   Facebook: ${siteSettingsData.homaFacebookUrl}`);

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
