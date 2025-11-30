const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const MAX_WIDTH = 1920;
const QUALITY = 95; // Higher quality for sharper image

async function optimizeCampDeckImage() {
  const inputPath = path.join(__dirname, '../public/images/Rooms Page:section/Camp Deck/camping-room.webp');
  const outputPath = path.join(__dirname, '../public/images/Rooms Page:section/Camp Deck/camping-room-optimized.webp');

  try {
    console.log('🖼️  Optimizing Camp Deck image for sharper quality...\n');

    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
        kernel: sharp.kernel.lanczos3 // Better quality scaling
      })
      .sharpen({
        sigma: 1.5, // Sharpening
        m1: 1.0,
        m2: 0.5
      })
      .webp({
        quality: QUALITY,
        effort: 6, // Maximum compression effort
        smartSubsample: true
      })
      .toFile(outputPath);

    const originalSize = (await fs.stat(inputPath)).size;
    const newSize = (await fs.stat(outputPath)).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`✓ Optimized camping-room.webp:`);
    console.log(`  Original: ${(originalSize / 1024).toFixed(2)}KB`);
    console.log(`  New: ${(newSize / 1024).toFixed(2)}KB`);
    console.log(`  Savings: ${savings}%`);
    console.log(`  Quality: ${QUALITY}% with sharpening applied`);
    console.log('\n✅ Camp Deck image optimization complete!');
  } catch (error) {
    console.error(`Error optimizing camping-room.webp:`, error.message);
  }
}

optimizeCampDeckImage();
