#!/usr/bin/env node

/**
 * KINSHIP LANDING - RESPONSIVE IMAGE GENERATOR
 *
 * Generates optimized responsive image sizes for all critical images
 * Quality tiers: Hero (90), Cards (85), Thumbnails (65)
 * Sizes: 640w, 1024w, 1920w, 2560w
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);

// Quality tiers based on usage
const QUALITY_TIERS = {
  hero: 90,        // Hero images - absolute quality
  cards: 85,       // Room/event cards - very high quality
  thumbnails: 65,  // Gallery thumbnails - good quality
  background: 70   // Background textures
};

// Responsive sizes (mobile → desktop)
const SIZES = {
  mobile: 640,
  tablet: 1024,
  desktop: 1920,
  large: 2560
};

// Critical hero images that need responsive versions
const HERO_IMAGES = [
  // Homepage
  { path: 'public/images/home/hero-image.webp', quality: 'hero', priority: 1 },

  // Rooms page hero carousel
  { path: 'public/images/Gallery Page/Textiles-RichardSeldomridge-optimized.webp', quality: 'hero', priority: 1 },
  { path: 'public/images/Gallery Page/Family Suite, Ashlee Kay Photography (2)-optimized.webp', quality: 'hero', priority: 1 },
  { path: 'public/images/Gallery Page/PetFriendlyJrQueenSuite-ExploreWithMedia (2)-optimized.webp', quality: 'hero', priority: 1 },

  // Events page
  { path: 'public/images/events-page/events-hero-optimized.webp', quality: 'hero', priority: 1 },

  // Gallery page
  { path: 'public/images/events-page/Make Kinship Yours/HomaNightlife-GregCeo.webp', quality: 'hero', priority: 1 },

  // Homa page hero triptychs
  { path: 'public/images/HOMA Page/hero-triptych-1.webp', quality: 'hero', priority: 1 },
  { path: 'public/images/HOMA Page/hero-triptych-3.webp', quality: 'hero', priority: 1 },

  // Homa mobile heroes
  { path: 'public/images/HOMA Page/Signature Dishes.webp', quality: 'hero', priority: 1 },
  { path: 'public/images/HOMA Page/homa 8.13.24-6 (1).webp', quality: 'hero', priority: 1 },
  { path: 'public/images/HOMA Page/Fresh and local.webp', quality: 'hero', priority: 1 },

  // About page
  { path: 'public/images/About/911A2070-2-optimized.webp', quality: 'hero', priority: 1 },
];

// Room card images (high quality but smaller than hero)
const ROOM_CARD_IMAGES = [
  'public/images/Rooms Page:section/King Suite',
  'public/images/Rooms Page:section/executive-king',
  'public/images/Rooms Page:section/Mountain King Suite',
  'public/images/Rooms Page:section/Mountain Jr. Queen',
  'public/images/Rooms Page:section/Queen Balcony Suite',
  'public/images/Rooms Page:section/Jr. Queen',
  'public/images/Rooms Page:section/Double Queen Balcony',
  'public/images/Rooms Page:section/Mountain Double Queen',
  'public/images/Rooms Page:section/Family Suite',
  'public/images/Rooms Page:section/Camp Deck',
];

async function ensureDir(dirPath) {
  try {
    await mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function generateResponsiveSizes(inputPath, quality, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath);

  console.log(`\n🖼️  Processing: ${path.basename(inputPath)}`);
  console.log(`   Quality: ${quality} (${QUALITY_TIERS[quality]})`);

  const results = [];

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`   Original: ${metadata.width}x${metadata.height} (${(metadata.size / 1024).toFixed(0)}KB)`);

    // Generate each responsive size
    for (const [sizeName, width] of Object.entries(SIZES)) {
      // Skip if original is smaller than target size
      if (metadata.width < width) {
        console.log(`   ⏭️  Skipping ${width}w (original too small)`);
        continue;
      }

      const outputPath = path.join(outputDir, `${filename}-${width}w${ext}`);

      await image
        .clone()
        .resize(width, null, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({
          quality: QUALITY_TIERS[quality],
          effort: 6 // Max compression effort
        })
        .toFile(outputPath);

      const outputStats = await stat(outputPath);
      const savedKB = (outputStats.size / 1024).toFixed(0);

      console.log(`   ✅ ${width}w → ${savedKB}KB`);

      results.push({
        width,
        path: outputPath,
        size: outputStats.size
      });
    }

    return results;

  } catch (err) {
    console.error(`   ❌ Error processing ${inputPath}:`, err.message);
    return [];
  }
}

async function generateBlurPlaceholder(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(outputDir, `${filename}-blur.webp`);

  try {
    await sharp(inputPath)
      .resize(20, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .blur(10)
      .webp({ quality: 20 })
      .toFile(outputPath);

    const stats = await stat(outputPath);
    console.log(`   🌫️  Blur placeholder → ${(stats.size / 1024).toFixed(1)}KB`);

    return outputPath;
  } catch (err) {
    console.error(`   ❌ Error generating blur placeholder:`, err.message);
    return null;
  }
}

async function processDirectory(dirPath, quality) {
  try {
    const files = await readdir(dirPath);
    const images = [];

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const fileStat = await stat(filePath);

      if (fileStat.isFile() && /\.(webp|jpg|jpeg)$/i.test(file)) {
        images.push({ path: filePath, quality });
      }
    }

    return images;
  } catch (err) {
    console.error(`Error reading directory ${dirPath}:`, err.message);
    return [];
  }
}

async function main() {
  console.log('🚀 KINSHIP LANDING - RESPONSIVE IMAGE GENERATOR\n');
  console.log('=' .repeat(60));

  const outputBaseDir = 'public/images/optimized';
  await ensureDir(outputBaseDir);

  let totalProcessed = 0;
  let totalSaved = 0;

  // Process hero images first (highest priority)
  console.log('\n📸 PROCESSING HERO IMAGES (Quality: 90)');
  console.log('=' .repeat(60));

  for (const heroImage of HERO_IMAGES) {
    if (!fs.existsSync(heroImage.path)) {
      console.log(`⚠️  Not found: ${heroImage.path}`);
      continue;
    }

    const outputDir = path.join(outputBaseDir, 'heroes', path.dirname(heroImage.path).split('/').pop());
    await ensureDir(outputDir);

    const results = await generateResponsiveSizes(heroImage.path, heroImage.quality, outputDir);
    await generateBlurPlaceholder(heroImage.path, outputDir);

    totalProcessed++;
  }

  // Process room card images
  console.log('\n\n🏨 PROCESSING ROOM CARD IMAGES (Quality: 85)');
  console.log('=' .repeat(60));

  for (const roomDir of ROOM_CARD_IMAGES) {
    if (!fs.existsSync(roomDir)) {
      console.log(`⚠️  Not found: ${roomDir}`);
      continue;
    }

    const images = await processDirectory(roomDir, 'cards');

    for (const img of images) {
      const outputDir = path.join(outputBaseDir, 'room-cards', path.basename(roomDir));
      await ensureDir(outputDir);

      await generateResponsiveSizes(img.path, img.quality, outputDir);
      await generateBlurPlaceholder(img.path, outputDir);

      totalProcessed++;
    }
  }

  console.log('\n\n' + '=' .repeat(60));
  console.log(`✨ GENERATION COMPLETE!`);
  console.log(`📊 Total images processed: ${totalProcessed}`);
  console.log(`📁 Output directory: ${outputBaseDir}`);
  console.log('=' .repeat(60));
  console.log('\n💡 Next steps:');
  console.log('   1. Update components to use responsive srcSet');
  console.log('   2. Add blur placeholders for loading states');
  console.log('   3. Test on mobile/tablet/desktop viewports');
  console.log('\n');
}

// Run the script
main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
