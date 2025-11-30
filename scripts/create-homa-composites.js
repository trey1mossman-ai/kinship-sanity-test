const sharp = require('sharp');
const path = require('path');

const homaPagePath = path.join(__dirname, '../public/images/HOMA Page');

// Composite pairs: [left image, right image, output name]
const compositePairs = [
  {
    left: 'homa 8.13.24-6 (1).webp',
    right: 'Homa Espresso Web Size_-4 (1).webp',
    output: 'homa-cafe-composite.webp'
  },
  {
    left: 'Signature Dishes.webp',
    right: 'Craft Cocktails.webp',
    output: 'homa-food-drinks-composite.webp'
  }
];

async function createComposite(leftImg, rightImg, outputName) {
  const leftPath = path.join(homaPagePath, leftImg);
  const rightPath = path.join(homaPagePath, rightImg);
  const outputPath = path.join(homaPagePath, outputName);

  try {
    // Load both images
    const leftMetadata = await sharp(leftPath).metadata();
    const rightMetadata = await sharp(rightPath).metadata();

    // Calculate target dimensions - use the tallest height and combine widths
    const targetHeight = Math.max(leftMetadata.height, rightMetadata.height);

    // Resize both images to same height while maintaining aspect ratio
    const leftResized = await sharp(leftPath)
      .resize({ height: targetHeight, fit: 'cover' })
      .toBuffer();

    const rightResized = await sharp(rightPath)
      .resize({ height: targetHeight, fit: 'cover' })
      .toBuffer();

    // Get dimensions of resized images
    const leftResizedMeta = await sharp(leftResized).metadata();
    const rightResizedMeta = await sharp(rightResized).metadata();

    const totalWidth = leftResizedMeta.width + rightResizedMeta.width;

    // Create composite image
    await sharp({
      create: {
        width: totalWidth,
        height: targetHeight,
        channels: 3,
        background: { r: 255, g: 255, b: 255 }
      }
    })
      .composite([
        { input: leftResized, top: 0, left: 0 },
        { input: rightResized, top: 0, left: leftResizedMeta.width }
      ])
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    console.log(`✅ Created ${outputName}`);
    console.log(`   ${leftImg} + ${rightImg}`);
    console.log(`   Dimensions: ${totalWidth}x${targetHeight}px\n`);

  } catch (error) {
    console.error(`❌ Error creating ${outputName}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Creating HOMA hero composite images...\n');

  for (const pair of compositePairs) {
    await createComposite(pair.left, pair.right, pair.output);
  }

  console.log('✨ Composites complete!');
}

main().catch(console.error);
