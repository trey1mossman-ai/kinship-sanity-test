import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events & Gatherings | Kinship Landing',
  description: 'Host your wedding, corporate retreat, or special event at Kinship Landing. Unique venues including The Yard, Greenhaus, and full hotel buyouts.',
  alternates: {
    canonical: 'https://www.kinshiplanding.com/events',
  },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children
}
