const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const eventsPagePath = path.join(__dirname, '../public/images/events-page');

// Target files larger than 3MB for optimization
const targetFiles = [
  'Meetings:Retreats/GetOutsideEvent6 26-SamStarrMedia (3) (1).webp',
  'Meetings:Retreats/MountainDoubleQueenSuite-AshleeKay (4) (1).webp',
  'Meetings:Retreats/Greenhaus-GregCeo (1).webp',
  'Meetings:Retreats/Yard2, SamStarr (1).webp',
  'Meetings:Retreats/samantha baldwin 13 (1).webp',
  'Meetings:Retreats/FireplaceDrinks2, SamStarr (1).webp',
  'The Yard/Yard, AshleeKayPhotography.webp',
  'The Yard/D85A8921.webp',
  'The Yard/D85A8970.webp',
  'The Yard/Yard, AshleeKayPhotography (2).webp',
  'The Yard/IMG_1494.webp',
  'The Yard/Yard3, SamStarr.webp',
  'GreenHaus/Greenhaus-SamStarrMedia (1).webp',
  'GreenHaus/Greenhaus-ErinWinterPhotography-8506 (1).webp',
  'GreenHaus/aligarciaphotography-2 (1).webp',
  'Gatherings/Greenhaus-SamStarrMedia (2).webp',
  'Gatherings/Fireplace-GregCeo.webp',
  'Weddings/MountainKingSuite-RichardSeldomridge.webp',
  'Make Kinship Yours/HotelCheckIn, SamStarr.webp',
];

async function optimizeImage(relativePath) {
  const inputPath = path.join(eventsPagePath, relativePath);

  if (!fs.existsSync(inputPath)) {
    console.log(`❌ File not found: ${relativePath}`);
    return;
  }

  const stats = fs.statSync(inputPath);
  const originalSizeMB = (stats.size / 1024 / 1024).toFixed(2);

  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();

    // Create optimized version with new filename
    const optimizedPath = inputPath.replace('.webp', '-optimized.webp');

    // Optimize with MAXIMUM quality settings
    await sharp(inputPath)
      .resize(Math.min(metadata.width, 2800), null, {
        withoutEnlargement: true,
        fit: 'inside',
        kernel: sharp.kernel.lanczos3
      })
      .webp({
        quality: 90,
        effort: 6,
        smartSubsample: true,
        nearLossless: true,
        preset: 'photo'
      })
      .toFile(optimizedPath);

    const newStats = fs.statSync(optimizedPath);
    const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
    const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

    // Delete the original source file after successful optimization
    fs.unlinkSync(inputPath);

    console.log(`✅ ${relativePath}`);
    console.log(`   ${originalSizeMB}MB → ${newSizeMB}MB (${reduction}% reduction)`);
    console.log(`   🗑️  Deleted original source file`);
  } catch (error) {
    console.error(`❌ Error optimizing ${relativePath}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting Events Page Image Optimization...\n');
  console.log(`📁 Processing ${targetFiles.length} images...\n`);

  for (const file of targetFiles) {
    await optimizeImage(file);
  }

  console.log('\n✨ Optimization complete!');
  console.log('📦 Optimized images created with "-optimized.webp" suffix');
  console.log('🗑️  Original source files have been deleted automatically');
}

main().catch(console.error);
