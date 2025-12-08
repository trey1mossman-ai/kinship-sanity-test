// Set homepageGroup field for all rooms in Sanity
// Maps rooms to their homepage display groups (King Rooms, Queen Rooms, Family, Camp Deck)
// Run with: SANITY_TOKEN="your_token" node scripts/fix-room-homepage-groups.js

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

// Mapping of room names to homepage groups (based on current website)
const roomGroupMapping = {
  'King Suite': 'king',
  'Executive King Suite': 'king',
  'Mountain King Suite': 'king',
  'Jr Queen': 'queen',
  'Mountain Jr Queen': 'queen',
  'Mountain Queen Balcony Suite': 'queen',
  'Double Queen Balcony Suite': 'queen',
  'Mountain Double Queen Suite': 'queen',
  'Family Suite': 'family',
  'Camp Deck': 'campDeck',
};

async function fixRoomHomepageGroups() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║        SETTING HOMEPAGE GROUPS FOR ALL ROOMS               ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Step 1: Get all rooms
  console.log('STEP 1: Fetching all rooms...');
  const rooms = await client.fetch(`*[_type == "room"] { _id, name, homepageGroup }`);
  console.log(`   Found ${rooms.length} rooms\n`);

  // Step 2: Update each room with its homepage group
  console.log('STEP 2: Updating rooms with homepage groups...');

  for (const room of rooms) {
    const homepageGroup = roomGroupMapping[room.name];

    if (!homepageGroup) {
      console.log(`   ⚠️  ${room.name}: No mapping found, skipping`);
      continue;
    }

    if (room.homepageGroup === homepageGroup) {
      console.log(`   ✓ ${room.name}: Already set to "${homepageGroup}"`);
      continue;
    }

    try {
      await client
        .patch(room._id)
        .set({ homepageGroup: homepageGroup })
        .commit();
      console.log(`   ✅ ${room.name}: Set to "${homepageGroup}"`);
    } catch (error) {
      console.log(`   ❌ ${room.name}: Error - ${error.message}`);
    }
  }

  // Step 3: Verify
  console.log('\nSTEP 3: Verifying...');
  const updatedRooms = await client.fetch(`*[_type == "room"] | order(name asc) { name, homepageGroup }`);

  console.log('\nRoom homepage groups:');
  const groups = { king: [], queen: [], family: [], campDeck: [], unset: [] };

  updatedRooms.forEach(room => {
    if (room.homepageGroup) {
      groups[room.homepageGroup].push(room.name);
    } else {
      groups.unset.push(room.name);
    }
  });

  console.log('\n   King Rooms:', groups.king.join(', ') || '(none)');
  console.log('   Queen Rooms:', groups.queen.join(', ') || '(none)');
  console.log('   Family:', groups.family.join(', ') || '(none)');
  console.log('   Camp Deck:', groups.campDeck.join(', ') || '(none)');
  if (groups.unset.length > 0) {
    console.log('   ⚠️  Unset:', groups.unset.join(', '));
  }

  console.log('\n✅ Homepage groups set! Rooms will now display from Sanity on the homepage.\n');
}

fixRoomHomepageGroups().catch(console.error);
