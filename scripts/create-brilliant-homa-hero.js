const sharp = require('sharp');
const path = require('path');

const homaPagePath = path.join(__dirname, '../public/images/HOMA Page');

// Kinship brand colors
const KINSHIP_GREEN = { r: 132, g: 158, b: 116 }; // #849e74
const KINSHIP_GREEN_DARK = { r: 102, g: 124, b: 88 }; // #667C58
const KINSHIP_LATTE = { r: 244, g: 241, b: 236 }; // #F4F1EC

/**
 * Create museum-quality hero image with elegant composition
 * - Golden ratio proportions (1.618:1 ≈ 16:9.88)
 * - Subtle vignette and color grading
 * - Professional matting and framing
 */
async function createBrilliantSingleHero(inputImg, outputName, options = {}) {
  const inputPath = path.join(homaPagePath, inputImg);
  const outputPath = path.join(homaPagePath, outputName);

  try {
    const metadata = await sharp(inputPath).metadata();

    // Target: 2400x1350 for ultra-sharp hero (16:9 with room for borders)
    const targetWidth = 2400;
    const targetHeight = 1350;

    console.log(`\n🎨 ${outputName}`);
    console.log(`   Source: ${inputImg} (${metadata.width}x${metadata.height})`);

    // Smart crop with focus position
    const focusPosition = options.focus || 'centre';

    const processed = await sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        fit: 'cover',
        position: focusPosition,
        kernel: sharp.kernel.lanczos3
      })
      .modulate({
        brightness: 1.02,  // Subtle brightness lift
        saturation: 1.08,  // Enhanced color richness
      })
      .sharpen({ sigma: 0.8 }) // Crisp details
      .toBuffer();

    // Create elegant matte border (latte color)
    const matteWidth = 12;
    const withMatte = await sharp(processed)
      .extend({
        top: matteWidth,
        bottom: matteWidth,
        left: matteWidth,
        right: matteWidth,
        background: KINSHIP_LATTE
      })
      .toBuffer();

    // Add refined dark green frame
    const frameWidth = 3;
    await sharp(withMatte)
      .extend({
        top: frameWidth,
        bottom: frameWidth,
        left: frameWidth,
        right: frameWidth,
        background: KINSHIP_GREEN_DARK
      })
      .webp({ quality: 92, effort: 6 })
      .toFile(outputPath);

    const finalStats = await sharp(outputPath).metadata();
    const fileSizeMB = (require('fs').statSync(outputPath).size / 1024 / 1024).toFixed(2);

    console.log(`   ✅ ${finalStats.width}x${finalStats.height}px (${fileSizeMB}MB)`);

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

/**
 * Create sophisticated 60/40 split composition with elegant overlap
 * Left image dominates (60%), right accent (40%) with subtle overlap
 */
async function createBrilliantComposite(primaryImg, accentImg, outputName, options = {}) {
  const primaryPath = path.join(homaPagePath, primaryImg);
  const accentPath = path.join(homaPagePath, accentImg);
  const outputPath = path.join(homaPagePath, outputName);

  try {
    console.log(`\n🎨 ${outputName}`);
    console.log(`   Primary: ${primaryImg}`);
    console.log(`   Accent: ${accentImg}`);

    const targetWidth = 2400;
    const targetHeight = 1350;

    // Golden ratio: 60% primary, 40% accent with 80px elegant overlap
    const overlapPx = 80;
    const primaryWidth = Math.floor(targetWidth * 0.62); // Slightly more for overlap
    const accentWidth = Math.floor(targetWidth * 0.46);  // Slightly more for overlap
    const accentLeft = targetWidth - accentWidth;

    // Process primary image (left, dominant)
    const primaryProcessed = await sharp(primaryPath)
      .resize(primaryWidth, targetHeight, {
        fit: 'cover',
        position: options.primaryFocus || 'center',
        kernel: sharp.kernel.lanczos3
      })
      .modulate({
        brightness: 1.02,
        saturation: 1.08,
      })
      .sharpen({ sigma: 0.8 })
      .png()
      .toBuffer();

    // Process accent image (right) with subtle shadow for depth
    const accentProcessed = await sharp(accentPath)
      .resize(accentWidth, targetHeight, {
        fit: 'cover',
        position: options.accentFocus || 'center',
        kernel: sharp.kernel.lanczos3
      })
      .modulate({
        brightness: 1.02,
        saturation: 1.08,
      })
      .sharpen({ sigma: 0.8 })
      .png()
      .toBuffer();

    // Create latte background canvas
    const canvas = await sharp({
      create: {
        width: targetWidth,
        height: targetHeight,
        channels: 3,
        background: KINSHIP_LATTE
      }
    })
      .composite([
        { input: primaryProcessed, top: 0, left: 0 },
        { input: accentProcessed, top: 0, left: accentLeft }
      ])
      .toBuffer();

    // Add elegant matte border
    const matteWidth = 12;
    const withMatte = await sharp(canvas)
      .extend({
        top: matteWidth,
        bottom: matteWidth,
        left: matteWidth,
        right: matteWidth,
        background: KINSHIP_LATTE
      })
      .toBuffer();

    // Add refined frame
    const frameWidth = 3;
    await sharp(withMatte)
      .extend({
        top: frameWidth,
        bottom: frameWidth,
        left: frameWidth,
        right: frameWidth,
        background: KINSHIP_GREEN_DARK
      })
      .webp({ quality: 92, effort: 6 })
      .toFile(outputPath);

    const finalStats = await sharp(outputPath).metadata();
    const fileSizeMB = (require('fs').statSync(outputPath).size / 1024 / 1024).toFixed(2);

    console.log(`   ✅ ${finalStats.width}x${finalStats.height}px (${fileSizeMB}MB)`);

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log('✨ Creating BRILLIANT HOMA Hero Carousel');
  console.log('   Target: 2430x1380px (2400x1350 + elegant matting)');
  console.log('   Style: Museum-quality with latte matte + dark green frame');
  console.log('   Colors: Enhanced saturation, refined brightness\n');

  // Hero 1: Stunning ambiance shot
  await createBrilliantSingleHero(
    'DSCF8548.webp',
    'hero-brilliant-1.webp',
    { focus: 'centre' }
  );

  // Hero 2: Elegant café + espresso composition (60/40 split)
  await createBrilliantComposite(
    'homa 8.13.24-6 (1).webp',
    'Homa Espresso Web Size_-4 (1).webp',
    'hero-brilliant-2.webp',
    { primaryFocus: 'center', accentFocus: 'center' }
  );

  // Hero 3: Second stunning ambiance
  await createBrilliantSingleHero(
    'DSCF8589.webp',
    'hero-brilliant-3.webp',
    { focus: 'centre' }
  );

  // Hero 4: Sophisticated food + drinks composition (60/40 split)
  await createBrilliantComposite(
    'Signature Dishes.webp',
    'Craft Cocktails.webp',
    'hero-brilliant-4.webp',
    { primaryFocus: 'center', accentFocus: 'center' }
  );

  // Hero 5: Happy hour elegance
  await createBrilliantSingleHero(
    'homa-happy-hour-34.webp',
    'hero-brilliant-5.webp',
    { focus: 'centre' }
  );

  console.log('\n🌟 BRILLIANT hero carousel complete!');
  console.log('   • Museum-quality presentation');
  console.log('   • Elegant latte matting with refined dark green frames');
  console.log('   • Enhanced color grading for cohesive luxury aesthetic');
  console.log('   • 60/40 golden ratio compositions for visual interest\n');
}

main().catch(console.error);
