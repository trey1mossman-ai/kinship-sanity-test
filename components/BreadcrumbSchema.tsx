'use client';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const baseUrl = 'https://www.kinshiplanding.com';
  
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}

// Pre-defined breadcrumb configurations for each page
export const BREADCRUMBS = {
  home: [{ name: 'Home', url: '/' }],
  rooms: [
    { name: 'Home', url: '/' },
    { name: 'Rooms', url: '/rooms' },
  ],
  events: [
    { name: 'Home', url: '/' },
    { name: 'Events', url: '/events' },
  ],
  homa: [
    { name: 'Home', url: '/' },
    { name: 'Homa Cafe + Bar', url: '/homa' },
  ],
  about: [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ],
  gallery: [
    { name: 'Home', url: '/' },
    { name: 'Gallery', url: '/gallery' },
  ],
  explore: [
    { name: 'Home', url: '/' },
    { name: 'Explore', url: '/explore' },
  ],
  offers: [
    { name: 'Home', url: '/' },
    { name: 'Special Offers', url: '/offers' },
  ],
  community: [
    { name: 'Home', url: '/' },
    { name: 'Community', url: '/community' },
  ],
  careers: [
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
  ],
  policies: [
    { name: 'Home', url: '/' },
    { name: 'Hotel Policies', url: '/policies' },
  ],
  privacy: [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy' },
  ],
  accessibility: [
    { name: 'Home', url: '/' },
    { name: 'Accessibility', url: '/accessibility' },
  ],
};
