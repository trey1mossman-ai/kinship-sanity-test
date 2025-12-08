#!/usr/bin/env node
/**
 * SANITY AUDIT TOOL
 * ==================
 * Run this BEFORE any Sanity work to understand the current state.
 *
 * Usage: SANITY_TOKEN="your_token" node scripts/sanity-audit.js
 *
 * This script:
 * 1. Lists ALL document types in the dataset
 * 2. Shows document counts per type
 * 3. Shows field completeness for each type
 * 4. Identifies orphaned documents (types not in schema)
 */

const { createClient } = require('@sanity/client');

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('ERROR: SANITY_TOKEN environment variable is required');
  console.error('Usage: SANITY_TOKEN="your_token" node scripts/sanity-audit.js');
  process.exit(1);
}

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: token,
  useCdn: false,
});

// Known schema types (update this when schema changes)
const KNOWN_SCHEMA_TYPES = [
  // Objects
  'imageWithAlt', 'seo', 'socialLink', 'cta', 'richText', 'amenity',
  // Documents
  'room', 'eventSpace', 'pressMention',
  // Singletons
  'siteSettings', 'homepage', 'eventsPage', 'homaPage', 'aboutPage',
  'offersPage', 'explorePage', 'galleryPage', 'communityPage',
  'careersPage', 'policiesPage', 'privacyPage', 'accessibilityPage',
  // System types (ignore these)
  'sanity.imageAsset', 'sanity.fileAsset'
];

async function audit() {
  console.log('\n╔══════════════════════════════════════════════════════════════════╗');
  console.log('║                    SANITY DATASET AUDIT                          ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\n');

  // Get all document types and counts
  console.log('📊 DOCUMENT TYPE COUNTS:\n');

  const typeCounts = await client.fetch(`
    *[!(_type match "system.*")] {
      "_type": _type
    } | order(_type asc)
  `);

  // Count by type
  const counts = {};
  typeCounts.forEach(doc => {
    counts[doc._type] = (counts[doc._type] || 0) + 1;
  });

  // Separate known vs unknown types
  const knownTypes = {};
  const unknownTypes = {};

  Object.entries(counts).forEach(([type, count]) => {
    if (KNOWN_SCHEMA_TYPES.includes(type) || type.startsWith('sanity.')) {
      knownTypes[type] = count;
    } else {
      unknownTypes[type] = count;
    }
  });

  // Display known types
  console.log('   Known Schema Types:');
  Object.entries(knownTypes)
    .filter(([type]) => !type.startsWith('sanity.'))
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([type, count]) => {
      console.log(`   ✅ ${type}: ${count} document(s)`);
    });

  // Display unknown/orphaned types
  if (Object.keys(unknownTypes).length > 0) {
    console.log('\n   ⚠️  ORPHANED TYPES (not in schema):');
    Object.entries(unknownTypes)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([type, count]) => {
        console.log(`   ❌ ${type}: ${count} document(s) - SHOULD BE DELETED`);
      });
  } else {
    console.log('\n   ✅ No orphaned document types found');
  }

  // Detailed audit of key document types
  console.log('\n\n📋 DETAILED FIELD AUDIT:\n');

  // Audit rooms
  const rooms = await client.fetch(`*[_type == "room"] | order(displayOrder asc) {
    _id, name, slug, category, homepageGroup, displayOrder, isActive,
    "hasHeroImage": defined(heroImage),
    "hasGallery": defined(gallery) && count(gallery) > 0,
    "galleryCount": count(gallery),
    "hasDescription": defined(description),
    "hasShortDescription": defined(shortDescription)
  }`);

  if (rooms.length > 0) {
    console.log('   ROOMS:');
    rooms.forEach(room => {
      const status = room.isActive !== false ? '✅' : '⏸️';
      const group = room.homepageGroup || 'NO GROUP';
      console.log(`   ${status} ${room.name}`);
      console.log(`      slug: ${room.slug || 'MISSING'}`);
      console.log(`      homepageGroup: ${group}`);
      console.log(`      heroImage: ${room.hasHeroImage ? '✅' : '❌ MISSING'}`);
      console.log(`      gallery: ${room.hasGallery ? `✅ (${room.galleryCount} images)` : '❌ MISSING'}`);
      console.log(`      shortDescription: ${room.hasShortDescription ? '✅' : '❌ MISSING'}`);
      console.log('');
    });
  }

  // Audit homepage
  const homepage = await client.fetch(`*[_type == "homepage"][0] {
    _id,
    "fields": {
      "heroTitle": defined(heroTitle),
      "heroSubtitle": defined(heroSubtitle),
      "heroImage": defined(heroImage),
      "heroVideo": defined(heroVideo),
      "roomsSectionTitle": defined(roomsSectionTitle),
      "roomsSectionSubtitle": defined(roomsSectionSubtitle)
    }
  }`);

  if (homepage) {
    console.log('   HOMEPAGE:');
    Object.entries(homepage.fields).forEach(([field, hasValue]) => {
      console.log(`      ${field}: ${hasValue ? '✅' : '⚪ empty'}`);
    });
  }

  // Audit event spaces
  const eventSpaces = await client.fetch(`*[_type == "eventSpace"] | order(displayOrder asc) {
    _id, name, slug, capacity,
    "hasHeroImage": defined(heroImage),
    "hasDescription": defined(description)
  }`);

  if (eventSpaces.length > 0) {
    console.log('\n   EVENT SPACES:');
    eventSpaces.forEach(space => {
      console.log(`   ✅ ${space.name}`);
      console.log(`      capacity: ${space.capacity || 'not set'}`);
      console.log(`      heroImage: ${space.hasHeroImage ? '✅' : '❌ MISSING'}`);
      console.log('');
    });
  }

  console.log('\n═══════════════════════════════════════════════════════════════════\n');
}

audit().catch(console.error);
