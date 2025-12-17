# Quick Start: HOMA Image Seeding

## Prerequisites

1. Get a Sanity authentication token:
   - Go to https://www.sanity.io/manage/personal/tokens
   - Click "Add token"
   - Give it a name like "HOMA Image Seeding"
   - Set permissions to "Editor" or "Administrator"
   - Copy the token (you'll only see it once!)

2. Make sure the homaPage document exists:
   - Visit your Sanity Studio
   - Navigate to "Homa Cafe Page"
   - If it doesn't exist, create it

## Run the Seed Script

### Option 1: Using npm script (Recommended)

```bash
cd /Volumes/Trey\'s\ Macbook\ TB/Kinship\ Landing/boutique-hotel/sanity-hostinger-test

SANITY_TOKEN=your_token_here npm run seed:homa-images
```

### Option 2: Direct node execution

```bash
cd /Volumes/Trey\'s\ Macbook\ TB/Kinship\ Landing/boutique-hotel/sanity-hostinger-test

SANITY_TOKEN=your_token_here node scripts/seed-homa-images.js
```

### Option 3: Set environment variable first

```bash
export SANITY_TOKEN=your_token_here
cd /Volumes/Trey\'s\ Macbook\ TB/Kinship\ Landing/boutique-hotel/sanity-hostinger-test
npm run seed:homa-images
```

## What Happens

The script will:
1. Check for the SANITY_TOKEN
2. Verify the homaPage document exists
3. Upload 13 images from `public/images/HOMA Page/`
4. Update the homaPage document with image references
5. Display a summary of uploaded images

## Expected Output

```
🚀 Starting HOMA Page Image Seeding...

✅ Found homaPage document

📤 Uploading: hero-triptych-1.webp...
✅ Uploaded: hero-triptych-1.webp (ID: image-abc123...)
📤 Uploading: hero-triptych-3.webp...
✅ Uploaded: hero-triptych-3.webp (ID: image-def456...)
...

📝 Updating homaPage document...
✅ homaPage document updated successfully!

📊 Summary:
   - Hero Triptych Images: 3
   - Specials Images: 3
   - Promo Images: 2
   - Seating Gallery Images: 5
   - Total Images Uploaded: 13

✨ HOMA Page image seeding complete!
```

## Verify Success

1. Open Sanity Studio
2. Go to Content → Homa Cafe Page
3. Check each section:
   - Hero Section: Should see 3 triptych images
   - Specials & Events: Should see happy hour, brunch, events images
   - Promos: Should see banner and loyalty card images
   - Seating Section: Should see 5 seating gallery images

4. Check the Next.js app:
   - Visit http://localhost:3000/homa
   - Images should load from Sanity CDN
   - Hero carousel should show the triptych images
   - Seating section should show the fireplace gallery

## Troubleshooting

**"SANITY_TOKEN environment variable is required"**
- Make sure you set the token before running the command
- Use the exact variable name: `SANITY_TOKEN`

**"homaPage document not found"**
- Create the document in Sanity Studio first
- Go to Content → Create new → Homa Cafe Page

**"Image not found"**
- The image files must be in `public/images/HOMA Page/`
- Check the filenames match exactly (case-sensitive)

**"Permission denied"**
- Your token needs Editor or Administrator permissions
- Create a new token with higher permissions

## Need Help?

See the full documentation:
- `README-HOMA-SEEDING.md` - Detailed usage guide
- `HOMA-SCHEMA-SUMMARY.md` - Schema field documentation
