import { createClient } from '@sanity/client'

const isBuilding = process.env.NODE_ENV === 'production' && typeof window === 'undefined'

export const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: !isBuilding, // Use API (not CDN) at build time for fresh data; CDN for client-side reads
})
