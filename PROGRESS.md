# PROGRESS LOG

> **Last Updated:** 2026-01-27
> **Project:** Kinship Landing Website - Sanity CMS Integration

---

## Current State

- **Dev Site:** https://mediumblue-chamois-837591.hostingersite.com/
- **Performance:** 84 Google PageSpeed, 88 GTmetrix (was 56)
- **CMS:** Fully functional Sanity integration
- **Branch:** main (clean, all changes pushed)

---

## Session Log

### 2026-01-27
**Focus:** SEO Fixes - 301 Redirects and Canonical Handling

**Completed:**
- Fixed 35+ server 500 errors from old URL structure
- Converted 55+ redirects from vercel.json (Vercel format) to Apache RewriteRules
- Added canonical handling for tracking parameters (?wwpath=, ?gclid=, utm_*, fbclid)
- Added www canonicalization (non-www → www)
- Updated GitHub Actions workflow to copy .htaccess-production instead of generating new one
- Deployed and verified all redirects working live

**Files Changed:**
.htaccess-production - Added all redirect rules and canonical handling
.github/workflows/deploy-hostinger.yml - Updated to use .htaccess-production

**Notes:**
- Root cause: Redirects were in vercel.json but site runs on Apache/Hostinger
- Lauren notified via email with Hostinger credentials, GTM tags, and SEO report
- Lauren needs to request revalidation in Google Search Console

---

### 2026-01-06
**Focus:** Performance Optimization

**Completed:**
- Achieved 84 Google PageSpeed score (up from 56, +28 points)
- Video lazy-loading: 2-second delay before hero video renders (+17 points)
- Local image compression: Pikes Peak texture 2.7MB→1.1MB, 6 other images compressed (+6 points)
- Footer CLS fix: Added width/height to footer logo images (+3 points)
- Sanity image transforms: Created imageTransform.ts utility and OptimizedImage component (+2 points)

**Files Changed:**
- `components/HeroEnhanced/BackgroundMedia.tsx` - video lazy-load
- `components/Footer.tsx`, `components/FooterClient.tsx` - CLS fix
- `components/home/RoomsGridSanity.tsx` - OptimizedImage integration
- `app/gallery/GalleryPageClient.tsx` - OptimizedImage integration
- `lib/sanity/imageTransform.ts` - NEW: URL transform utility
- `components/OptimizedImage.tsx` - NEW: Image wrapper with presets

**Notes for Next Session:**
- Sanity webhook triggers auto-rebuild on publish (working)
- Remaining perf opportunity: Compress 27.9MB GHL video externally
- All Sanity images now auto-optimize via CDN transforms

---

### December 2024
**Focus:** Rich Text Implementation (Complete)

- Homepage: 9 fields migrated to rich text
- Rooms Page: 23 fields migrated
- Events Page: 18 fields migrated  
- Offers Page: Initial rich text implementation
- Created RichTextRenderer component
- Full migration playbook documented

See PERFORMANCE_OPTIMIZATION_PLAN.md for detailed perf work.
See RICH_TEXT_MIGRATION_PLAYBOOK.md for CMS migration process.

---

## Next Steps

1. ~~Performance optimization~~ ✅ Complete (84 score achieved)
2. Consider compressing GHL hero video (27.9MB) if mobile scores need improvement
3. Roll out rich text to remaining pages (About, HOMA, Community) when client requests

---

## API Token Location

The Sanity API token is stored in:
- `/sanity-test-sandbox/.env.local`
- `/sanity-hostinger-test/.env.local`
