const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function compressWebP(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const sizeBefore = (stats.size / 1024).toFixed(2);

    // Aggressive compression for files >500KB
    if (stats.size > 500 * 1024) {
      await sharp(filePath)
        .webp({
          quality: 60,  // Lower quality for huge files
          effort: 6,
          smartSubsample: true
        })
        .resize(2400, 2400, {  // Max dimension 2400px (mobile never needs more)
          fit: 'inside',
          withoutEnlargement: true
        })
        .toFile(filePath + '.tmp');

      fs.renameSync(filePath + '.tmp', filePath);

      const statsAfter = fs.statSync(filePath);
      const sizeAfter = (statsAfter.size / 1024).toFixed(2);
      const savings = ((1 - statsAfter.size / stats.size) * 100).toFixed(1);

      console.log(`✓ ${path.basename(filePath)}: ${sizeBefore}KB → ${sizeAfter}KB (${savings}% saved)`);
      return { before: stats.size, after: statsAfter.size };
    } else {
      console.log(`⊘ ${path.basename(filePath)}: ${sizeBefore}KB (skipped, <500KB)`);
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
      if (result.before !== result.after) count++;
    }
  }

  const totalSavingsMB = ((totalBefore - totalAfter) / (1024 * 1024)).toFixed(2);
  const percentSaved = totalBefore > 0 ? ((1 - totalAfter / totalBefore) * 100).toFixed(1) : 0;

  console.log(`\n📊 Aggressively compressed ${count} images >500KB`);
  console.log(`   Before: ${(totalBefore / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`   After: ${(totalAfter / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`   Saved: ${totalSavingsMB} MB (${percentSaved}%)\n`);
}

const folder = process.argv[2];
if (!folder) {
  console.error('Usage: node compress-large-images-aggressive.js <folder-path>');
  process.exit(1);
}

console.log(`🗜️  AGGRESSIVELY compressing images >500KB in: ${folder}\n`);
console.log(`   Settings: Quality 60, Max size 2400px\n`);
compressFolder(folder).then(() => {
  console.log('✅ Aggressive compression complete!');
}).catch(err => {
  console.error('❌ Compression failed:', err);
  process.exit(1);
});
