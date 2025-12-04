// Upload Gallery Images to Sanity
// Run with: SANITY_TOKEN="your_token" node scripts/upload-gallery-images.js

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

// Gallery images extracted from GalleryPageClient.tsx
const galleryImages = [
  // PRIORITY: First 15 images - Sam Starr, Richard Seldomridge, Greg Ceo ONLY
  { src: 'public/images/Rooms Page:section/Book a bunch of rooms/BunkRoom5-SamStarr-optimized.webp', alt: 'Room Block', category: 'rooms' },
  { src: 'public/images/Rooms Page:section/Camp Deck/CampDeck-SamStarrMedia (2)-optimized.webp', alt: 'Camp Deck', category: 'rooms' },
  { src: 'public/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge-optimized.webp', alt: 'Camp Deck Outdoor', category: 'rooms' },
  { src: 'public/images/Rooms Page:section/Double Queen Balcony/DoubleQueenSuite-RichardSeldomridge-optimized.webp', alt: 'Double Queen Balcony Suite', category: 'rooms' },
  { src: 'public/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (1) (1)-optimized.webp', alt: 'King Suite', category: 'rooms' },
  { src: 'public/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (2)-optimized.webp', alt: 'King Suite Interior', category: 'rooms' },
  { src: 'public/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-RichardSeldomridge (4)-optimized.webp', alt: 'Mountain Double Queen', category: 'rooms' },
  { src: 'public/images/Rooms Page:section/Mountain Jr. Queen/MountainJrQueenSuite-RichardSeldomridge-optimized.webp', alt: 'Mountain Jr. Queen Suite', category: 'rooms' },

  // Venues
  { src: 'public/images/events-page/The Fireplace/FireplaceDrinks2, SamStarr-optimized.webp', alt: 'Fireplace Lounge', category: 'venues' },
  { src: 'public/images/events-page/GreenHaus/Greenhaus-SamStarrMedia (1).webp', alt: 'GreenHaus Interior', category: 'venues' },
  { src: 'public/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge.webp', alt: 'GreenHaus Venue', category: 'venues' },
  { src: 'public/images/events-page/The Yard/Yard2, SamStarr.webp', alt: 'The Yard - Gathering Space', category: 'venues' },
  { src: 'public/images/events-page/The Yard/Yard3, SamStarr.webp', alt: 'The Yard - Evening Atmosphere', category: 'venues' },

  // HOMA
  { src: 'public/images/HOMA Page/CafeSeating-GregCeo-optimized.webp', alt: 'HOMA Seating Space', category: 'homa' },
  { src: 'public/images/HOMA Page/CafeSeating2, SamStarr.webp', alt: 'HOMA Lounge Seating', category: 'homa' },
  { src: 'public/images/HOMA Page/DSCF8548.webp', alt: 'HOMA Café Interior', category: 'homa' },
  { src: 'public/images/HOMA Page/Seating Homa -optimized.webp', alt: 'HOMA Café Seating', category: 'homa' },
  { src: 'public/images/HOMA Page/Brunch.webp', alt: 'HOMA Brunch', category: 'homa' },
  { src: 'public/images/HOMA Page/Signature Dishes.webp', alt: 'HOMA Signature Dishes', category: 'homa' },
  { src: 'public/images/HOMA Page/Craft Cocktails.webp', alt: 'HOMA Craft Cocktails', category: 'homa' },
  { src: 'public/images/HOMA Page/Fresh and local.webp', alt: 'HOMA Fresh & Local Ingredients', category: 'homa' },
  { src: 'public/images/HOMA Page/Homa Bar, Jennie Campbell (@fsupecas21)-optimized.webp', alt: 'HOMA Bar', category: 'homa' },
  { src: 'public/images/HOMA Page/Homa Espresso Web Size_-4 (1).webp', alt: 'HOMA Espresso', category: 'homa' },

  // Weddings
  { src: 'public/images/events-page/Weddings/MountainKingSuite-RichardSeldomridge.webp', alt: 'Wedding at Kinship Landing', category: 'weddings' },
  { src: 'public/images/events-page/Weddings/8F8A1146-optimized.webp', alt: 'Wedding Celebration at Kinship', category: 'weddings' },
  { src: 'public/images/events-page/Weddings/8F8A7820.webp', alt: 'Wedding Reception at Kinship', category: 'weddings' },
  { src: 'public/images/events-page/Weddings/D85A8377-optimized.webp', alt: 'Wedding Ceremony at Kinship', category: 'weddings' },
  { src: 'public/images/events-page/Weddings/event image-optimized.webp', alt: 'Wedding Event at Kinship Landing', category: 'weddings' },
  { src: 'public/images/events-page/Weddings/kinship-38.webp', alt: 'Kinship Wedding Detail', category: 'weddings' },
  { src: 'public/images/events-page/Weddings/kinship-48.webp', alt: 'Kinship Wedding Venue', category: 'weddings' },
  { src: 'public/images/events-page/Weddings/kinship-57_nB2.webp', alt: 'Kinship Wedding Atmosphere', category: 'weddings' },

  // Additional rooms
  { src: 'public/images/Rooms Page:section/Book a bunch of rooms/MountainDoubleQueenSuite-AshleeKay-optimized.webp', alt: 'Mountain Double Queen Suite', category: 'rooms' },
  { src: 'public/images/Rooms Page:section/Family Suite/AK_03363-optimized.webp', alt: 'Family Suite', category: 'rooms' },
  { src: 'public/images/Gallery Page/Family Suite, Ashlee Kay Photography (2)-optimized.webp', alt: 'Family Suite Living Area', category: 'rooms' },

  // Additional venues
  { src: 'public/images/events-page/Meetings:Retreats/Kinship-4G3A9437-1 (1).webp', alt: 'GreenHaus Event Space', category: 'venues' },
  { src: 'public/images/events-page/Gatherings/0B1A0328-optimized.webp', alt: 'GreenHaus Gathering', category: 'venues' },
  { src: 'public/images/events-page/GreenHaus/Greenhaus-ErinWinterPhotography-8502.webp', alt: 'GreenHaus Setup', category: 'venues' },
];

async function uploadImage(filePath, alt) {
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
    console.log(`   ❌ Failed: ${error.message}`);
    return null;
  }
}

async function uploadGalleryImages() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║         UPLOADING GALLERY IMAGES TO SANITY                 ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < galleryImages.length; i++) {
    const img = galleryImages[i];
    process.stdout.write(`[${i + 1}/${galleryImages.length}] ${img.alt}... `);

    const assetId = await uploadImage(img.src, img.alt);

    if (assetId) {
      // Create gallery image document
      try {
        await client.create({
          _type: 'galleryImage',
          title: img.alt,
          category: img.category,
          displayOrder: i + 1,
          isActive: true,
          image: {
            _type: 'image',
            alt: img.alt,
            asset: { _type: 'reference', _ref: assetId }
          }
        });
        console.log('✅');
        successCount++;
      } catch (error) {
        console.log(`❌ ${error.message}`);
        failCount++;
      }
    } else {
      failCount++;
    }
  }

  console.log(`\n✅ Uploaded: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('\n');
}

uploadGalleryImages().catch(console.error);
