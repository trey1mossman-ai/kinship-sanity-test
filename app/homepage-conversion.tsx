import { Metadata } from 'next';
import { HeaderSimple } from '@/components/layout/HeaderSimple';
import { HeroConversion } from '@/components/HeroConversion';
import { WhyKinship } from '@/components/sections/WhyKinship';
import { RoomsGrid } from '@/components/home/RoomsGrid';
import { SocialProof } from '@/components/social-proof/SocialProof';
import { HomaCafeBar } from '@/components/sections/HomaCafeBar';
import { YardEvents } from '@/components/sections/YardEvents';
import { Press } from '@/components/sections/Press';
import { Newsletter } from '@/components/sections/Newsletter';
import { Footer } from '@/components/Footer';
import reviewsData from '@/data/reviews.seed.json';

export const metadata: Metadata = {
  title: 'Experience Colorado Springs like a local | Kinship Landing',
  description: 'Your guide to insider adventures and authentic experiences in downtown Colorado Springs. Boutique hotel with local connections.',
  keywords: 'Colorado Springs hotel, boutique hotel, downtown hotel, local experiences, adventure hotel, Kinship Landing',
  openGraph: {
    title: 'Experience Colorado Springs like a local | Kinship Landing',
    description: 'Your guide to insider adventures and authentic experiences in downtown Colorado Springs.',
    images: [
      {
        url: '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (3)-optimized.webp',
        width: 1920,
        height: 1280,
        alt: 'Kinship Landing Hotel',
        type: 'image/webp',
      },
    ],
  },
};

export default function ConversionHomePage() {
  return (
    <>
      {/* Skip to content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-kinship-green text-kinship-white px-4 py-2 rounded-md z-50 font-medium"
      >
        Skip to main content
      </a>
      
      <HeaderSimple />
      
      <main>
        <HeroConversion />
        <WhyKinship />
        <RoomsGrid />
        <SocialProof 
          meta={reviewsData.meta} 
          themes={reviewsData.themes} 
          reviews={reviewsData.reviews} 
        />
        <HomaCafeBar />
        <YardEvents />
        <Press />
        <Newsletter />
      </main>
      
      <Footer />

      {/* Hotel Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            "name": "Kinship Landing",
            "description": "Boutique adventure hotel in downtown Colorado Springs offering local connections and authentic experiences.",
            "url": "https://kinshiplanding.com",
            "telephone": "+1-719-XXX-XXXX",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Main Street",
              "addressLocality": "Colorado Springs",
              "addressRegion": "CO",
              "postalCode": "80903",
              "addressCountry": "US"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": reviewsData.meta.googleRating,
              "reviewCount": reviewsData.meta.googleReviewCountApprox,
              "bestRating": "5",
              "worstRating": "1"
            },
            "starRating": {
              "@type": "Rating",
              "ratingValue": "4"
            },
            "amenityFeature": [
              {
                "@type": "LocationFeatureSpecification",
                "name": "Restaurant",
                "value": "Homa Café + Bar"
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Event Space",
                "value": "The Yard"
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Free WiFi"
              }
            ],
            "priceRange": "$$"
          })
        }}
      />
    </>
  );
}