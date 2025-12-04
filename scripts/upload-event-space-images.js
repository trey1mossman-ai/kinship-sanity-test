// Upload Event Space Images to Sanity
// Run with: SANITY_TOKEN="your_token" node scripts/upload-event-space-images.js

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

// Event space data extracted from actual component files
const eventSpaces = {
  'greenhaus': {
    name: 'The GreenHaus',
    images: [
      'public/images/events-page/GreenHaus/Greenhaus-SamStarrMedia (1).webp',
      'public/images/events-page/GreenHaus/Greenhaus5-SamStarr.webp',
      'public/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge (4).webp',
      'public/images/events-page/GreenHaus/Greenhaus-GregCeo.webp',
      'public/images/events-page/GreenHaus/aligarciaphotography-2.webp',
    ]
  },
  'the-yard': {
    name: 'The Yard',
    images: [
      'public/images/events-page/The Yard/IMG_1494.webp',
      'public/images/events-page/The Yard/DSC_6966.webp',
      'public/images/events-page/The Yard/D85A8970.webp',
      'public/images/events-page/The Yard/D85A8921.webp',
      'public/images/events-page/The Yard/IMG_1484.webp',
    ]
  },
  'conference-room': {
    name: 'The Conference Room',
    images: [
      'public/images/events-page/The Conference room /conference-room-new.webp',
      'public/images/events-page/The Conference room /conference-room-mobile.webp',
    ]
  },
  'fireplace-lounge': {
    name: 'The Fireplace Lounge',
    images: [
      'public/images/events-page/The Fireplace/aligarciaphotography-36.webp',
      'public/images/events-page/The Fireplace/aligarciaphotography-37 (1).webp',
    ]
  }
};

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

    console.log(`   ✅ Uploaded: ${filename}`);
    return asset._id;
  } catch (error) {
    console.log(`   ❌ Failed to upload ${filePath}: ${error.message}`);
    return null;
  }
}

async function uploadEventSpaceImages() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║       UPLOADING EVENT SPACE IMAGES TO SANITY               ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Get existing event spaces
  const spaces = await client.fetch(`*[_type == "eventSpace"] { _id, name, "slug": slug.current }`);
  console.log(`Found ${spaces.length} event spaces in Sanity\n`);

  for (const space of spaces) {
    const slug = space.slug;
    const spaceData = eventSpaces[slug];

    if (!spaceData) {
      console.log(`⚠️  No image data for: ${space.name} (slug: ${slug})`);
      continue;
    }

    console.log(`\n📍 ${space.name}`);
    console.log(`   Uploading ${spaceData.images.length} images...`);

    const uploadedAssetIds = [];

    for (const imagePath of spaceData.images) {
      const assetId = await uploadImage(imagePath);
      if (assetId) {
        uploadedAssetIds.push(assetId);
      }
    }

    if (uploadedAssetIds.length > 0) {
      // Update the event space with the gallery images
      const heroImageRef = uploadedAssetIds[0]; // First image as hero
      const galleryRefs = uploadedAssetIds.map(id => ({
        _type: 'image',
        _key: id.replace('image-', '').substring(0, 12),
        asset: { _type: 'reference', _ref: id }
      }));

      try {
        await client.patch(space._id)
          .set({
            heroImage: {
              _type: 'image',
              asset: { _type: 'reference', _ref: heroImageRef }
            },
            gallery: galleryRefs
          })
          .commit();

        console.log(`   ✅ Updated ${space.name} with ${uploadedAssetIds.length} images`);
      } catch (error) {
        console.log(`   ❌ Failed to update ${space.name}: ${error.message}`);
      }
    }
  }

  console.log('\n✅ Done uploading event space images!\n');
}

uploadEventSpaceImages().catch(console.error);
