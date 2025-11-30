const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const WEDDINGS_DIR = path.join(__dirname, '../public/images/Events Page/Weddings');
const MAX_WIDTH = 1920;
const QUALITY = 95; // High quality

async function optimizeImage(inputPath, filename) {
  const outputPath = path.join(WEDDINGS_DIR, filename.replace(/\.webp$/, '-optimized.webp'));

  const stats = fs.statSync(inputPath);
  const originalSize = stats.size;

  console.log(`\nOptimizing: ${filename}`);
  console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

  try {
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
        kernel: sharp.kernel.lanczos3 // Highest quality scaling
      })
      .sharpen({
        sigma: 1.0,    // Moderate sharpening
        m1: 1.2,       // Increased edge detection
        m2: 0.7,
        x1: 2,
        y2: 10,
        y3: 20
      })
      .webp({
        quality: QUALITY,
        effort: 6,           // Maximum compression effort
        smartSubsample: true,
        nearLossless: false,
        alphaQuality: 100
      })
      .toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`Optimized size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Reduction: ${reduction}%`);
    console.log(`Saved to: ${path.basename(outputPath)}`);

    return { filename, originalSize, newSize, reduction };
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error.message);
    return null;
  }
}

async function optimizeAllWeddingImages() {
  console.log('Starting wedding image optimization...');
  console.log(`Quality: ${QUALITY}%`);
  console.log(`Max width: ${MAX_WIDTH}px`);

  const files = fs.readdirSync(WEDDINGS_DIR)
    .filter(file => file.endsWith('.webp') && !file.endsWith('-optimized.webp'));

  console.log(`\nFound ${files.length} images to optimize`);

  const results = [];

  for (const file of files) {
    const inputPath = path.join(WEDDINGS_DIR, file);
    const result = await optimizeImage(inputPath, file);
    if (result) results.push(result);
  }

  console.log('\n========================================');
  console.log('OPTIMIZATION SUMMARY');
  console.log('========================================');

  let totalOriginal = 0;
  let totalNew = 0;

  results.forEach(r => {
    totalOriginal += r.originalSize;
    totalNew += r.newSize;
    console.log(`${r.filename}: ${r.reduction}% reduction`);
  });

  const totalReduction = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);
  console.log('\n========================================');
  console.log(`Total original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total optimized: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total reduction: ${totalReduction}%`);
  console.log('========================================\n');
}

optimizeAllWeddingImages().catch(console.error);
