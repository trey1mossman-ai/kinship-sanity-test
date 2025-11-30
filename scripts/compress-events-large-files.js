const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const eventsPagePath = path.join(__dirname, '../public/images/events-page');

// Only compress files over 2MB that we're actively using
const largeFiles = [
  'Meetings:Retreats/FireplaceDrinks2, SamStarr (1).webp',
  'Meetings:Retreats/CafeSeating-AshleeKay (2).webp',
  'Weddings/MountainKingSuite-RichardSeldomridge.webp',
  'Make Kinship Yours/HotelCheckIn, SamStarr.webp',
  'The Yard/Yard, AshleeKayPhotography.webp',
];

async function compressImage(relativePath) {
  const inputPath = path.join(eventsPagePath, relativePath);

  if (!fs.existsSync(inputPath)) {
    console.log(`❌ File not found: ${relativePath}`);
    return;
  }

  const stats = fs.statSync(inputPath);
  const originalSizeMB = (stats.size / 1024 / 1024).toFixed(2);

  // Skip if already under 2MB
  if (stats.size < 2 * 1024 * 1024) {
    console.log(`⏭️  Skipping ${relativePath} (already ${originalSizeMB}MB)`);
    return;
  }

  try {
    const metadata = await sharp(inputPath).metadata();
    const tempPath = inputPath + '.temp.webp';

    await sharp(inputPath)
      .resize(Math.min(metadata.width, 2400), null, {
        withoutEnlargement: true,
        fit: 'inside',
        kernel: sharp.kernel.lanczos3
      })
      .webp({
        quality: 82,
        effort: 6,
        smartSubsample: true
      })
      .toFile(tempPath);

    const newStats = fs.statSync(tempPath);
    const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
    const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

    // Replace original with compressed version
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, inputPath);

    console.log(`✅ ${relativePath}`);
    console.log(`   ${originalSizeMB}MB → ${newSizeMB}MB (${reduction}% reduction)\n`);
  } catch (error) {
    console.error(`❌ Error compressing ${relativePath}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Compressing large event images...\n');

  for (const file of largeFiles) {
    await compressImage(file);
  }

  console.log('✨ Compression complete!');
}

main().catch(console.error);
