const sharp = require('sharp');
const path = require('path');

const homaPagePath = path.join(__dirname, '../public/images/HOMA Page');

// Kinship brand colors
const KINSHIP_GREEN_DARK = { r: 102, g: 124, b: 88 }; // #667C58
const KINSHIP_LATTE = { r: 244, g: 241, b: 236 }; // #F4F1EC

/**
 * Create EXACT rooms page hero layout:
 * - Left 50%: Dominant hero image (full height)
 * - Right top 25%: Accent image 1 (half height)
 * - Right bottom 25%: Accent image 2 (half height)
 *
 * This matches the sophisticated asymmetric layout from the rooms page
 */
async function createRoomsStyleHero(leftImg, topRightImg, bottomRightImg, outputName) {
  const leftPath = path.join(homaPagePath, leftImg);
  const topRightPath = path.join(homaPagePath, topRightImg);
  const bottomRightPath = path.join(homaPagePath, bottomRightImg);
  const outputPath = path.join(homaPagePath, outputName);

  try {
    console.log(`\n🎨 ${outputName} (Rooms Page Style)`);
    console.log(`   Left 50%: ${leftImg}`);
    console.log(`   Top Right 25%: ${topRightImg}`);
    console.log(`   Bottom Right 25%: ${bottomRightImg}`);

    // Target dimensions: 2400x1350 (16:9) for hero
    const targetWidth = 2400;
    const targetHeight = 1350;
    const gapWidth = 16; // Elegant gap

    // Calculate panel sizes
    const leftWidth = Math.floor((targetWidth - gapWidth) / 2); // 50% minus half gap
    const rightWidth = targetWidth - leftWidth - gapWidth; // 50% minus half gap
    const rightHalfHeight = Math.floor((targetHeight - gapWidth) / 2); // Each right panel

    console.log(`   Layout: ${leftWidth}px × ${targetHeight}px | ${rightWidth}px × ${rightHalfHeight}px (×2)`);

    // Process left panel (dominant, full height)
    const leftProcessed = await sharp(leftPath)
      .resize(leftWidth, targetHeight, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .modulate({
        brightness: 1.02,
        saturation: 1.08,
      })
      .sharpen({ sigma: 0.8 })
      .png()
      .toBuffer();

    // Process top right panel (half height)
    const topRightProcessed = await sharp(topRightPath)
      .resize(rightWidth, rightHalfHeight, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .modulate({
        brightness: 1.02,
        saturation: 1.08,
      })
      .sharpen({ sigma: 0.8 })
      .png()
      .toBuffer();

    // Process bottom right panel (half height)
    const bottomRightProcessed = await sharp(bottomRightPath)
      .resize(rightWidth, rightHalfHeight, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .modulate({
        brightness: 1.02,
        saturation: 1.08,
      })
      .sharpen({ sigma: 0.8 })
      .png()
      .toBuffer();

    // Calculate positions
    const rightLeft = leftWidth + gapWidth;
    const bottomRightTop = rightHalfHeight + gapWidth;

    // Create canvas with latte background for gaps
    await sharp({
      create: {
        width: targetWidth,
        height: targetHeight,
        channels: 3,
        background: KINSHIP_LATTE
      }
    })
      .composite([
        { input: leftProcessed, top: 0, left: 0 },
        { input: topRightProcessed, top: 0, left: rightLeft },
        { input: bottomRightProcessed, top: bottomRightTop, left: rightLeft }
      ])
      .extend({
        top: 12,
        bottom: 12,
        left: 12,
        right: 12,
        background: KINSHIP_LATTE
      })
      .extend({
        top: 3,
        bottom: 3,
        left: 3,
        right: 3,
        background: KINSHIP_GREEN_DARK
      })
      .webp({ quality: 92, effort: 6 })
      .toFile(outputPath);

    const finalStats = await sharp(outputPath).metadata();
    const fileSizeMB = (require('fs').statSync(outputPath).size / 1024 / 1024).toFixed(2);

    console.log(`   ✅ ${finalStats.width}x${finalStats.height}px (${fileSizeMB}MB)`);
    console.log(`   Style: Asymmetric 50% + 25% + 25% (ROOMS PAGE REPLICA)`);

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log('✨ Creating Rooms Page Style HOMA Hero');
  console.log('   Layout: 50% dominant left + 25% stacked right panels');
  console.log('   Style: Exact replica of sophisticated rooms page layout\n');

  // Create the rooms-style hero (replacing hero-triptych-2)
  await createRoomsStyleHero(
    'DSCF8589.webp',           // Left 50%: Beautiful ambiance shot
    'Craft Cocktails.webp',    // Top Right 25%: Craft cocktail
    'Brunch.webp',             // Bottom Right 25%: Brunch plate
    'hero-triptych-2.webp'     // Replace existing triptych-2
  );

  console.log('\n🌟 Rooms-style hero complete!');
  console.log('   • Sophisticated asymmetric layout matching rooms page');
  console.log('   • 50/25/25 proportions create dramatic visual interest');
  console.log('   • Perfect for showcasing one dominant story + supporting details\n');
}

main().catch(console.error);
