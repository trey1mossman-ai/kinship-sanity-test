// Fix Sanity Content Script
// This script corrects fake/placeholder content to match the actual website
// Run with: SANITY_TOKEN="your_token" node scripts/fix-sanity-content.js

const { createClient } = require('@sanity/client');

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('ERROR: SANITY_TOKEN environment variable is required');
  console.error('Usage: SANITY_TOKEN="sk..." node scripts/fix-sanity-content.js');
  process.exit(1);
}

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: token,
  useCdn: false, // Must be false for mutations
});

async function fixContent() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║       FIXING SANITY CONTENT TO MATCH WEBSITE               ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // ============================================
  // 1. DELETE FAKE PRESS MENTIONS
  // ============================================
  console.log('📰 STEP 1: Fixing Press Mentions...');

  // Get existing fake press mentions
  const fakePress = await client.fetch(`*[_type == "pressMention"] { _id, publication }`);
  console.log(`   Found ${fakePress.length} existing press mentions to delete`);

  // Delete fake ones (5280, Gazette, CS Independent are not real press)
  for (const press of fakePress) {
    try {
      await client.delete(press._id);
      console.log(`   ✅ Deleted fake: ${press.publication}`);
    } catch (e) {
      console.log(`   ⚠️  Could not delete ${press.publication}: ${e.message}`);
    }
  }

  // Create real press mentions (from PressRow.tsx)
  const realPress = [
    { publication: 'Forbes', logoPath: '/press/forbes-grey.webp', displayOrder: 1 },
    { publication: 'TODAY', logoPath: '/press/today-show.webp', displayOrder: 2 },
    { publication: 'Denver Post', logoPath: '/press/denverpostlogo-grey.webp', displayOrder: 3 },
    { publication: 'USA Today', logoPath: '/press/usa-today-kl-homepage-1.webp', displayOrder: 4 },
    { publication: 'Condé Nast Traveler', logoPath: '/press/Traveler.webp', displayOrder: 5 },
  ];

  for (const press of realPress) {
    try {
      await client.create({
        _type: 'pressMention',
        publication: press.publication,
        logoPath: press.logoPath, // Store the path for reference
        displayOrder: press.displayOrder,
        isActive: true,
      });
      console.log(`   ✅ Created: ${press.publication}`);
    } catch (e) {
      console.log(`   ⚠️  Could not create ${press.publication}: ${e.message}`);
    }
  }

  // ============================================
  // 2. DELETE FAKE JOB POSTINGS
  // ============================================
  console.log('\n💼 STEP 2: Removing Fake Job Postings...');
  console.log('   (Website has no job postings - careers page is static)');

  const fakeJobs = await client.fetch(`*[_type == "jobPosting"] { _id, title }`);
  console.log(`   Found ${fakeJobs.length} fake job postings to delete`);

  for (const job of fakeJobs) {
    try {
      await client.delete(job._id);
      console.log(`   ✅ Deleted fake job: ${job.title}`);
    } catch (e) {
      console.log(`   ⚠️  Could not delete ${job.title}: ${e.message}`);
    }
  }

  // ============================================
  // 3. DELETE FAKE OFFERS
  // ============================================
  console.log('\n🎁 STEP 3: Removing Fake Offers...');
  console.log('   (Website offers are images, not structured data)');

  const fakeOffers = await client.fetch(`*[_type == "offer"] { _id, title }`);
  console.log(`   Found ${fakeOffers.length} fake offers to delete`);

  for (const offer of fakeOffers) {
    try {
      await client.delete(offer._id);
      console.log(`   ✅ Deleted fake offer: ${offer.title}`);
    } catch (e) {
      console.log(`   ⚠️  Could not delete ${offer.title}: ${e.message}`);
    }
  }

  // ============================================
  // 4. NOTE ABOUT MENU ITEMS
  // ============================================
  console.log('\n🍽️  STEP 4: Menu Items Status...');
  const menuItems = await client.fetch(`*[_type == "menuItem"] { _id, name }`);
  console.log(`   Found ${menuItems.length} menu items in Sanity`);
  console.log('   Note: Full menu has 120+ items in homa-menu-data.ts');
  console.log('   Decision: Keep Sanity menu minimal since site uses local data file');

  // ============================================
  // 5. VERIFY LOCAL ATTRACTIONS
  // ============================================
  console.log('\n🏔️  STEP 5: Local Attractions Status...');
  const attractions = await client.fetch(`*[_type == "localAttraction"] { _id, name, category }`);
  console.log(`   Found ${attractions.length} attractions in Sanity`);
  console.log('   Keeping these as they are reasonable placeholders');

  // ============================================
  // SUMMARY
  // ============================================
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                        SUMMARY                              ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\n✅ Press Mentions: Fixed to match website (Forbes, TODAY, Denver Post, USA Today, Condé Nast Traveler)');
  console.log('✅ Job Postings: Removed fake listings (careers page is static)');
  console.log('✅ Offers: Removed fake offers (website uses images)');
  console.log('📝 Menu Items: Kept minimal (site uses local data file)');
  console.log('📝 Local Attractions: Kept as reasonable placeholders');
  console.log('\n');
}

fixContent().catch(console.error);
