import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery | Kinship Landing',
  description: 'Browse photos of Kinship Landing boutique hotel. Guest rooms, event spaces, Homa Café + Bar, and mountain views in Colorado Springs.',
  alternates: {
    canonical: 'https://www.kinshiplanding.com/gallery',
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
