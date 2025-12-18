import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community | Kinship Landing',
  description: 'Discover local partnerships and community connections at Kinship Landing. Supporting Colorado Springs businesses and adventures.',
  alternates: {
    canonical: 'https://www.kinshiplanding.com/community',
  },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children
}
