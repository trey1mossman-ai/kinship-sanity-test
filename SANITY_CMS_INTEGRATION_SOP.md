# SANITY CMS INTEGRATION - STANDARD OPERATING PROCEDURE

> **Project:** Kinship Landing Website
> **Sanity Project ID:** `u2qzrboc`
> **Dataset:** `production`
> **Sanity Studio:** https://kinship-landing.sanity.studio/
> **Last Updated:** December 2024

---

## THE GOLDEN RULE

**A page is NOT connected to Sanity until ALL FOUR layers are complete:**

1. ✅ Schema deployed to Sanity Studio
2. ✅ GROQ query + fetch function written
3. ✅ Server Component fetches data
4. ✅ Client Component uses fetched data (not hardcoded)

If ANY layer is missing or incomplete, the page will NOT update from Sanity.

---

## ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SANITY STUDIO                                    │
│                    (Content Management)                                  │
│         https://kinship-landing.sanity.studio/                          │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   │ API (GROQ Queries)
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      /lib/sanity/queries.ts                             │
│                                                                          │
│   • Interface definitions (TypeScript types)                            │
│   • GROQ queries (data shape)                                           │
│   • Fetch functions (getEventsPage, getRooms, etc.)                     │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   │ Data passed to components
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    /app/[page]/page.tsx                                 │
│                    (Server Component)                                    │
│                                                                          │
│   • Calls fetch function                                                │
│   • Sets revalidation (ISR)                                             │
│   • Passes data to Client Component                                     │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   │ Props
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│               /app/[page]/[Page]PageClient.tsx                          │
│                    (Client Component)                                    │
│                                                                          │
│   • Receives data as props                                              │
│   • Renders UI with Sanity data                                         │
│   • Uses fallbacks for missing data                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## THE FOUR LAYERS EXPLAINED

### Layer 1: Schema (Sanity Studio)
**Location:** `/sanity-test-sandbox/schemaTypes/`

- **Singletons** (single-instance pages): `/singletons/[pageName]Page.ts`
- **Documents** (collections): `/documents/[type].ts`

The schema defines what fields exist in Sanity Studio. Without the schema, editors can't enter content.

### Layer 2: Query + Fetch Function
**Location:** `/sanity-hostinger-test/lib/sanity/queries.ts`

This file contains:
1. **TypeScript Interface** - Defines the shape of data
2. **GROQ Query** - Specifies what fields to fetch
3. **Fetch Function** - Executes query and returns typed data

### Layer 3: Server Component (page.tsx)
**Location:** `/sanity-hostinger-test/app/[page]/page.tsx`

- Must be an async function (no `'use client'`)
- Calls the fetch function
- Sets `export const revalidate = 60` for ISR
- Passes data to Client Component as props

### Layer 4: Client Component
**Location:** `/sanity-hostinger-test/app/[page]/[Page]PageClient.tsx`

- Has `'use client'` directive
- Receives Sanity data as props
- Uses data with fallbacks: `data?.field || 'default'`
- Handles interactivity (state, effects, etc.)

---

## FILE LOCATIONS

```
/sanity-test-sandbox/                    # Sanity Studio project
├── schemaTypes/
│   ├── documents/
│   │   └── room.ts                      # Room collection schema
│   ├── singletons/
│   │   ├── homepage.ts
│   │   ├── eventsPage.ts
│   │   ├── homaPage.ts
│   │   ├── aboutPage.ts
│   │   ├── explorePage.ts
│   │   ├── galleryPage.ts
│   │   ├── offersPage.ts
│   │   ├── communityPage.ts
│   │   ├── careersPage.ts
│   │   ├── policiesPage.ts
│   │   ├── privacyPage.ts
│   │   └── accessibilityPage.ts
│   └── index.ts                         # Schema registry

/sanity-hostinger-test/                  # Next.js deployment project
├── lib/
│   └── sanity/
│       ├── client.ts                    # Sanity client config
│       └── queries.ts                   # ALL queries and fetch functions
├── app/
│   ├── page.tsx                         # Homepage
│   ├── rooms/
│   │   ├── page.tsx                     # Server Component
│   │   └── RoomsPageClient.tsx          # Client Component
│   ├── events/
│   │   ├── page.tsx                     # Server Component
│   │   └── EventsPageClient.tsx         # Client Component
│   └── [other pages...]
└── components/
    └── home/                            # Shared venue components
        ├── GreenHausSection.tsx
        ├── YardSection.tsx
        ├── ConferenceRoomSection.tsx
        ├── FireplaceSection.tsx
        └── CampDeckSection.tsx
```

---

## ADDING A NEW PAGE INTEGRATION

### Step 1: Verify Schema Exists

Check `/sanity-test-sandbox/schemaTypes/singletons/[pageName]Page.ts`

If it exists, verify it's registered in `/schemaTypes/index.ts`

Test in Sanity Vision:
```groq
*[_type == "[pageName]Page"][0] { _id }
```

### Step 2: Add Interface + Query + Fetch Function

Add to `/lib/sanity/queries.ts`:

```typescript
// ============================================
// [PAGE NAME] PAGE
// ============================================
export interface [PageName]Page {
  heroTitle: string
  heroSubtitle?: string
  // ... other fields from schema
}

export async function get[PageName]Page(): Promise<[PageName]Page | null> {
  const query = `*[_type == "[pageName]Page"][0] {
    heroTitle,
    heroSubtitle,
    // ... fetch all fields
    // For images: "heroImage": heroImage.asset->url
    // For arrays of images: "gallery": gallery[].asset->url
  }`
  return client.fetch(query)
}
```

### Step 3: Create/Update Server Component

`/app/[page]/page.tsx`:

```typescript
import { Metadata } from 'next';
import { get[PageName]Page } from '@/lib/sanity/queries';
import { [PageName]PageClient } from './[PageName]PageClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: '[Page Title] | Kinship Landing',
  description: '[Page description]',
};

export default async function [PageName]Page() {
  const pageData = await get[PageName]Page();
  return <[PageName]PageClient pageData={pageData} />;
}
```

### Step 4: Update Client Component

`/app/[page]/[PageName]PageClient.tsx`:

```typescript
'use client';

import { [PageName]Page } from '@/lib/sanity/queries';

interface Props {
  pageData: [PageName]Page | null;
}

export function [PageName]PageClient({ pageData }: Props) {
  // Use with fallbacks
  const heroTitle = pageData?.heroTitle || 'Default Title';
  
  return (
    <div>
      <h1>{heroTitle}</h1>
      {/* ... rest of component */}
    </div>
  );
}
```

---

## COMMON PATTERNS

### Image Fields

**Schema:**
```typescript
defineField({
  name: 'heroImage',
  title: 'Hero Image',
  type: 'image',
  options: { hotspot: true }
})
```

**Query:**
```groq
"heroImage": heroImage.asset->url
```

**Usage:**
```tsx
<Image src={data?.heroImage || '/images/fallback.webp'} />
```

### Image Arrays (Galleries)

**Schema:**
```typescript
defineField({
  name: 'gallery',
  title: 'Gallery',
  type: 'array',
  of: [{ type: 'image', options: { hotspot: true } }]
})
```

**Query:**
```groq
"gallery": gallery[].asset->url
```

**Usage:**
```tsx
{data?.gallery?.map((img, i) => (
  <Image key={i} src={img} alt={`Gallery ${i + 1}`} />
))}
```

### Fallback Pattern

Always use fallbacks to prevent crashes when Sanity data is missing:

```tsx
// Simple fallback
const title = data?.title || 'Default Title'

// Conditional rendering
{data?.subtitle && <p>{data.subtitle}</p>}

// Array fallback
const images = data?.gallery || []
```

---

## TESTING INTEGRATION

### 1. Build Test
```bash
cd /path/to/sanity-hostinger-test
npm run build
```
Must pass with no errors.

### 2. Query Test
In Sanity Vision (https://kinship-landing.sanity.studio/vision):
```groq
*[_type == "[pageName]Page"][0]
```
Should return data.

### 3. Content Change Test
1. Edit a field in Sanity Studio
2. Click Publish
3. Wait 60 seconds (ISR revalidation)
4. Refresh page - change should appear

---

## TROUBLESHOOTING

### "Cannot read properties of undefined"
**Cause:** Data not in Sanity or query not fetching it
**Fix:** Add fallbacks and check query matches schema field names

### Images not loading
**Cause:** Not expanding asset URL in query
**Fix:** Use `"fieldName": fieldName.asset->url` pattern

### Changes not appearing
**Cause:** ISR cache not refreshed
**Fix:** Wait 60 seconds or trigger rebuild

### TypeScript errors
**Cause:** Interface doesn't match query structure
**Fix:** Ensure interface fields match exactly what query returns

### Page crashes on load
**Cause:** Missing null checks
**Fix:** Always use optional chaining (`?.`) and fallbacks

---

## VERIFICATION CHECKLIST

Before marking a page as "Sanity Integrated":

- [ ] Schema exists in `/sanity-test-sandbox/schemaTypes/`
- [ ] Schema registered in `index.ts`
- [ ] Document exists in Sanity (query returns data)
- [ ] Interface defined in `queries.ts`
- [ ] GROQ query fetches all needed fields
- [ ] Fetch function exported from `queries.ts`
- [ ] `page.tsx` is Server Component (no 'use client')
- [ ] `page.tsx` calls fetch function with await
- [ ] `page.tsx` has `export const revalidate = 60`
- [ ] Client Component receives data as props
- [ ] Client Component uses data with fallbacks
- [ ] All hardcoded content replaced with Sanity data
- [ ] `npm run build` passes
- [ ] Content change in Sanity appears on site

---

## IMAGE UPLOADS TO SANITY

### CRITICAL: The Image Verification Rule

**⚠️ NEVER assume or guess image paths. ALWAYS verify from the component source.**

When uploading images to Sanity, the correct image path is the one used as the **fallback** in the client component. This is the ONLY source of truth.

### Step-by-Step Image Upload Process

#### 1. IDENTIFY the Sanity field name
Look at the schema in `/sanity-test-sandbox/schemaTypes/singletons/[page].ts`:
```typescript
defineField({
  name: 'heroImage',  // <-- This is the field name
  title: 'Hero Background Image',
  type: 'image',
  options: { hotspot: true }
})
```

#### 2. FIND the component that uses this field
Search for where the Sanity data is consumed. For homepage fields, check:
- `app/page.tsx` - what data is passed to components
- Component files (e.g., `components/HeroEnhanced/HeroSection.tsx`)

#### 3. READ the component and find the EXACT fallback path
```typescript
// In HeroSection.tsx:36-37
const fallbackImageUrl = '/images/HomePage/hero-poster-kinship-landing.webp';
```

This fallback path IS the correct image to upload to Sanity.

#### 4. VERIFY the file exists
```bash
ls -la "public/images/HomePage/hero-poster-kinship-landing.webp"
```

#### 5. ONLY THEN upload to Sanity

### Common Mistakes to AVOID

| ❌ WRONG | ✅ CORRECT |
|----------|-----------|
| Guessing the image based on field name | Reading the component to find the fallback |
| Assuming similar image names are correct | Using the EXACT path from the fallback |
| Uploading without verifying file exists | Checking file exists before upload |
| Batch uploading without auditing | Auditing each image one-by-one |

### Image Audit Checklist

Before uploading any image to Sanity:

1. [ ] Read the Sanity schema to identify the field name
2. [ ] Find the component that uses this data
3. [ ] Locate the fallback image path in the component code
4. [ ] Verify the image file exists at that path
5. [ ] Upload the image to Sanity
6. [ ] Verify in Sanity Studio that the correct image appears

### Example: Hero Image Audit

**Schema field:** `heroImage` in `homepage.ts:39-44`

**Component:** `components/HeroEnhanced/HeroSection.tsx`

**Finding the fallback:**
```typescript
// Line 37
const fallbackImageUrl = '/images/HomePage/hero-poster-kinship-landing.webp';
```

**Correct upload path:** `public/images/HomePage/hero-poster-kinship-landing.webp`

### Seed Scripts Must Use Verified Paths

When creating seed scripts for bulk uploads:

1. Document the source file and line number for EACH image path
2. Use comments to trace each path back to its component
3. Name the script `seed-[page]-images-verified.js` to indicate it's been audited

Example from `seed-homepage-images-verified.js`:
```javascript
/**
 * HERO SECTION
 * Source: components/HeroEnhanced/HeroSection.tsx:36-37
 */
const HERO_IMAGES = {
  heroImage: 'public/images/HomePage/hero-poster-kinship-landing.webp',
};
```

---

## REFERENCE IMPLEMENTATION

The **Rooms page** is the reference implementation. Study these files:

1. **Schema:** `/sanity-test-sandbox/schemaTypes/documents/room.ts`
2. **Query:** `/sanity-hostinger-test/lib/sanity/queries.ts` → `getRooms()`
3. **Server Component:** `/sanity-hostinger-test/app/rooms/page.tsx`
4. **Client Component:** `/sanity-hostinger-test/app/rooms/RoomsPageClient.tsx`

The **Events page** demonstrates singleton page integration:

1. **Schema:** `/sanity-test-sandbox/schemaTypes/singletons/eventsPage.ts`
2. **Query:** `/sanity-hostinger-test/lib/sanity/queries.ts` → `getEventsPage()`
3. **Server Component:** `/sanity-hostinger-test/app/events/page.tsx`
4. **Client Component:** `/sanity-hostinger-test/app/events/EventsPageClient.tsx`

---

## LESSONS LEARNED

> *Session Log: December 2024*

### Lesson 1: Schema Removal Requires Data Cleanup

**Problem:** After removing a field from the schema (e.g., `mapImage`), Sanity Studio shows "Unknown field found" error.

**Cause:** Removing a field from the schema does NOT remove existing data. The document still contains the orphaned field.

**Solution:** After removing a schema field, also remove the data from the document:

```javascript
// Using Sanity client to unset orphaned fields
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Remove orphaned field from document
await client.patch('homepage').unset(['mapImage']).commit();
```

**Prevention:** Before removing schema fields, always plan to:
1. Remove from schema
2. Deploy schema (`npx sanity deploy`)
3. Remove data from document(s)

---

### Lesson 2: Verify What Components Actually Use

**Problem:** Added a `mapImage` field to schema assuming the Map section needed an image.

**Cause:** Did not verify what the component actually renders. The `MapBlock.tsx` component uses an embedded Google Maps iframe, not an image.

**Solution:** Always read the component code BEFORE adding schema fields:

```typescript
// MapBlock.tsx:66-76 - Uses embedded map, NOT an image
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12..."
  width="100%"
  height="100%"
  // ...
/>
```

**Prevention:** Before adding any schema field:
1. Read the component that will use the data
2. Check if it actually needs this field type
3. Look for hardcoded values, iframes, or external embeds

---

### Lesson 3: Image Arrays Need Proper GROQ Projection

**Problem:** Image array fields return `null` or empty when queried.

**Cause:** Must use proper GROQ projection to resolve asset URLs.

**Solution:** For image arrays, use this pattern:

```groq
// WRONG - returns asset references, not URLs
"images": images

// CORRECT - resolves to array of URL strings
"images": images[].asset->url
```

**Interface should match:**
```typescript
interface Homepage {
  // Array of resolved URLs
  greenhausCarouselImages?: string[]
}
```

---

### Lesson 4: Fallback Pattern for Image Arrays

**Problem:** Need graceful fallback when Sanity images aren't uploaded yet.

**Solution:** Check array length, not just truthiness:

```typescript
// Component props
interface Props {
  greenhausCarouselImages?: string[];
}

// Fallback arrays defined in component
const fallbackImages = [
  '/images/events-page/GreenHaus/image1.webp',
  '/images/events-page/GreenHaus/image2.webp',
];

// Use Sanity data if available AND has items
const images = greenhausCarouselImages?.length
  ? greenhausCarouselImages
  : fallbackImages;
```

**Why `?.length`?** An empty array `[]` is truthy, so `images || fallback` won't work correctly.

---

### Lesson 5: Complex Multi-File Tasks Benefit from Subagents

**Context:** Adding carousel images required changes to 4 files:
1. Schema (`homepage.ts`)
2. Query (`queries.ts`)
3. Component (`EventsSectionDynamic.tsx`)
4. Page (`page.tsx`)

**Benefit:** Using subagents for complex tasks:
- Maintains context across file reads
- Reduces errors from losing track of changes
- Allows parallel work on independent files
- Documents the change plan before execution

**When to use subagents:**
- Changes spanning 3+ files
- Tasks requiring multiple schema/query/component updates
- When maintaining context is critical

---

### Quick Reference: Schema Field Removal Checklist

When removing a field from Sanity:

- [ ] Remove field from schema file
- [ ] Remove from TypeScript interface
- [ ] Remove from GROQ query
- [ ] Deploy schema: `npx sanity deploy`
- [ ] Remove orphaned data: `client.patch('docId').unset(['fieldName']).commit()`
- [ ] Verify in Sanity Studio - no "Unknown field" warnings
- [ ] Run build to verify no TypeScript errors

---

### Lesson 6: URL Fields - Use `string` Not `url` for Internal Paths

**Problem:** Sanity's `url` type requires full URLs (e.g., `https://example.com`). Seeding `/community` fails validation.

**Cause:** The `url` field type in Sanity schema enforces full URL format. Internal Next.js paths like `/community` are rejected.

**Solution:** For fields that may contain internal paths OR external URLs, use `type: 'string'`:

```typescript
// WRONG - only accepts full URLs
defineField({
  name: 'eventsCtaUrl',
  title: 'Events CTA URL',
  type: 'url',  // ❌ Rejects "/community"
})

// CORRECT - accepts both internal paths and full URLs
defineField({
  name: 'eventsCtaUrl',
  title: 'Events CTA URL',
  type: 'string',  // ✅ Accepts "/community" and "https://..."
  description: 'Internal path (e.g., /community) or full URL',
})
```

**When to use `url` type:**
- External links only (social media, booking systems, external PDFs)
- Fields that should ALWAYS be full URLs

**When to use `string` type:**
- Internal navigation (Next.js Link destinations)
- Fields that may be internal OR external
- Anchor links (`#menu`, `#hours`)

---

### Lesson 7: Complete Page Integration Checklist

A page is NOT fully integrated until ALL these steps are complete:

**Phase 1: Schema & Query**
- [ ] Schema fields defined in `/sanity-test-sandbox/schemaTypes/`
- [ ] Schema deployed: `npx sanity deploy`
- [ ] TypeScript interface updated in `queries.ts`
- [ ] GROQ query updated with all fields
- [ ] Image fields use proper projection: `"fieldUrl": field.asset->url`

**Phase 2: Component Integration**
- [ ] Server component fetches data
- [ ] Client component receives data as props
- [ ] All hardcoded values replaced with `{data?.field || "fallback"}`
- [ ] Child components updated to accept props
- [ ] Props passed from parent to child components

**Phase 3: Content Seeding**
- [ ] Audit components for exact fallback image paths (with line numbers)
- [ ] Verify image files exist at fallback paths
- [ ] Create verified seed script: `seed-[page]-images-verified.js`
- [ ] Create content seed script: `seed-[page]-content-verified.js`
- [ ] Run image seed script
- [ ] Run content seed script
- [ ] Verify in Sanity Studio - no validation errors

**Phase 4: Verification**
- [ ] Build passes: `npm run build`
- [ ] No TypeScript errors
- [ ] No Sanity Studio validation errors
- [ ] Content appears correctly in Studio

---

### Lesson 8: Seed Script Best Practices

**Image Seed Scripts:**
```javascript
#!/usr/bin/env node
/**
 * [PAGE] PAGE - VERIFIED IMAGE SEED SCRIPT
 *
 * AUDIT DATE: [Date]
 *
 * Each image path verified by reading component fallbacks.
 */

/**
 * SECTION NAME
 * Source: [component-file.tsx]:[line-numbers]
 */
const SECTION_IMAGES = {
  fieldName: 'public/images/path/to/image.webp',  // Line XX
};
```

**Content Seed Scripts:**
```javascript
#!/usr/bin/env node
/**
 * [PAGE] PAGE - VERIFIED TEXT CONTENT SEED SCRIPT
 *
 * AUDIT DATE: [Date]
 *
 * Each value verified by reading component fallbacks.
 */

/**
 * SECTION NAME
 * Source: [component-file.tsx]:[line-numbers]
 */
const SECTION_CONTENT = {
  fieldName: 'Exact fallback text from component',
};
```

**Key Requirements:**
1. Document source file and line numbers for EVERY value
2. Name scripts `seed-[page]-[type]-verified.js`
3. Use `_key` for array items to enable stable references
4. Group related fields with clear section comments
5. Check for `SANITY_API_TOKEN` environment variable

---

### Quick Reference: New Page Integration Workflow

```
1. AUDIT
   └── Read page component and all child components
   └── Document all hardcoded content (text, images, URLs)
   └── Note exact fallback values and line numbers

2. SCHEMA
   └── Create/update schema in sanity-test-sandbox
   └── Deploy: npx sanity deploy
   └── Verify fields appear in Sanity Studio

3. QUERY
   └── Add fields to TypeScript interface
   └── Add fields to GROQ query
   └── Image arrays: use [].asset->url projection

4. COMPONENTS
   └── Update component to accept props
   └── Replace hardcoded values with {prop || "fallback"}
   └── Pass props from parent to children

5. SEED
   └── Create seed-[page]-images-verified.js
   └── Create seed-[page]-content-verified.js
   └── Run both scripts
   └── Verify in Sanity Studio

6. VERIFY
   └── npm run build
   └── Check Sanity Studio for errors
   └── Content displays correctly
```

---

### Lesson 9: Schema Exists ≠ Component Uses It

**Problem:** A page appears "integrated" because schema and query exist, but content doesn't update from Sanity.

**Cause:** The component still uses hardcoded values instead of the Sanity data passed via props.

**Real Example (Community Page):**
```typescript
// Schema has: heroImage field ✅
// Query has: "heroImageUrl": heroImage.asset->url ✅
// Interface has: heroImageUrl?: string ✅
// Props passed: communityData?.heroImageUrl ✅

// BUT component had HARDCODED value:
<Image
  src="/images/Community Page/GetOutsideEvent6_26-SamStarrMedia (1).webp"  // ❌ HARDCODED!
  alt="..."
/>

// Should be:
<Image
  src={communityData?.heroImageUrl || "/images/Community Page/GetOutsideEvent6_26-SamStarrMedia (1).webp"}  // ✅
  alt="..."
/>
```

**Audit Pattern:** When auditing a "partially integrated" page:
1. Don't assume existing schema/query means integration is complete
2. Search component for EVERY hardcoded string/path
3. Cross-reference each with the interface - does the field exist?
4. If field exists but isn't used, that's the bug

**Quick Check:** Search component for patterns like:
```bash
# Find hardcoded image paths
grep -n "src=\"/" ComponentFile.tsx

# Find hardcoded text that should be dynamic
grep -n "title=" ComponentFile.tsx
```

---

### Lesson 10: Events/Array Items Need Image References

**Problem:** Seeding array items (like events) with images requires uploading images first, then referencing them.

**Solution:** Structure seed scripts to:
1. Upload images and capture asset IDs
2. Build array items with image references
3. Patch document with complete array

```javascript
// 1. Upload images first
const eventAssetIds = [];
for (const imagePath of EVENT_IMAGE_PATHS) {
  const assetId = await uploadImage(imagePath);
  eventAssetIds.push(assetId);
}

// 2. Build array with image references
const eventsWithImages = EVENTS_DATA.map((event, index) => ({
  ...event,
  image: eventAssetIds[index] ? {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: eventAssetIds[index],
    },
  } : undefined,
}));

// 3. Patch document
await client.patch('documentId').set({ events: eventsWithImages }).commit();
```

**Key Points:**
- Array items need `_key` for Sanity to track them
- Image fields in arrays use same `{ _type: 'image', asset: { _ref } }` structure
- Upload all images before building the array to ensure IDs are available
