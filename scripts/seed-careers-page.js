#!/usr/bin/env node
/**
 * Seed script to populate the Careers page CTA in Sanity
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-careers-page.js
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

async function seedCareersPageCTA() {
  console.log('Adding CTA fields to Careers page...\n');

  try {
    // Patch the existing careers page document to add CTA fields
    const result = await client
      .patch('careersPage')
      .set({
        ctaTitle: 'Ready to Join Us?',
        ctaText: 'Browse our current openings and take the first step toward your next adventure.',
        ctaButtonText: 'View Open Positions',
        ctaButtonUrl: 'https://imprinthospitality.hrmdirect.com/employment/job-openings.php?search=true&'
      })
      .commit();

    console.log('Successfully added CTA to Careers page!');
    console.log('\nDocument ID:', result._id);
    console.log('\nView in Sanity Studio: https://kinship-landing.sanity.studio/structure/careersPage');
    console.log('\nCTA Fields added:');
    console.log('   - CTA Title: Ready to Join Us?');
    console.log('   - CTA Text: Browse our current openings...');
    console.log('   - CTA Button: View Open Positions');
    console.log('   - CTA URL: https://imprinthospitality.hrmdirect.com/employment/job-openings.php?search=true&');

  } catch (error) {
    console.error('Error seeding content:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\nMake sure your SANITY_API_TOKEN has "Editor" permissions.');
    }
    process.exit(1);
  }
}

// Run the seed function
seedCareersPageCTA();
