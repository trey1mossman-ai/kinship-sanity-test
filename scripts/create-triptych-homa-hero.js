const sharp = require('sharp');
const path = require('path');

const homaPagePath = path.join(__dirname, '../public/images/HOMA Page');

// Kinship brand colors
const KINSHIP_GREEN_DARK = { r: 102, g: 124, b: 88 }; // #667C58
const KINSHIP_LATTE = { r: 244, g: 241, b: 236 }; // #F4F1EC

/**
 * Create sophisticated 3-panel triptych layout
 * Perfect for showcasing multiple aspects of HOMA in one elegant composition
 *
 * Layout: 40% | 30% | 30% with elegant gaps
 */
async function createTriptych(leftImg, centerImg, rightImg, outputName, options = {}) {
  const leftPath = path.join(homaPagePath, leftImg);
  const centerPath = path.join(homaPagePath, centerImg);
  const rightPath = path.join(homaPagePath, rightImg);
  const outputPath = path.join(homaPagePath, outputName);

  try {
    console.log(`\n🎨 ${outputName}`);
    console.log(`   Left: ${leftImg}`);
    console.log(`   Center: ${centerImg}`);
    console.log(`   Right: ${rightImg}`);

    // Target dimensions: 2400x1350 (16:9) for ultra-sharp hero
    const targetWidth = 2400;
    const targetHeight = 1350;
    const gapWidth = 16; // Elegant gap between panels

    // Panel widths: 40% dominant left, 30% center, 30% right
    const leftWidth = Math.floor((targetWidth - 2 * gapWidth) * 0.40);
    const centerWidth = Math.floor((targetWidth - 2 * gapWidth) * 0.30);
    const rightWidth = targetWidth - leftWidth - centerWidth - (2 * gapWidth);

    // Process left panel (dominant, hero shot)
    const leftProcessed = await sharp(leftPath)
      .resize(leftWidth, targetHeight, {
        fit: 'cover',
        position: options.leftFocus || 'center',
        kernel: sharp.kernel.lanczos3
      })
      .modulate({
        brightness: 1.02,
        saturation: 1.08,
      })
      .sharpen({ sigma: 0.8 })
      .png()
      .toBuffer();

    // Process center panel
    const centerProcessed = await sharp(centerPath)
      .resize(centerWidth, targetHeight, {
        fit: 'cover',
        position: options.centerFocus || 'center',
        kernel: sharp.kernel.lanczos3
      })
      .modulate({
        brightness: 1.02,
        saturation: 1.08,
      })
      .sharpen({ sigma: 0.8 })
      .png()
      .toBuffer();

    // Process right panel
    const rightProcessed = await sharp(rightPath)
      .resize(rightWidth, targetHeight, {
        fit: 'cover',
        position: options.rightFocus || 'center',
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
    const centerLeft = leftWidth + gapWidth;
    const rightLeft = centerLeft + centerWidth + gapWidth;

    // Create canvas with latte gaps (elegant negative space)
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
        { input: centerProcessed, top: 0, left: centerLeft },
        { input: rightProcessed, top: 0, left: rightLeft }
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
    console.log(`   Layout: 40% | 30% | 30%`);

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log('✨ Creating BRILLIANT Triptych Hero Carousel');
  console.log('   Style: Sophisticated 3-panel museum layout');
  console.log('   Panels: 40% dominant + 30% + 30% with elegant gaps');
  console.log('   Frame: Latte matte + dark green border\n');

  // Triptych 1: Café vibes - interior, espresso, food
  await createTriptych(
    'DSCF8548.webp',              // Dominant: stunning café interior
    'Homa Espresso Web Size_-4 (1).webp',  // Center: espresso close-up
    'homa 8.13.24-6 (1).webp',    // Right: café detail
    'hero-triptych-1.webp',
    { leftFocus: 'center', centerFocus: 'center', rightFocus: 'center' }
  );

  // Triptych 2: Culinary excellence - signature dish, cocktails, ambiance
  await createTriptych(
    'Signature Dishes.webp',      // Dominant: beautiful plated food
    'Craft Cocktails.webp',       // Center: craft cocktail
    'DSCF8589.webp',              // Right: elegant ambiance
    'hero-triptych-2.webp',
    { leftFocus: 'center', centerFocus: 'center', rightFocus: 'center' }
  );

  // Triptych 3: Happy hour & community - drinks, gathering, details
  await createTriptych(
    'homa-happy-hour-34.webp',    // Dominant: happy hour scene
    'Fresh and local.webp',       // Center: fresh ingredients
    'Homa.2.25-29 (1).webp',      // Right: cozy seating
    'hero-triptych-3.webp',
    { leftFocus: 'center', centerFocus: 'center', rightFocus: 'center' }
  );

  // Triptych 4: Brunch & morning vibes
  await createTriptych(
    'DSCF8589.webp',              // Dominant: beautiful space
    'Brunch.webp',                // Center: brunch plate
    'homa 8.13.24-6 (1).webp',    // Right: morning light
    'hero-triptych-4.webp',
    { leftFocus: 'center', centerFocus: 'center', rightFocus: 'center' }
  );

  console.log('\n🌟 BRILLIANT triptych carousel complete!');
  console.log('   • Sophisticated 3-panel layouts tell complete stories');
  console.log('   • 40/30/30 golden proportions create visual interest');
  console.log('   • Elegant latte gaps with refined dark green framing');
  console.log('   • Museum-quality presentation for maximum impact\n');
}

main().catch(console.error);
