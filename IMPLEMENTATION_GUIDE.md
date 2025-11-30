# Kinship Landing Implementation Guide

## ✅ Completed Tasks

### 1. BRAND SYSTEM ✓
- Updated `tailwind.config.ts` with Kinship Landing colors (charcoal, ink, sand, bone, pine, rust, highlight)
- Updated `globals.css` with CSS variables and focus styles
- Created `/app/design/tokens/page.tsx` for design token preview
- Configured fonts: Fraunces/Playfair for serif, Inter for sans
- Added proper border radius, shadows, and spacing tokens

### 2-11. Implementation Files Created

The following implementation covers all requirements. Each file has been crafted to meet the specific needs:

## File Structure
```
kinship-hotel/
├── app/
│   ├── page.tsx (Updated homepage with new sections)
│   ├── rooms/
│   │   └── page.tsx (Rooms index with filters)
│   ├── room/[slug]/
│   │   └── page.tsx (Room detail page)
│   ├── events/
│   │   └── takeover/
│   │       └── page.tsx (Hotel buyout page)
│   ├── gallery/
│   │   └── page.tsx (Immersive gallery)
│   ├── policies/
│   │   └── page.tsx (Hotel policies)
│   ├── accessibility/
│   │   └── page.tsx (Accessibility info)
│   ├── press/
│   │   └── page.tsx (Press page)
│   ├── api/
│   │   └── inquiry/
│   │       └── route.ts (Inquiry API endpoint)
│   └── design/
│       └── tokens/
│           └── page.tsx (Design system preview)
├── components/
│   ├── layout/
│   │   ├── header.tsx (Updated with Kinship branding)
│   │   └── footer.tsx (Updated footer)
│   ├── sections/
│   │   ├── hero.tsx (Hero with gradient overlay)
│   │   ├── features-strip.tsx (3-column features)
│   │   ├── values-strip.tsx (Kinship values)
│   │   ├── trust-strip.tsx (Trust indicators)
│   │   └── room-listing.tsx (Room grid)
│   ├── booking/
│   │   ├── booking-widget.tsx (Compact booking module)
│   │   └── inquiry-form.tsx (Event inquiry form)
│   └── ui/
│       └── shared/
│           ├── lightbox.tsx (Gallery lightbox)
│           └── media-caption.tsx (Accessible captions)
├── lib/
│   ├── data/
│   │   └── rooms.ts (Room data with real examples)
│   ├── content/
│   │   └── copy.ts (Kinship voice copy blocks)
│   ├── experiments.ts (A/B testing flags)
│   ├── analytics.ts (Analytics utilities)
│   └── seo/
│       ├── config.ts (SEO configuration)
│       └── json-ld.ts (Structured data helpers)
├── hooks/
│   ├── useExperiments.ts (A/B testing hook)
│   └── useFavorites.ts (Favorites management)
├── ops/
│   └── n8n/
│       ├── inquiry-workflow.json (n8n workflow)
│       └── README.md (Integration guide)
└── public/
    ├── robots.txt
    └── sitemap.xml
```

## Key Implementation Details

### Header & Hero (Requirement #2)
- Sticky header with "Kinship Landing — Downtown Colorado Springs"
- Navigation: Rooms, Events, Gallery, Explore, Homa Café, Contact
- Hero with gradient overlay (ink→transparent) for text legibility
- Compact booking widget with Cloudbeds integration

### Home Sections (Requirement #3)
- Three-column features: Prime Location, Exceptional Hosts, Modern Essentials
- Values strip: Courage, Trust, Generosity, Community, Adventure
- Trust strip: Best Rate Direct, Free Cancellation, Review badges

### Rooms (Requirement #4)
- Grid layout with categories: Suites, Junior Suites, Family Suite, Camp Deck
- Filters: price range, bed size, amenities, "great for" tags
- Transparent pricing with tax/fee breakdown

### Events Takeover (Requirement #5)
- "Your crew, the whole place" messaging
- 58 beds | Unique spaces | Custom F&B
- Inquiry form with Zod validation

### Gallery (Requirement #6)
- Full-bleed masonry grid
- Lightbox with keyboard navigation
- 360° tour support via Pannellum

### Footer & Info Architecture (Requirement #7)
- Updated with Kinship tone and real contact info
- Links to policies, accessibility, press pages

### SEO & A11y (Requirement #8)
- WCAG AA compliance with focus rings
- JSON-LD structured data
- Optimized LCP with image preloading

### A/B Testing (Requirement #9)
- Experiment flags for booking widget variations
- localStorage favorites
- Analytics tracking

### n8n Integration (Requirement #10)
- Webhook → Validate → Google Sheets → Email workflow
- Environment variable configuration

### Copy (Requirement #11)
- Kinship voice throughout: warm, adventurous, local-first
- "Sleep well. Meet locals. Launch adventures."

## Environment Variables Required

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Kinship Landing"
NEXT_PUBLIC_SITE_DESCRIPTION="Stay, Gather, Explore Colorado Springs"
NEXT_PUBLIC_SITE_TAGLINE="Outrageous hospitality, crafted by locals"
NEXT_PUBLIC_CONTACT_EMAIL=hello@kinshiplanding.com
NEXT_PUBLIC_CONTACT_PHONE=+1 (719) 203-9309
NEXT_PUBLIC_CONTACT_ADDRESS="415 S Nevada Ave, Colorado Springs, CO 80903"
CLOUDBEDS_URL=https://hotels.cloudbeds.com/reservation/kinshiplanding
N8N_WEBHOOK_URL=your_webhook_url
SHEETS_ID=your_google_sheets_id
EMAIL_FROM=noreply@kinshiplanding.com
EMAIL_TO=hello@kinshiplanding.com
```

## Testing Checklist

- [ ] Brand colors display correctly in /design/tokens
- [ ] Header is sticky and mobile-responsive
- [ ] Booking widget validates dates properly
- [ ] Room filters work on desktop and mobile
- [ ] Gallery lightbox is keyboard accessible
- [ ] Focus rings visible on all interactive elements
- [ ] Lighthouse scores meet thresholds (Performance ≥90, A11y ≥95)
- [ ] A/B experiments toggle correctly
- [ ] Inquiry form validates and submits

## Next Steps

1. Install Fraunces font (or use Playfair Display fallback)
2. Add real room images to public/images
3. Configure Cloudbeds booking URL
4. Set up n8n webhook endpoint
5. Deploy and test all features