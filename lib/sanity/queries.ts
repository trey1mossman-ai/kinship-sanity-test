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
  "heroImage": heroImage.asset->url,
  "gallery": gallery[].asset->url
}`

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
  heroHeadline: string
  heroSubheadline: string
  heroCta?: { text: string; url: string }
  whyKinshipTitle: string
  whyKinshipBody: string
  roomsSectionTitle: string
  roomsSectionSubtitle?: string
  cafeSectionTitle: string
  cafeSectionDescription: string
  cafeFeatures?: string[]
  eventsSectionTitle: string
  eventsSectionDescription?: string
  pressSectionTitle: string
  reviewsSectionTitle: string
  googleRating?: string
  googleReviewCount?: string
  mapSectionTitle: string
  nearbyAttractions?: Array<{ name: string; time: string }>
}

export async function getHomepage(): Promise<Homepage | null> {
  const query = `*[_type == "homepage"][0] {
    heroHeadline,
    heroSubheadline,
    heroCta,
    whyKinshipTitle,
    whyKinshipBody,
    roomsSectionTitle,
    roomsSectionSubtitle,
    cafeSectionTitle,
    cafeSectionDescription,
    cafeFeatures,
    eventsSectionTitle,
    eventsSectionDescription,
    pressSectionTitle,
    reviewsSectionTitle,
    googleRating,
    googleReviewCount,
    mapSectionTitle,
    nearbyAttractions
  }`
  return client.fetch(query)
}

// ============================================
// EVENTS PAGE & SPACES
// ============================================
export interface EventsPage {
  heroTitle: string
  heroSubtitle?: string
  takeoverTitle: string
  takeoverSubtitle?: string
  takeoverDescription: string
  takeoverFeatures?: string[]
  inquiryEmail?: string
  inquiryPhone?: string
}

export interface EventSpace {
  _id: string
  name: string
  slug: string
  description: string
  capacity?: {
    seated?: number
    standing?: number
  }
  features?: string[]
  idealFor?: string[]
  heroImage?: string
  gallery?: string[]
}

export async function getEventsPage(): Promise<EventsPage | null> {
  const query = `*[_type == "eventsPage"][0] {
    heroTitle,
    heroSubtitle,
    takeoverTitle,
    takeoverSubtitle,
    takeoverDescription,
    takeoverFeatures,
    inquiryEmail,
    inquiryPhone
  }`
  return client.fetch(query)
}

export async function getEventSpaces(): Promise<EventSpace[]> {
  const query = `*[_type == "eventSpace" && isActive == true] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    capacity,
    features,
    idealFor,
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url
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

// ============================================
// PRESS MENTIONS
// ============================================
export interface PressMention {
  _id: string
  publication: string
  quote?: string
  url?: string
  logoUrl?: string
}

export async function getPressMentions(): Promise<PressMention[]> {
  const query = `*[_type == "pressMention" && isActive == true] | order(displayOrder asc) {
    _id,
    publication,
    quote,
    url,
    "logoUrl": logo.asset->url
  }`
  return client.fetch(query)
}
