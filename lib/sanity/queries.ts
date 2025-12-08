import { client } from './client'

// Types matching the Sanity schema
export interface SanityRoom {
  _id: string
  name: string
  slug: { current: string }
  category: 'suites' | 'junior' | 'family' | 'specialty'
  categoryDisplay: string
  description: string
  shortDescription?: string
  features: string[]
  bedConfiguration?: string
  isPetFriendly?: boolean
  hasBalcony?: boolean
  hasMountainView?: boolean
  hasFireplace?: boolean
  displayOrder?: number
  isActive?: boolean
  heroImage?: {
    asset: {
      _ref: string
      url: string
    }
  }
  gallery?: Array<{
    asset: {
      _ref: string
      url: string
    }
  }>
}

// Transform Sanity room to match existing RoomTeaser interface
export interface RoomTeaser {
  id: string
  name: string
  slug: string
  category: 'suites' | 'junior' | 'family' | 'specialty'
  heroImage: string
  galleryImages?: string[]
  features: string[]
  description: string
}

// GROQ query to fetch all active rooms
export const roomsQuery = `*[_type == "room" && isActive == true] | order(displayOrder asc) {
  _id,
  name,
  "slug": slug.current,
  category,
  categoryDisplay,
  description,
  shortDescription,
  features,
  bedConfiguration,
  isPetFriendly,
  hasBalcony,
  hasMountainView,
  hasFireplace,
  displayOrder,
  isActive,
  homepageGroup,
  maxOccupancy,
  "heroImage": heroImage.asset->url,
  "gallery": gallery[].asset->url
}`

// Homepage room interface (simplified for homepage display)
export interface HomepageRoom {
  _id: string
  name: string
  slug: string
  shortDescription?: string
  description: string
  heroImage: string
  gallery?: string[]
  features?: string[]
  maxOccupancy?: number
  homepageGroup?: 'king' | 'queen' | 'family' | 'campDeck'
}

// Fetch rooms for homepage display
export async function getHomepageRooms(): Promise<HomepageRoom[]> {
  const query = `*[_type == "room" && isActive == true] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    description,
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url,
    features,
    maxOccupancy,
    homepageGroup
  }`
  return client.fetch(query)
}

// Fetch all rooms from Sanity
export async function getRooms(): Promise<RoomTeaser[]> {
  const sanityRooms = await client.fetch<SanityRoom[]>(roomsQuery)

  // Transform to match existing RoomTeaser interface
  return sanityRooms.map(room => ({
    id: room.slug,
    name: room.name,
    slug: room.slug,
    category: room.category,
    heroImage: room.heroImage?.asset?.url || '/images/placeholder.webp',
    galleryImages: room.gallery?.map(img => img.asset?.url).filter(Boolean) || [],
    features: room.features || [],
    description: room.description
  }))
}

// Fetch a single room by slug
export async function getRoomBySlug(slug: string): Promise<RoomTeaser | null> {
  const query = `*[_type == "room" && slug.current == $slug && isActive == true][0] {
    _id,
    name,
    "slug": slug.current,
    category,
    description,
    features,
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url
  }`

  const room = await client.fetch<SanityRoom | null>(query, { slug })

  if (!room) return null

  return {
    id: room.slug,
    name: room.name,
    slug: room.slug,
    category: room.category,
    heroImage: room.heroImage?.asset?.url || '/images/placeholder.webp',
    galleryImages: room.gallery?.map(img => img.asset?.url).filter(Boolean) || [],
    features: room.features || [],
    description: room.description
  }
}

// ============================================
// SITE SETTINGS
// ============================================
export interface SiteSettings {
  siteName: string
  tagline: string
  phone: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  googleMapsUrl?: string
  bookingUrl?: string
  socialLinks?: Array<{ platform: string; url: string }>
  footerText?: string
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    siteName,
    tagline,
    phone,
    email,
    address,
    googleMapsUrl,
    bookingUrl,
    socialLinks,
    footerText
  }`
  return client.fetch(query)
}

// ============================================
// HOMEPAGE
// ============================================
export interface Homepage {
  // Hero
  heroTitle?: string
  heroSubtitle?: string
  heroImageUrl?: string
  heroVideo?: string
  heroCtaText?: string
  heroCtaUrl?: string

  // Guide Section (Kinship is Your Guide)
  guideTitle?: string
  guideParagraph1?: string
  guideParagraph2?: string
  guideParagraph3?: string
  guideCta1Text?: string
  guideCta1Url?: string
  guideCta2Text?: string
  guideCta2Url?: string
  guideCta3Text?: string
  guideCta3Url?: string

  // Rooms Section
  roomsSectionTitle?: string
  roomsCtaText?: string
  roomsCtaUrl?: string

  // Events Section
  eventsSectionTitle?: string
  eventsSectionSubtitle?: string
  eventsCtaText?: string
  eventsCtaUrl?: string

  // HOMA Café Section
  homaParagraph1?: string
  homaParagraph2?: string
  homaPromoTitle?: string
  homaPromoDescription?: string
  homaPromoUrl?: string
  homaCtaText?: string
  homaCtaUrl?: string

  // Press & Reviews
  pressSectionTitle?: string
  reviewsSectionTitle?: string
  googleRating?: string
  googleReviewCount?: string

  // Newsletter
  newsletterTitle?: string
  newsletterDescription?: string
  newsletterButtonText?: string
  newsletterDisclaimer?: string

  // Map Section
  mapSectionTitle?: string
  mapSubtitle?: string
  nearbyAttractions?: Array<{ _key: string; name: string; time: string; link?: string }>
  mapCtaText?: string
  mapCtaUrl?: string

  // SEO
  seoTitle?: string
  seoDescription?: string
}

export async function getHomepage(): Promise<Homepage | null> {
  const query = `*[_type == "homepage"][0] {
    // Hero
    heroTitle,
    heroSubtitle,
    "heroImageUrl": heroImage.asset->url,
    heroVideo,
    heroCtaText,
    heroCtaUrl,

    // Guide Section
    guideTitle,
    guideParagraph1,
    guideParagraph2,
    guideParagraph3,
    guideCta1Text,
    guideCta1Url,
    guideCta2Text,
    guideCta2Url,
    guideCta3Text,
    guideCta3Url,

    // Rooms Section
    roomsSectionTitle,
    roomsCtaText,
    roomsCtaUrl,

    // Events Section
    eventsSectionTitle,
    eventsSectionSubtitle,
    eventsCtaText,
    eventsCtaUrl,

    // HOMA Section
    homaParagraph1,
    homaParagraph2,
    homaPromoTitle,
    homaPromoDescription,
    homaPromoUrl,
    homaCtaText,
    homaCtaUrl,

    // Press & Reviews
    pressSectionTitle,
    reviewsSectionTitle,
    googleRating,
    googleReviewCount,

    // Newsletter
    newsletterTitle,
    newsletterDescription,
    newsletterButtonText,
    newsletterDisclaimer,

    // Map Section
    mapSectionTitle,
    mapSubtitle,
    nearbyAttractions,
    mapCtaText,
    mapCtaUrl,

    // SEO
    seoTitle,
    seoDescription
  }`
  return client.fetch(query)
}

// ============================================
// EVENTS PAGE (Complete - all content editable)
// ============================================
export interface EventsPage {
  // Hero
  heroTitle: string
  heroSubtitle?: string
  heroImage?: string

  // Gatherings
  gatheringsTitle?: string
  gatheringsDescription?: string
  gatheringsCtaText?: string
  gatheringsCtaUrl?: string
  gatheringsGallery?: string[]

  // Weddings
  weddingsTitle?: string
  weddingsDescription?: string
  weddingsDescription2?: string
  weddingsCtaText?: string
  weddingsCtaUrl?: string
  weddingsInfoDeckText?: string
  weddingsInfoDeckUrl?: string
  weddingsGallery?: string[]

  // Meetings & Retreats
  meetingsTitle?: string
  meetingsDescription?: string
  meetingsDescription2?: string
  meetingsDescription3?: string
  meetingsNote?: string
  meetingsCtaText?: string
  meetingsCtaUrl?: string
  meetingsGallery?: string[]

  // Room Blocks
  roomBlocksTitle?: string
  roomBlocksDescription?: string
  roomBlocksDescription2?: string
  roomBlocksDescription3?: string
  roomBlocksCtaText?: string
  roomBlocksCtaUrl?: string
  roomBlocksGallery?: string[]

  // Takeover
  takeoverTitle?: string
  takeoverSubtitle?: string
  takeoverDescription?: string
  takeoverDescription2?: string
  takeoverFeatures?: string[]
  takeoverCtaText?: string
  takeoverCtaUrl?: string
  takeoverGallery?: string[]

  // GreenHaus Venue
  greenhausTitle?: string
  greenhausDescription?: string
  greenhausCapacity?: string
  greenhausFeatures?: string[]
  greenhausGallery?: string[]

  // Yard Venue
  yardTitle?: string
  yardDescription?: string
  yardCapacity?: string
  yardFeatures?: string[]
  yardGallery?: string[]

  // Conference Room Venue
  conferenceRoomTitle?: string
  conferenceRoomDescription?: string
  conferenceRoomCapacity?: string
  conferenceRoomFeatures?: string[]
  conferenceRoomGallery?: string[]

  // Fireplace Venue
  fireplaceTitle?: string
  fireplaceDescription?: string
  fireplaceCapacity?: string
  fireplaceFeatures?: string[]
  fireplaceGallery?: string[]

  // Camp Deck Venue
  campDeckTitle?: string
  campDeckDescription?: string
  campDeckCapacity?: string
  campDeckFeatures?: string[]
  campDeckGallery?: string[]

  // Contact
  inquiryEmail?: string
  inquiryPhone?: string
  bookingUrl?: string
}

export async function getEventsPage(): Promise<EventsPage | null> {
  const query = `*[_type == "eventsPage"][0] {
    // Hero
    heroTitle,
    heroSubtitle,
    "heroImage": heroImage.asset->url,

    // Gatherings
    gatheringsTitle,
    gatheringsDescription,
    gatheringsCtaText,
    gatheringsCtaUrl,
    "gatheringsGallery": gatheringsGallery[].asset->url,

    // Weddings
    weddingsTitle,
    weddingsDescription,
    weddingsDescription2,
    weddingsCtaText,
    weddingsCtaUrl,
    weddingsInfoDeckText,
    weddingsInfoDeckUrl,
    "weddingsGallery": weddingsGallery[].asset->url,

    // Meetings
    meetingsTitle,
    meetingsDescription,
    meetingsDescription2,
    meetingsDescription3,
    meetingsNote,
    meetingsCtaText,
    meetingsCtaUrl,
    "meetingsGallery": meetingsGallery[].asset->url,

    // Room Blocks
    roomBlocksTitle,
    roomBlocksDescription,
    roomBlocksDescription2,
    roomBlocksDescription3,
    roomBlocksCtaText,
    roomBlocksCtaUrl,
    "roomBlocksGallery": roomBlocksGallery[].asset->url,

    // Takeover
    takeoverTitle,
    takeoverSubtitle,
    takeoverDescription,
    takeoverDescription2,
    takeoverFeatures,
    takeoverCtaText,
    takeoverCtaUrl,
    "takeoverGallery": takeoverGallery[].asset->url,

    // GreenHaus
    greenhausTitle,
    greenhausDescription,
    greenhausCapacity,
    greenhausFeatures,
    "greenhausGallery": greenhausGallery[].asset->url,

    // Yard
    yardTitle,
    yardDescription,
    yardCapacity,
    yardFeatures,
    "yardGallery": yardGallery[].asset->url,

    // Conference Room
    conferenceRoomTitle,
    conferenceRoomDescription,
    conferenceRoomCapacity,
    conferenceRoomFeatures,
    "conferenceRoomGallery": conferenceRoomGallery[].asset->url,

    // Fireplace
    fireplaceTitle,
    fireplaceDescription,
    fireplaceCapacity,
    fireplaceFeatures,
    "fireplaceGallery": fireplaceGallery[].asset->url,

    // Camp Deck
    campDeckTitle,
    campDeckDescription,
    campDeckCapacity,
    campDeckFeatures,
    "campDeckGallery": campDeckGallery[].asset->url,

    // Contact
    inquiryEmail,
    inquiryPhone,
    bookingUrl
  }`
  return client.fetch(query)
}

// ============================================
// HOMA PAGE & MENU
// ============================================
export interface HomaPage {
  heroTitle: string
  heroSubtitle?: string
  description?: string
  hours?: Record<string, string>
  features?: string[]
  reservationUrl?: string
  menuPdfUrl?: string
}

export interface MenuItem {
  _id: string
  name: string
  description?: string
  price?: number
  category: string
  isAvailable: boolean
  isPopular?: boolean
}

export async function getHomaPage(): Promise<HomaPage | null> {
  const query = `*[_type == "homaPage"][0] {
    heroTitle,
    heroSubtitle,
    description,
    hours,
    features,
    reservationUrl,
    menuPdfUrl
  }`
  return client.fetch(query)
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const query = `*[_type == "menuItem" && isAvailable == true] | order(category asc, name asc) {
    _id,
    name,
    description,
    price,
    category,
    isAvailable,
    isPopular
  }`
  return client.fetch(query)
}

// ============================================
// ABOUT PAGE
// ============================================
export interface AboutPage {
  heroTitle: string
  heroSubtitle?: string
  storyTitle: string
  storyBody: string
  valuesTitle?: string
  values?: Array<{ title: string; description: string }>
  milestones?: Array<{ year: string; title: string; description: string }>
}

export async function getAboutPage(): Promise<AboutPage | null> {
  const query = `*[_type == "aboutPage"][0] {
    heroTitle,
    heroSubtitle,
    storyTitle,
    storyBody,
    valuesTitle,
    values,
    milestones
  }`
  return client.fetch(query)
}

// ============================================
// EXPLORE PAGE & ATTRACTIONS
// ============================================
export interface ExplorePage {
  heroTitle: string
  heroSubtitle?: string
  introText?: string
}

export interface LocalAttraction {
  _id: string
  name: string
  slug: string
  category: string
  description: string
  distance?: string
  website?: string
  insiderTip?: string
  heroImage?: string
}

export async function getExplorePage(): Promise<ExplorePage | null> {
  const query = `*[_type == "explorePage"][0] {
    heroTitle,
    heroSubtitle,
    introText
  }`
  return client.fetch(query)
}

export async function getLocalAttractions(): Promise<LocalAttraction[]> {
  const query = `*[_type == "localAttraction" && isActive == true] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    description,
    distance,
    website,
    insiderTip,
    "heroImage": heroImage.asset->url
  }`
  return client.fetch(query)
}

// ============================================
// GALLERY
// ============================================
export interface GalleryPage {
  title: string
  subtitle?: string
  description?: string
}

export interface GalleryImage {
  _id: string
  title?: string
  category?: string
  imageUrl: string
  alt?: string
}

export async function getGalleryPage(): Promise<GalleryPage | null> {
  const query = `*[_type == "galleryPage"][0] {
    title,
    subtitle,
    description
  }`
  return client.fetch(query)
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const query = `*[_type == "galleryImage" && isActive == true] | order(displayOrder asc) {
    _id,
    title,
    category,
    "imageUrl": image.asset->url,
    "alt": image.alt
  }`
  return client.fetch(query)
}

// ============================================
// CAREERS & JOBS
// ============================================
export interface CareersPage {
  heroTitle: string
  heroSubtitle?: string
  introText?: string
  benefits?: string[]
  applicationEmail?: string
}

export interface JobPosting {
  _id: string
  title: string
  department?: string
  type?: string
  description: string
  requirements?: string[]
  isActive: boolean
}

export async function getCareersPage(): Promise<CareersPage | null> {
  const query = `*[_type == "careersPage"][0] {
    heroTitle,
    heroSubtitle,
    introText,
    benefits,
    applicationEmail
  }`
  return client.fetch(query)
}

export async function getJobPostings(): Promise<JobPosting[]> {
  const query = `*[_type == "jobPosting" && isActive == true] | order(title asc) {
    _id,
    title,
    department,
    type,
    description,
    requirements,
    isActive
  }`
  return client.fetch(query)
}

// ============================================
// OFFERS
// ============================================
export interface OffersPage {
  heroTitle: string
  heroSubtitle?: string
  description?: string
}

export interface Offer {
  _id: string
  title: string
  slug: string
  shortDescription?: string
  description: string
  discountType?: string
  discountValue?: number
  promoCode?: string
  validFrom?: string
  validUntil?: string
  terms?: string
  isFeatured?: boolean
  heroImage?: string
}

export async function getOffersPage(): Promise<OffersPage | null> {
  const query = `*[_type == "offersPage"][0] {
    heroTitle,
    heroSubtitle,
    description
  }`
  return client.fetch(query)
}

export async function getOffers(): Promise<Offer[]> {
  const query = `*[_type == "offer" && isActive == true] | order(isFeatured desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    discountType,
    discountValue,
    promoCode,
    validFrom,
    validUntil,
    terms,
    isFeatured,
    "heroImage": heroImage.asset->url
  }`
  return client.fetch(query)
}

// ============================================
// COMMUNITY
// ============================================
export interface CommunityPage {
  heroTitle: string
  heroSubtitle?: string
  description?: string
}

export async function getCommunityPage(): Promise<CommunityPage | null> {
  const query = `*[_type == "communityPage"][0] {
    heroTitle,
    heroSubtitle,
    description
  }`
  return client.fetch(query)
}

// ============================================
// POLICIES, PRIVACY, ACCESSIBILITY
// ============================================
export interface PoliciesPage {
  title: string
  checkInTime?: string
  checkOutTime?: string
  cancellationPolicy?: string
  petPolicy?: string
  smokingPolicy?: string
  parkingInfo?: string
  agePolicy?: string
}

export interface PrivacyPage {
  title: string
  lastUpdated?: string
  content?: string
}

export interface AccessibilityPage {
  title: string
  commitment?: string
  features?: string[]
  contactInfo?: string
}

export async function getPoliciesPage(): Promise<PoliciesPage | null> {
  const query = `*[_type == "policiesPage"][0]`
  return client.fetch(query)
}

export async function getPrivacyPage(): Promise<PrivacyPage | null> {
  const query = `*[_type == "privacyPage"][0]`
  return client.fetch(query)
}

export async function getAccessibilityPage(): Promise<AccessibilityPage | null> {
  const query = `*[_type == "accessibilityPage"][0]`
  return client.fetch(query)
}

// Press mentions are now part of Homepage.pressLogos - no separate document type
