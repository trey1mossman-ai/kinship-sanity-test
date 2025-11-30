# Kinship Landing Homepage - Project Plan

## Status Key
- 🔴 Blocked
- 🟡 In Progress
- 🟢 Review
- ✅ Done

## Current Sprint (Dev Server Running: http://localhost:3000)

### 🟡 In Progress

#### [CLAUDE] Keep Dev Server Running
- **Files**: N/A
- **AC**: Server stays active, hot reload working
- **Status**: Running with Turbopack

### Backlog

#### [CODEX] Align Address/Phone
- **Files**: 
  - `app/page.tsx:70-74` (JSON-LD) ✅ DONE
  - `content/copy.ts:112` (footer) ✅ DONE
  - `components/home/MapBlock.tsx` ✅ DONE BY CLAUDE
- **AC**: 
  - All references use "415 S Nevada Ave, Colorado Springs, CO 80903" ✅
  - Phone: (719) 203-9309 ✅
  - JSON-LD validates ✅
- **Status**: COMPLETED

#### [BOTH] Choose Homepage Variant
- **Decision Needed**: Keep `app/page.tsx` vs switch to `app/homepage-conversion.tsx`
- **Files**: Compare both files
- **AC**: Single homepage route confirmed
- **Status**: Awaiting decision

#### [BOTH] Booking Integration Approach
- **Options**: 
  1. Simple URL params to Cloudbeds
  2. Full widget integration
- **Files**: `components/home/BookingBar.tsx`
- **AC**: Booking flow documented, CTA works
- **Status**: Awaiting decision

#### [CLAUDE] Swap Placeholder Assets
- **Files**: 
  - Hero: `components/home/Hero.tsx`
  - Rooms: `components/home/RoomsGrid.tsx`
  - Café: `components/home/CafeSection.tsx`
  - Yard: `components/home/YardSection.tsx`
- **AC**: Real Kinship images loaded, optimized
- **Status**: Need assets

#### [CODEX] SEO/Env Naming to "Kinship Landing"
- **Files**:
  - `lib/config/env.ts`
  - `lib/config/seo.ts`
  - `.env.local`
  - All metadata objects
- **AC**: No "Kinship Hotel" references remain
- **Status**: Ready to start

### Review
_Empty_

### ✅ Done
- Initial project setup
- Dev server running with hot reload
- [CLAUDE] Voice & Copy Centralization Phase 1
  - Updated all `components/home/*` to use `content/copy.ts`
  - Replaced hardcoded strings with centralized copy
  - Verified hot reload working (28-238ms compile times)
- [CODEX] Extended `content/copy.ts` with home section
- [BOTH] Address/Phone alignment completed
- [CLAUDE] Mobile-First Homepage Improvements
  - Added Kinship logo to header on scroll
  - Enhanced Hero for mobile-first design (centered, responsive)
  - Removed BookingBar sticky dropdown
  - Centered RoomsGrid layout, removed emojis
  - Enhanced SocialProof with gradient background and prominent rating
  - Removed BlogTeasers/Adventure Log section
  - Improved Newsletter with brand colors and mobile-first layout
  - Added steel pattern utility (via ChatGPT in globals.css)

## Next Cycle Planning
_TBD after first pass_

## Notes
- Hot reload confirmed working
- Using Turbopack for fast bundling
- Both Claude and Codex have full file access