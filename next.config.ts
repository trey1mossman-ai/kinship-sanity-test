import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',           // Static HTML export for Hostinger
  trailingSlash: true,
  compress: true,
  images: {
    unoptimized: true,        // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
