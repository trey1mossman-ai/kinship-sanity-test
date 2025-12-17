#!/usr/bin/env node
/**
 * Seed script to upload Event Page images to Sanity and update the eventsPage document
 *
 * This script:
 * 1. Uploads all event-related images from public/images/events-page/
 * 2. Updates the eventsPage singleton with image references for:
 *    - Hero image
 *    - Event type galleries (Gatherings, Weddings, Meetings, Room Blocks, Takeover)
 *    - Venue galleries (GreenHaus, The Yard, Conference Room, Fireplace, Camp Deck)
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-events-images.js
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Check for API token
const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('\n❌ ERROR: SANITY_API_TOKEN environment variable is required');
  console.error('   Get a token from: https://www.sanity.io/manage/project/u2qzrboc/api#tokens\n');
  process.exit(1);
}

// Sanity client with write access
const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token,
});

// Image mappings from EventsPageClient.tsx fallback arrays
const imageMapping = {
  // Hero image
  heroImage: 'public/images/events-page/amyzach-29.webp',

  // Event Type Galleries
  gatheringsGallery: [
    'public/images/events-page/Gatherings/0B1A0328-optimized.webp',
    'public/images/events-page/Gatherings/Greenhaus-ErinWinterPhotography-8506.webp',
    'public/images/events-page/Gatherings/Greenhaus-RichardSeldomridge (2).webp',
    'public/images/events-page/Gatherings/Greenhaus-RichardSeldomridge (4)-optimized.webp',
    'public/images/events-page/Gatherings/kinship-119.webp',
    'public/images/events-page/Gatherings/kinship-114-sm.webp',
    'public/images/events-page/GreenHaus/Greenhaus-SamStarrMedia (1).webp',
    'public/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge.webp',
  ],

  weddingsGallery: [
    'public/images/events-page/Weddings/8F8A1146-optimized.webp',
    'public/images/events-page/Weddings/8F8A7820.webp',
    'public/images/events-page/Weddings/D85A8377-optimized.webp',
    'public/images/events-page/Weddings/event image-optimized.webp',
    'public/images/events-page/Weddings/MountainKingSuite-RichardSeldomridge.webp',
    'public/images/events-page/Weddings/kinship-38.webp',
    'public/images/events-page/Weddings/kinship-48.webp',
    'public/images/events-page/Weddings/kinship-57_nB2.webp',
  ],

  meetingsGallery: [
    'public/images/events-page/Meetings:Retreats/Kinship-4G3A9437-1 (1).webp',
    'public/images/events-page/Meetings:Retreats/FireplaceDrinks2, SamStarr (1).webp',
    'public/images/events-page/Meetings:Retreats/GetOutsideEvent6 26-SamStarrMedia (3) (1).webp',
    'public/images/events-page/Meetings:Retreats/Yard2, SamStarr (1).webp',
    'public/images/events-page/Meetings:Retreats/Greenhaus-GregCeo (1).webp',
    'public/images/events-page/Meetings:Retreats/CafeSeating-AshleeKay (2).webp',
    'public/images/events-page/Meetings:Retreats/Kinship Landing-23.webp',
    'public/images/events-page/Meetings:Retreats/DSC_4191 (1).webp',
    'public/images/events-page/Meetings:Retreats/MountainDoubleQueenSuite-AshleeKay (4) (1).webp',
    'public/images/events-page/Meetings:Retreats/samantha baldwin 13 (1).webp',
  ],

  roomBlocksGallery: [
    'public/images/events-page/Room Blocks/MountainDoubleQueenSuite-AshleeKay (19).webp',
    'public/images/events-page/Room Blocks/Jr Suite, Jennie Campbell (@fsupecas21).webp',
    'public/images/events-page/Room Blocks/DSCF8870.webp',
    'public/images/events-page/Room Blocks/DSCF8914.webp',
  ],

  takeoverGallery: [
    'public/images/events-page/Make Kinship Yours/HotelCheckIn, SamStarr.webp',
    'public/images/events-page/Make Kinship Yours/HomaNightlife-GregCeo.webp',
    'public/images/events-page/Make Kinship Yours/DSCF8615.webp',
  ],

  // Visual Break Image (between FAQ and Newsletter sections)
  visualBreakImage: 'public/images/events-page/Meetings:Retreats/Kinship-4G3A9437-1 (1).webp',

  // Venue Galleries
  greenhausGallery: [
    'public/images/events-page/GreenHaus/GetOutsideEvent6 26-SamStarrMedia (3).webp',
    'public/images/events-page/GreenHaus/Greenhaus-AshleeKay (13).webp',
    'public/images/events-page/GreenHaus/Greenhaus-ErinWinterPhotography-8502.webp',
    'public/images/events-page/GreenHaus/Greenhaus-GregCeo.webp',
    'public/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge (1).webp',
    'public/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge (2).webp',
    'public/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge (3).webp',
    'public/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge (4).webp',
    'public/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge.webp',
    'public/images/events-page/GreenHaus/Greenhaus-SamStarrMedia (1).webp',
    'public/images/events-page/GreenHaus/Greenhaus5-SamStarr.webp',
    'public/images/events-page/GreenHaus/aligarciaphotography-2.webp',
  ],

  yardGallery: [
    'public/images/events-page/The Yard/4DE0F411-7D69-45F5-90C2-98BF3C106C00_1_201_a.webp',
    'public/images/events-page/The Yard/D85A8921.webp',
    'public/images/events-page/The Yard/D85A8970.webp',
    'public/images/events-page/The Yard/DSC_6966.webp',
    'public/images/events-page/The Yard/IMG_1484.webp',
    'public/images/events-page/The Yard/IMG_1487 (1).webp',
    'public/images/events-page/The Yard/IMG_1490.webp',
    'public/images/events-page/The Yard/IMG_1494.webp',
    'public/images/events-page/The Yard/Yard, AshleeKayPhotography (2).webp',
    'public/images/events-page/The Yard/Yard, AshleeKayPhotography.webp',
    'public/images/events-page/The Yard/Yard2, SamStarr.webp',
    'public/images/events-page/The Yard/Yard3, SamStarr.webp',
    'public/images/events-page/The Yard/Yard7, SamStarr.webp',
    'public/images/events-page/The Yard/Yard8, SamStarr.webp',
  ],

  conferenceRoomGallery: [
    'public/images/events-page/The Conference room /conference-room-new.webp',
    'public/images/events-page/The Conference room /conference-room-mobile.webp',
  ],

  fireplaceGallery: [
    'public/images/events-page/The Fireplace/FireplaceDrinks2, SamStarr-optimized.webp',
    'public/images/events-page/The Fireplace/aligarciaphotography-36.webp',
    'public/images/events-page/The Fireplace/aligarciaphotography-37 (1).webp',
  ],

  // Camp Deck doesn't have a separate folder, using some from GreenHaus/outdoors
  campDeckGallery: [
    'public/images/events-page/GreenHaus/GetOutsideEvent6 26-SamStarrMedia (3).webp',
    'public/images/events-page/The Yard/Yard2, SamStarr.webp',
  ],
};

/**
 * Upload a single image to Sanity
 */
async function uploadImage(filePath, description = '') {
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

    console.log(`   ✅ ${filename}`);
    return {
      _type: 'image',
      _key: asset._id.replace('image-', '').substring(0, 12),
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: description || filename.replace(/\.(webp|jpg|png)$/i, '').replace(/[-_]/g, ' '),
    };
  } catch (error) {
    console.log(`   ❌ Failed: ${filename} - ${error.message}`);
    return null;
  }
}

/**
 * Upload a gallery of images
 */
async function uploadGallery(imagePaths, galleryName) {
  console.log(`\n📸 ${galleryName}`);
  console.log(`   Uploading ${imagePaths.length} images...`);

  const uploadedImages = [];

  for (const imagePath of imagePaths) {
    const imageRef = await uploadImage(imagePath, galleryName);
    if (imageRef) {
      uploadedImages.push(imageRef);
    }
  }

  console.log(`   ✅ Uploaded ${uploadedImages.length}/${imagePaths.length} images`);
  return uploadedImages;
}

/**
 * Main seed function
 */
async function seedEventsImages() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║       UPLOADING EVENTS PAGE IMAGES TO SANITY               ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const updateData = {};

  // Upload hero image
  console.log('\n🎬 HERO SECTION');
  const heroImage = await uploadImage(imageMapping.heroImage, 'Events hero image');
  if (heroImage) {
    updateData.heroImage = heroImage;
  }

  // Upload event type galleries
  console.log('\n\n📅 EVENT TYPE GALLERIES');
  console.log('─────────────────────────────────────────────────────────────');

  updateData.gatheringsGallery = await uploadGallery(imageMapping.gatheringsGallery, 'Gatherings');
  updateData.weddingsGallery = await uploadGallery(imageMapping.weddingsGallery, 'Weddings');
  updateData.meetingsGallery = await uploadGallery(imageMapping.meetingsGallery, 'Meetings & Retreats');
  updateData.roomBlocksGallery = await uploadGallery(imageMapping.roomBlocksGallery, 'Room Blocks');
  updateData.takeoverGallery = await uploadGallery(imageMapping.takeoverGallery, 'Hotel Takeover');

  // Upload visual break image
  console.log('\n📸 Visual Break Image');
  const visualBreakImage = await uploadImage(imageMapping.visualBreakImage, 'Visual break between sections');
  if (visualBreakImage) {
    updateData.visualBreakImage = visualBreakImage;
  }

  // Upload venue galleries
  console.log('\n\n🏛️  VENUE GALLERIES');
  console.log('─────────────────────────────────────────────────────────────');

  updateData.greenhausGallery = await uploadGallery(imageMapping.greenhausGallery, 'GreenHaus Venue');
  updateData.yardGallery = await uploadGallery(imageMapping.yardGallery, 'The Yard Venue');
  updateData.conferenceRoomGallery = await uploadGallery(imageMapping.conferenceRoomGallery, 'Conference Room');
  updateData.fireplaceGallery = await uploadGallery(imageMapping.fireplaceGallery, 'Fireplace Lounge');
  updateData.campDeckGallery = await uploadGallery(imageMapping.campDeckGallery, 'Camp Deck');

  // Update the eventsPage document
  console.log('\n\n💾 UPDATING SANITY DOCUMENT');
  console.log('─────────────────────────────────────────────────────────────');

  try {
    const result = await client
      .patch('eventsPage')
      .set(updateData)
      .commit();

    console.log('✅ Successfully updated eventsPage with all images!\n');

    // Summary
    console.log('\n📊 UPLOAD SUMMARY');
    console.log('─────────────────────────────────────────────────────────────');
    console.log(`   Hero Image: ${updateData.heroImage ? '✅' : '❌'}`);
    console.log(`   Visual Break Image: ${updateData.visualBreakImage ? '✅' : '❌'}`);
    console.log(`   Gatherings: ${updateData.gatheringsGallery?.length || 0} images`);
    console.log(`   Weddings: ${updateData.weddingsGallery?.length || 0} images`);
    console.log(`   Meetings: ${updateData.meetingsGallery?.length || 0} images`);
    console.log(`   Room Blocks: ${updateData.roomBlocksGallery?.length || 0} images`);
    console.log(`   Takeover: ${updateData.takeoverGallery?.length || 0} images`);
    console.log(`   GreenHaus: ${updateData.greenhausGallery?.length || 0} images`);
    console.log(`   The Yard: ${updateData.yardGallery?.length || 0} images`);
    console.log(`   Conference Room: ${updateData.conferenceRoomGallery?.length || 0} images`);
    console.log(`   Fireplace: ${updateData.fireplaceGallery?.length || 0} images`);
    console.log(`   Camp Deck: ${updateData.campDeckGallery?.length || 0} images`);
    console.log('\n🔗 View in Sanity Studio:');
    console.log('   https://kinship-landing.sanity.studio/structure/eventsPage\n');

  } catch (error) {
    console.error('\n❌ Error updating eventsPage document:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\n💡 Make sure your SANITY_API_TOKEN has "Editor" permissions.');
      console.error('   Get a token from: https://www.sanity.io/manage/project/u2qzrboc/api#tokens');
    }
    process.exit(1);
  }
}

// Run the seed function
seedEventsImages().catch((error) => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
