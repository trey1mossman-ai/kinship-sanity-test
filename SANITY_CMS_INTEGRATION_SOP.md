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
