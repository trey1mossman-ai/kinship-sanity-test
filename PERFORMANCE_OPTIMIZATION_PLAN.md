# Kinship Website Performance Optimization Plan

> **Created:** January 6, 2026
> **Status:** Planning
> **Target:** 80+ Lighthouse Performance Score
> **Constraint:** All CMS functionality must remain intact

---

## Current State (Lighthouse Report - Jan 6, 2026)

| Metric | Current | Target | Gap |
|--------|---------|--------|-----|
| **Performance Score** | 56/100 | 80+ | -24 |
| **LCP** | 31.9s | <2.5s | Critical |
| **FCP** | 5.3s | <1.8s | Poor |
| **Total Page Weight** | 37.4 MB | <5 MB | Critical |

---

## Root Causes

1. **HERO VIDEO: 27.9 MB** (75% of page weight) - External GHL storage
2. **Sanity Images: No Optimization** - Using raw asset->url
3. **Local Images: Unoptimized** - 2.7 MB texture, 23 files over 500KB
4. **Third-Party Scripts** - Clarity, GTM, Facebook blocking

---

## CMS Compatibility Requirements

**MUST NOT BREAK:** All 13 page integrations, editable fields, PDF uploads
**MUST MAINTAIN:** Auto-optimization on client image uploads

---

## The Solution: Sanity Image Transforms

Sanity CDN supports on-the-fly optimization via URL parameters.
Client uploads ANY image -> Sanity auto-optimizes on delivery.
No changes to Sanity Studio or existing CMS data.

---

## Implementation Phases

### Phase 1: Hero Video Fix (HIGHEST IMPACT)
Saves ~25 MB. Options: compress, host ourselves, or replace with image.

### Phase 2: Sanity Image Optimization
Create urlForImage() helper, update queries for asset references, add responsive srcsets.

### Phase 3: Local Image Optimization  
One-time compression of /public/images, especially 2.7MB texture.

### Phase 4: JavaScript Optimization
Defer Clarity, Facebook Pixel, lazy load GTM.

### Phase 5: SEO/Technical Fixes
Add canonical URLs, fix heading hierarchy, color contrast.

---

## Questions to Resolve

1. Hero Video: Get compressed from GHL or host ourselves?
2. Which local images should move to Sanity for editability?
3. Deploy incrementally or batch?
