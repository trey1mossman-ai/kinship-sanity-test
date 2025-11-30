const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const MAX_WIDTH = 1920;
const MAX_WIDTH_MOBILE = 828; // iPhone 14 Pro Max width
const QUALITY = 85;

async function optimizeImage(inputPath, outputPath, maxWidth = MAX_WIDTH) {
  try {
    const metadata = await sharp(inputPath).metadata();

    // Skip if image is already smaller than max width
    if (metadata.width <= maxWidth) {
      console.log(`Skipping ${path.basename(inputPath)} - already optimized`);
      return;
    }

    await sharp(inputPath)
      .resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const originalSize = (await fs.stat(inputPath)).size;
    const newSize = (await fs.stat(outputPath)).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`✓ Optimized ${path.basename(inputPath)}: ${savings}% smaller`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      const outputPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '-optimized.webp');

      // Create mobile version for certain images
      if (fullPath.includes('/home/') || fullPath.includes('hero')) {
        const mobilePath = fullPath.replace(/\.(jpg|jpeg|png|webp)$/i, '-mobile.webp');
        await optimizeImage(fullPath, mobilePath, MAX_WIDTH_MOBILE);
      }

      // Create desktop version
      await optimizeImage(fullPath, outputPath, MAX_WIDTH);
    }
  }
}

// Run optimization
processDirectory(path.join(__dirname, '../public/images'))
  .then(() => console.log('✅ Image optimization complete!'))
  .catch(console.error);