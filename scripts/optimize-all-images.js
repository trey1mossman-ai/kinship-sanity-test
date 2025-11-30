const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const DESKTOP_WIDTH = 1920;
const MOBILE_WIDTH = 828;
const QUALITY_HIGH = 85;
const QUALITY_MEDIUM = 75;

async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return (stats.size / 1024 / 1024).toFixed(2); // Size in MB
  } catch {
    return '0';
  }
}

async function optimizeImage(inputPath) {
  try {
    const fileName = path.basename(inputPath, path.extname(inputPath));
    const dir = path.dirname(inputPath);

    // Skip if already optimized
    if (fileName.includes('-optimized') || fileName.includes('-mobile')) {
      return;
    }

    const originalSize = await getFileSize(inputPath);
    console.log(`Processing: ${fileName} (${originalSize}MB)`);

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    const isHeroImage = inputPath.includes('hero') || inputPath.includes('background');
    const isCritical = inputPath.includes('home/') || isHeroImage;

    // Desktop version
    const desktopPath = path.join(dir, `${fileName}-optimized.webp`);
    const desktopWidth = Math.min(metadata.width || DESKTOP_WIDTH, DESKTOP_WIDTH);

    await sharp(inputPath)
      .resize(desktopWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({
        quality: isCritical ? QUALITY_MEDIUM : QUALITY_HIGH,
        effort: 6
      })
      .toFile(desktopPath);

    const desktopSize = await getFileSize(desktopPath);
    console.log(`  ✓ Desktop: ${desktopSize}MB (${((1 - desktopSize/originalSize) * 100).toFixed(0)}% smaller)`);

    // Mobile version for critical images
    if (isCritical) {
      const mobilePath = path.join(dir, `${fileName}-mobile.webp`);
      const mobileWidth = Math.min(metadata.width || MOBILE_WIDTH, MOBILE_WIDTH);

      await sharp(inputPath)
        .resize(mobileWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({
          quality: 70,
          effort: 6
        })
        .toFile(mobilePath);

      const mobileSize = await getFileSize(mobilePath);
      console.log(`  ✓ Mobile: ${mobileSize}MB (${((1 - mobileSize/originalSize) * 100).toFixed(0)}% smaller)`);
    }

    // Create a tiny blur placeholder for hero images
    if (isHeroImage) {
      const placeholderPath = path.join(dir, `${fileName}-placeholder.webp`);

      await sharp(inputPath)
        .resize(20, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .blur(5)
        .webp({ quality: 20 })
        .toFile(placeholderPath);

      console.log(`  ✓ Placeholder created`);
    }

    // Backup original
    const backupDir = path.join(dir, 'originals');
    await fs.mkdir(backupDir, { recursive: true });
    await fs.rename(inputPath, path.join(backupDir, path.basename(inputPath)));

    // Replace original with optimized version
    await fs.copyFile(desktopPath, inputPath);

  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory() && !entry.name.includes('originals')) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      await optimizeImage(fullPath);
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  const imagesDir = path.join(__dirname, '../public/images');

  // Get initial size
  const { size: initialSize } = await fs.stat(imagesDir);

  await processDirectory(imagesDir);

  console.log('\n✅ Image optimization complete!');
  console.log('💡 Remember to test the site to ensure all images display correctly.');
}

main().catch(console.error);