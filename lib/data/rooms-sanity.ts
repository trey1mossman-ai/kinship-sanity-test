/**
 * Room data fetched from Sanity CMS
 *
 * This file provides the same interface as rooms.ts but fetches from Sanity
 * instead of using hardcoded data.
 */

import { client } from '@/lib/sanity/client'

export interface RoomTeaser {
  id: string
  name: string
  slug: string
  category: 'suites' | 'junior' | 'family' | 'specialty'
  heroImage: string
  galleryImages?: string[]
  features: string[]
  description: string
  price?: number // Optional - not displayed on website
}

// GROQ query to fetch all active rooms
const roomsQuery = `*[_type == "room" && isActive == true] | order(displayOrder asc) {
  _id,
  name,
  "slug": slug.current,
  category,
  description,
  features,
  "heroImage": heroImage.asset->url,
  "gallery": gallery[].asset->url
}`

// Fetch rooms from Sanity
export async function getRoomsFromSanity(): Promise<RoomTeaser[]> {
  const rooms = await client.fetch(roomsQuery)

  return rooms.map((room: any) => ({
    id: room.slug,
    name: room.name,
    slug: room.slug,
    category: room.category,
    heroImage: room.heroImage || '/images/placeholder.webp',
    galleryImages: room.gallery?.filter(Boolean) || [],
    features: room.features || [],
    description: room.description
  }))
}

// For static generation, we can pre-fetch at build time
let cachedRooms: RoomTeaser[] | null = null

export async function getRoomTeasers(): Promise<RoomTeaser[]> {
  if (cachedRooms) return cachedRooms

  cachedRooms = await getRoomsFromSanity()
  return cachedRooms
}

// Reset cache (useful for revalidation)
export function clearRoomCache() {
  cachedRooms = null
}
