const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const homaPagePath = path.join(__dirname, '../public/images/HOMA Page');

// Compress the massive 6.7MB images
const largeFiles = [
  'Signature Dishes.webp',
  'Homa.2.25-29 (1).webp',
  'Homa Bar, Jennie Campbell (@fsupecas21)-optimized.webp',
];

async function compressImage(filename) {
  const inputPath = path.join(homaPagePath, filename);

  if (!fs.existsSync(inputPath)) {
    console.log(`❌ File not found: ${filename}`);
    return;
  }

  const stats = fs.statSync(inputPath);
  const originalSizeMB = (stats.size / 1024 / 1024).toFixed(2);

  try {
    const metadata = await sharp(inputPath).metadata();
    const tempPath = inputPath + '.temp.webp';

    await sharp(inputPath)
      .resize(Math.min(metadata.width, 1800), null, {
        withoutEnlargement: true,
        fit: 'inside',
        kernel: sharp.kernel.lanczos3
      })
      .webp({
        quality: 80,
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

    console.log(`✅ ${filename}`);
    console.log(`   ${originalSizeMB}MB → ${newSizeMB}MB (${reduction}% reduction)\n`);
  } catch (error) {
    console.error(`❌ Error compressing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Compressing large HOMA images...\n');

  for (const file of largeFiles) {
    await compressImage(file);
  }

  console.log('✨ Compression complete!');
}

main().catch(console.error);
