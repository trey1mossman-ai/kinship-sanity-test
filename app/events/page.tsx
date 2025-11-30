'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Performance optimizations - CSS animations and critical styles
import './carousel-animations.css';
import './critical.css';

// Critical above-fold components
import { HeaderNav } from '@/components/layout/HeaderNav';
import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';
import { InsaneCarousel } from '@/components/events/InsaneCarousel';
import { EventsTestimonials } from '@/components/events/EventsTestimonials';

// Dynamic imports for ALL below-fold components (PERFORMANCE OPTIMIZATION)
// Venue sections - lazy loaded to reduce initial bundle size
const GreenHausSection = dynamic(() => import('@/components/home/GreenHausSection').then(mod => ({ default: mod.GreenHausSection })), {
  loading: () => <div className="h-96 bg-kinship-sage/10 animate-pulse" />
});
const ConferenceRoomSection = dynamic(() => import('@/components/home/ConferenceRoomSection').then(mod => ({ default: mod.ConferenceRoomSection })), {
  loading: () => <div className="h-96 bg-kinship-sage/10 animate-pulse" />
});
const YardSection = dynamic(() => import('@/components/home/YardSection').then(mod => ({ default: mod.YardSection })), {
  loading: () => <div className="h-96 bg-kinship-sage/10 animate-pulse" />
});
const CampDeckSection = dynamic(() => import('@/components/home/CampDeckSection').then(mod => ({ default: mod.CampDeckSection })), {
  loading: () => <div className="h-96 bg-kinship-sage/10 animate-pulse" />
});
const FireplaceSection = dynamic(() => import('@/components/home/FireplaceSection').then(mod => ({ default: mod.FireplaceSection })), {
  loading: () => <div className="h-96 bg-kinship-sage/10 animate-pulse" />
});

// Other below-fold components
const EventsFAQ = dynamic(() => import('@/components/events/EventsFAQ').then(mod => ({ default: mod.EventsFAQ })));
const MapBlock = dynamic(() => import('@/components/home/MapBlock').then(mod => ({ default: mod.MapBlock })));
const Newsletter = dynamic(() => import('@/components/sections/Newsletter').then(mod => ({ default: mod.Newsletter })));
const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })));
const CallToBook = dynamic(() => import('@/components/CallToBook').then(mod => ({ default: mod.CallToBook })));

type EventFilter = 'all' | 'weddings' | 'corporate' | 'takeovers' | 'spaces';

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<EventFilter>('all');
  const [selectedGatheringsImage, setSelectedGatheringsImage] = useState<{ src: string; alt: string; images: string[]; index: number } | null>(null);
  const [selectedWeddingImage, setSelectedWeddingImage] = useState<{ src: string; alt: string; images: string[]; index: number } | null>(null);
  const [selectedMeetingsImage, setSelectedMeetingsImage] = useState<{ src: string; alt: string; images: string[]; index: number } | null>(null);
  const [selectedTakeoversImage, setSelectedTakeoversImage] = useState<{ src: string; alt: string; images: string[]; index: number } | null>(null);
  const [selectedRoomBlocksImage, setSelectedRoomBlocksImage] = useState<{ src: string; alt: string; images: string[]; index: number } | null>(null);

  const gatheringsImages = [
    '/images/events-page/Gatherings/0B1A0328-optimized.webp',
    '/images/events-page/Gatherings/Greenhaus-ErinWinterPhotography-8506.webp',
    '/images/events-page/Gatherings/Greenhaus-RichardSeldomridge (2).webp',
    '/images/events-page/Gatherings/Greenhaus-RichardSeldomridge (4)-optimized.webp',
    '/images/events-page/Gatherings/kinship-119.webp',
    '/images/events-page/Gatherings/kinship-114-sm.webp',
    '/images/events-page/GreenHaus/Greenhaus-SamStarrMedia (1).webp',
    '/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge.webp',
  ];

  const weddingImages = [
    '/images/events-page/Weddings/8F8A1146-optimized.webp',
    '/images/events-page/Weddings/8F8A7820.webp',
    '/images/events-page/Weddings/D85A8377-optimized.webp',
    '/images/events-page/Weddings/event image-optimized.webp',
    '/images/events-page/Weddings/MountainKingSuite-RichardSeldomridge.webp',
    '/images/events-page/Weddings/kinship-38.webp',
    '/images/events-page/Weddings/kinship-48.webp',
    '/images/events-page/Weddings/kinship-57_nB2.webp',
  ];

  const meetingsImages = [
    '/images/events-page/Meetings:Retreats/Kinship-4G3A9437-1 (1).webp',
    '/images/events-page/Meetings:Retreats/FireplaceDrinks2, SamStarr (1).webp',
    '/images/events-page/Meetings:Retreats/GetOutsideEvent6 26-SamStarrMedia (3) (1).webp',
    '/images/events-page/Meetings:Retreats/Yard2, SamStarr (1).webp',
    '/images/events-page/Meetings:Retreats/Greenhaus-GregCeo (1).webp',
    '/images/events-page/Meetings:Retreats/CafeSeating-AshleeKay (2).webp',
    '/images/events-page/Meetings:Retreats/Kinship Landing-23.webp',
    '/images/events-page/Meetings:Retreats/DSC_4191 (1).webp',
    '/images/events-page/Meetings:Retreats/MountainDoubleQueenSuite-AshleeKay (4) (1).webp',
    '/images/events-page/Meetings:Retreats/samantha baldwin 13 (1).webp',
  ];

  const takeoversImages = [
    '/images/events-page/Make Kinship Yours/HotelCheckIn, SamStarr.webp',
    '/images/events-page/Make Kinship Yours/HomaNightlife-GregCeo.webp',
    '/images/events-page/Make Kinship Yours/DSCF8615.webp',
  ];

  const roomBlocksImages = [
    '/images/events-page/Room Blocks/MountainDoubleQueenSuite-AshleeKay (19).webp',
    '/images/events-page/Room Blocks/Jr Suite, Jennie Campbell (@fsupecas21).webp',
    '/images/events-page/Room Blocks/DSCF8870.webp',
    '/images/events-page/Room Blocks/DSCF8914.webp',
  ];

  const handleFilterChange = useCallback((filter: EventFilter) => {
    setActiveFilter(filter);
  }, []);

  // Determine what to show based on filter
  const showWeddings = activeFilter === 'all' || activeFilter === 'weddings';
  const showCorporate = activeFilter === 'all' || activeFilter === 'corporate';
  const showTakeovers = activeFilter === 'all' || activeFilter === 'takeovers';
  const showGatherings = activeFilter === 'all'; // Only shows in "all"
  const showRoomBlocks = activeFilter === 'all'; // Only shows in "all"
  const showVenueSpaces = activeFilter === 'all' || activeFilter === 'spaces'; // Shows in "all" AND "spaces"
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
                "name": "What event spaces does Kinship Landing offer and what are their capacities?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kinship Landing has four distinct venues. The Yard is a 6,900 sq ft lawn that fits up to 200 guests. The Greenhaus seats 50 or 70 standing. The Conference Room hosts 2-10 people around a conference table with TV and tech hook-ups. The Camp Deck fits 10 seated or 20 standing for micro-weddings or sunset gatherings."
                }
              },
              {
                "@type": "Question",
                "name": "What amenities are included with the event spaces?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each space includes modern amenities such as air-conditioning, A/V equipment, Wi-Fi and catering from Homa Café + Bar. The Yard offers shade trees and mountain views, while the Greenhaus features natural light and lush greenery."
                }
              },
              {
                "@type": "Question",
                "name": "Does Kinship Landing provide on-site catering and bar service?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. All packages include custom food and beverage prepared by local chefs. Events can feature food, drinks, alcohol, tables, chairs and bar staff from Homa Café + Bar."
                }
              },
              {
                "@type": "Question",
                "name": "Are outdoor events possible at Kinship Landing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The Yard accommodates up to 200 guests for outdoor receptions, while the Camp Deck offers an intimate indoor-outdoor setting for micro-weddings or sunset gatherings."
                }
              },
              {
                "@type": "Question",
                "name": "Does Kinship Landing offer full hotel buyouts for events?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. A Kinship Takeover reserves the entire 40-room hotel with 58 beds for up to 99 people. It includes exclusive use of the Greenhaus, Yard, conference room and café, plus customized food and beverage options."
                }
              },
              {
                "@type": "Question",
                "name": "What wedding packages are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kinship Landing offers a Wedding Takeover, Reception + Rooms, and Reception + Catering package. These include venue access, custom menus, bar service, tables, chairs, staff, and optional lodging for up to 100 guests."
                }
              },
              {
                "@type": "Question",
                "name": "What types of events can be hosted at Kinship Landing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Spaces are ideal for weddings, receptions, corporate meetings, product launches, retreats, lectures, birthdays, holiday parties and private dining. The Yard suits large receptions, while the Greenhaus and Conference Room work for smaller groups."
                }
              },
              {
                "@type": "Question",
                "name": "Can small corporate meetings or retreats be held there?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The Conference Room accommodates 2-10 people with a full conference setup and optional catering from Homa Café + Bar. Larger retreats can book the Greenhaus or Yard."
                }
              },
              {
                "@type": "Question",
                "name": "Are group room blocks available for events?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Group bookings of 10 or more rooms are available, including a custom booking link. Full buyouts can host up to 99 guests across all rooms."
                }
              },
              {
                "@type": "Question",
                "name": "Do event bookings include planning assistance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The Kinship Landing events team provides personalized planning, food and drink design, and coordination across all spaces to ensure a seamless experience."
                }
              },
              {
                "@type": "Question",
                "name": "Are pets allowed at events?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Service dogs are welcome in all public spaces. For private events, guests should confirm pet policies with the events team before booking."
                }
              },
              {
                "@type": "Question",
                "name": "How can I request a quote or book an event?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can request a quote or book an event directly through the Kinship Landing website using the Request a Quote form, or by contacting the events team via phone or email."
                }
              }
            ]
          })
        }}
      />
      <HeaderNav />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-screen overflow-hidden bg-kinship-sage">
        <div className="absolute inset-0">
          <Image
            src="/images/events-page/amyzach-29.webp"
            alt="Kinship Landing Events & Gatherings"
            fill
            className="object-cover"
            priority
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA="
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 min-h-[85vh] md:min-h-screen flex flex-col justify-end sm:justify-center">
          <div className="w-full px-4 sm:px-6 lg:px-8 pb-16 pt-10 sm:py-24 lg:py-0">
            <div className="w-full lg:pl-8">
              <motion.div
                className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <h1
                  className="text-white font-serif font-semibold leading-[1.05] pb-2 sm:pb-0"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 8px',
                    fontSize: 'clamp(32px, 5.5vw, 68px)',
                    marginBottom: '1rem'
                  }}
                >
                  Meetings & Events
                </h1>
                <EventsTestimonials />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <main id="main-content">

        {/* ========================================
            EVENT TYPE FILTERS
            Positioned right below hero
        ======================================== */}

        {/* Filter Buttons */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              {[
                { id: 'all', label: 'All Events' },
                { id: 'weddings', label: 'Weddings' },
                { id: 'corporate', label: 'Corporate Events' },
                { id: 'takeovers', label: 'Hotel Takeovers' },
                { id: 'spaces', label: 'Event Spaces' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleFilterChange(filter.id as EventFilter)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-colors duration-150 ${
                    activeFilter === filter.id
                      ? 'text-white shadow-md'
                      : 'text-white/90 hover:text-white hover:shadow-sm'
                  }`}
                  style={{
                    backgroundColor: activeFilter === filter.id ? '#667C58' : '#849e74',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    transform: 'translateZ(0)',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                  aria-pressed={activeFilter === filter.id}
                  aria-label={`Filter by ${filter.label}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================
            EVENT TYPE SECTIONS
            Filtered based on selection
        ======================================== */}

        {/* 1. GATHERINGS SECTION (All Events only) */}
        {showGatherings && (
        <section className="py-8 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="group grid md:grid-cols-2 gap-6 md:gap-8 items-center border-2 p-4 sm:p-6 md:p-8 transition-shadow duration-200 hover:shadow-lg bg-white"
              style={{
                borderColor: '#667C58',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              }}
            >
              {/* Text Content - Left */}
              <div className="space-y-4">
                <span
                  className="inline-block px-3 sm:px-4 py-1 text-white text-xs uppercase tracking-wider font-semibold"
                  style={{
                    backgroundColor: '#667C58',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  Event Type
                </span>

                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif', color: '#667C58' }}
                >
                  Gatherings
                </h2>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Planning a gathering? The GreenHaus offers a unique, intimate setting for up to 80 guests: perfect for celebrations, workshops, and retreats. Pair your event with a room block and give your guests the full Kinship Landing experience, complete with stylish accommodations and all the perks of being downtown.
                </p>

                <a
                  href="https://kinshiplanding.tripleseat.com/booking_request/42351"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-md"
                  style={{
                    backgroundColor: '#667C58',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  Host with Us
                </a>
              </div>

              {/* Images - Right - INSANE CAROUSEL (47 optimizations) */}
              <InsaneCarousel
                images={gatheringsImages}
                alt="Gatherings at Kinship Landing"
                onImageClick={(index) => setSelectedGatheringsImage({
                  src: gatheringsImages[index],
                  alt: 'Gatherings at Kinship Landing',
                  images: gatheringsImages,
                  index
                })}
                gridCols={4}
                priority={true}
                index={0}
              />
            </div>
          </div>
        </section>
        )}

        {/* 2. WEDDINGS SECTION */}
        {showWeddings && (
        <section className="py-8 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="group border-2 p-4 sm:p-6 md:p-8 transition-shadow duration-200 hover:shadow-lg bg-white"
              style={{
                borderColor: '#667C58',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              }}
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                {/* Images - Left - INSANE CAROUSEL (47 optimizations) */}
                <div className="order-2 md:order-1">
                  <InsaneCarousel
                    images={weddingImages}
                    alt="Wedding at Kinship Landing"
                    onImageClick={(index) => setSelectedWeddingImage({
                      src: weddingImages[index],
                      alt: 'Wedding at Kinship Landing',
                      images: weddingImages,
                      index
                    })}
                    gridCols={4}
                    index={1}
                  />
                </div>

                {/* Text Content - Right */}
                <div className="space-y-4 order-1 md:order-2">
                  <span
                    className="inline-block px-3 sm:px-4 py-1 text-white text-xs uppercase tracking-wider font-semibold"
                    style={{
                      backgroundColor: '#667C58',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    }}
                  >
                    Event Type
                  </span>

                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                    style={{ fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif', color: '#667C58' }}
                  >
                    Weddings
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                    Your wedding deserves more than just a venue—it deserves a celebration that feels uniquely yours. At Kinship, we specialize in intimate gatherings for up to 80 guests, pairing warm hospitality with the energy of downtown Colorado Springs and the natural beauty of the Front Range.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                    From heartfelt "I do's" to unforgettable receptions, our team will help you create a day that's personal, joyful, and truly memorable. With catering from our onsite Homa Café, your celebration is infused with fresh, locally inspired flavors. Pair it all with a room block to keep your favorite people close and the party going all weekend long.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href="https://kinshiplanding.tripleseat.com/booking_request/42351"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-md"
                      style={{
                        backgroundColor: '#667C58',
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                      }}
                    >
                      Start Your Story
                    </a>
                    <a
                      href="https://www.canva.com/design/DAG0ZFm6rzg/mOJAknwnEXp6No-7ETsRzQ/view?utm_content=DAG0ZFm6rzg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb1e57cb91e"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2 sm:py-3 font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-md border-2"
                      style={{
                        backgroundColor: 'transparent',
                        color: '#667C58',
                        borderColor: '#667C58',
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                        <path d="M12 20 C12 18, 10 16, 10 14"/>
                        <path d="M14 20 C14 18, 16 16, 16 14"/>
                        <circle cx="12" cy="10" r="6"/>
                        <path d="M9 9 L15 9"/>
                        <path d="M9 9 C9 7, 10 6, 12 6 C14 6, 15 7, 15 9"/>
                        <circle cx="12" cy="13" r="1.5" fill="currentColor"/>
                        <circle cx="12" cy="13" r="0.8"/>
                      </svg>
                      View Wedding Info Deck
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* 3. MEETINGS & RETREATS SECTION (Corporate Events) */}
        {showCorporate && (
        <section className="py-8 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="group grid md:grid-cols-2 gap-6 md:gap-8 items-center border-2 p-4 sm:p-6 md:p-8 transition-shadow duration-200 hover:shadow-lg bg-white"
              style={{
                borderColor: '#667C58',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              }}
            >
              {/* Text Content - Left */}
              <div className="space-y-4">
                <span
                  className="inline-block px-3 sm:px-4 py-1 text-white text-xs uppercase tracking-wider font-semibold"
                  style={{
                    backgroundColor: '#667C58',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  Event Type
                </span>

                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif', color: '#667C58' }}
                >
                  Meetings & Retreats
                </h2>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  The best ideas happen when teams have space to connect. Kinship is ideal for retreats and offsite meetings in the 30–45 guest range, with a max capacity of 85. Our intimate scale keeps gatherings personal and collaborative while still giving you room to breathe and create.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Fuel your team with fresh catering from Homa Café, featuring locally inspired menus that make every meal memorable. And to make your retreat truly stand out, our team partners with local experts to curate one-of-a-kind experiences—think ropes courses, guided hikes, yoga on the camp deck, and more.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Pair your retreat with a room block for a seamless multi-day experience—complete with unique accommodations, downtown Colorado Springs at your doorstep, and our signature hospitality throughout.
                </p>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed italic" style={{ opacity: 0.8 }}>
                  Because of our size and event spaces, Kinship is best suited for active leadership gatherings and small group retreats rather than traditional corporate gatherings. Share a few details with us—we would love to explore how we can bring your event to life.
                </p>

                <a
                  href="https://kinshiplanding.tripleseat.com/booking_request/42351"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-md"
                  style={{
                    backgroundColor: '#667C58',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  Let's Make it Happen
                </a>
              </div>

              {/* Images - Right - INSANE CAROUSEL (47 optimizations) */}
              <InsaneCarousel
                images={meetingsImages}
                alt="Meetings & Retreats at Kinship Landing"
                onImageClick={(index) => setSelectedMeetingsImage({
                  src: meetingsImages[index],
                  alt: 'Meetings & Retreats at Kinship Landing',
                  images: meetingsImages,
                  index
                })}
                gridCols={5}
                index={2}
              />
            </div>
          </div>
        </section>
        )}

        {/* 4. ROOM BLOCKS SECTION (All Events only) */}
        {showRoomBlocks && (
        <section className="py-8 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="group grid md:grid-cols-2 gap-6 md:gap-8 items-center border-2 p-4 sm:p-6 md:p-8 transition-shadow duration-200 hover:shadow-lg bg-white"
              style={{
                borderColor: '#667C58',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              }}
            >
              {/* Images - Left - INSANE CAROUSEL (47 optimizations) */}
              <div className="order-2 md:order-1">
                <InsaneCarousel
                  images={roomBlocksImages}
                  alt="Room Blocks at Kinship Landing"
                  onImageClick={(index) => setSelectedRoomBlocksImage({
                    src: roomBlocksImages[index],
                    alt: 'Room Blocks at Kinship Landing',
                    images: roomBlocksImages,
                    index
                  })}
                  gridCols={4}
                  index={3}
                />
              </div>

              {/* Text Content - Right */}
              <div className="space-y-4 order-1 md:order-2">
                <span
                  className="inline-block px-3 sm:px-4 py-1 text-white text-xs uppercase tracking-wider font-semibold"
                  style={{
                    backgroundColor: '#667C58',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  Event Type
                </span>

                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif', color: '#667C58' }}
                >
                  Room Blocks
                </h2>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Keep your favorite people close. Whether it's a wedding weekend, a family reunion, or a team retreat, reserving a room block at Kinship makes it easy for everyone to stay together under one roof.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Your crew will love our unique rooms, downtown location, and the chance to gather around the fire pit, share a meal at Homa Café, or head out on an adventure right from our front door.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Ask us about setting up a block so your group can focus on making memories, not logistics.
                </p>

                <a
                  href="https://kinshiplanding.tripleseat.com/booking_request/42351"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-md"
                  style={{
                    backgroundColor: '#667C58',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  Plan Your Stay
                </a>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* 5. MAKE KINSHIP YOURS (FULL BUYOUT) SECTION (Hotel Takeovers) */}
        {showTakeovers && (
        <section className="py-8 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="group grid md:grid-cols-2 gap-6 md:gap-8 items-center border-2 p-4 sm:p-6 md:p-8 transition-shadow duration-200 hover:shadow-lg bg-white"
              style={{
                borderColor: '#667C58',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              }}
            >
              {/* Text Content - Left */}
              <div className="space-y-4">
                <span
                  className="inline-block px-3 sm:px-4 py-1 text-white text-xs uppercase tracking-wider font-semibold"
                  style={{
                    backgroundColor: '#667C58',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  Event Type
                </span>

                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif', color: '#667C58' }}
                >
                  Make Kinship Yours
                </h2>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Sometimes the best way to gather is to have the whole place to yourself. With a full hotel buyout, Kinship Landing becomes your group's home base, complete with 40 guest rooms, our GreenHaus event space, The Yard, and all the cozy corners in between.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Perfect for weddings, reunions, company retreats, or any gathering that deserves its own downtown adventure. Add catering from Homa Café and custom experiences with our local partners, and you've got the makings of an unforgettable takeover.
                </p>

                <a
                  href="https://kinshiplanding.tripleseat.com/booking_request/42351"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-md"
                  style={{
                    backgroundColor: '#667C58',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  Explore a Kinship Takeover
                </a>
              </div>

              {/* Images - Right - INSANE CAROUSEL (47 optimizations) */}
              <InsaneCarousel
                images={takeoversImages}
                alt="Make Kinship Yours - Full Buyout"
                onImageClick={(index) => setSelectedTakeoversImage({
                  src: takeoversImages[index],
                  alt: 'Make Kinship Yours - Full Buyout',
                  images: takeoversImages,
                  index
                })}
                gridCols={3}
                index={4}
              />
            </div>
          </div>
        </section>
        )}

        {/* ========================================
            VENUE SPACES - ONLY SHOW WHEN "EVENT SPACES" SELECTED
        ======================================== */}
        {showVenueSpaces && (
          <>
            {/* Section Header */}
            <section className="py-16 md:py-20 bg-white">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4 font-serif"
                  style={{ color: '#667C58' }}
                >
                  Our Venue Spaces
                </h2>
                <p
                  className="text-lg md:text-xl max-w-3xl mx-auto font-sans"
                  style={{ color: '#667C58', opacity: 0.8 }}
                >
                  Explore each of our unique spaces designed for memorable gatherings
                </p>
              </div>
            </section>

            {/* Venue Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-0 bg-white"
            >
              <GreenHausSection />
              <ConferenceRoomSection />
              <FireplaceSection />
              <YardSection />
              <CampDeckSection />
            </motion.div>
          </>
        )}

        {/* FAQ Section */}
        <EventsFAQ />

        {/* Visual Break - Meeting Space Detail (Clickable) */}
        <Link
          href="#greenhaus"
          className="block relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden group cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('greenhaus')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <Image
            src="/images/events-page/Meetings:Retreats/Kinship-4G3A9437-1 (1).webp"
            alt="GreenHaus event space at Kinship Landing - Click to learn more"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ objectPosition: 'center 75%' }}
            quality={75}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </Link>

        {/* Newsletter */}
        <Newsletter />

        {/* Map */}
        <MapBlock />
      </main>

      <Footer />

      {/* Sticky Buttons */}
      <CallToBook />

      {/* Gatherings Lightbox Modal */}
      <AnimatePresence>
        {selectedGatheringsImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            onClick={() => setSelectedGatheringsImage(null)}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGatheringsImage(null);
              }}
              className="absolute top-4 right-4 p-2 text-white hover:text-kinship-green transition-colors z-[101] cursor-pointer"
              aria-label="Close image viewer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-[101] pointer-events-none">
              <div className="px-3 py-2 bg-white/95 backdrop-blur-sm rounded-md">
                <p className="text-sm font-semibold" style={{ color: '#667C58', fontFamily: '"europa", "Hind", system-ui, sans-serif' }}>
                  {selectedGatheringsImage.index + 1} / {selectedGatheringsImage.images.length}
                </p>
              </div>
            </div>

            {/* Previous button */}
            {selectedGatheringsImage.index > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedGatheringsImage({
                    ...selectedGatheringsImage,
                    index: selectedGatheringsImage.index - 1,
                    src: selectedGatheringsImage.images[selectedGatheringsImage.index - 1]
                  });
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-200 z-[101] shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" style={{ color: '#667C58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next button */}
            {selectedGatheringsImage.index < selectedGatheringsImage.images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedGatheringsImage({
                    ...selectedGatheringsImage,
                    index: selectedGatheringsImage.index + 1,
                    src: selectedGatheringsImage.images[selectedGatheringsImage.index + 1]
                  });
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-200 z-[101] shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label="Next image"
              >
                <svg className="w-6 h-6" style={{ color: '#667C58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image container - OPTIMIZED: High quality for lightbox viewing */}
            <motion.div
              key={selectedGatheringsImage.index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            >
              <Image
                src={selectedGatheringsImage.src}
                alt={selectedGatheringsImage.alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                quality={75}
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weddings Lightbox Modal */}
      <AnimatePresence>
        {selectedWeddingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            onClick={() => setSelectedWeddingImage(null)}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedWeddingImage(null);
              }}
              className="absolute top-4 right-4 p-2 text-white hover:text-kinship-green transition-colors z-[101] cursor-pointer"
              aria-label="Close image viewer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-[101] pointer-events-none">
              <div className="px-3 py-2 bg-white/95 backdrop-blur-sm rounded-md">
                <p className="text-sm font-semibold" style={{ color: '#667C58', fontFamily: '"europa", "Hind", system-ui, sans-serif' }}>
                  {selectedWeddingImage.index + 1} / {selectedWeddingImage.images.length}
                </p>
              </div>
            </div>

            {/* Previous button */}
            {selectedWeddingImage.index > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWeddingImage({
                    ...selectedWeddingImage,
                    index: selectedWeddingImage.index - 1,
                    src: selectedWeddingImage.images[selectedWeddingImage.index - 1]
                  });
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-200 z-[101] shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" style={{ color: '#667C58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next button */}
            {selectedWeddingImage.index < selectedWeddingImage.images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWeddingImage({
                    ...selectedWeddingImage,
                    index: selectedWeddingImage.index + 1,
                    src: selectedWeddingImage.images[selectedWeddingImage.index + 1]
                  });
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-200 z-[101] shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label="Next image"
              >
                <svg className="w-6 h-6" style={{ color: '#667C58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image container - OPTIMIZED: High quality for lightbox viewing */}
            <motion.div
              key={selectedWeddingImage.index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            >
              <Image
                src={selectedWeddingImage.src}
                alt={selectedWeddingImage.alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                quality={75}
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meetings Lightbox Modal */}
      <AnimatePresence>
        {selectedMeetingsImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            onClick={() => setSelectedMeetingsImage(null)}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMeetingsImage(null);
              }}
              className="absolute top-4 right-4 p-2 text-white hover:text-kinship-green transition-colors z-[101] cursor-pointer"
              aria-label="Close image viewer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-[101] pointer-events-none">
              <div className="px-3 py-2 bg-white/95 backdrop-blur-sm rounded-md">
                <p className="text-sm font-semibold" style={{ color: '#667C58', fontFamily: '"europa", "Hind", system-ui, sans-serif' }}>
                  {selectedMeetingsImage.index + 1} / {selectedMeetingsImage.images.length}
                </p>
              </div>
            </div>

            {/* Previous button */}
            {selectedMeetingsImage.index > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMeetingsImage({
                    ...selectedMeetingsImage,
                    index: selectedMeetingsImage.index - 1,
                    src: selectedMeetingsImage.images[selectedMeetingsImage.index - 1]
                  });
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-200 z-[101] shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" style={{ color: '#667C58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next button */}
            {selectedMeetingsImage.index < selectedMeetingsImage.images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMeetingsImage({
                    ...selectedMeetingsImage,
                    index: selectedMeetingsImage.index + 1,
                    src: selectedMeetingsImage.images[selectedMeetingsImage.index + 1]
                  });
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-200 z-[101] shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label="Next image"
              >
                <svg className="w-6 h-6" style={{ color: '#667C58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image container - OPTIMIZED: High quality for lightbox viewing */}
            <motion.div
              key={selectedMeetingsImage.index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            >
              <Image
                src={selectedMeetingsImage.src}
                alt={selectedMeetingsImage.alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                quality={75}
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room Blocks Lightbox Modal */}
      <AnimatePresence>
        {selectedRoomBlocksImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            onClick={() => setSelectedRoomBlocksImage(null)}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRoomBlocksImage(null);
              }}
              className="absolute top-4 right-4 p-2 text-white hover:text-kinship-green transition-colors z-[101] cursor-pointer"
              aria-label="Close image viewer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-[101] pointer-events-none">
              <div className="px-3 py-2 bg-white/95 backdrop-blur-sm rounded-md">
                <p className="text-sm font-semibold" style={{ color: '#667C58', fontFamily: '"europa", "Hind", system-ui, sans-serif' }}>
                  {selectedRoomBlocksImage.index + 1} / {selectedRoomBlocksImage.images.length}
                </p>
              </div>
            </div>

            {/* Previous button */}
            {selectedRoomBlocksImage.index > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRoomBlocksImage({
                    ...selectedRoomBlocksImage,
                    index: selectedRoomBlocksImage.index - 1,
                    src: selectedRoomBlocksImage.images[selectedRoomBlocksImage.index - 1]
                  });
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-200 z-[101] shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" style={{ color: '#667C58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next button */}
            {selectedRoomBlocksImage.index < selectedRoomBlocksImage.images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRoomBlocksImage({
                    ...selectedRoomBlocksImage,
                    index: selectedRoomBlocksImage.index + 1,
                    src: selectedRoomBlocksImage.images[selectedRoomBlocksImage.index + 1]
                  });
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-200 z-[101] shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label="Next image"
              >
                <svg className="w-6 h-6" style={{ color: '#667C58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image container - OPTIMIZED: High quality for lightbox viewing */}
            <motion.div
              key={selectedRoomBlocksImage.index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            >
              <Image
                src={selectedRoomBlocksImage.src}
                alt={selectedRoomBlocksImage.alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                quality={75}
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Takeovers Lightbox Modal */}
      <AnimatePresence>
        {selectedTakeoversImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            onClick={() => setSelectedTakeoversImage(null)}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTakeoversImage(null);
              }}
              className="absolute top-4 right-4 p-2 text-white hover:text-kinship-green transition-colors z-[101] cursor-pointer"
              aria-label="Close image viewer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-[101] pointer-events-none">
              <div className="px-3 py-2 bg-white/95 backdrop-blur-sm rounded-md">
                <p className="text-sm font-semibold" style={{ color: '#667C58', fontFamily: '"europa", "Hind", system-ui, sans-serif' }}>
                  {selectedTakeoversImage.index + 1} / {selectedTakeoversImage.images.length}
                </p>
              </div>
            </div>

            {/* Previous button */}
            {selectedTakeoversImage.index > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTakeoversImage({
                    ...selectedTakeoversImage,
                    index: selectedTakeoversImage.index - 1,
                    src: selectedTakeoversImage.images[selectedTakeoversImage.index - 1]
                  });
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-200 z-[101] shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" style={{ color: '#667C58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next button */}
            {selectedTakeoversImage.index < selectedTakeoversImage.images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTakeoversImage({
                    ...selectedTakeoversImage,
                    index: selectedTakeoversImage.index + 1,
                    src: selectedTakeoversImage.images[selectedTakeoversImage.index + 1]
                  });
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-all duration-200 z-[101] shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label="Next image"
              >
                <svg className="w-6 h-6" style={{ color: '#667C58' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image container - OPTIMIZED: High quality for lightbox viewing */}
            <motion.div
              key={selectedTakeoversImage.index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            >
              <Image
                src={selectedTakeoversImage.src}
                alt={selectedTakeoversImage.alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                quality={75}
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScrollEffectsWrapper>
  );
}
