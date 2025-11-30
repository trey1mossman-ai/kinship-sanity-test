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
