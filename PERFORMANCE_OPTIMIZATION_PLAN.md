# Kinship Website Performance Optimization Plan

> **Created:** January 6, 2026
> **Status:** In Progress
> **Target:** 80+ Lighthouse Performance Score
> **Constraint:** All CMS functionality must remain intact

---

## Current State

| Date | Action | Score | Change |
|------|--------|-------|--------|
| Jan 6 (before) | Baseline | 56 | - |
| Jan 6 (after video lazy-load) | Deployed to dev | 73 | +17 |

**Dev Site:** https://mediumblue-chamois-837591.hostingersite.com/
**Production:** https://www.kinshiplanding.com/ (separate deployment)

---

## Completed Optimizations

### 1. Hero Video Lazy Load (DONE - Jan 6, 2026)

**Problem:** 27.9 MB video from GHL loading immediately, blocking page render.

**Solution:** 
- Added 2-second delay before video element renders
- Changed preload from metadata to none
- Poster image shows immediately for fast LCP

**File Changed:** components/HeroEnhanced/BackgroundMedia.tsx

**Result:** 56 to 73 (+17 points)

**CMS Impact:** None - video URL still comes from Sanity or fallback as before.

---

## Remaining Optimizations

### 2. Sanity Image Transforms (NOT STARTED)

**Problem:** 
All Sanity images use raw URLs with no optimization. Example:
- Image uploaded at 1920x1414
- Displayed at 380x507
- Full 1920px image downloaded anyway
- No WebP/AVIF conversion

Lighthouse identified 2.2 MB of wasted image bytes.

**Solution:**
Use Sanity image URL builder to add transform parameters.

BEFORE: https://cdn.sanity.io/images/.../abc123.jpg
AFTER:  https://cdn.sanity.io/images/.../abc123.jpg?w=800&auto=format&q=80

**Implementation:**

1. Create lib/sanity/image.ts with urlForImage helper
2. Update GROQ queries to return asset reference instead of raw URL
3. Update components to use helper with width/format params

**Why This Works:**
- Sanity CDN processes images on-the-fly
- Same image in database, optimized delivery via URL params
- auto=format serves WebP to Chrome, AVIF to Safari
- Responsive sizing means smaller downloads

**CMS Impact:** 
- Sanity Studio: No change
- Schemas: No change
- Existing content: No re-upload needed
- Client workflow: Unchanged - future uploads auto-optimize

**Expected Result:** Save 1-2 MB, gain 3-5 points (73 to 76-78)

---

### 3. Local Texture Optimization (NOT STARTED)

**Problem:**
/public/textures/KL-Pikes-Peak-Topo-Map-Gray.webp is 2.7 MB.
This is a decorative background texture, not content the client manages.

**Solution:**
One-time compression using sharp at 75% quality.
Target: 200-400 KB (same visual quality)

**CMS Impact:** None - this is a local file, not in Sanity.

**Expected Result:** Save 2+ MB, gain 2-4 points (76-78 to 78-82)

---

## Projected Final Score

| Optimization | Points Gained | Running Total |
|--------------|---------------|---------------|
| Baseline | - | 56 |
| Video lazy-load | +17 | 73 |
| Sanity image transforms | +3-5 | 76-78 |
| Local texture compression | +2-4 | 78-82 |

**Target of 80+ is achievable with these three optimizations.**

---

## What Does NOT Need to Change

- Sanity Studio interface
- Sanity schemas
- Existing CMS content
- Client upload workflow
- Any re-uploading of images

All optimizations are code-side only. The CMS remains exactly as it is.

---

## Deployment Notes

- This repo (sanity-hostinger-test) deploys to dev site only
- Dev URL: https://mediumblue-chamois-837591.hostingersite.com/
- Production (kinshiplanding.com) has a separate deployment process
- Test all changes on dev before promoting to production
