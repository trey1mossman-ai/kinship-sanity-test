import { client } from './client'

// Types for site-wide data
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

// Fetch site settings from Sanity
export async function getSiteSettings(): Promise<SiteSettings> {
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

  const settings = await client.fetch<SiteSettings | null>(query)

  // Return defaults if not found in Sanity
  return settings || {
    siteName: 'Kinship Landing',
    tagline: 'Stay. Gather. Explore.',
    phone: '(719) 203-9309',
    email: 'hello@kinshiplanding.com',
    address: {
      street: '415 S Nevada Ave',
      city: 'Colorado Springs',
      state: 'CO',
      zip: '80903'
    },
    googleMapsUrl: 'https://www.google.com/maps/place/415+S+Nevada+Ave,+Colorado+Springs,+CO+80903',
    bookingUrl: 'https://hotels.cloudbeds.com/en/reservation/BPdPxa',
    socialLinks: [
      { platform: 'instagram', url: 'https://www.instagram.com/kinshiplanding/' },
      { platform: 'facebook', url: 'https://www.facebook.com/kinshiplanding' }
    ]
  }
}

// Get homepage data from Sanity
export interface HomepageData {
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

export async function getHomepageData(): Promise<HomepageData> {
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

  const homepage = await client.fetch<HomepageData | null>(query)

  // Return defaults if not found
  return homepage || {
    heroHeadline: 'Experience Colorado Springs like a local',
    heroSubheadline: 'Sleep well. Meet locals. Launch adventures.',
    whyKinshipTitle: 'Kinship is Your Guide',
    whyKinshipBody: "It makes a difference landing in a place where you know a friend. Consider us your personal insider guide to exploring the real gems of Colorado Springs.",
    roomsSectionTitle: 'Find Your Perfect Room',
    cafeSectionTitle: 'Homa Café + Bar',
    cafeSectionDescription: 'Great coffee. Solid cocktails. Real food. Open to neighbors and travelers alike.',
    eventsSectionTitle: 'Events & Gatherings',
    pressSectionTitle: 'As Featured In',
    reviewsSectionTitle: 'What Our Guests Say',
    mapSectionTitle: 'Find Us'
  }
}

// Get press mentions from Sanity
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

  return client.fetch(query) || []
}
