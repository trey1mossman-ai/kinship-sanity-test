// Sanity Page Audit Script
// This script tests all Sanity queries and reports on data completeness

const { createClient } = require('@sanity/client');

// Use the actual project ID from the app's Sanity client
const projectId = 'u2qzrboc';

const client = createClient({
  projectId: projectId,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for public read access
});

async function auditPage(name, query, requiredFields = []) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📄 Auditing: ${name}`);
  console.log('='.repeat(60));

  try {
    const data = await client.fetch(query);

    if (!data) {
      console.log(`❌ NO DATA FOUND - Document doesn't exist in Sanity`);
      return { name, status: 'missing', data: null, issues: ['No document found'] };
    }

    console.log(`✅ Data found`);

    const issues = [];
    const presentFields = [];
    const missingFields = [];

    // Check required fields
    for (const field of requiredFields) {
      if (data[field] !== undefined && data[field] !== null && data[field] !== '') {
        presentFields.push(field);
      } else {
        missingFields.push(field);
        issues.push(`Missing field: ${field}`);
      }
    }

    console.log(`\n📊 Field Status:`);
    if (presentFields.length > 0) {
      console.log(`   ✅ Present: ${presentFields.join(', ')}`);
    }
    if (missingFields.length > 0) {
      console.log(`   ⚠️  Missing: ${missingFields.join(', ')}`);
    }

    // Show actual data values
    console.log(`\n📝 Data Preview:`);
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        const preview = value.length > 60 ? value.substring(0, 60) + '...' : value;
        console.log(`   ${key}: "${preview}"`);
      } else if (Array.isArray(value)) {
        console.log(`   ${key}: [${value.length} items]`);
      } else if (typeof value === 'object' && value !== null) {
        console.log(`   ${key}: {object}`);
      } else {
        console.log(`   ${key}: ${value}`);
      }
    }

    return {
      name,
      status: issues.length > 0 ? 'incomplete' : 'complete',
      data,
      issues,
      presentFields,
      missingFields
    };

  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    return { name, status: 'error', data: null, issues: [error.message] };
  }
}

async function auditCollection(name, query, countQuery) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📚 Auditing Collection: ${name}`);
  console.log('='.repeat(60));

  try {
    const data = await client.fetch(query);
    const count = data ? data.length : 0;

    console.log(`✅ Found ${count} items`);

    if (count > 0) {
      console.log(`\n📝 Items:`);
      data.forEach((item, i) => {
        const label = item.name || item.title || item.slug || `Item ${i + 1}`;
        console.log(`   ${i + 1}. ${label}`);
      });
    }

    return { name, status: count > 0 ? 'complete' : 'empty', count, data };

  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    return { name, status: 'error', count: 0, data: null, issues: [error.message] };
  }
}

async function runAudit() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║          SANITY CMS PAGE AUDIT - KINSHIP LANDING           ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\n🕐 Audit started at: ${new Date().toISOString()}`);
  console.log(`📡 Project ID: ${projectId}`);

  const results = [];

  // 1. Homepage
  results.push(await auditPage(
    'Homepage',
    `*[_type == "homepage"][0] {
      heroHeadline,
      heroSubheadline,
      heroCta,
      whyKinshipTitle,
      whyKinshipBody,
      roomsSectionTitle,
      roomsSectionSubtitle,
      cafeSectionTitle,
      cafeSectionDescription,
      cafeFeatures,
      eventsSectionTitle,
      eventsSectionDescription,
      pressSectionTitle,
      reviewsSectionTitle,
      googleRating,
      googleReviewCount,
      mapSectionTitle,
      nearbyAttractions
    }`,
    ['heroHeadline', 'whyKinshipTitle', 'whyKinshipBody', 'mapSectionTitle']
  ));

  // 2. About Page
  results.push(await auditPage(
    'About Page',
    `*[_type == "aboutPage"][0] {
      heroTitle,
      heroSubtitle,
      storyTitle,
      storyBody,
      valuesTitle,
      values,
      milestones
    }`,
    ['heroTitle', 'storyTitle', 'storyBody']
  ));

  // 3. Homa Page
  results.push(await auditPage(
    'Homa Page',
    `*[_type == "homaPage"][0] {
      heroTitle,
      heroSubtitle,
      description,
      hours,
      features,
      reservationUrl,
      menuPdfUrl
    }`,
    ['heroTitle']
  ));

  // 4. Explore Page
  results.push(await auditPage(
    'Explore Page',
    `*[_type == "explorePage"][0] {
      heroTitle,
      heroSubtitle,
      introText
    }`,
    ['heroTitle']
  ));

  // 5. Gallery Page
  results.push(await auditPage(
    'Gallery Page',
    `*[_type == "galleryPage"][0] {
      title,
      subtitle,
      description
    }`,
    ['title']
  ));

  // 6. Events Page
  results.push(await auditPage(
    'Events Page',
    `*[_type == "eventsPage"][0] {
      heroTitle,
      heroSubtitle,
      takeoverTitle,
      takeoverSubtitle,
      takeoverDescription,
      takeoverFeatures,
      inquiryEmail,
      inquiryPhone
    }`,
    ['heroTitle']
  ));

  // 7. Community Page
  results.push(await auditPage(
    'Community Page',
    `*[_type == "communityPage"][0] {
      heroTitle,
      heroSubtitle,
      description
    }`,
    ['heroTitle']
  ));

  // 8. Careers Page
  results.push(await auditPage(
    'Careers Page',
    `*[_type == "careersPage"][0] {
      heroTitle,
      heroSubtitle,
      introText,
      benefits,
      applicationEmail
    }`,
    ['heroTitle']
  ));

  // 9. Site Settings
  results.push(await auditPage(
    'Site Settings',
    `*[_type == "siteSettings"][0] {
      siteName,
      tagline,
      phone,
      email,
      address,
      googleMapsUrl,
      bookingUrl,
      socialLinks,
      footerText
    }`,
    ['siteName', 'phone', 'email']
  ));

  // Collections
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                    CONTENT COLLECTIONS                      ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  // Rooms
  results.push(await auditCollection(
    'Rooms',
    `*[_type == "room" && isActive == true] | order(displayOrder asc) { name, "slug": slug.current, category }`
  ));

  // Event Spaces
  results.push(await auditCollection(
    'Event Spaces',
    `*[_type == "eventSpace" && isActive == true] | order(displayOrder asc) { name, "slug": slug.current }`
  ));

  // Gallery Images
  results.push(await auditCollection(
    'Gallery Images',
    `*[_type == "galleryImage" && isActive == true] | order(displayOrder asc) { title, category }`
  ));

  // Local Attractions
  results.push(await auditCollection(
    'Local Attractions',
    `*[_type == "localAttraction" && isActive == true] | order(displayOrder asc) { name, category }`
  ));

  // Job Postings
  results.push(await auditCollection(
    'Job Postings',
    `*[_type == "jobPosting" && isActive == true] { title, department }`
  ));

  // Offers
  results.push(await auditCollection(
    'Offers',
    `*[_type == "offer" && isActive == true] { title, "slug": slug.current }`
  ));

  // Press Mentions
  results.push(await auditCollection(
    'Press Mentions',
    `*[_type == "pressMention" && isActive == true] { publication }`
  ));

  // Summary
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                      AUDIT SUMMARY                          ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  const complete = results.filter(r => r.status === 'complete');
  const incomplete = results.filter(r => r.status === 'incomplete');
  const missing = results.filter(r => r.status === 'missing');
  const empty = results.filter(r => r.status === 'empty');
  const errors = results.filter(r => r.status === 'error');

  console.log(`\n📊 Results:`);
  console.log(`   ✅ Complete: ${complete.length}`);
  console.log(`   ⚠️  Incomplete: ${incomplete.length}`);
  console.log(`   ❌ Missing: ${missing.length}`);
  console.log(`   📭 Empty Collections: ${empty.length}`);
  console.log(`   🔥 Errors: ${errors.length}`);

  if (incomplete.length > 0) {
    console.log(`\n⚠️  Incomplete Pages (have data but missing some fields):`);
    incomplete.forEach(r => {
      console.log(`   - ${r.name}: Missing ${r.missingFields?.join(', ')}`);
    });
  }

  if (missing.length > 0) {
    console.log(`\n❌ Missing Documents (no data in Sanity):`);
    missing.forEach(r => {
      console.log(`   - ${r.name}`);
    });
  }

  if (empty.length > 0) {
    console.log(`\n📭 Empty Collections:`);
    empty.forEach(r => {
      console.log(`   - ${r.name}`);
    });
  }

  if (errors.length > 0) {
    console.log(`\n🔥 Errors:`);
    errors.forEach(r => {
      console.log(`   - ${r.name}: ${r.issues?.join(', ')}`);
    });
  }

  console.log(`\n🕐 Audit completed at: ${new Date().toISOString()}`);
  console.log('\n');

  return results;
}

runAudit().catch(console.error);
