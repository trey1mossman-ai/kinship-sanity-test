const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const MAX_WIDTH = 1920;
const QUALITY = 92; // Higher quality for better looking images

async function optimizeImage(inputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const ext = path.extname(inputPath);

    // Skip already optimized files that are recent
    if (inputPath.includes('-optimized')) {
      console.log(`Skipping ${path.basename(inputPath)} - already optimized`);
      return;
    }

    // Create output path
    const outputPath = inputPath.replace(ext, '-optimized.webp');

    // Check if optimized version already exists and is recent
    try {
      const stats = await fs.stat(outputPath);
      const originalStats = await fs.stat(inputPath);
      if (stats.mtime > originalStats.mtime) {
        console.log(`✓ ${path.basename(inputPath)} - already has recent optimized version`);
        return;
      }
    } catch (e) {
      // File doesn't exist, continue with optimization
    }

    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
        kernel: sharp.kernel.lanczos3 // Best quality scaling
      })
      .sharpen({
        sigma: 0.8,
        m1: 1.0,
        m2: 0.6,
        x1: 2,
        y2: 10,
        y3: 20
      })
      .webp({
        quality: QUALITY,
        effort: 6, // Maximum effort for best compression
        smartSubsample: true,
        nearLossless: false,
        alphaQuality: 100
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
console.log('🖼️  Re-optimizing room images with enhanced quality and performance...\n');
console.log('Settings: 92% quality, Lanczos3 scaling, smart sharpening, effort 6\n');

processDirectory(roomsDir)
  .then(() => console.log('\n✅ Enhanced room image optimization complete!'))
  .catch(console.error);
