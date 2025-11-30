const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function compressWebP(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const sizeBefore = (stats.size / 1024).toFixed(2);

    // Only compress if >200KB
    if (stats.size > 200 * 1024) {
      await sharp(filePath)
        .webp({
          quality: 75,
          effort: 6,
          smartSubsample: true
        })
        .toFile(filePath + '.tmp');

      // Replace original with compressed
      fs.renameSync(filePath + '.tmp', filePath);

      const statsAfter = fs.statSync(filePath);
      const sizeAfter = (statsAfter.size / 1024).toFixed(2);
      const savings = ((1 - statsAfter.size / stats.size) * 100).toFixed(1);

      console.log(`✓ ${path.basename(filePath)}: ${sizeBefore}KB → ${sizeAfter}KB (${savings}% saved)`);
      return { before: stats.size, after: statsAfter.size };
    } else {
      console.log(`⊘ ${path.basename(filePath)}: ${sizeBefore}KB (skipped, already small)`);
      return { before: stats.size, after: stats.size };
    }
  } catch (err) {
    console.error(`✗ Error compressing ${filePath}:`, err.message);
    return { before: 0, after: 0 };
  }
}

async function compressFolder(folderPath) {
  const files = fs.readdirSync(folderPath, { recursive: true });
  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    if (fs.statSync(fullPath).isFile() && file.endsWith('.webp')) {
      const result = await compressWebP(fullPath);
      totalBefore += result.before;
      totalAfter += result.after;
      count++;
    }
  }

  const totalSavingsMB = ((totalBefore - totalAfter) / (1024 * 1024)).toFixed(2);
  const percentSaved = ((1 - totalAfter / totalBefore) * 100).toFixed(1);

  console.log(`\n📊 Compressed ${count} images`);
  console.log(`   Before: ${(totalBefore / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`   After: ${(totalAfter / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`   Saved: ${totalSavingsMB} MB (${percentSaved}%)\n`);
}

const folder = process.argv[2];
if (!folder) {
  console.error('Usage: node compress-images.js <folder-path>');
  process.exit(1);
}

console.log(`🗜️  Compressing images in: ${folder}\n`);
compressFolder(folder).then(() => {
  console.log('✅ Compression complete!');
}).catch(err => {
  console.error('❌ Compression failed:', err);
  process.exit(1);
});
