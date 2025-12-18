#!/usr/bin/env node
/**
 * EVENTS PAGE - RICH TEXT MIGRATION SCRIPT
 *
 * This script converts plain text fields to Portable Text format
 * RUN THIS BEFORE deploying schema changes to avoid Sanity Studio errors
 *
 * Usage:
 *   cd sanity-hostinger-test
 *   SANITY_API_TOKEN=$SANITY_API_TOKEN node scripts/migrate-events-to-richtext.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Fields to migrate from text to richText
const FIELDS_TO_MIGRATE = [
  'heroSubtitle',
  'gatheringsDescription',
  'weddingsDescription',
  'weddingsDescription2',
  'meetingsDescription',
  'meetingsDescription2',
  'meetingsDescription3',
  'meetingsNote',
  'roomBlocksDescription',
  'roomBlocksDescription2',
  'roomBlocksDescription3',
  'takeoverDescription',
  'takeoverDescription2',
  'greenhausDescription',
  'yardDescription',
  'conferenceRoomDescription',
  'fireplaceDescription',
  'campDeckDescription',
];

/**
 * Convert plain text to Portable Text block format
 */
function textToPortableText(text) {
  if (!text || typeof text !== 'string') return null;

  // Split by double newlines to create paragraphs
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
  console.log('🔄 Starting Events Page migration to Rich Text...\n');

  // Check for API token
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN environment variable is required');
    console.error('   Run with: SANITY_API_TOKEN=your_token node scripts/migrate-events-to-richtext.js');
    process.exit(1);
  }

  // Fetch the eventsPage document
  const doc = await client.fetch(`*[_type == "eventsPage"][0]`);

  if (!doc) {
    console.error('❌ Error: No eventsPage document found in Sanity');
    process.exit(1);
  }

  console.log(`📄 Found eventsPage document: ${doc._id}\n`);

  // Build the patch with converted fields
  const updates = {};
  let convertedCount = 0;
  let skippedCount = 0;

  for (const field of FIELDS_TO_MIGRATE) {
    const value = doc[field];

    if (typeof value === 'string' && value.trim()) {
      // Convert string to Portable Text
      const portableText = textToPortableText(value);
      updates[field] = portableText;
      console.log(`   ✅ ${field}: Converting from string`);
      convertedCount++;
    } else if (Array.isArray(value)) {
      console.log(`   ⏭️  ${field}: Already Portable Text, skipping`);
      skippedCount++;
    } else if (!value) {
      console.log(`   ⚪ ${field}: Empty/null, skipping`);
      skippedCount++;
    }
  }

  console.log(`\n📊 Summary: ${convertedCount} fields to convert, ${skippedCount} skipped\n`);

  if (Object.keys(updates).length === 0) {
    console.log('✅ No migrations needed - all fields are already Portable Text or empty');
    return;
  }

  // Apply the patch
  console.log('💾 Applying updates to Sanity...');

  try {
    await client
      .patch(doc._id)
      .set(updates)
      .commit();

    console.log('\n✅ Migration complete!');
    console.log(`   Converted ${convertedCount} fields to Portable Text format`);
    console.log('\n📋 Next steps:');
    console.log('   1. Verify data in Sanity Vision: *[_type == "eventsPage"][0]');
    console.log('   2. Deploy schema: cd sanity-test-sandbox && npx sanity deploy');
    console.log('   3. Update frontend components to use RichTextRenderer');
    console.log('   4. Build and push: npm run build && git push origin main');
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate().catch(console.error);
