# CLAUDE CODE: SANITY CMS INTEGRATION CONTINUATION

## PROJECT CONTEXT

You are working on the Kinship Landing website Sanity CMS integration. Significant groundwork has already been completed:

- **All 13 schemas** are created and deployed to Sanity Studio
- **All query functions** exist in `/lib/sanity/queries.ts`
- **Rooms page** is fully integrated (reference implementation)
- **Events page** is partially integrated (needs completion)

Your job is to **complete the wiring** - connecting the existing queries to the page components.

---

## CRITICAL FILES

**Read these documents before starting:**
```
/sanity-hostinger-test/SANITY_CMS_INTEGRATION_SOP.md   # HOW to integrate
/sanity-hostinger-test/SANITY_CMS_AUDIT_AND_QUEUE.md   # WHAT needs work
```

**Query functions (already exist):**
```
/sanity-hostinger-test/lib/sanity/queries.ts
```

**Reference implementations:**
```
/sanity-hostinger-test/app/rooms/page.tsx              # Server Component pattern
/sanity-hostinger-test/app/rooms/RoomsPageClient.tsx   # Client Component pattern
/sanity-hostinger-test/app/events/page.tsx             # Already converted
/sanity-hostinger-test/app/events/EventsPageClient.tsx # Needs field wiring
```

---

## IMMEDIATE TASK: COMPLETE EVENTS PAGE

The Events page Server Component is done. The Client Component receives `eventsData` but doesn't use all fields.

### Task 1: Wire Hero Image

**File:** `/app/events/EventsPageClient.tsx`

Find (approximately line 236):
```tsx
<Image
  src="/images/events-page/amyzach-29.webp"
  alt="Kinship Landing Events & Gatherings"
```

Replace with:
```tsx
<Image
  src={eventsData?.heroImage || "/images/events-page/amyzach-29.webp"}
  alt="Kinship Landing Events & Gatherings"
```

### Task 2: Add Hero Subtitle Display

Find the hero title (look for `{heroTitle}`), and after it add:
```tsx
{eventsData?.heroSubtitle && (
  <p 
    className="text-white/90 text-lg md:text-xl mt-4 max-w-2xl mx-auto lg:mx-0"
    style={{ textShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 4px' }}
  >
    {eventsData.heroSubtitle}
  </p>
)}
```

### Task 3: Update Venue Section Props

Find where venue components are called (around lines 741-765). Currently they only pass gallery:

**Current:**
```tsx
<GreenHausSection sanityData={{ gallery: eventsData?.greenhausGallery }} />
```

**Update ALL venue sections to:**
```tsx
<GreenHausSection 
  sanityData={{
    title: eventsData?.greenhausTitle,
    description: eventsData?.greenhausDescription,
    capacity: eventsData?.greenhausCapacity,
    gallery: eventsData?.greenhausGallery
  }}
/>

<ConferenceRoomSection 
  sanityData={{
    title: eventsData?.conferenceRoomTitle,
    description: eventsData?.conferenceRoomDescription,
    capacity: eventsData?.conferenceRoomCapacity,
    gallery: eventsData?.conferenceRoomGallery
  }}
/>

<FireplaceSection 
  sanityData={{
    title: eventsData?.fireplaceTitle,
    description: eventsData?.fireplaceDescription,
    capacity: eventsData?.fireplaceCapacity,
    gallery: eventsData?.fireplaceGallery
  }}
/>

<YardSection 
  sanityData={{
    title: eventsData?.yardTitle,
    description: eventsData?.yardDescription,
    capacity: eventsData?.yardCapacity,
    gallery: eventsData?.yardGallery
  }}
/>

<CampDeckSection 
  sanityData={{
    title: eventsData?.campDeckTitle,
    description: eventsData?.campDeckDescription,
    capacity: eventsData?.campDeckCapacity,
    gallery: eventsData?.campDeckGallery
  }}
/>
```

### Task 4: Update Venue Components

For each venue component in `/components/home/`:
- GreenHausSection.tsx
- YardSection.tsx
- ConferenceRoomSection.tsx
- FireplaceSection.tsx
- CampDeckSection.tsx

Ensure the interface accepts full sanityData:
```tsx
interface SanityData {
  title?: string
  description?: string
  capacity?: string
  gallery?: string[]
}

interface Props {
  sanityData?: SanityData
}

export function [VenueName]Section({ sanityData }: Props) {
  // Use with fallbacks
  const title = sanityData?.title || 'Default Title'
  const description = sanityData?.description || 'Default description text...'
  const capacity = sanityData?.capacity || 'Up to X Guests'
  const gallery = sanityData?.gallery || []
  
  // Then use these variables in the JSX
}
```

### Task 5: Verify

```bash
cd /path/to/sanity-hostinger-test
npm run build
```

Must pass with no errors.

---

## AFTER EVENTS: PRIORITY ORDER

Once Events is complete, proceed with:

### Priority 1: Homepage (`/`)
- Query: `getHomepage()` already exists
- Convert `/app/page.tsx` to Server Component
- Create `HomePageClient.tsx`
- Pass homepage data to client

### Priority 2: Homa (`/homa`)
- Query: `getHomaPage()` already exists
- Same pattern as Events

### Priority 3: About (`/about`)
- Query: `getAboutPage()` already exists

### Continue through priority list in `SANITY_CMS_AUDIT_AND_QUEUE.md`

---

## PATTERNS TO FOLLOW

### Server Component Pattern
```tsx
import { Metadata } from 'next';
import { get[PageName]Page } from '@/lib/sanity/queries';
import { [PageName]PageClient } from './[PageName]PageClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: '[Title] | Kinship Landing',
  description: '[Description]',
};

export default async function [PageName]Page() {
  const pageData = await get[PageName]Page();
  return <[PageName]PageClient pageData={pageData} />;
}
```

### Client Component Pattern
```tsx
'use client';

import { [PageName]Page } from '@/lib/sanity/queries';

interface Props {
  pageData: [PageName]Page | null;
}

export function [PageName]PageClient({ pageData }: Props) {
  // Use all fields with fallbacks
  const title = pageData?.heroTitle || 'Default Title';
  
  return (
    // JSX using the data
  );
}
```

---

## RULES

1. **DO NOT recreate queries** - they already exist in queries.ts
2. **DO NOT modify schemas** - they're already deployed
3. **ALWAYS use fallbacks** - `data?.field || 'default'`
4. **TEST after each page** - `npm run build` must pass
5. **UPDATE the audit doc** - mark pages complete as you finish them
6. **FOLLOW the priority order** - don't skip ahead

---

## VERIFICATION AFTER EACH PAGE

- [ ] Server Component fetches data
- [ ] Client Component receives data as props
- [ ] All hardcoded content replaced with Sanity data (with fallbacks)
- [ ] `npm run build` passes
- [ ] Content change in Sanity appears on site (after 60s)

---

## START NOW

Begin with completing the Events page (Tasks 1-5 above), then verify with a build.
