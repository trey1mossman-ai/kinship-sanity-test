# HOMA Page Image Seeding

This directory contains the script to seed HOMA Cafe + Bar page images into Sanity CMS.

## Overview

The HOMA page uses several types of images:

1. **Hero Triptych** (3 images) - Rotating carousel images in the hero section
2. **Specials & Events** (3 images) - Happy Hour, Brunch, and Events cards
3. **Promo Section** (2 images) - Banner promo and loyalty card
4. **Seating Gallery** (5 images) - Fireplace/seating area carousel

## Prerequisites

1. **Sanity Token**: You need a Sanity authentication token with write permissions
   - Go to https://www.sanity.io/manage/personal/tokens
   - Create a new token with "Editor" or "Administrator" permissions
   - Copy the token

2. **homaPage Document**: The `homaPage` singleton document must exist in Sanity
   - If it doesn't exist, create it in Sanity Studio first
   - Navigate to Content → Homa Cafe Page

## Usage

### Run the seed script:

```bash
cd /Volumes/Trey\'s\ Macbook\ TB/Kinship\ Landing/boutique-hotel/sanity-hostinger-test

SANITY_TOKEN=your_token_here node scripts/seed-homa-images.js
```

### Alternative: Set environment variable

```bash
export SANITY_TOKEN=your_token_here
node scripts/seed-homa-images.js
```

## What Gets Uploaded

The script uploads the following images from `public/images/HOMA Page/`:

### Hero Triptych
- `hero-triptych-1.webp` → `heroTriptychImage1`
- `hero-triptych-3.webp` → `heroTriptychImage2`
- `Fresh and local.webp` → `heroTriptychImage3`

### Specials & Events
- `homa-happy-hour-34.webp` → `happyHourImage`
- `Brunch.webp` → `brunchImage`
- `CafeSeating2, SamStarr.webp` → `eventsImage`

### Promos
- `everything-turkey-promo-optimized.webp` → `promoBannerImage`
- `megaphone-promo.webp` → `loyaltyCardImage`

### Seating Gallery (Array)
- `homa seating-optimized.webp`
- `homa seating 2-optimized.webp`
- `Seating Homa -optimized.webp`
- `CafeSeating-GregCeo-optimized.webp`
- `CafeSeating-ChrystalHolmes (1)-optimized.webp`

## Schema Fields

The images are mapped to these fields in the `homaPage` schema:

```typescript
// Single images
heroTriptychImage1: image
heroTriptychImage2: image
heroTriptychImage3: image
happyHourImage: image
brunchImage: image
eventsImage: image
promoBannerImage: image
loyaltyCardImage: image

// Array of images
seatingImages: array of image
```

## Troubleshooting

### "SANITY_TOKEN environment variable is required"
- Make sure you set the `SANITY_TOKEN` environment variable
- Verify the token is valid at https://www.sanity.io/manage

### "homaPage document not found"
- Create the homaPage document in Sanity Studio first
- The document type is `homaPage` (singleton)

### "Image not found"
- Verify the image exists in `public/images/HOMA Page/`
- Check the filename matches exactly (case-sensitive)

### "Permission denied"
- Ensure your Sanity token has write/editor permissions
- Try creating a new token with Administrator role

## After Seeding

Once the images are uploaded:

1. Visit Sanity Studio at your-studio-url.sanity.studio
2. Go to Content → Homa Cafe Page
3. Verify all images are present
4. The Next.js app will automatically fetch these images via the GROQ query

## Re-running the Script

The script can be run multiple times safely. It will:
- Re-upload all images (creating new assets)
- Update the homaPage document with the new references
- Previous image assets will remain in Sanity (but not referenced)

To clean up unused assets, use Sanity Studio's asset management tools.

## Project Info

- **Sanity Project ID**: u2qzrboc
- **Dataset**: production
- **Schema Location**: `sanity-test-sandbox/schemaTypes/singletons/homaPage.ts`
- **Images Location**: `sanity-hostinger-test/public/images/HOMA Page/`
