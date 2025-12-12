import { getRoomsFromSanity } from '@/lib/data/rooms-sanity'
import { getRoomsPage } from '@/lib/sanity/queries'
import RoomsPageClient from './RoomsPageClient'

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

export default async function RoomsPage() {
  // Fetch rooms and page content from Sanity at build time / on request
  const [roomTeasers, roomsPageData] = await Promise.all([
    getRoomsFromSanity(),
    getRoomsPage()
  ])

  return <RoomsPageClient roomTeasers={roomTeasers} roomsPageData={roomsPageData} />
}
