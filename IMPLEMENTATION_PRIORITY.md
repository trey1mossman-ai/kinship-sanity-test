# 🎯 Kinship Landing - Implementation Priority & Guidelines

**Last Updated**: September 2025
**Status**: ACTIVE DEVELOPMENT

---

## 🚦 What CAN and CAN'T Be Changed

### ✅ **CAN CHANGE** (Client Requirements Priority)
1. **Hero Section**
   - ✅ Add video background (replace static image)
   - ✅ Enhance booking widget (larger, more prominent)
   - ✅ Add rotating reviews overlay
   - ✅ Improve text/widget alignment

2. **Homepage Structure**
   - ✅ Reorganize content blocks per client requirements
   - ✅ Combine sections for better flow
   - ✅ Add animations and parallax effects
   - ✅ Implement two-column layouts

3. **Visual Effects**
   - ✅ Add scroll-triggered animations
   - ✅ Implement Ken Burns effects
   - ✅ Add subtle parallax (0.5-0.8 ratio)
   - ✅ Custom image shapes (diagonal cuts)

4. **HOMA Integration**
   - ✅ Implement distinct HOMA branding
   - ✅ Use HOMA colors and logo
   - ✅ Create overlapping image galleries

### ❌ **CANNOT CHANGE** (Brand Foundation)
1. **Typography**
   - ❌ Font families: Europa (body), Utopia Std Display (headings)
   - ❌ Type scale ratios
   - ⚠️ Can adjust sizes for better readability

2. **Core Brand Voice**
   - ❌ Personality: Friendly, Fun, Confident
   - ❌ Mission: Making guests feel loved and understood
   - ✅ Can enhance with animations that reflect these values

3. **Logo System**
   - ❌ Dual-logo lockup structure
   - ❌ Logo positioning ratios
   - ✅ Can improve transitions and interactions

4. **Color Foundation**
   - ❌ Primary green: #849e74
   - ❌ Core palette values
   - ✅ Can add SOP colors (Mocha #A47864, Lavender #A78BFA)

---

## 📋 Current Component Architecture

### Active Components
- **Hero**: `components/HeroEnhanced/` (ACTIVE)
- **Homepage**: `app/page.tsx` (ACTIVE)
- **Brand Config**: `lib/config/brand.ts` (SOURCE OF TRUTH)

### Deprecated/Unused
- `components/Hero.tsx` (OLD - DO NOT USE)
- `components/HeroConversion.tsx` (OLD - DO NOT USE)
- `components/home/Hero.tsx` (OLD - DO NOT USE)
- `app/homepage-conversion.tsx` (UNUSED VARIANT)

---

## 🎬 Priority 1: Hero Video Implementation

### Requirements
```typescript
// Video specifications
- Format: MP4 + WebM for compatibility
- Size: <10MB compressed
- Autoplay, muted, loop
- Mobile fallback: Static image
```

### Implementation Path
1. Replace `BackgroundMedia` type from "image" to "video"
2. Add video source with fallback
3. Implement lazy loading for mobile
4. Test performance impact

---

## 🏗️ Priority 2: Enhanced Booking Widget

### Current State
- Desktop only (hidden on mobile)
- Small size (max-w-md)
- Positioned far right

### Target State
- 40% larger container
- Better visual prominence
- Mobile-optimized version
- Stronger CTAs

---

## 💬 Priority 3: Rotating Reviews

### Implementation
```typescript
// Review rotation specs
- 4-5 reviews cycling
- Mix of quotes and statements
- Custom branded presentation
- 5-second intervals
- Pause on hover
```

---

## 🏠 Priority 4: Homepage Reorganization

### New Order
1. Hero (with video + booking + reviews)
2. Find Your Perfect Room
3. Kinship Guide (text + image background)
4. Events & Gatherings
5. HOMA Section
6. Press + Reviews (combined)
7. Newsletter
8. FAQs
9. Footer

---

## 🚀 Performance Standards

### Mobile-First Targets
- **LCP**: <1.5s (mobile 4G)
- **INP**: <200ms
- **CLS**: <0.1
- **Bundle**: <150KB initial JS

### Optimization Strategy
1. Dynamic imports for below-fold
2. Progressive enhancement
3. Critical CSS inlining
4. Image optimization (WebP/AVIF)

---

## 🎨 Animation Guidelines (from SOP)

### Approved Patterns
```css
/* Welcome bounce */
cubic-bezier(0.34, 1.56, 0.64, 1)

/* Confident transitions */
cubic-bezier(0.4, 0, 0.2, 1)

/* Exploration */
cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### Timing
- Instant: 150ms
- Fast: 300ms
- Normal: 400ms
- Slow: 600ms

### Hover Effects
- Cards: scale(1.02)
- Buttons: scale(1.05)
- Images: scale(1.05) within overflow:hidden

---

## 🔧 Development Workflow

### Before Changes
1. Check this document for permissions
2. Import from `lib/config/brand.ts`
3. Follow SOP animation patterns
4. Test mobile-first

### During Development
1. Use brand config constants
2. Apply SOP animation curves
3. Keep interactions subtle
4. Think 2nd/3rd order effects

### After Changes
1. Test on real mobile devices
2. Check Core Web Vitals
3. Verify brand compliance
4. Document decisions

---

## 📞 Quick Decisions

**Q: Can I change colors?**
A: Only add SOP colors, never modify existing

**Q: Can I add new fonts?**
A: No, use Europa and Utopia Std Display only

**Q: Can I modify the header?**
A: Interactions yes, logo lockup no

**Q: Which homepage do I edit?**
A: `app/page.tsx` only

**Q: Which Hero component?**
A: `components/HeroEnhanced/` only

---

## 🎯 Success Metrics

- Client requirements delivered ✓
- Brand guidelines maintained ✓
- Mobile performance optimized ✓
- Code clarity improved ✓

---

**Remember**: Client requirements are the priority, implemented within brand guidelines using SOP patterns. When in doubt, make it feel human, confident, and welcoming.