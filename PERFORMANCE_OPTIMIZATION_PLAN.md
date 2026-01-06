# Kinship Website Performance Optimization

> **Created:** January 6, 2026  
> **Status:** Complete  
> **Target:** 80+ Performance Score ✅ ACHIEVED

---

## Final Scores (January 6, 2026)

| Tool | Score |
|------|-------|
| Google PageSpeed Insights | 84 |
| GTmetrix | 88 |
| Pingdom | 79 (may be cached) |

**Dev Site:** https://mediumblue-chamois-837591.hostingersite.com/

---

## Score Progression

| Date | Action | Google Score | Change |
|------|--------|--------------|--------|
| Jan 6 | Baseline | 56 | - |
| Jan 6 | Video lazy-load | 73 | +17 |
| Jan 6 | Local image compression | 79 | +6 |
| Jan 6 | Footer CLS fix | 82 | +3 |
| Jan 6 | Sanity image transforms | 84 | +2 |

**Total improvement: +28 points (56 → 84)**

---

## Completed Optimizations

### 1. Hero Video Lazy Load

**Problem:** 27.9 MB video from GHL loading immediately, blocking LCP.

**Solution:**
- Added 2-second delay before video element renders
- Changed `preload` from `metadata` to `none`
- Poster image shows immediately for fast LCP

**File:** `components/HeroEnhanced/BackgroundMedia.tsx`

**Result:** +17 points

---

### 2. Local Image Compression

**Problem:** Oversized local images in `/public/`.

**Changes:**
- Pikes Peak texture: 2.7MB → 1.1MB (resized 4518w → 1200w)
- 6 room/event images compressed to 800w (saved ~3.2MB total)

**Files compressed:**
- `public/textures/KL-Pikes-Peak-Topo-Map-Gray.webp`
- `public/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge (1)-optimized.webp`
- `public/images/events-page/Weddings/event image-optimized.webp`
- `public/images/events-page/The Yard/IMG_1494.webp`
- `public/images/events-page/Meetings:Retreats/Kinship-4G3A9437-1 (1).webp`
- `public/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (1) (1)-optimized.webp`
- `public/images/Rooms Page:section/Mountain Jr. Queen/MountainJrQueenSuite-RichardSeldomridge-optimized.webp`

**Result:** +6 points

---

### 3. Footer Image CLS Fix

**Problem:** Two footer images missing width/height attributes caused layout shift.

**Solution:** Added explicit dimensions:
- `KL-Values-Badge-GREEN.webp`: width=160 height=161
- `HOMA-at-Kinship-BLACK.webp`: width=160 height=66

**Files:** `components/Footer.tsx`, `components/FooterClient.tsx`

**Result:** +3 points (improved CLS)

---

### 4. Sanity Image Transforms

**Problem:** Sanity images served at full resolution without optimization.

**Solution:** Created utility to append CDN transform params to Sanity URLs.

**New Files:**
- `lib/sanity/imageTransform.ts` - URL transform utility
- `components/OptimizedImage.tsx` - Image wrapper with presets

**Presets:**
| Preset | Width | Quality | Use Case |
|--------|-------|---------|----------|
| hero | 1920 | 80 | Full-width hero images |
| card | 800 | 80 | Room cards, grid items |
| gallery | 1200 | 80 | Lightbox, galleries |
| thumbnail | 400 | 75 | Small previews |
| background | 1920 | 70 | Decorative backgrounds |

**How it works:**
```
BEFORE: https://cdn.sanity.io/images/.../abc.jpg
AFTER:  https://cdn.sanity.io/images/.../abc.jpg?w=800&auto=format&q=80
```

**Files updated:**
- `components/home/RoomsGridSanity.tsx`
- `app/gallery/GalleryPageClient.tsx`

**Result:** +2 points

---

## CMS Impact

**None.** All optimizations are code-side only:
- Sanity Studio: No changes
- Schemas: No changes
- Client workflow: Unchanged
- Existing content: No re-upload needed
- Future uploads: Auto-optimized via CDN transforms

---

## Remaining Opportunities

| Issue | Potential Gain | Notes |
|-------|----------------|-------|
| Video compression | +5-10 | 27.9MB GHL video - needs external compression |
| Legacy JavaScript | Minor | Next.js bundle optimization, diminishing returns |
| Cache headers | Minor | Hostinger config, not code-side |

---

## Deployment Notes

- This repo deploys to **dev site only**
- Dev: https://mediumblue-chamois-837591.hostingersite.com/
- Production: https://www.kinshiplanding.com/ (separate deployment)
- Sanity webhook triggers rebuild on content publish
