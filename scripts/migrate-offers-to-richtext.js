#!/usr/bin/env node
/**
 * MIGRATE OFFERS PAGE TO RICH TEXT
 *
 * This script converts existing plain text fields to Portable Text format
 * to fix the "Invalid property value" errors after schema change.
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Convert plain text string to Portable Text block format
function textToPortableText(text) {
  if (!text || typeof text !== 'string') return [];

  // Split by double newlines to create paragraphs
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());

  return paragraphs.map((paragraph, index) => ({
    _type: 'block',
    _key: `block-${Date.now()}-${index}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `span-${Date.now()}-${index}`,
        text: paragraph.trim(),
        marks: [],
      },
    ],
  }));
}

async function migrateOffersPage() {
  console.log('🔄 Starting Offers Page migration to Rich Text...\n');

  try {
    // Fetch current offers page data
    const offersPage = await client.fetch(`*[_type == "offersPage"][0] {
      _id,
      introText,
      offers
    }`);

    if (!offersPage) {
      console.log('❌ No offersPage document found');
      return;
    }

    console.log('📄 Found offersPage document:', offersPage._id);

    const updates = {};

    // Migrate introText if it's a string
    if (offersPage.introText && typeof offersPage.introText === 'string') {
      console.log('\n📝 Converting introText from string to Portable Text...');
      console.log('   Original:', offersPage.introText.substring(0, 50) + '...');
      updates.introText = textToPortableText(offersPage.introText);
      console.log('   Converted to', updates.introText.length, 'block(s)');
    } else if (Array.isArray(offersPage.introText)) {
      console.log('\n✅ introText is already Portable Text format');
    } else {
      console.log('\n⚠️  introText is empty or undefined, setting default...');
      updates.introText = textToPortableText('Take advantage of our limited-time offers and experience outrageous hospitality at special rates. Click any offer to view full details.');
    }

    // Migrate offers array descriptions
    if (offersPage.offers && Array.isArray(offersPage.offers)) {
      console.log('\n📦 Processing', offersPage.offers.length, 'offers...');

      const migratedOffers = offersPage.offers.map((offer, index) => {
        const migratedOffer = { ...offer };

        if (offer.description && typeof offer.description === 'string') {
          console.log(`   Offer ${index + 1} (${offer.title || 'Untitled'}): Converting description...`);
          migratedOffer.description = textToPortableText(offer.description);
        } else if (Array.isArray(offer.description)) {
          console.log(`   Offer ${index + 1} (${offer.title || 'Untitled'}): Already Portable Text ✅`);
        } else {
          console.log(`   Offer ${index + 1} (${offer.title || 'Untitled'}): No description, skipping`);
        }

        // Ensure _key exists
        if (!migratedOffer._key) {
          migratedOffer._key = `offer-${Date.now()}-${index}`;
        }

        return migratedOffer;
      });

      updates.offers = migratedOffers;
    }

    // Apply updates
    if (Object.keys(updates).length > 0) {
      console.log('\n💾 Applying updates to Sanity...');

      await client
        .patch(offersPage._id)
        .set(updates)
        .commit();

      console.log('\n✅ Migration complete!');
      console.log('   - introText: migrated to Portable Text');
      console.log('   - offers: all descriptions migrated');
    } else {
      console.log('\n✅ No migration needed - data is already in correct format');
    }

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    throw error;
  }
}

// Run the migration
migrateOffersPage();
