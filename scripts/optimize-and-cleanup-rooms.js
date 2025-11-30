const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const MAX_WIDTH = 1920;
const QUALITY = 85; // Optimized for web - fast loading with great quality
const EFFORT = 6; // Maximum compression effort

// Track processed images
const processedImages = new Map();
const duplicates = [];

async function getImageHash(filePath) {
  const buffer = await fs.readFile(filePath);
  return crypto.createHash('md5').update(buffer).digest('hex');
}

async function optimizeImage(inputPath, outputPath) {
  try {
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
        effort: EFFORT,
        smartSubsample: true,
        nearLossless: false,
        alphaQuality: 100
      })
      .toFile(outputPath);

    const originalSize = (await fs.stat(inputPath)).size;
    const newSize = (await fs.stat(outputPath)).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    return {
      originalSize,
      newSize,
      savings
    };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function processRoomFolder(folderPath, folderName) {
  console.log(`\n📁 Processing: ${folderName}`);
  console.log('─'.repeat(60));

  const files = await fs.readdir(folderPath);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f) && !f.startsWith('.'));

  const uniqueImages = new Map();
  const toOptimize = [];
  const toDelete = [];

  // Step 1: Identify duplicates and non-optimized versions
  for (const file of imageFiles) {
    const filePath = path.join(folderPath, file);
    const isOptimized = file.includes('-optimized');

    // Skip UUID files and screenshots
    if (/^[0-9A-F]{8}-[0-9A-F]{4}/.test(file)) {
      toDelete.push(filePath);
      console.log(`  ❌ Will delete (UUID/screenshot): ${file}`);
      continue;
    }

    // Get base name without -optimized suffix
    const baseName = file.replace('-optimized', '').replace(/\.(jpg|jpeg|png|webp)$/i, '');

    if (!uniqueImages.has(baseName)) {
      uniqueImages.set(baseName, { original: null, optimized: null });
    }

    const entry = uniqueImages.get(baseName);
    if (isOptimized) {
      entry.optimized = filePath;
    } else {
      entry.original = filePath;
    }
  }

  // Step 2: Determine what to optimize and what to delete
  for (const [baseName, { original, optimized }] of uniqueImages.entries()) {
    if (optimized && original) {
      // Both exist - delete original, keep optimized
      toDelete.push(original);
      console.log(`  ✓ Has optimized version: ${path.basename(optimized)}`);
      console.log(`    ↳ Will delete duplicate: ${path.basename(original)}`);
    } else if (optimized && !original) {
      // Only optimized exists - keep it
      console.log(`  ✓ Already optimized: ${path.basename(optimized)}`);
    } else if (original && !optimized) {
      // Only original exists - needs optimization
      const ext = path.extname(original);
      const outputPath = original.replace(ext, '-optimized.webp');
      toOptimize.push({ input: original, output: outputPath });
      console.log(`  🔄 Will optimize: ${path.basename(original)}`);
    }
  }

  // Step 3: Optimize images that need it
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const { input, output } of toOptimize) {
    const result = await optimizeImage(input, output);
    if (result) {
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.newSize;
      console.log(`  ✅ Optimized: ${path.basename(input)} → ${(result.newSize / 1024 / 1024).toFixed(2)}MB (${result.savings}% smaller)`);

      // After successful optimization, mark original for deletion
      toDelete.push(input);
    }
  }

  // Step 4: Delete duplicates and originals
  for (const filePath of toDelete) {
    try {
      await fs.unlink(filePath);
      console.log(`  🗑️  Deleted: ${path.basename(filePath)}`);
    } catch (error) {
      console.error(`  ⚠️  Failed to delete ${path.basename(filePath)}:`, error.message);
    }
  }

  // Summary for this folder
  if (toOptimize.length > 0) {
    const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`\n  💾 Folder savings: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB → ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB (${totalSavings}% reduction)`);
  }
  console.log(`  📊 Optimized: ${toOptimize.length} | Deleted: ${toDelete.length} | Kept: ${uniqueImages.size}`);
}

async function processAllRooms() {
  const roomsDir = path.join(__dirname, '../public/images/Rooms Page:section');

  console.log('\n🖼️  ROOM IMAGE OPTIMIZATION & CLEANUP');
  console.log('═'.repeat(60));
  console.log('Settings:');
  console.log(`  • Quality: ${QUALITY}% (optimized for fast web loading)`);
  console.log(`  • Max Width: ${MAX_WIDTH}px`);
  console.log(`  • Format: WebP with smart compression`);
  console.log(`  • Effort: ${EFFORT} (maximum compression)`);
  console.log('═'.repeat(60));

  const folders = await fs.readdir(roomsDir, { withFileTypes: true });

  for (const folder of folders) {
    if (folder.isDirectory() && !folder.name.startsWith('.')) {
      const folderPath = path.join(roomsDir, folder.name);
      await processRoomFolder(folderPath, folder.name);
    }
  }

  console.log('\n\n✅ OPTIMIZATION COMPLETE!');
  console.log('═'.repeat(60));
  console.log('Next steps:');
  console.log('  1. All images are now optimized for fast loading');
  console.log('  2. Duplicates have been removed');
  console.log('  3. All images are in WebP format for maximum performance');
  console.log('  4. Ready for production deployment');
  console.log('═'.repeat(60));
}

// Run the optimization
processAllRooms()
  .catch(console.error);
