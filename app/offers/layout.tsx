import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Special Offers | Kinship Landing',
  description: 'Explore special offers and packages at Kinship Landing boutique hotel in Colorado Springs. Book direct for the best rates.',
  alternates: {
    canonical: 'https://www.kinshiplanding.com/offers',
  },
}

export default function OffersLayout({ children }: { children: React.ReactNode }) {
  return children
}
