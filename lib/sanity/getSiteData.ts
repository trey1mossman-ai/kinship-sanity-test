import { client } from './client'

// Types for site-wide data - matches siteSettings schema
export interface SiteSettings {
  // Branding
  siteName: string
  tagline?: string
  logoUrl?: string
  logoAltUrl?: string
  faviconUrl?: string

  // Contact Info
  phone: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  googleMapsUrl?: string

  // Social Media
  instagramUrl?: string
  facebookUrl?: string
  tripAdvisorUrl?: string
  googleBusinessUrl?: string

  // Booking
  bookingUrl?: string
  eventInquiryUrl?: string
  groupBookingUrl?: string

  // Footer Links
  footerLinks?: Array<{ title: string; url: string }>

  // HOMA Café
  homaPhone?: string
  homaEmail?: string
  homaHours?: string
  homaInstagramUrl?: string
  homaFacebookUrl?: string
}

// Default values - used as fallback if Sanity data is missing
const defaultSettings: SiteSettings = {
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
  googleMapsUrl: 'https://www.google.com/maps/place/Kinship+Landing/@38.8284,-104.8253,17z',
  instagramUrl: 'https://www.instagram.com/kinshiplanding/',
  facebookUrl: 'https://www.facebook.com/kinshiplanding',
  bookingUrl: 'https://hotels.cloudbeds.com/en/reservation/BPdPxa',
  eventInquiryUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',
  groupBookingUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',
  footerLinks: [
    { title: 'Home', url: '/' },
    { title: 'Rooms', url: '/rooms' },
    { title: 'Events', url: '/events' },
    { title: 'HOMA Café + Bar', url: '/homa' },
    { title: 'Explore', url: '/explore' },
    { title: 'Gallery', url: '/gallery' },
    { title: 'About', url: '/about' },
    { title: 'Hotel Policies', url: '/policies' },
    { title: 'Privacy Policy', url: '/privacy' },
    { title: 'Accessibility', url: '/accessibility' },
    { title: 'Careers', url: '/careers' }
  ],
  homaPhone: '(719) 245-0046',
  homaEmail: 'homa@kinshiplanding.com',
  homaHours: '7am - 10pm Daily',
  homaInstagramUrl: 'https://www.instagram.com/homacafebar',
  homaFacebookUrl: 'https://www.facebook.com/Homa-Cafe-Bar'
}

// Fetch site settings from Sanity
export async function getSiteSettings(): Promise<SiteSettings> {
  const query = `*[_type == "siteSettings"][0] {
    // Branding
    siteName,
    tagline,
    "logoUrl": logo.asset->url,
    "logoAltUrl": logoAlt.asset->url,
    "faviconUrl": favicon.asset->url,

    // Contact Info
    phone,
    email,
    address,
    googleMapsUrl,

    // Social Media
    instagramUrl,
    facebookUrl,
    tripAdvisorUrl,
    googleBusinessUrl,

    // Booking
    bookingUrl,
    eventInquiryUrl,
    groupBookingUrl,

    // Footer Links
    footerLinks,

    // HOMA Café
    homaPhone,
    homaEmail,
    homaHours,
    homaInstagramUrl,
    homaFacebookUrl
  }`

  const settings = await client.fetch<SiteSettings | null>(query)

  // Merge with defaults - Sanity values override defaults
  if (settings) {
    return {
      ...defaultSettings,
      ...settings,
      // Ensure address is complete
      address: {
        ...defaultSettings.address,
        ...settings.address
      }
    }
  }

  return defaultSettings
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
