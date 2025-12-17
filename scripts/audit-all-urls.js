#!/usr/bin/env node
/**
 * Audit all URLs across Sanity documents
 * Checks for any incorrect or placeholder URLs
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function auditAllUrls() {
  console.log('🔍 AUDITING ALL URLs ACROSS SANITY DOCUMENTS\n');
  console.log('==================================================\n');

  // Get all singleton documents
  const docs = await client.fetch(`*[_type in ["homepage", "roomsPage", "homaPage", "aboutPage", "offersPage", "communityPage", "siteSettings", "explorePage", "galleryPage", "careersPage"]]`);

  docs.forEach(doc => {
    console.log(`\n📄 ${doc._type.toUpperCase()}`);

    // Find all URL-like fields
    const checkValue = (obj, prefix) => {
      prefix = prefix || '';
      Object.entries(obj).forEach(([key, value]) => {
        if (key.startsWith('_')) return;

        if (typeof value === 'string' && (key.toLowerCase().includes('url') || value.includes('http'))) {
          console.log(`  ${prefix}${key}: ${value}`);
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          checkValue(value, prefix + key + '.');
        }
      });
    };

    checkValue(doc);
  });
}

auditAllUrls().catch(console.error);
