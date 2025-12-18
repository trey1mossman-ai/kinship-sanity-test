import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rooms & Suites | Kinship Landing',
  description: 'Explore our unique guest rooms and suites at Kinship Landing. From cozy private rooms to spacious family suites with mountain views in Colorado Springs.',
  alternates: {
    canonical: 'https://www.kinshiplanding.com/rooms',
  },
}

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return children
}
