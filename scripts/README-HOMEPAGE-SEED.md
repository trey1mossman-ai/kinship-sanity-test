# Homepage Images Seed Script

This script uploads homepage images from the Next.js public directory to Sanity CMS and updates the homepage document with the image references.

## Prerequisites

1. **Sanity API Token**: You need a write token from your Sanity project
   - Go to https://www.sanity.io/manage/personal/tokens
   - Create a new token with "Editor" permissions
   - Copy the token

2. **Environment Variable**: Set the token in your environment
   ```bash
   # Add to .env.local
   SANITY_API_TOKEN=your-token-here
   ```

3. **Homepage Document**: Ensure a homepage document exists in Sanity Studio
   - Go to your Sanity Studio (sanity-test-sandbox)
   - Navigate to Homepage singleton
   - If it doesn't exist, create it first

## Usage

### Run the seed script:
```bash
cd sanity-hostinger-test
node scripts/seed-homepage-images.js
```

### Or with inline token (for testing):
```bash
SANITY_API_TOKEN=your-token node scripts/seed-homepage-images.js
```

## What Gets Uploaded

The script uploads the following images:

| Field Name | Image Path | Description |
|------------|-----------|-------------|
| `guideBackgroundImage` | `HomePage/GardenoftheGods, SamStarr-mobile.webp` | Guide section background (Garden of the Gods) |
| `guideStampImage` | `HomePage/background for stay explore gather drink eat-mobile.webp` | Stay/Explore/Gather background |
| `eventsSectionImage` | `HomePage/event image-optimized.webp` | Events section featured image |
| `pressBackgroundMural` | `HomePage/Background-mural-mobile.webp` | Press & Reviews section mural background |
| `woodwallBreakImage` | `About/WoodWall-SamStarr.webp` | Visual break before FAQ section |

## Notes

- **Hero Image**: The hero section currently uses a video with a fallback image. If you want to upload a static hero poster image, uncomment the `heroImage` line in the script and ensure the file exists at `public/images/HomePage/hero-poster-kinship-landing.webp`

- **Missing Files**: If an image file is not found, the script will skip it with a warning and continue processing other images.

- **Existing Images**: The script will replace existing image references in the homepage document. Previous images in Sanity's asset library are not deleted automatically.

## Troubleshooting

### "No homepage document found"
- Create a homepage document in Sanity Studio first
- Go to the studio and create/publish the Homepage singleton

### "SANITY_API_TOKEN is required"
- Make sure you've set the environment variable
- Check that your .env.local file is in the correct directory
- Verify the token has write permissions

### "Image not found"
- Check that the image exists in the public/images directory
- Verify the file path is correct (case-sensitive)
- Look for the actual files in the public/images folder

## Schema Fields Added

The following image fields have been added to the homepage schema:

1. **Press & Reviews Section**:
   - `pressBackgroundMural` - Background mural for press section (with opacity)

2. **Map Section**:
   - `woodwallBreakImage` - Visual break image showing interior craftsmanship

All other homepage image fields (hero, guide, events, HOMA, rooms) already existed in the schema.

## Next Steps

After running the seed script:

1. Go to Sanity Studio (http://localhost:3333)
2. Navigate to Homepage
3. Verify all images are uploaded correctly
4. Add alt text and adjust hotspots if needed
5. Publish the changes
6. Test the homepage on the Next.js app to ensure images display correctly
