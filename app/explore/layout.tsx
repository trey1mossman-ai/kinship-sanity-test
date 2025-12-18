import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore Colorado Springs | Kinship Landing',
  description: 'Your local guide to Colorado Springs. Discover hidden speakeasies, outdoor adventures, coffee shops, restaurants, and insider experiences.',
  alternates: {
    canonical: 'https://www.kinshiplanding.com/explore',
  },
}

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children
}
