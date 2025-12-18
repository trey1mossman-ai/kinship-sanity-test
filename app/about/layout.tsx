import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Kinship Landing',
  description: 'Learn about Kinship Landing, a boutique adventure hotel in downtown Colorado Springs. Our story, values, and commitment to outrageous hospitality.',
  alternates: {
    canonical: 'https://www.kinshiplanding.com/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
