const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const EVENTS_DIR = path.join(__dirname, '../public/images/Events Page');
const VENUES = ['GreenHaus', 'The Yard', 'The Conference room ', 'The Fireplace'];
const MAX_WIDTH = 1920;
const QUALITY = 95;

async function optimizeImage(inputPath, outputPath, filename) {
  const stats = fs.statSync(inputPath);
  const originalSize = stats.size;

  console.log(`\nOptimizing: ${filename}`);
  console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

  try {
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
        kernel: sharp.kernel.lanczos3
      })
      .sharpen({
        sigma: 1.0,
        m1: 1.2,
        m2: 0.7,
        x1: 2,
        y2: 10,
        y3: 20
      })
      .webp({
        quality: QUALITY,
        effort: 6,
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

    return { filename, originalSize, newSize, reduction };
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error.message);
    return null;
  }
}

async function optimizeVenueFolder(venueName) {
  const venueDir = path.join(EVENTS_DIR, venueName);

  if (!fs.existsSync(venueDir)) {
    console.log(`\nSkipping ${venueName} - folder not found`);
    return [];
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`OPTIMIZING: ${venueName}`);
  console.log('='.repeat(60));

  const files = fs.readdirSync(venueDir)
    .filter(file => file.endsWith('.webp') && !file.endsWith('-optimized.webp') && !file.includes('-mobile'));

  if (files.length === 0) {
    console.log('No images to optimize');
    return [];
  }

  const results = [];

  for (const file of files) {
    const inputPath = path.join(venueDir, file);
    const outputName = file.replace(/\.webp$/, '-optimized.webp');
    const outputPath = path.join(venueDir, outputName);

    const result = await optimizeImage(inputPath, outputPath, file);
    if (result) results.push(result);
  }

  return results;
}

async function optimizeAllEventSpaces() {
  console.log('Starting event space image optimization...');
  console.log(`Quality: ${QUALITY}%`);
  console.log(`Max width: ${MAX_WIDTH}px`);

  const allResults = [];

  for (const venue of VENUES) {
    const results = await optimizeVenueFolder(venue);
    allResults.push(...results);
  }

  console.log('\n' + '='.repeat(60));
  console.log('OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));

  let totalOriginal = 0;
  let totalNew = 0;

  allResults.forEach(r => {
    totalOriginal += r.originalSize;
    totalNew += r.newSize;
    console.log(`${r.filename}: ${r.reduction}% reduction`);
  });

  if (allResults.length > 0) {
    const totalReduction = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);
    console.log('\n' + '='.repeat(60));
    console.log(`Total original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total optimized: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total reduction: ${totalReduction}%`);
    console.log(`Images optimized: ${allResults.length}`);
    console.log('='.repeat(60) + '\n');
  } else {
    console.log('\nNo images were optimized.\n');
  }
}

optimizeAllEventSpaces().catch(console.error);
