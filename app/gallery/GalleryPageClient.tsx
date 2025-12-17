'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Critical above-fold components
import { HeaderNav } from '@/components/layout/HeaderNav';
import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';
import { BookingWidget } from '@/components/HeroEnhanced/BookingWidget';
import { GalleryPage as GalleryPageData } from '@/lib/sanity/queries';

// Dynamic imports for below-fold components
const GalleryFAQ = dynamic(() => import('@/components/gallery/GalleryFAQ').then(mod => ({ default: mod.GalleryFAQ })));
const Newsletter = dynamic(() => import('@/components/sections/Newsletter').then(mod => ({ default: mod.Newsletter })));
const MapBlock = dynamic(() => import('@/components/home/MapBlock').then(mod => ({ default: mod.MapBlock })));
const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })));
const CallToBook = dynamic(() => import('@/components/CallToBook').then(mod => ({ default: mod.CallToBook })));

type GalleryFilter = 'all' | 'rooms' | 'venues' | 'homa' | 'weddings';

type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryFilter[];
};

const galleryImages: GalleryImage[] = [
  // PRIORITY: First 15 images - Sam Starr, Richard Seldomridge, Greg Ceo ONLY

  // Sam Starr & Richard Seldomridge - Rooms
  { src: '/images/Rooms Page:section/Book a bunch of rooms/BunkRoom5-SamStarr-optimized.webp', alt: 'Room Block', category: ['rooms'] },
  { src: '/images/Rooms Page:section/Camp Deck/CampDeck-SamStarrMedia (2)-optimized.webp', alt: 'Camp Deck', category: ['rooms'] },
  { src: '/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge-optimized.webp', alt: 'Camp Deck Outdoor', category: ['rooms'] },
  { src: '/images/Rooms Page:section/Double Queen Balcony/DoubleQueenSuite-RichardSeldomridge-optimized.webp', alt: 'Double Queen Balcony Suite', category: ['rooms'] },
  { src: '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (1) (1)-optimized.webp', alt: 'King Suite', category: ['rooms'] },
  { src: '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (2)-optimized.webp', alt: 'King Suite Interior', category: ['rooms'] },
  { src: '/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-RichardSeldomridge (4)-optimized.webp', alt: 'Mountain Double Queen', category: ['rooms'] },
  { src: '/images/Rooms Page:section/Mountain Jr. Queen/MountainJrQueenSuite-RichardSeldomridge-optimized.webp', alt: 'Mountain Jr. Queen Suite', category: ['rooms'] },

  // Sam Starr, Richard Seldomridge, Greg Ceo - Venues, HOMA & Weddings
  { src: '/images/events-page/The Fireplace/FireplaceDrinks2, SamStarr-optimized.webp', alt: 'Fireplace Lounge', category: ['venues'] },
  { src: '/images/events-page/GreenHaus/Greenhaus-SamStarrMedia (1).webp', alt: 'GreenHaus Interior', category: ['venues'] },
  { src: '/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge.webp', alt: 'GreenHaus Venue', category: ['venues'] },
  { src: '/images/events-page/The Yard/Yard2, SamStarr.webp', alt: 'The Yard - Gathering Space', category: ['venues'] },
  { src: '/images/events-page/The Yard/Yard3, SamStarr.webp', alt: 'The Yard - Evening Atmosphere', category: ['venues'] },
  { src: '/images/HOMA Page/CafeSeating-GregCeo-optimized.webp', alt: 'HOMA Seating Space', category: ['homa'] },
  { src: '/images/HOMA Page/CafeSeating2, SamStarr.webp', alt: 'HOMA Lounge Seating', category: ['homa'] },
  { src: '/images/events-page/Weddings/MountainKingSuite-RichardSeldomridge.webp', alt: 'Wedding at Kinship Landing', category: ['weddings'] },

  // REMAINING IMAGES - All other photographers
  { src: '/images/HOMA Page/DSCF8548.webp', alt: 'HOMA Café Interior', category: ['homa'] },
  { src: '/images/HOMA Page/Seating Homa -optimized.webp', alt: 'HOMA Café Seating', category: ['homa'] },
  { src: '/images/HOMA Page/Brunch.webp', alt: 'HOMA Brunch', category: ['homa'] },
  { src: '/images/HOMA Page/Signature Dishes.webp', alt: 'HOMA Signature Dishes', category: ['homa'] },
  { src: '/images/HOMA Page/Craft Cocktails.webp', alt: 'HOMA Craft Cocktails', category: ['homa'] },
  { src: '/images/HOMA Page/Fresh and local.webp', alt: 'HOMA Fresh & Local Ingredients', category: ['homa'] },
  { src: '/images/HOMA Page/Homa Bar, Jennie Campbell (@fsupecas21)-optimized.webp', alt: 'HOMA Bar', category: ['homa'] },
  { src: '/images/HOMA Page/Homa Espresso Web Size_-4 (1).webp', alt: 'HOMA Espresso', category: ['homa'] },
  { src: '/images/HOMA Page/homa 8.13.24-6 (1).webp', alt: 'HOMA Café Atmosphere', category: ['homa'] },
  { src: '/images/HOMA Page/Homa.2.25-29 (1).webp', alt: 'HOMA Dining', category: ['homa'] },
  { src: '/images/HOMA Page/homa-happy-hour-34.webp', alt: 'HOMA Happy Hour', category: ['homa'] },
  { src: '/images/HOMA Page/CafeSeating-ChrystalHolmes (1)-optimized.webp', alt: 'HOMA Café Seating Area', category: ['homa'] },
  { src: '/images/HOMA Page/homa seating 2-optimized.webp', alt: 'HOMA Cozy Corner', category: ['homa'] },
  { src: '/images/HOMA Page/homa seating-optimized.webp', alt: 'HOMA Seating', category: ['homa'] },

  { src: '/images/Rooms Page:section/Book a bunch of rooms/MountainDoubleQueenSuite-AshleeKay-optimized.webp', alt: 'Mountain Double Queen Suite', category: ['rooms'] },
  { src: '/images/Rooms Page:section/Family Suite/AK_03363-optimized.webp', alt: 'Family Suite', category: ['rooms'] },
  { src: '/images/Gallery Page/Family Suite, Ashlee Kay Photography (2)-optimized.webp', alt: 'Family Suite Living Area', category: ['rooms'] },

  { src: '/images/events-page/Meetings:Retreats/Kinship-4G3A9437-1 (1).webp', alt: 'GreenHaus Event Space', category: ['venues'] },
  { src: '/images/events-page/Gatherings/0B1A0328-optimized.webp', alt: 'GreenHaus Gathering', category: ['venues'] },
  { src: '/images/events-page/GreenHaus/Greenhaus-ErinWinterPhotography-8502.webp', alt: 'GreenHaus Setup', category: ['venues'] },

  { src: '/images/events-page/The Yard/Yard7, SamStarr.webp', alt: 'The Yard - Outdoor Setting', category: ['venues'] },
  { src: '/images/events-page/The Yard/Yard8, SamStarr.webp', alt: 'The Yard - Event Setup', category: ['venues'] },
  { src: '/images/events-page/The Yard/Yard, AshleeKayPhotography.webp', alt: 'The Yard - Outdoor Event Space', category: ['venues'] },
  { src: '/images/events-page/The Yard/Yard, AshleeKayPhotography (2).webp', alt: 'The Yard - Mountain Views', category: ['venues'] },
  { src: '/images/events-page/The Yard/4DE0F411-7D69-45F5-90C2-98BF3C106C00_1_201_a.webp', alt: 'The Yard - Venue Space', category: ['venues'] },
  { src: '/images/events-page/The Yard/D85A8921.webp', alt: 'The Yard - Panoramic View', category: ['venues'] },
  { src: '/images/events-page/The Yard/D85A8970.webp', alt: 'The Yard - Scenic Backdrop', category: ['venues'] },
  { src: '/images/events-page/The Yard/DSC_6966.webp', alt: 'The Yard - Colorado Views', category: ['venues'] },
  { src: '/images/events-page/The Yard/IMG_1484.webp', alt: 'The Yard - Mountain Setting', category: ['venues'] },
  { src: '/images/events-page/The Yard/IMG_1487 (1).webp', alt: 'The Yard - Outdoor Ambiance', category: ['venues'] },
  { src: '/images/events-page/The Yard/IMG_1490.webp', alt: 'The Yard - Event Venue', category: ['venues'] },
  { src: '/images/events-page/The Yard/IMG_1494.webp', alt: 'The Yard - Outdoor Space', category: ['venues'] },

  // Weddings - All remaining wedding images
  { src: '/images/events-page/Weddings/8F8A1146-optimized.webp', alt: 'Wedding Celebration at Kinship', category: ['weddings'] },
  { src: '/images/events-page/Weddings/8F8A7820.webp', alt: 'Wedding Reception at Kinship', category: ['weddings'] },
  { src: '/images/events-page/Weddings/D85A8377-optimized.webp', alt: 'Wedding Ceremony at Kinship', category: ['weddings'] },
  { src: '/images/events-page/Weddings/event image-optimized.webp', alt: 'Wedding Event at Kinship Landing', category: ['weddings'] },
  { src: '/images/events-page/Weddings/kinship-38.webp', alt: 'Kinship Wedding Detail', category: ['weddings'] },
  { src: '/images/events-page/Weddings/kinship-48.webp', alt: 'Kinship Wedding Venue', category: ['weddings'] },
  { src: '/images/events-page/Weddings/kinship-57_nB2.webp', alt: 'Kinship Wedding Atmosphere', category: ['weddings'] },
];

interface GalleryPageClientProps {
  galleryData: GalleryPageData | null;
}

export function GalleryPageClient({ galleryData }: GalleryPageClientProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Use Sanity data with fallbacks - Hero
  const title = galleryData?.heroTitle || 'Gallery';
  const subtitle = galleryData?.heroSubtitle || 'Explore Kinship Landing';

  // Intro section - Sanity with fallbacks
  const introBadge = galleryData?.introBadge || 'See It For Yourself';
  const introTitle = galleryData?.introTitle || 'Your Colorado Springs Basecamp';
  const introText = galleryData?.introText || 'From cozy rooms with mountain views to vibrant gathering spaces and locally-crafted dishes at HOMA, explore what makes Kinship Landing the perfect place to stay, gather, and launch your Colorado adventures.';

  // Filter labels - Sanity with fallbacks
  const filters: { id: GalleryFilter; label: string }[] = [
    { id: 'all', label: galleryData?.filterAllLabel || 'All' },
    { id: 'rooms', label: galleryData?.filterRoomsLabel || 'Rooms' },
    { id: 'venues', label: galleryData?.filterVenuesLabel || 'Venues' },
    { id: 'homa', label: galleryData?.filterHomaLabel || 'Homa Café' },
    { id: 'weddings', label: galleryData?.filterWeddingsLabel || 'Weddings' },
  ];

  // Use Sanity gallery images if available, otherwise use hardcoded fallback
  const displayImages: GalleryImage[] = galleryData?.galleryImages && galleryData.galleryImages.length > 0
    ? galleryData.galleryImages.map((img) => ({
        src: img.imageUrl,
        alt: img.alt || 'Gallery Image',
        category: [img.category as GalleryFilter || 'rooms'],
      }))
    : galleryImages;

  const filteredImages = displayImages.filter(
    (image) => activeFilter === 'all' || image.category.includes(activeFilter)
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <ScrollEffectsWrapper>
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What types of images are featured in the Kinship Landing gallery?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The gallery showcases interior room shots, suites with wooden decor, junior suites, family suites with bunk beds, bathroom vanities, food and drinks from Homa Café + Bar, as well as outdoor views of the Yard, Camp Deck, and the Greenhaus."
                }
              },
              {
                "@type": "Question",
                "name": "Does the gallery include photos of all room types?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The gallery includes suites, junior suites with desks and ottomans, and family suites with bunk beds to help you visualize each room style before booking."
                }
              },
              {
                "@type": "Question",
                "name": "Are there images of Kinship Landing's event spaces like the Greenhaus, Yard and Camp Deck?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The gallery features photos of guests relaxing in the Greenhaus, setups in the Yard, and people camping or setting up tents on the Camp Deck."
                }
              },
              {
                "@type": "Question",
                "name": "Does the gallery feature weddings and special events?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The gallery includes candid photos of wedding couples and social gatherings that highlight Kinship Landing's use as a wedding and event venue."
                }
              },
              {
                "@type": "Question",
                "name": "Can I view the food and drink offerings in the gallery?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The gallery highlights menu items like cheese pasta, chicken steak, poke bowls, and cauliflower pops from Homa Café + Bar."
                }
              },
              {
                "@type": "Question",
                "name": "Are there photos of mountain views and outdoor areas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The gallery features mountain range views from guest rooms, exterior hotel shots at night, and outdoor seating in the Yard."
                }
              },
              {
                "@type": "Question",
                "name": "Can I take photos inside Kinship Landing's greenhouse or other spaces?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Guests can take photos with permission from the front desk. Flash photography and large equipment are discouraged to respect other guests' privacy."
                }
              },
              {
                "@type": "Question",
                "name": "How can I request high-resolution images for press or marketing use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Media inquiries and requests for high-resolution images should be sent directly to hello@kinshiplanding.com."
                }
              }
            ]
          })
        }}
      />
      <HeaderNav />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={galleryData?.heroImageUrl || "/images/events-page/Make Kinship Yours/HomaNightlife-GregCeo.webp"}
            alt="Kinship Landing Gallery - Explore our spaces"
            fill
            className="object-cover"
            priority
            quality={75}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content Layer - Matching homepage hero structure */}
        <div className="relative z-10 w-full min-h-[60vh] md:min-h-[70vh] flex items-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full lg:pl-8 lg:pr-8">

              {/* Flex container - Stack on mobile, side-by-side on desktop */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">

                {/* Left Side: Gallery Title */}
                <div className="flex-1 lg:flex-[0.6] text-center lg:text-left">
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
                    style={{
                      fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                      textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 8px',
                    }}
                  >
                    {title}
                  </h1>
                  <p
                    className="text-white font-normal"
                    style={{
                      fontSize: 'clamp(18px, 2.5vw, 24px)',
                      lineHeight: '1.6',
                      textShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px'
                    }}
                  >
                    {subtitle}
                  </p>
                </div>

                {/* Right Side: Booking Widget - Desktop only, exact homepage placement */}
                <div className="flex-1 lg:flex-none flex justify-center lg:justify-end">
                  <div className="w-full max-w-md lg:max-w-none">
                    {/* Desktop Booking Widget - pulled further from right */}
                    <div className="hidden lg:block lg:mr-40">
                      <BookingWidget
                        onBookingInitiated={(data) => {
                          // Track booking initiation
                          if (typeof window !== 'undefined' && (window as any).gtag) {
                            (window as any).gtag('event', 'booking_started', {
                              checkin: data.checkIn,
                              checkout: data.checkOut,
                              guests: data.guests,
                              source: 'gallery_hero_widget'
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <main id="main-content">

      {/* Intro Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className="inline-block px-3 sm:px-4 py-1 text-white text-xs uppercase tracking-wider font-semibold mb-6"
              style={{
                backgroundColor: '#667C58',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              }}
            >
              {introBadge}
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                color: '#667C58'
              }}
            >
              {introTitle}
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58',
                opacity: 0.85
              }}
            >
              {introText}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="pb-8 md:pb-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: activeFilter === filter.id ? '#667C58' : '#849e74',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Grid */}
      <section className="pb-16 md:pb-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-[300px] overflow-hidden cursor-pointer group"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">{image.alt}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p
                className="text-xl"
                style={{
                  fontFamily: '"europa", "Hind", system-ui, sans-serif',
                  color: '#667C58',
                }}
              >
                No images found for this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <GalleryFAQ
        sectionTitle={galleryData?.faqSectionTitle}
        sectionSubtitle={galleryData?.faqSectionSubtitle}
        faqItems={galleryData?.faqItems}
      />

        {/* Newsletter signup */}
        <Newsletter />

        {/* Location Map */}
        <MapBlock />
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-300 transition-colors z-50"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white text-sm sm:text-base font-semibold z-50">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>

            {/* Previous Button */}
            <button
              className="absolute left-2 sm:left-4 text-white hover:text-gray-300 transition-colors z-50 p-2"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <div
              className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Next Button */}
            <button
              className="absolute right-2 sm:right-4 text-white hover:text-gray-300 transition-colors z-50 p-2"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Title */}
            <div className="absolute bottom-4 left-0 right-0 text-center px-4">
              <p className="text-white text-base sm:text-lg font-semibold">
                {filteredImages[lightboxIndex].alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Sticky Buttons */}
      <CallToBook />
    </ScrollEffectsWrapper>
  );
}
