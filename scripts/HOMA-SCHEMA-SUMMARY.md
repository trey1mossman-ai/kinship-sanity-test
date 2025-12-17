# HOMA Page Schema - Image Fields Summary

## Schema Location
`/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-test-sandbox/schemaTypes/singletons/homaPage.ts`

## Image Fields Added to homaPage Schema

### 1. Hero Section (Lines 56-78)

Three triptych images for the hero carousel:

```typescript
defineField({
  name: 'heroTriptychImage1',
  title: 'Hero Triptych Image 1 (Left)',
  type: 'image',
  options: {hotspot: true},
  description: 'Left image in the hero triptych gallery',
  group: 'hero'
})

defineField({
  name: 'heroTriptychImage2',
  title: 'Hero Triptych Image 2 (Center)',
  type: 'image',
  options: {hotspot: true},
  description: 'Center image in the hero triptych gallery',
  group: 'hero'
})

defineField({
  name: 'heroTriptychImage3',
  title: 'Hero Triptych Image 3 (Right)',
  type: 'image',
  options: {hotspot: true},
  description: 'Right image in the hero triptych gallery',
  group: 'hero'
})
```

### 2. Specials & Events Section (Lines 162-254)

Three card images:

```typescript
defineField({
  name: 'happyHourImage',
  title: 'Happy Hour Image',
  type: 'image',
  options: {hotspot: true},
  group: 'specials'
})

defineField({
  name: 'brunchImage',
  title: 'Brunch Image',
  type: 'image',
  options: {hotspot: true},
  group: 'specials'
})

defineField({
  name: 'eventsImage',
  title: 'Events Image',
  type: 'image',
  options: {hotspot: true},
  group: 'specials'
})
```

### 3. Promos Section (Lines 260-274)

Two promotional images:

```typescript
defineField({
  name: 'promoBannerImage',
  title: 'Promo Banner Image',
  type: 'image',
  options: {hotspot: true},
  description: 'Large promotional banner image (e.g., Turkey promo)',
  group: 'promos'
})

defineField({
  name: 'loyaltyCardImage',
  title: 'Loyalty Card Image',
  type: 'image',
  options: {hotspot: true},
  description: 'Image for the HOMA Homies loyalty program card',
  group: 'promos'
})
```

Note: The `promos` array (line 276) also supports images within each promo object.

### 4. Seating/Fireplace Section (Lines 375-380)

Array of images for the seating gallery carousel:

```typescript
defineField({
  name: 'seatingImages',
  title: 'Seating/Fireplace Gallery',
  type: 'array',
  of: [{type: 'image', options: {hotspot: true}}],
  group: 'seating'
})
```

## GROQ Query Integration

The images are fetched in the GROQ query at `/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-hostinger-test/lib/sanity/queries.ts` (Lines 682-731):

```typescript
export async function getHomaPage(): Promise<HomaPage | null> {
  const query = `*[_type == "homaPage"][0] {
    // Hero triptych
    "heroTriptychImage1Url": heroTriptychImage1.asset->url,
    "heroTriptychImage2Url": heroTriptychImage2.asset->url,
    "heroTriptychImage3Url": heroTriptychImage3.asset->url,

    // Specials
    "happyHourImageUrl": happyHourImage.asset->url,
    "brunchImageUrl": brunchImage.asset->url,
    "eventsImageUrl": eventsImage.asset->url,

    // Promos
    "promoBannerImageUrl": promoBannerImage.asset->url,
    "loyaltyCardImageUrl": loyaltyCardImage.asset->url,

    // Seating gallery
    "seatingImages": seatingImages[].asset->url,

    // ... other fields
  }`
  return client.fetch(query)
}
```

## Usage in Components

The HOMA page client component (`sanity-hostinger-test/app/homa/HomaPageClient.tsx`) uses these images:

- **Lines 66-76**: Hero triptych images (desktop & mobile)
- **Line 79-81**: Seating gallery images
- **Line 296**: Happy hour image
- **Line 412**: Brunch image
- **Line 498**: Events image
- **Line 574**: Promo banner image (used in promos array)
- **Line 684**: Seating gallery carousel

## Total Image Fields

- **Single images**: 8 fields
  - Hero: 3 triptych images
  - Specials: 3 card images
  - Promos: 2 promotional images

- **Image arrays**: 1 field
  - Seating: Gallery array (5 images seeded)

**Total**: 9 image-related fields in the schema

## Schema Groups

Images are organized into content groups for better editing UX:

- `hero` - Hero triptych images
- `specials` - Happy hour, brunch, events images
- `promos` - Banner and loyalty card images
- `seating` - Fireplace/seating gallery

## Features

All image fields include:
- ✅ Hotspot support for focal point selection
- ✅ Descriptive help text
- ✅ Organized into logical groups
- ✅ Integration with Next.js Image component
- ✅ CDN-optimized delivery via Sanity
