import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  useCdn: true,  // Use CDN for production (faster, cached)
  apiVersion: '2024-01-01',
})

// Query to get all test rooms
export async function getTestRooms() {
  const rooms = await client.fetch(`*[_type == "testRoom"] | order(price desc) {
    _id,
    name,
    slug,
    description,
    price,
    features,
    "imageUrl": heroImage.asset->url
  }`)
  return rooms
}
