# Kinship Landing - Technical Decisions

## Decision Log

### 2025-09-03: Development Environment Setup
- **Decision**: Use Turbopack with Next.js dev server
- **Rationale**: Faster HMR, better DX for rapid iteration
- **Impact**: All development uses `npm run dev`

### PENDING: Homepage Variant Selection
- **Options**:
  1. Keep `app/page.tsx` (current default)
  2. Switch to `app/homepage-conversion.tsx` (conversion-optimized)
- **Considerations**:
  - page.tsx: More sections, full experience
  - homepage-conversion: Streamlined, conversion-focused
- **Decision**: _Awaiting input_

### PENDING: Booking Integration
- **Options**:
  1. Simple URL params: `?checkin=2025-01-15&checkout=2025-01-17&guests=2`
  2. Embedded Cloudbeds widget
  3. Custom booking flow with API
- **Considerations**:
  - URL params: Simplest, no dependencies
  - Widget: More integrated but requires Cloudbeds script
  - Custom: Most control but complex
- **Decision**: _Awaiting input_

### PENDING: Asset Strategy
- **Options**:
  1. Unsplash placeholders (current)
  2. Real Kinship photos
  3. Mix of both
- **Needs**: Hero, rooms (6+), café, yard, gallery
- **Decision**: _Awaiting assets_

## Brand Standards

### Confirmed
- **Name**: Kinship Landing (NOT Kinship Hotel)
- **Address**: 415 S Nevada Ave, Colorado Springs, CO 80903
- **Phone**: (719) 203-9309
- **Tagline**: "Stay, Gather, Explore"
- **Voice**: Warm, adventurous, local-first

### Colors (Locked)
- Primary Green: #647B56
- Text: #080806
- White: #FFFFFF
- Gray BG: #F3F3F3
- Sage: #EEF0EB

## Technical Standards

### Performance Targets
- Lighthouse Performance: ≥90
- Lighthouse Accessibility: ≥95
- LCP: <2.5s
- CLS: <0.1

### Browser Support
- Chrome/Edge: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile: iOS 14+, Android 10+

### Code Style
- TypeScript strict mode
- Tailwind for styling
- Radix UI for accessible components
- Framer Motion for animations