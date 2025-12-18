#!/usr/bin/env node
/**
 * FIX SITE SETTINGS - COPYRIGHT TEXT
 *
 * Updates the footerText field in Sanity to match production output.
 *
 * SOURCE OF TRUTH: KINSHIP_LIVE_PRODUCTION/index.html
 * The production site shows: © 2025 Kinship Landing. All rights reserved.
 *
 * The Footer component (components/Footer.tsx:266) uses:
 *   © {new Date().getFullYear()} {siteName}. All rights reserved.
 *
 * This script ensures Sanity displays the same text shown on the actual website.
 *
 * Usage:
 *   cd sanity-hostinger-test
 *   SANITY_API_TOKEN=$SANITY_API_TOKEN node scripts/fix-site-settings-copyright.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function fixCopyright() {
  console.log('🔄 Fixing siteSettings copyright text...\n');

  // Check for API token
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN environment variable is required');
    console.error('   Run with: SANITY_API_TOKEN=your_token node scripts/fix-site-settings-copyright.js');
    process.exit(1);
  }

  // Fetch the siteSettings document
  const doc = await client.fetch(`*[_type == "siteSettings"][0]`);

  if (!doc) {
    console.error('❌ Error: No siteSettings document found in Sanity');
    process.exit(1);
  }

  console.log(`📄 Found siteSettings document: ${doc._id}`);
  console.log(`   Current footerText: "${doc.footerText || '(empty)'}"`);

  // The correct value - matches what KINSHIP_LIVE_PRODUCTION shows
  // Source: grep -o '©.*reserved' KINSHIP_LIVE_PRODUCTION/index.html
  const currentYear = new Date().getFullYear();
  const correctFooterText = `© ${currentYear} Kinship Landing. All rights reserved.`;

  if (doc.footerText === correctFooterText) {
    console.log('\n✅ footerText is already correct! No update needed.');
    return;
  }

  console.log(`\n📝 Updating to: "${correctFooterText}"`);

  try {
    await client
      .patch(doc._id)
      .set({ footerText: correctFooterText })
      .commit();

    console.log('\n✅ Updated successfully!');
    console.log('\n📋 Note: This matches the production site output.');
    console.log('   Re-run this script annually to update the year.');
  } catch (error) {
    console.error('\n❌ Update failed:', error.message);
    process.exit(1);
  }
}

fixCopyright().catch(console.error);
