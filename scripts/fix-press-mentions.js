// Fix Press Mentions in Sanity
// Creates all 10 real press mentions from the homepage with logos
// Run with: SANITY_TOKEN="your_token" node scripts/fix-press-mentions.js

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

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

// Real press mentions from homepage (PressAndReviews.tsx lines 18-29)
const pressMentions = [
  { name: 'Forbes', logoPath: 'public/press/Forbes.jpg', displayOrder: 1 },
  { name: 'TODAY', logoPath: 'public/press/today-show.webp', displayOrder: 2 },
  { name: 'Denver Post', logoPath: 'public/press/denverpostlogo-grey.webp', displayOrder: 3 },
  { name: 'USA Today', logoPath: 'public/press/USA Today.jpg', displayOrder: 4 },
  { name: 'Condé Nast Traveler', logoPath: 'public/press/conde nast traveler.jpg', displayOrder: 5 },
  { name: 'AFAR', logoPath: 'public/press/Afar.jpg', displayOrder: 6 },
  { name: 'Globe Traveler', logoPath: 'public/press/Globe Traveler.jpg', displayOrder: 7 },
  { name: 'The Telegraph', logoPath: 'public/press/The Telegraph.jpg', displayOrder: 8 },
  { name: 'Out There Colorado', logoPath: 'public/press/out there colorado.jpg', displayOrder: 9 },
  { name: 'BizBash', logoPath: 'public/press/bizbash.jpg', displayOrder: 10 },
];

async function uploadImage(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`   ⚠️  File not found: ${filePath}`);
    return null;
  }

  try {
    const imageBuffer = fs.readFileSync(fullPath);
    const filename = path.basename(filePath);

    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });

    return asset._id;
  } catch (error) {
    console.log(`   ❌ Failed to upload: ${error.message}`);
    return null;
  }
}

async function fixPressMentions() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║           FIXING PRESS MENTIONS IN SANITY                  ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Step 1: Delete all existing press mentions
  console.log('STEP 1: Deleting existing press mentions...');
  const existingPress = await client.fetch(`*[_type == "pressMention"] { _id, publication }`);
  console.log(`   Found ${existingPress.length} existing press mentions`);

  for (const press of existingPress) {
    await client.delete(press._id);
    console.log(`   ✅ Deleted: ${press.publication}`);
  }

  // Step 2: Create all 10 real press mentions with logos
  console.log('\nSTEP 2: Creating 10 real press mentions from homepage...\n');

  let successCount = 0;

  for (const press of pressMentions) {
    console.log(`📰 ${press.name}`);

    // Upload logo
    const assetId = await uploadImage(press.logoPath);

    if (assetId) {
      try {
        await client.create({
          _type: 'pressMention',
          publication: press.name,
          displayOrder: press.displayOrder,
          isActive: true,
          logo: {
            _type: 'image',
            asset: { _type: 'reference', _ref: assetId }
          }
        });
        console.log(`   ✅ Created with logo`);
        successCount++;
      } catch (error) {
        console.log(`   ❌ Failed to create: ${error.message}`);
      }
    } else {
      // Create without logo if image not found
      try {
        await client.create({
          _type: 'pressMention',
          publication: press.name,
          displayOrder: press.displayOrder,
          isActive: true,
        });
        console.log(`   ⚠️  Created without logo (image not found)`);
        successCount++;
      } catch (error) {
        console.log(`   ❌ Failed to create: ${error.message}`);
      }
    }
  }

  // Step 3: Verify
  console.log('\nSTEP 3: Verifying...');
  const finalPress = await client.fetch(`*[_type == "pressMention"] | order(displayOrder asc) { publication, "hasLogo": defined(logo) }`);
  console.log(`   Total press mentions in Sanity: ${finalPress.length}`);
  finalPress.forEach((p, i) => {
    console.log(`   ${i + 1}. ${p.publication} - Logo: ${p.hasLogo ? '✅' : '❌'}`);
  });

  console.log('\n');
}

fixPressMentions().catch(console.error);
