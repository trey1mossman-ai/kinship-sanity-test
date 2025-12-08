# SANITY CMS INTEGRATION - AUDIT & PRIORITY QUEUE

> **Last Updated:** December 2024
> **Project:** Kinship Landing Website
> **Reference:** See `SANITY_CMS_INTEGRATION_SOP.md` for implementation details

---

## EXECUTIVE SUMMARY

| Metric | Count |
|--------|-------|
| Total Pages | 13 |
| Schemas Created | 13 ✅ |
| Queries Written | 13 ✅ |
| Fully Integrated | 2 |
| Partially Integrated | 1 |
| Needs Integration | 10 |

---

## INTEGRATION STATUS BY PAGE

### Legend
- ✅ Complete
- 🟡 Partial (some fields not wired)
- ❌ Not started
- ⚪ N/A

| Page | Route | Schema | Query | Server Comp | Client Uses Data | Status |
|------|-------|--------|-------|-------------|------------------|--------|
| **Rooms** | `/rooms` | ✅ | ✅ | ✅ | ✅ | **COMPLETE** |
| **Events** | `/events` | ✅ | ✅ | ✅ | 🟡 | **PARTIAL** |
| Homepage | `/` | ✅ | ✅ | ❌ | ❌ | Schema + Query Ready |
| Homa | `/homa` | ✅ | ✅ | ❌ | ❌ | Schema + Query Ready |
| About | `/about` | ✅ | ✅ | ❌ | ❌ | Schema + Query Ready |
| Explore | `/explore` | ✅ | ✅ | ❌ | ❌ | Schema + Query Ready |
| Gallery | `/gallery` | ✅ | ✅ | ❌ | ❌ | Schema + Query Ready |
| Offers | `/offers` | ✅ | ✅ | ❌ | ❌ | Schema + Query Ready |
| Community | `/community` | ✅ | ✅ | ❌ | ❌ | Schema + Query Ready |
| Careers | `/careers` | ✅ | ✅ | ❌ | ❌ | Schema + Query Ready |
| Policies | `/policies` | ✅ | ✅ | ❌ | ❌ | Schema + Query Ready |
| Privacy | `/privacy` | ✅ | ✅ | ❌ | ❌ | Schema + Query Ready |
| Accessibility | `/accessibility` | ✅ | ✅ | ❌ | ❌ | Schema + Query Ready |

---

## DETAILED STATUS

### ✅ COMPLETE: Rooms Page

**Route:** `/rooms`
**Type:** Collection (multiple `room` documents)

| Layer | Status | File |
|-------|--------|------|
| Schema | ✅ | `/sanity-test-sandbox/schemaTypes/documents/room.ts` |
| Query | ✅ | `getRooms()` in queries.ts |
| Server Component | ✅ | `/app/rooms/page.tsx` |
| Client Component | ✅ | `/app/rooms/RoomsPageClient.tsx` |

**What's Working:**
- All room data fetched from Sanity
- Room cards display Sanity content
- Gallery images from Sanity
- FAQs remain hardcoded (intentional)

---

### 🟡 PARTIAL: Events Page

**Route:** `/events`
**Type:** Singleton (`eventsPage` document)

| Layer | Status | File |
|-------|--------|------|
| Schema | ✅ | `/sanity-test-sandbox/schemaTypes/singletons/eventsPage.ts` |
| Query | ✅ | `getEventsPage()` in queries.ts |
| Server Component | ✅ | `/app/events/page.tsx` |
| Client Component | 🟡 | `/app/events/EventsPageClient.tsx` |

**What's Working:**
- ✅ Hero title (with fallback)
- ✅ Venue gallery images passed to venue components

**What's Still Hardcoded:**
- ❌ Hero image (`/images/events-page/amyzach-29.webp`)
- ❌ Hero subtitle (not being displayed)
- ❌ Venue titles (GreenHaus, Yard, etc.)
- ❌ Venue descriptions
- ❌ Venue capacities
- ❌ Event type sections (Gatherings, Weddings, etc.) - NOT IN SCHEMA

**Remaining Work:**
1. Wire hero image from Sanity
2. Display hero subtitle
3. Pass venue title/description/capacity to venue components
4. Update venue components to use all Sanity fields

---

### ❌ NOT INTEGRATED: Homepage

**Route:** `/`
**Type:** Singleton (`homepage` document)

| Layer | Status | Notes |
|-------|--------|-------|
| Schema | ✅ | Has hero, sections, press, reviews |
| Query | ✅ | `getHomepage()` exists |
| Server Component | ❌ | Page.tsx is Client Component |
| Client Component | ❌ | Not receiving Sanity data |

**Priority:** 🔴 HIGH - Most visited page

---

### ❌ NOT INTEGRATED: Homa Page

**Route:** `/homa`
**Type:** Singleton (`homaPage` document)

| Layer | Status | Notes |
|-------|--------|-------|
| Schema | ✅ | Has hero, hours, menu link |
| Query | ✅ | `getHomaPage()` exists |
| Server Component | ❌ | Needs conversion |
| Client Component | ❌ | Not receiving Sanity data |

**Priority:** 🔴 HIGH - Frequent content changes

---

### ❌ NOT INTEGRATED: Remaining Pages

All have schemas and queries ready, but page components are not connected:

| Page | Query Function | Priority |
|------|----------------|----------|
| About | `getAboutPage()` | 🟡 Medium |
| Explore | `getExplorePage()` + `getLocalAttractions()` | 🟡 Medium |
| Gallery | `getGalleryPage()` + `getGalleryImages()` | 🟡 Medium |
| Offers | `getOffersPage()` + `getOffers()` | 🟡 Medium |
| Community | `getCommunityPage()` | 🟢 Low |
| Careers | `getCareersPage()` + `getJobPostings()` | 🟢 Low |
| Policies | `getPoliciesPage()` | 🟢 Low |
| Privacy | `getPrivacyPage()` | 🟢 Low |
| Accessibility | `getAccessibilityPage()` | 🟢 Low |

---

## PRIORITY QUEUE

### 🔴 PRIORITY 1: Complete Current + High-Traffic

| # | Page | Work Required | Est. Time |
|---|------|---------------|-----------|
| 1.1 | **Events** | Finish wiring remaining fields | 30 min |
| 1.2 | **Homepage** | Full integration (complex) | 60-90 min |
| 1.3 | **Homa** | Full integration | 45 min |

### 🟡 PRIORITY 2: Important Secondary

| # | Page | Work Required | Est. Time |
|---|------|---------------|-----------|
| 2.1 | About | Full integration | 30 min |
| 2.2 | Explore | Full integration + attractions | 45 min |
| 2.3 | Gallery | Full integration + images | 30 min |
| 2.4 | Offers | Full integration + offers | 45 min |

### 🟢 PRIORITY 3: Low-Traffic Utility

| # | Page | Work Required | Est. Time |
|---|------|---------------|-----------|
| 3.1 | Community | Full integration | 20 min |
| 3.2 | Careers | Full integration + jobs | 30 min |
| 3.3 | Policies | Full integration | 15 min |
| 3.4 | Privacy | Full integration | 15 min |
| 3.5 | Accessibility | Full integration | 15 min |

---

## EVENTS PAGE - COMPLETION CHECKLIST

The Events page is closest to completion. Here's exactly what remains:

### Task 1: Wire Hero Image
**File:** `/app/events/EventsPageClient.tsx`
**Find:** Line ~236
```tsx
src="/images/events-page/amyzach-29.webp"
```
**Replace with:**
```tsx
src={eventsData?.heroImage || "/images/events-page/amyzach-29.webp"}
```

### Task 2: Add Hero Subtitle
**File:** `/app/events/EventsPageClient.tsx`
**After the `<h1>{heroTitle}</h1>` line, add:**
```tsx
{eventsData?.heroSubtitle && (
  <p className="text-white/90 text-lg md:text-xl mt-4 max-w-2xl">
    {eventsData.heroSubtitle}
  </p>
)}
```

### Task 3: Pass Full Venue Data
**File:** `/app/events/EventsPageClient.tsx`
**Current:**
```tsx
<GreenHausSection sanityData={{ gallery: eventsData?.greenhausGallery }} />
```
**Update to:**
```tsx
<GreenHausSection 
  sanityData={{
    title: eventsData?.greenhausTitle,
    description: eventsData?.greenhausDescription,
    capacity: eventsData?.greenhausCapacity,
    gallery: eventsData?.greenhausGallery
  }}
/>
```
**Repeat for:** YardSection, ConferenceRoomSection, FireplaceSection, CampDeckSection

### Task 4: Update Venue Component Interfaces
**Files:** Each venue component in `/components/home/`
**Ensure interface includes:**
```tsx
interface SanityData {
  title?: string
  description?: string
  capacity?: string
  gallery?: string[]
}
```
**Use with fallbacks:**
```tsx
const title = sanityData?.title || 'Default Title'
```

### Task 5: Verify
```bash
npm run build  # Must pass
```
Then test content change in Sanity Studio.

---

## PROGRESS TRACKING

| Page | Started | Completed | Verified | Notes |
|------|---------|-----------|----------|-------|
| Rooms | ✅ | ✅ | ✅ | Reference implementation |
| Events | ✅ | ⬜ | ⬜ | Needs hero image, subtitle, venue details |
| Homepage | ⬜ | ⬜ | ⬜ | |
| Homa | ⬜ | ⬜ | ⬜ | |
| About | ⬜ | ⬜ | ⬜ | |
| Explore | ⬜ | ⬜ | ⬜ | |
| Gallery | ⬜ | ⬜ | ⬜ | |
| Offers | ⬜ | ⬜ | ⬜ | |
| Community | ⬜ | ⬜ | ⬜ | |
| Careers | ⬜ | ⬜ | ⬜ | |
| Policies | ⬜ | ⬜ | ⬜ | |
| Privacy | ⬜ | ⬜ | ⬜ | |
| Accessibility | ⬜ | ⬜ | ⬜ | |

---

## NOTES FOR CLAUDE CODE

1. **All queries already exist** in `/lib/sanity/queries.ts` - don't recreate them
2. **Focus on wiring** - the hard work (schemas, queries) is done
3. **Follow the pattern** from Rooms page for Server/Client component split
4. **Always use fallbacks** - never assume Sanity data exists
5. **Test builds** after each page integration
6. **Update this document** as pages are completed

---

## QUERIES REFERENCE

All these functions exist in `/lib/sanity/queries.ts`:

```typescript
// Pages
getHomepage()
getEventsPage()
getHomaPage()
getAboutPage()
getExplorePage()
getGalleryPage()
getOffersPage()
getCommunityPage()
getCareersPage()
getPoliciesPage()
getPrivacyPage()
getAccessibilityPage()

// Collections
getRooms()
getRoomBySlug(slug)
getHomepageRooms()
getLocalAttractions()
getGalleryImages()
getOffers()
getJobPostings()
getMenuItems()
getSiteSettings()
```
