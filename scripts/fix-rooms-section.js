// Fix Rooms Section in Sanity Homepage
// Updates roomsSectionTitle to match the actual website
// Run with: SANITY_TOKEN="your_token" node scripts/fix-rooms-section.js

const { createClient } = require('@sanity/client');

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('ERROR: SANITY_TOKEN environment variable is required');
  process.exit(1);
}

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: token,
  useCdn: false,
});

// Website ground truth (from RoomsGridEnhanced.tsx line 537)
const roomsSectionContent = {
  roomsSectionTitle: 'Find Your Perfect Room',
  roomsSectionSubtitle: '', // No subtitle on the website
};

async function fixRoomsSection() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║       FIXING ROOMS SECTION IN SANITY HOMEPAGE              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Step 1: Get current homepage
  console.log('STEP 1: Fetching current homepage...');
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);

  if (!homepage) {
    console.log('   ❌ No homepage document found!');
    return;
  }

  console.log('   Current roomsSectionTitle:', homepage.roomsSectionTitle || '(empty)');
  console.log('   Current roomsSectionSubtitle:', homepage.roomsSectionSubtitle || '(empty)');
  console.log('');
  console.log('   Website ground truth:');
  console.log('   roomsSectionTitle:', roomsSectionContent.roomsSectionTitle);
  console.log('   roomsSectionSubtitle:', roomsSectionContent.roomsSectionSubtitle || '(none)');

  // Step 2: Update
  console.log('\nSTEP 2: Updating homepage...');

  try {
    await client
      .patch(homepage._id)
      .set({
        roomsSectionTitle: roomsSectionContent.roomsSectionTitle,
        roomsSectionSubtitle: roomsSectionContent.roomsSectionSubtitle,
      })
      .commit();
    console.log('   ✅ Updated rooms section fields');
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return;
  }

  // Step 3: Verify
  console.log('\nSTEP 3: Verifying...');
  const updated = await client.fetch(`*[_type == "homepage"][0] { roomsSectionTitle, roomsSectionSubtitle }`);

  console.log(`   roomsSectionTitle: ${updated.roomsSectionTitle === roomsSectionContent.roomsSectionTitle ? '✅' : '❌'} "${updated.roomsSectionTitle}"`);
  console.log(`   roomsSectionSubtitle: ${!updated.roomsSectionSubtitle ? '✅' : '⚠️'} "${updated.roomsSectionSubtitle || '(empty)'}"`);

  console.log('\n✅ Rooms section now matches website!');
  console.log('\nNote: The website displays ALL rooms grouped by type (King, Queen, Family, Camp Deck)');
  console.log('      not "Featured Rooms". Room data comes from the Rooms collection.\n');
}

fixRoomsSection().catch(console.error);
