import { getRoomsFromSanity } from '@/lib/data/rooms-sanity'
import RoomsPageClient from './RoomsPageClient'

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

export default async function RoomsPage() {
  // Fetch rooms from Sanity at build time / on request
  const roomTeasers = await getRoomsFromSanity()

  return <RoomsPageClient roomTeasers={roomTeasers} />
}
