export function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: 'Kinship Landing',
    description: 'Boutique adventure hotel in downtown Colorado Springs. Stay, Gather, Explore.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    image: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '415 S Nevada Ave',
      addressLocality: 'Colorado Springs',
      addressRegion: 'CO',
      postalCode: '80903',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.8284,
      longitude: -104.8249,
    },
    telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    priceRange: '$$',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi' },
      { '@type': 'LocationFeatureSpecification', name: 'Pet Friendly' },
      { '@type': 'LocationFeatureSpecification', name: 'Restaurant' },
      { '@type': 'LocationFeatureSpecification', name: 'Bar' },
      { '@type': 'LocationFeatureSpecification', name: 'Outdoor Space' },
      { '@type': 'LocationFeatureSpecification', name: 'Accessible Rooms' },
    ],
    hasMap: 'https://maps.google.com/?q=Kinship+Landing+Colorado+Springs',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
    sameAs: [
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
      process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}