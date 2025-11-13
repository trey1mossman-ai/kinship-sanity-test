import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sanity + Hostinger Test',
  description: 'Testing Sanity CMS with static export for Hostinger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
