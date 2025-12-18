#!/usr/bin/env node
/**
 * ROOMS PAGE - RICH TEXT MIGRATION SCRIPT
 *
 * This script converts plain text fields to Portable Text format
 * RUN THIS BEFORE deploying schema changes to avoid Sanity Studio errors
 *
 * Fields migrated:
 * - roomBlocksDescription1, roomBlocksDescription2, roomBlocksDescription3
 * - rooms[].description (per room)
 * - faqItems[].answerShort, faqItems[].answerLong
 *
 * Usage:
 *   cd sanity-hostinger-test
 *   SANITY_API_TOKEN=$SANITY_API_TOKEN node scripts/migrate-rooms-to-richtext.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// =====================================================
// FIELDS TO MIGRATE
// =====================================================
const TOP_LEVEL_FIELDS = [
  'roomBlocksDescription1',
  'roomBlocksDescription2',
  'roomBlocksDescription3',
];

// Fields inside the rooms array
const ROOM_FIELDS = ['description'];

// Fields inside the faqItems array
const FAQ_FIELDS = ['answerShort', 'answerLong'];

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
  console.log('🔄 Starting Rooms Page migration to Rich Text...\n');

  // Check for API token
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN environment variable is required');
    console.error('   Run with: SANITY_API_TOKEN=your_token node scripts/migrate-rooms-to-richtext.js');
    process.exit(1);
  }

  // Fetch the document
  const doc = await client.fetch(`*[_type == "roomsPage"][0]`);

  if (!doc) {
    console.error('❌ Error: No roomsPage document found in Sanity');
    process.exit(1);
  }

  console.log(`📄 Found roomsPage document: ${doc._id}\n`);

  // Build the patch with converted fields
  const updates = {};
  let convertedCount = 0;
  let skippedCount = 0;

  // =====================================================
  // MIGRATE TOP-LEVEL FIELDS
  // =====================================================
  console.log('📝 Processing top-level fields...');

  for (const field of TOP_LEVEL_FIELDS) {
    const value = doc[field];

    if (typeof value === 'string' && value.trim()) {
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

  // =====================================================
  // MIGRATE ROOMS ARRAY
  // =====================================================
  console.log('\n📝 Processing rooms array...');

  if (doc.rooms && Array.isArray(doc.rooms) && doc.rooms.length > 0) {
    const updatedRooms = doc.rooms.map((room, roomIdx) => {
      const updatedRoom = { ...room };

      for (const field of ROOM_FIELDS) {
        const value = room[field];

        if (typeof value === 'string' && value.trim()) {
          updatedRoom[field] = textToPortableText(value);
          console.log(`   ✅ rooms[${roomIdx}].${field} (${room.name || 'unnamed'}): Converting`);
          convertedCount++;
        } else if (Array.isArray(value)) {
          console.log(`   ⏭️  rooms[${roomIdx}].${field}: Already Portable Text`);
          skippedCount++;
        }
      }

      return updatedRoom;
    });

    updates.rooms = updatedRooms;
  } else {
    console.log('   ⚪ No rooms found in document');
  }

  // =====================================================
  // MIGRATE FAQ ITEMS ARRAY
  // =====================================================
  console.log('\n📝 Processing faqItems array...');

  if (doc.faqItems && Array.isArray(doc.faqItems) && doc.faqItems.length > 0) {
    const updatedFaqs = doc.faqItems.map((faq, faqIdx) => {
      const updatedFaq = { ...faq };

      for (const field of FAQ_FIELDS) {
        const value = faq[field];

        if (typeof value === 'string' && value.trim()) {
          updatedFaq[field] = textToPortableText(value);
          console.log(`   ✅ faqItems[${faqIdx}].${field}: Converting`);
          convertedCount++;
        } else if (Array.isArray(value)) {
          console.log(`   ⏭️  faqItems[${faqIdx}].${field}: Already Portable Text`);
          skippedCount++;
        }
      }

      return updatedFaq;
    });

    updates.faqItems = updatedFaqs;
  } else {
    console.log('   ⚪ No faqItems found in document');
  }

  // =====================================================
  // APPLY UPDATES
  // =====================================================
  console.log(`\n📊 Summary: ${convertedCount} fields to convert, ${skippedCount} skipped\n`);

  if (convertedCount === 0) {
    console.log('✅ No migrations needed - all fields are already Portable Text or empty');
    return;
  }

  console.log('💾 Applying updates to Sanity...');

  try {
    await client
      .patch(doc._id)
      .set(updates)
      .commit();

    console.log('\n✅ Migration complete!');
    console.log(`   Converted ${convertedCount} fields to Portable Text format`);
    console.log('\n📋 Next steps:');
    console.log('   1. Verify data in Sanity Vision: *[_type == "roomsPage"][0]');
    console.log('   2. Deploy schema: cd sanity-test-sandbox && npx sanity deploy');
    console.log('   3. Update frontend components to use RichTextRenderer');
    console.log('   4. Build and push: npm run build && git push origin main');
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate().catch(console.error);
