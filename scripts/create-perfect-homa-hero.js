const sharp = require('sharp');
const path = require('path');

const homaPagePath = path.join(__dirname, '../public/images/HOMA Page');

// Kinship brand colors
const KINSHIP_GREEN_DARK = '#667C58';
const BORDER_WIDTH = 2;
const GAP_WIDTH = 16; // Space between images in composite

/**
 * Create a perfectly balanced side-by-side composite with subtle borders
 * Target aspect ratio: 16:9 for optimal hero display
 */
async function createPerfectComposite(leftImg, rightImg, outputName) {
  const leftPath = path.join(homaPagePath, leftImg);
  const rightPath = path.join(homaPagePath, rightImg);
  const outputPath = path.join(homaPagePath, outputName);

  try {
    // Load both images
    const leftMetadata = await sharp(leftPath).metadata();
    const rightMetadata = await sharp(rightPath).metadata();

    // Target dimensions for hero (16:9 aspect ratio, optimized for web)
    const targetHeight = 1080;
    const targetWidth = 1920;
    const halfWidth = Math.floor((targetWidth - GAP_WIDTH) / 2);

    console.log(`\n📸 Processing: ${outputName}`);
    console.log(`   Left: ${leftImg} (${leftMetadata.width}x${leftMetadata.height})`);
    console.log(`   Right: ${rightImg} (${rightMetadata.width}x${rightMetadata.height})`);

    // Process left image: resize and crop to half width maintaining aspect ratio
    const leftProcessed = await sharp(leftPath)
      .resize(halfWidth, targetHeight, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .toFormat('png')
      .toBuffer();

    // Process right image: resize and crop to half width maintaining aspect ratio
    const rightProcessed = await sharp(rightPath)
      .resize(halfWidth, targetHeight, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .toFormat('png')
      .toBuffer();

    // Create canvas with gap background (subtle green)
    await sharp({
      create: {
        width: targetWidth,
        height: targetHeight,
        channels: 3,
        background: { r: 102, g: 124, b: 88 } // Kinship green for the gap
      }
    })
      .composite([
        { input: leftProcessed, top: 0, left: 0 },
        { input: rightProcessed, top: 0, left: halfWidth + GAP_WIDTH }
      ])
      .extend({
        top: BORDER_WIDTH,
        bottom: BORDER_WIDTH,
        left: BORDER_WIDTH,
        right: BORDER_WIDTH,
        background: KINSHIP_GREEN_DARK
      })
      .webp({ quality: 88, effort: 6 })
      .toFile(outputPath);

    const finalStats = await sharp(outputPath).metadata();
    const fileSizeMB = (require('fs').statSync(outputPath).size / 1024 / 1024).toFixed(2);

    console.log(`   ✅ Created: ${finalStats.width}x${finalStats.height}px (${fileSizeMB}MB)`);
    console.log(`   📐 Aspect: ${(finalStats.width / finalStats.height).toFixed(2)}:1`);

  } catch (error) {
    console.error(`❌ Error creating ${outputName}:`, error.message);
  }
}

/**
 * Process single image for hero carousel with perfect framing
 */
async function processSingleHeroImage(inputImg, outputName) {
  const inputPath = path.join(homaPagePath, inputImg);
  const outputPath = path.join(homaPagePath, outputName);

  try {
    const metadata = await sharp(inputPath).metadata();

    // Target dimensions for hero (16:9 aspect ratio)
    const targetHeight = 1080;
    const targetWidth = 1920;

    console.log(`\n📸 Processing: ${outputName}`);
    console.log(`   Source: ${inputImg} (${metadata.width}x${metadata.height})`);

    // Resize and crop to perfect 16:9
    const processed = await sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .toBuffer();

    // Add subtle border
    await sharp(processed)
      .extend({
        top: BORDER_WIDTH,
        bottom: BORDER_WIDTH,
        left: BORDER_WIDTH,
        right: BORDER_WIDTH,
        background: KINSHIP_GREEN_DARK
      })
      .webp({ quality: 88, effort: 6 })
      .toFile(outputPath);

    const finalStats = await sharp(outputPath).metadata();
    const fileSizeMB = (require('fs').statSync(outputPath).size / 1024 / 1024).toFixed(2);

    console.log(`   ✅ Created: ${finalStats.width}x${finalStats.height}px (${fileSizeMB}MB)`);

  } catch (error) {
    console.error(`❌ Error processing ${outputName}:`, error.message);
  }
}

async function main() {
  console.log('🎨 Creating perfect HOMA hero carousel images...');
  console.log(`   Border: ${BORDER_WIDTH}px ${KINSHIP_GREEN_DARK}`);
  console.log(`   Gap: ${GAP_WIDTH}px between composite images`);
  console.log(`   Target: 16:9 aspect ratio (1920x1080)`);

  // Create composites
  await createPerfectComposite(
    'homa 8.13.24-6 (1).webp',
    'Homa Espresso Web Size_-4 (1).webp',
    'hero-cafe-composite.webp'
  );

  await createPerfectComposite(
    'Signature Dishes.webp',
    'Craft Cocktails.webp',
    'hero-food-drinks-composite.webp'
  );

  // Process individual hero images for consistency
  await processSingleHeroImage('DSCF8548.webp', 'hero-ambiance-1.webp');
  await processSingleHeroImage('DSCF8589.webp', 'hero-ambiance-2.webp');

  console.log('\n✨ Perfect hero carousel complete!');
  console.log('   All images: 1924x1084px (1920x1080 + 2px border on each side)');
  console.log('   Ready for seamless carousel transitions\n');
}

main().catch(console.error);
