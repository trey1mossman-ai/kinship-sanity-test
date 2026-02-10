import { getRoomsPage } from '@/lib/sanity/queries'
import { optimizeSanityData } from '@/lib/sanity/imageTransform';
import RoomsPageClient from './RoomsPageClient'

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

export default async function RoomsPage() {
  // Fetch rooms page data (including rooms array) from Sanity
  const roomsPageData = optimizeSanityData(await getRoomsPage())

  return <RoomsPageClient roomsPageData={roomsPageData} />
}
