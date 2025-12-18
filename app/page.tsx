import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Image from 'next/image';

// Critical above-fold components - load immediately
import { HeaderNav } from '@/components/layout/HeaderNav';
// import { Hero } from '@/components/home/Hero'; // Original hero
import { HeroSection as Hero } from '@/components/HeroEnhanced'; // Enhanced hero with Ken Burns, reviews, and larger booking widget

// Dynamic imports for below-fold components - lazy loaded for performance
const WhyKinship = dynamic(() => import('@/components/home/WhyKinship').then(mod => ({ default: mod.WhyKinship })));
const RoomsGrid = dynamic(() => import('@/components/home/RoomsGridSanity').then(mod => ({ default: mod.RoomsGridSanity })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});
const KinshipGuideExplore = dynamic(() => import('@/components/home/KinshipGuideAsymmetric').then(mod => ({ default: mod.KinshipGuideAsymmetric })));
const CafeSection = dynamic(() => import('@/components/home/HomaSectionEnhanced').then(mod => ({ default: mod.HomaSectionEnhanced })));
// const EventsSection = dynamic(() => import('@/components/home/EventsSection').then(mod => ({ default: mod.EventsSection })));
const EventsSection = dynamic(() => import('@/components/home/EventsSectionDynamic').then(mod => ({ default: mod.EventsSectionDynamic })));
const PressAndReviews = dynamic(() => import('@/components/home/PressAndReviews').then(mod => ({ default: mod.PressAndReviews })));
const MapBlock = dynamic(() => import('@/components/home/MapBlock').then(mod => ({ default: mod.MapBlock })));
const Newsletter = dynamic(() => import('@/components/sections/Newsletter').then(mod => ({ default: mod.Newsletter })));
const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })));
const ScrollTop = dynamic(() => import('@/components/ScrollTop').then(mod => ({ default: mod.ScrollTop })));
const CallToBook = dynamic(() => import('@/components/CallToBook').then(mod => ({ default: mod.CallToBook })));
const FAQSection = dynamic(() => import('@/components/home/FAQ/FAQAccordion').then(mod => ({ default: mod.FAQAccordion })));

// Lightweight components can stay as regular imports
import { SectionDivider } from '@/components/home/SectionDivider';
import { MuralSection } from '@/components/home/MuralSection';
import { SubtleDivider } from '@/components/home/SubtleDivider';
// ScrollEffectsWrapper removed for performance - adds unnecessary Framer Motion weight
// import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';

// Data imports
import reviewsData from '@/data/reviews.seed.json';
import { faqs } from '@/components/home/FAQ/faq-data';
import { buildFaqJsonLd } from '@/components/home/FAQ/faq-jsonld';

// Sanity data fetching
import { getHomepage, getHomepageRooms } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Experience Colorado Springs like a local | Kinship Landing',
  description: 'Your guide to insider adventures and authentic experiences in downtown Colorado Springs. Boutique hotel with local connections and mountain views.',
  keywords: 'Colorado Springs hotel, boutique hotel, downtown hotel, local experiences, Kinship Landing, Pikes Peak, Garden of the Gods',
  openGraph: {
    title: 'Experience Colorado Springs like a local | Kinship Landing',
    description: 'Your guide to insider adventures and authentic experiences in downtown Colorado Springs. Boutique hotel with local connections.',
    url: 'https://kinshiplanding.com',
    siteName: 'Kinship Landing',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (3)-optimized.webp',
        width: 1920,
        height: 1280,
        alt: 'Kinship Landing Hotel with Colorado Springs mountain views',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience Colorado Springs like a local | Kinship Landing',
    description: 'Your guide to insider adventures and authentic experiences in downtown Colorado Springs.',
    images: ['/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (3)-optimized.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.kinshiplanding.com',
  },
  verification: {
    google: '0oV-MEhRaBJ_PHbTZGXfXwVhT0tQZHq9pzACjYYzfaQ',
  },
};

export default async function HomePage() {
  // Fetch homepage data from Sanity (with fallback to defaults)
  // Press mentions are now included in homepageData.pressLogos
  const [homepageData, homepageRooms] = await Promise.all([
    getHomepage(),
    getHomepageRooms()
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Kinship Landing",
    "description": "Boutique adventure hotel in downtown Colorado Springs",
    "url": "https://kinshiplanding.com",
    "telephone": "+1-719-203-9309",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "415 S Nevada Ave",
      "addressLocality": "Colorado Springs",
      "addressRegion": "CO",
      "postalCode": "80903",
      "addressCountry": "US"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": reviewsData.meta.googleRating,
      "reviewCount": reviewsData.meta.googleReviewCountApprox
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Parking" },
      { "@type": "LocationFeatureSpecification", "name": "Restaurant" },
      { "@type": "LocationFeatureSpecification", "name": "Bar/Lounge" },
      { "@type": "LocationFeatureSpecification", "name": "Free Wi‑Fi" },
      { "@type": "LocationFeatureSpecification", "name": "WheelchairAccessible" }
    ],
    "checkinTime": "16:00",
    "checkoutTime": "10:00",
    "petsAllowed": true
  };

  const faqJsonLd = buildFaqJsonLd(
    faqs,
    'https://kinshiplanding.com'
  );

  return (
    <>
      <HeaderNav />
      <Hero
        headline={homepageData?.heroTitle}
        subheadline={homepageData?.heroSubtitle}
        heroVideoUrl={homepageData?.heroVideo}
        heroImageUrl={homepageData?.heroImageUrl}
      />

      <main id="main-content">
        {/* 1. Kinship is Your Guide + Stay Gather Explore */}
        <KinshipGuideExplore
          sanityData={homepageData}
        />

        {/* 2. Find Your Perfect Room */}
        <SectionDivider />
        <RoomsGrid
          rooms={homepageRooms}
          sectionTitle={homepageData?.roomsSectionTitle}
          ctaText={homepageData?.roomsCtaText}
          ctaUrl={homepageData?.roomsCtaUrl}
          kingRoomsLabel={homepageData?.kingRoomsLabel}
          kingRooms={homepageData?.kingRooms}
          queenRoomsLabel={homepageData?.queenRoomsLabel}
          queenRooms={homepageData?.queenRooms}
          familyRoomLabel={homepageData?.familyRoomLabel}
          familyRoomName={homepageData?.familyRoomName}
          familyRoomSlug={homepageData?.familyRoomSlug}
          familyRoomDescription={homepageData?.familyRoomDescription}
          campDeckLabel={homepageData?.campDeckLabel}
          campDeckName={homepageData?.campDeckName}
          campDeckSlug={homepageData?.campDeckSlug}
          campDeckDescription={homepageData?.campDeckDescription}
        />

        {/* 3. Events & Gatherings (with venue spaces) */}
        <SectionDivider />
        <EventsSection
          title={homepageData?.eventsSectionTitle}
          subtitle={homepageData?.eventsSectionSubtitle}
          ctaText={homepageData?.eventsCtaText}
          ctaUrl={homepageData?.eventsCtaUrl}
          greenhausCarouselImages={homepageData?.greenhausCarouselImages}
          yardCarouselImages={homepageData?.yardCarouselImages}
        />

        {/* 4. HOMA section */}
        <SectionDivider />
        <CafeSection sanityData={homepageData} />

        {/* 5. As Featured In + Guest Reviews (combined) */}
        <SectionDivider />
        <PressAndReviews
          reviewData={reviewsData}
          pressSectionTitle={homepageData?.pressSectionTitle}
          reviewsSectionTitle={homepageData?.reviewsSectionTitle}
          homepageData={homepageData ? {
            pressLogos: homepageData.pressLogos,
            pressBackgroundMuralUrl: homepageData.pressBackgroundMuralUrl
          } : undefined}
        />

        {/* 6. Newsletter signup */}
        <SectionDivider />
        <Newsletter sanityData={homepageData} />

        {/* 7. Visual Break - WoodWall Detail */}
        <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
          <Image
            src={homepageData?.woodwallBreakImageUrl || "/images/About/WoodWall-SamStarr.webp"}
            alt="Kinship Landing interior craftsmanship detail"
            fill
            className="object-cover"
            quality={75}
            sizes="100vw"
          />
        </section>

        {/* 8. FAQs */}
        <FAQSection />

        {/* 9. Location Map */}
        <MapBlock
          sanityData={homepageData}
        />
      </main>

      <Footer />
      
      {/* Sticky Buttons */}
      <ScrollTop />
      <CallToBook />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd)
        }}
      />
    </>
  );
}
