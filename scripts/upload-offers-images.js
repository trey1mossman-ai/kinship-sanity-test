#!/usr/bin/env node
/**
 * Upload images to Sanity and update the offers page document
 * Run with: SANITY_API_TOKEN=your_token node scripts/upload-offers-images.js
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const IMAGES_DIR = path.join(__dirname, '../public/images/Offers');

const imagesToUpload = {
  heroImage: {
    filename: 'aligarciaphotography-72.webp',
    alt: 'Kinship Landing Special Offers'
  },
  offers: [
    {
      key: 'nye-offer',
      filename: 'NYE Promo (1080 x 566 px).webp',
      title: 'Ring in the New Year',
      alt: 'New Year\'s Eve Special Offer',
      description: 'Celebrate New Year\'s Eve at Kinship Landing with our special holiday package.',
      bookingUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E',
      isActive: true
    },
    {
      key: 'elevator-offer',
      filename: 'Take the Elevator Home (1080 x 1080 px) (1).webp',
      title: 'Take the Elevator Home',
      alt: 'Take the Elevator Home - Special Accommodation Offer',
      description: 'Enjoy a night out at HOMA and skip the ride home. Book a room and get special rates.',
      bookingUrl: 'https://hotels.cloudbeds.com/reservation/4nfQ6E',
      isActive: true
    }
  ]
};

async function uploadImage(filepath) {
  console.log(`Uploading: ${path.basename(filepath)}`);
  const imageBuffer = fs.readFileSync(filepath);
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: path.basename(filepath),
    contentType: 'image/webp'
  });
  console.log(`  -> Uploaded as: ${asset._id}`);
  return asset;
}

async function main() {
  console.log('Starting offers page image upload...\n');

  try {
    // 1. Upload hero image
    const heroPath = path.join(IMAGES_DIR, imagesToUpload.heroImage.filename);
    console.log('Uploading hero image...');
    const heroAsset = await uploadImage(heroPath);

    // 2. Upload offer images and build offers array
    console.log('\nUploading offer images...');
    const offersWithImages = [];

    for (const offer of imagesToUpload.offers) {
      const offerPath = path.join(IMAGES_DIR, offer.filename);
      const offerAsset = await uploadImage(offerPath);

      offersWithImages.push({
        _key: offer.key,
        title: offer.title,
        alt: offer.alt,
        description: offer.description,
        bookingUrl: offer.bookingUrl,
        isActive: offer.isActive,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: offerAsset._id
          }
        }
      });
    }

    // 3. Update the offersPage document with images
    console.log('\nUpdating offersPage document...');

    const result = await client.createOrReplace({
      _id: 'offersPage',
      _type: 'offersPage',
      heroTitle: 'Special Offers',
      heroSubtitle: 'Discover exclusive deals and packages for your Colorado Springs adventure',
      heroImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: heroAsset._id
        }
      },
      description: 'From extended stays to local experiences, find the perfect package for your Colorado Springs getaway.',
      introTitle: 'Current Promotions',
      introText: 'Take advantage of our limited-time offers and experience outrageous hospitality at special rates. Click any offer to view full details.',
      introBadge: 'Save on Your Stay',
      offers: offersWithImages,
      seoTitle: 'Special Offers & Packages | Kinship Landing',
      seoDescription: 'Discover exclusive deals and packages for your Colorado Springs adventure at Kinship Landing boutique hotel.'
    });

    console.log('\nSuccess! Offers page updated with images.');
    console.log('Document ID:', result._id);
    console.log('\nUploaded:');
    console.log('  - Hero image: aligarciaphotography-72.webp');
    console.log('  - NYE Promo image');
    console.log('  - Take the Elevator Home image');
    console.log('\nView at: https://kinship-landing.sanity.studio/structure/offersPage');

  } catch (error) {
    console.error('Error:', error.message);
    if (error.message.includes('Could not find')) {
      console.error('\nMake sure the image files exist in:', IMAGES_DIR);
    }
    process.exit(1);
  }
}

main();
