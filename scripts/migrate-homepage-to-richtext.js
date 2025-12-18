#!/usr/bin/env node
/**
 * HOMEPAGE - RICH TEXT MIGRATION SCRIPT
 * Converts plain text fields to Portable Text format
 * RUN THIS BEFORE deploying schema changes
 *
 * Document type: homePage
 * Project ID: u2qzrboc
 * Dataset: production
 *
 * Fields to migrate (9 total):
 * - heroSubtitle
 * - guideParagraph1
 * - guideParagraph2
 * - guideParagraph3
 * - homaParagraph1
 * - homaParagraph2
 * - homaPromoDescription
 * - newsletterDescription
 * - seoDescription
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const FIELDS_TO_MIGRATE = [
  'heroSubtitle',
  'guideParagraph1',
  'guideParagraph2',
  'guideParagraph3',
  'homaParagraph1',
  'homaParagraph2',
  'homaPromoDescription',
  'newsletterDescription',
  'seoDescription',
];

/**
 * Convert plain text string to Portable Text format
 * Handles multi-paragraph text by splitting on double newlines
 */
function textToPortableText(text) {
  if (!text || typeof text !== 'string') return null;

  // Split on double newlines to preserve paragraph breaks
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());

  return paragraphs.map((paragraph, index) => ({
    _type: 'block',
    _key: `block-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
    style: 'normal',
    markDefs: [],
    children: [{
      _type: 'span',
      _key: `span-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      text: paragraph.trim(),
      marks: [],
    }],
  }));
}

async function migrate() {
  console.log('🚀 Starting Homepage rich text migration...\n');

  // Check for API token
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN environment variable not set');
    console.error('   Set it with: export SANITY_API_TOKEN="your-token-here"\n');
    process.exit(1);
  }

  try {
    // Fetch the homepage document
    console.log('📄 Fetching homepage document...');
    const query = '*[_type == "homepage"][0]';
    const doc = await client.fetch(query);

    if (!doc) {
      console.error('❌ Error: homepage document not found');
      process.exit(1);
    }

    console.log(`✅ Found document: ${doc._id}\n`);

    // Build patch operations
    const patch = client.patch(doc._id);
    let migratedCount = 0;
    let skippedCount = 0;
    let alreadyMigratedCount = 0;

    console.log('🔄 Processing fields:\n');

    for (const field of FIELDS_TO_MIGRATE) {
      const value = doc[field];

      // Skip if field doesn't exist
      if (value === undefined || value === null) {
        console.log(`⏭️  ${field}: Not set (skipping)`);
        skippedCount++;
        continue;
      }

      // Skip if already an array (already migrated)
      if (Array.isArray(value)) {
        console.log(`✓  ${field}: Already migrated (array)`);
        alreadyMigratedCount++;
        continue;
      }

      // Skip if not a string
      if (typeof value !== 'string') {
        console.log(`⚠️  ${field}: Unexpected type ${typeof value} (skipping)`);
        skippedCount++;
        continue;
      }

      // Convert to Portable Text
      const portableText = textToPortableText(value);

      if (portableText && portableText.length > 0) {
        patch.set({ [field]: portableText });
        console.log(`✅ ${field}: Converted (${value.length} chars → ${portableText.length} block${portableText.length > 1 ? 's' : ''})`);
        migratedCount++;
      } else {
        console.log(`⏭️  ${field}: Empty or invalid (skipping)`);
        skippedCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 Migration Summary:');
    console.log(`   - Migrated: ${migratedCount} field${migratedCount !== 1 ? 's' : ''}`);
    console.log(`   - Already migrated: ${alreadyMigratedCount} field${alreadyMigratedCount !== 1 ? 's' : ''}`);
    console.log(`   - Skipped: ${skippedCount} field${skippedCount !== 1 ? 's' : ''}`);
    console.log('='.repeat(60) + '\n');

    // Apply the patch if there are changes
    if (migratedCount > 0) {
      console.log('💾 Applying migration to Sanity...');
      await patch.commit();
      console.log('✅ Migration completed successfully!\n');
    } else {
      console.log('ℹ️  No fields to migrate. All fields are already in Portable Text format or empty.\n');
    }

    // Print next steps
    console.log('📋 Next Steps:');
    console.log('   1. Verify the migration in Sanity Studio');
    console.log('   2. Deploy the updated schema with: cd sanity-hostinger-test && npm run deploy');
    console.log('   3. Update frontend components to render Portable Text');
    console.log('   4. Test the homepage in production\n');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    if (error.response) {
      console.error('   Response:', error.response);
    }
    process.exit(1);
  }
}

// Run migration
migrate().catch((error) => {
  console.error('💥 Unexpected error:', error);
  process.exit(1);
});
