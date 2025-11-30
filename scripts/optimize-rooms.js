const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const MAX_WIDTH = 1920;
const QUALITY = 90; // Higher quality for better looking images

async function optimizeImage(inputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const ext = path.extname(inputPath);

    // Skip already optimized files
    if (inputPath.includes('-optimized')) {
      console.log(`Skipping ${path.basename(inputPath)} - already optimized`);
      return;
    }

    // Create output path
    const outputPath = inputPath.replace(ext, '-optimized.webp');

    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({
        quality: QUALITY,
        effort: 6 // Higher effort for better compression
      })
      .toFile(outputPath);

    const originalSize = (await fs.stat(inputPath)).size;
    const newSize = (await fs.stat(outputPath)).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`✓ Optimized ${path.basename(inputPath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      await optimizeImage(fullPath);
    }
  }
}

// Run optimization on Rooms Page:section
const roomsDir = path.join(__dirname, '../public/images/Rooms Page:section');
console.log('🖼️  Optimizing room images for better quality and performance...\n');

processDirectory(roomsDir)
  .then(() => console.log('\n✅ Room image optimization complete!'))
  .catch(console.error);
