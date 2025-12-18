import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Homa Café + Bar | Kinship Landing',
  description: 'Visit Homa Café + Bar at Kinship Landing. Modern cuisine, craft cocktails, and local vibes in downtown Colorado Springs.',
  alternates: {
    canonical: 'https://www.kinshiplanding.com/homa',
  },
}

export default function HomaLayout({ children }: { children: React.ReactNode }) {
  return children
}
