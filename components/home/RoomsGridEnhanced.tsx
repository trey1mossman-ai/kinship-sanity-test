'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from '@/components/icons';
import { KINSHIP_COLORS } from '@/lib/config/brand';

// Room data organized by type
const roomsByType = {
  king: [
    {
      id: 'king-suite',
      name: 'King Suite',
      slug: 'king-suite',
      description: 'King bed, sunrise views, in-room fireplace and soaking tub.',
      image: '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (1) (1)-optimized.webp',
      occupancy: 2,
      features: ['King bed', 'Sunrise views', 'In-room fireplace', 'Soaking tub'],
    },
    {
      id: 'executive-king-suite',
      name: 'Executive King Suite',
      slug: 'executive-king-suite',
      description: 'King bed, premium finishes, adjustable work desk, executive amenities.',
      image: '/images/Rooms Page:section/executive-king/exec-king-3-optimized.webp',
      occupancy: 2,
      features: ['King bed', 'Premium finishes', 'Adjustable work desk', 'Executive amenities'],
    },
    {
      id: 'mountain-king-suite',
      name: 'Mountain King Suite',
      slug: 'mountain-king-suite',
      description: 'King bed with mountain views, fireplace and soaking tub.',
      image: '/images/Rooms Page:section/Mountain King Suite/MountainKingSuite-RichardSeldomridge (1)-optimized.webp',
      occupancy: 2,
      features: ['King bed', 'Mountain views', 'In-room fireplace', 'Soaking tub'],
    },
  ],
  queen: [
    {
      id: 'mountain-jr-queen',
      name: 'Mountain Jr Queen',
      slug: 'mountain-jr-queen',
      description: 'Queen bed, custom touches, Rocky Mountain views',
      image: '/images/Rooms Page:section/Mountain Jr. Queen/MountainJrQueenSuite-RichardSeldomridge-optimized.webp',
      occupancy: 2,
      features: ['Queen bed', 'Mountain views', 'Boutique art', 'Handpicked essentials'],
    },
    {
      id: 'queen-balcony-suite',
      name: 'Mountain Queen Balcony Suite',
      slug: 'queen-balcony-suite',
      description: 'Queen bed, full balcony to mountain view, plus trundle with two twins',
      image: '/images/Rooms Page:section/Queen Balcony Suite/MountainQueenBalconySuite-AshleeKay (1)-optimized.webp',
      occupancy: 4,
      features: ['Queen bed + trundle', 'Mountain view', 'Full balcony', 'Sleeps 4'],
    },
    {
      id: 'jr-queen-suite',
      name: 'Jr Queen',
      slug: 'jr-queen-suite',
      description: 'Queen bed, custom touches, cozy and clean',
      image: '/images/Rooms Page:section/Jr. Queen/junior-queen-suite-optimized.webp',
      occupancy: 2,
      features: ['Queen bed', 'City view', 'Modern design', 'Urban convenience'],
    },
    {
      id: 'double-queen-balcony-suite',
      name: 'Double Queen Balcony Suite',
      slug: 'double-queen-balcony-suite',
      description: 'Two queen beds, full balcony with rockers, delightful finishes',
      image: '/images/Rooms Page:section/Double Queen Balcony/DoubleQueenSuite-RichardSeldomridge-optimized.webp',
      occupancy: 4,
      features: ['Two queen beds', 'City or mountain views', 'Full balcony', 'Spacious layout'],
    },
    {
      id: 'mountain-double-queen',
      name: 'Mountain Double Queen Suite',
      slug: 'mountain-double-queen',
      description: 'Two queen beds, overhead door to mountain views, curated and clean',
      image: '/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-RichardSeldomridge (4)-optimized.webp',
      occupancy: 4,
      features: ['Two queen beds', 'Mountain views', 'Extra space', 'Premium amenities'],
    },
  ],
  family: [
    {
      id: 'family-suite-1',
      name: 'Family Suite',
      slug: 'family-suite',
      description: 'Queen bed + twin bunks, two bathrooms, cozy and functional. Sleeps 6.',
      image: '/images/Rooms Page:section/Family Suite/AK_03363-optimized.webp',
      occupancy: 6,
      features: ['Queen bed + twin bunks', 'Two bathrooms', 'Kitchen access', 'Sleeps 6'],
    },
    {
      id: 'family-suite-2',
      name: 'Family Suite',
      slug: 'family-suite',
      description: 'Queen bed + twin bunks, two bathrooms, cozy and functional. Sleeps 6.',
      image: '/images/Rooms Page:section/Family Suite/Bunkroom-RichardSeldomridge (1)-optimized.webp',
      occupancy: 6,
      features: ['Queen bed + twin bunks', 'Two bathrooms', 'Kitchen access', 'Sleeps 6'],
    },
    {
      id: 'family-suite-3',
      name: 'Family Suite',
      slug: 'family-suite',
      description: 'Queen bed + twin bunks, two bathrooms, cozy and functional. Sleeps 6.',
      image: '/images/Rooms Page:section/Family Suite/Bunkroom-RichardSeldomridge (2)-optimized.webp',
      occupancy: 6,
      features: ['Queen bed + twin bunks', 'Two bathrooms', 'Kitchen access', 'Sleeps 6'],
    },
    {
      id: 'family-suite-4',
      name: 'Family Suite',
      slug: 'family-suite',
      description: 'Queen bed + twin bunks, two bathrooms, cozy and functional. Sleeps 6.',
      image: '/images/Rooms Page:section/Family Suite/Family-Suite-AshleeKay-4-optimized.webp',
      occupancy: 6,
      features: ['Queen bed + twin bunks', 'Two bathrooms', 'Kitchen access', 'Sleeps 6'],
    },
    {
      id: 'family-suite-5',
      name: 'Family Suite',
      slug: 'family-suite',
      description: 'Queen bed + twin bunks, two bathrooms, cozy and functional. Sleeps 6.',
      image: '/images/Rooms Page:section/Family Suite/Family-Suite-AshleeKay-5-optimized.webp',
      occupancy: 6,
      features: ['Queen bed + twin bunks', 'Two bathrooms', 'Kitchen access', 'Sleeps 6'],
    },
  ],
  campDeck: [
    {
      id: 'camp-deck-1',
      name: 'Camp Deck',
      slug: 'camp-deck',
      description: 'Outdoor camping deck with private restroom and mountain views.',
      image: '/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge (1)-optimized.webp',
      occupancy: 2,
      features: ['Outdoor camping deck', 'Mountain views', 'Private restroom', 'Hammock hooks'],
    },
    {
      id: 'camp-deck-2',
      name: 'Camp Deck',
      slug: 'camp-deck',
      description: 'Outdoor camping deck with private restroom and mountain views.',
      image: '/images/Rooms Page:section/Camp Deck/CampDeck-SamStarrMedia (2)-optimized.webp',
      occupancy: 2,
      features: ['Outdoor camping deck', 'Mountain views', 'Private restroom', 'Hammock hooks'],
    },
    {
      id: 'camp-deck-3',
      name: 'Camp Deck',
      slug: 'camp-deck',
      description: 'Outdoor camping deck with private restroom and mountain views.',
      image: '/images/Rooms Page:section/Camp Deck/CampDeck-SamStarrMedia-optimized.webp',
      occupancy: 2,
      features: ['Outdoor camping deck', 'Mountain views', 'Private restroom', 'Hammock hooks'],
    },
    {
      id: 'camp-deck-4',
      name: 'Camp Deck',
      slug: 'camp-deck',
      description: 'Outdoor camping deck with private restroom and mountain views.',
      image: '/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge-optimized.webp',
      occupancy: 2,
      features: ['Outdoor camping deck', 'Mountain views', 'Private restroom', 'Hammock hooks'],
    },
  ],
};

// Carousel component for room types with multiple rooms
function RoomCarousel({
  title,
  rooms,
  roomType
}: {
  title: string;
  rooms: typeof roomsByType.king;
  roomType: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload all room images for smooth transitions
  useEffect(() => {
    rooms.forEach(room => {
      const img = new window.Image();
      img.src = room.image;
    });
  }, [rooms]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % rooms.length);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  return (
    <div className="relative z-10">
      <div className="relative">
        {/* Arrow buttons */}
        {rooms.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 sm:-ml-4 bg-white/95 hover:bg-white shadow-lg p-2 sm:p-3 transition-all duration-200 hover:scale-105 sm:hover:scale-110"
              style={{
                color: KINSHIP_COLORS.greenDark,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              }}
              aria-label="Previous room"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 sm:-mr-4 bg-white/95 hover:bg-white shadow-lg p-2 sm:p-3 transition-all duration-200 hover:scale-105 sm:hover:scale-110"
              style={{
                color: KINSHIP_COLORS.greenDark,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              }}
              aria-label="Next room"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Carousel container */}
        <div className="overflow-hidden relative">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              className="w-full"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              {(() => {
                const room = rooms[currentIndex];
                return (
                <div
                  key={room.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(room.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Link href={`/rooms#${room.slug}`} className="block h-full">
                    <article
                      className="relative overflow-hidden shadow-soft hover:shadow-deep transition-shadow duration-300 h-full flex flex-col"
                      style={{ backgroundColor: KINSHIP_COLORS.white }}
                    >
                      {/* Maximized Image Container with Diagonal Cut */}
                      <div
                        className="relative h-[280px] sm:h-72 md:h-80 lg:h-96 overflow-hidden flex-shrink-0"
                        style={{
                          clipPath: currentIndex % 2 === 0
                            ? 'polygon(0 0, 100% 0, 100% 92%, 0 100%)'
                            : 'polygon(0 0, 100% 0, 100% 100%, 0 92%)'
                        }}
                      >
                        <motion.div
                          className="relative w-full h-full"
                          animate={{
                            scale: hoveredCard === room.id ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                          <Image
                            src={room.image}
                            alt={room.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={75}
                            priority={true}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                        </motion.div>

                        {/* Room Type Tag */}
                        <div
                          className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 bg-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md"
                          style={{
                            color: KINSHIP_COLORS.greenDark,
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                          }}
                        >
                          {roomType}
                        </div>

                        {/* Enhanced Gradient Overlay for Pop */}
                        <div
                          className="absolute inset-0 transition-opacity duration-300"
                          style={{
                            background: hoveredCard === room.id
                              ? 'linear-gradient(to bottom, transparent 60%, rgba(102, 124, 88, 0.4) 100%)'
                              : 'linear-gradient(to bottom, transparent 70%, rgba(0, 0, 0, 0.2) 100%)'
                          }}
                        />
                      </div>

                      {/* Content Section - Mobile Optimized */}
                      <div className="p-4 sm:p-5 md:p-6 -mt-3 sm:-mt-4 relative z-10 flex-grow flex flex-col justify-between" style={{ backgroundColor: KINSHIP_COLORS.white }}>
                        <div>
                          <h3
                            className="font-heading text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2 transition-colors duration-300 leading-tight"
                            style={{
                              color: hoveredCard === room.id ? KINSHIP_COLORS.green : KINSHIP_COLORS.greenDark
                            }}
                          >
                            {room.name}
                          </h3>

                          <p
                            className="text-sm sm:text-base md:text-lg leading-relaxed"
                            style={{ color: KINSHIP_COLORS.greenDark, opacity: 0.8 }}
                          >
                            {room.description}
                          </p>
                        </div>

                        {/* CTA Button - Mobile Optimized */}
                        <motion.button
                          className="w-full py-2.5 sm:py-3 mt-3 sm:mt-4 text-sm sm:text-base font-semibold transition-all duration-300 touch-manipulation"
                          style={{
                            backgroundColor: hoveredCard === room.id ? KINSHIP_COLORS.green : KINSHIP_COLORS.greenDark,
                            color: KINSHIP_COLORS.white,
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Explore {title}
                        </motion.button>
                      </div>
                    </article>
                  </Link>
                </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator - Mobile Optimized */}
        {rooms.length > 1 && (
          <div className="flex justify-center gap-2 mt-4 sm:mt-6 py-2">
            {rooms.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsTransitioning(false), 300);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 touch-manipulation ${
                  index === currentIndex ? 'w-6 sm:w-8' : 'w-2'
                }`}
                style={{
                  backgroundColor: index === currentIndex ? KINSHIP_COLORS.greenDark : KINSHIP_COLORS.sage
                }}
                aria-label={`Go to room ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Single room display component (for Family and Camp Deck)
function SingleRoomDisplay({
  title,
  room
}: {
  title: string;
  room: typeof roomsByType.family[0];
}) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="relative z-10">
      <div>
        <div
          className="group relative"
          onMouseEnter={() => setHoveredCard(room.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <Link href={`/rooms#${room.slug}`} className="block h-full">
            <article
              className="relative overflow-hidden shadow-soft hover:shadow-deep transition-shadow duration-300 h-full flex flex-col"
              style={{ backgroundColor: KINSHIP_COLORS.white }}
            >
              {/* Maximized Image Container with Diagonal Cut - Mobile Optimized */}
              <div
                className="relative h-[280px] sm:h-72 md:h-80 lg:h-96 overflow-hidden flex-shrink-0"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)'
                }}
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{
                    scale: hoveredCard === room.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                  />
                </motion.div>

                {/* Room Type Tag - Mobile Optimized */}
                <div
                  className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 bg-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md"
                  style={{
                    color: KINSHIP_COLORS.greenDark,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  {title}
                </div>

                {/* Enhanced Gradient Overlay for Pop */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: hoveredCard === room.id
                      ? 'linear-gradient(to bottom, transparent 60%, rgba(102, 124, 88, 0.4) 100%)'
                      : 'linear-gradient(to bottom, transparent 70%, rgba(0, 0, 0, 0.2) 100%)'
                  }}
                />
              </div>

              {/* Content Section - Mobile Optimized */}
              <div className="p-4 sm:p-5 md:p-6 -mt-3 sm:-mt-4 relative z-10 flex-grow flex flex-col justify-between" style={{ backgroundColor: KINSHIP_COLORS.white }}>
                <div>
                  <h3
                    className="font-heading text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2 transition-colors duration-300 leading-tight"
                    style={{
                      color: hoveredCard === room.id ? KINSHIP_COLORS.green : KINSHIP_COLORS.greenDark
                    }}
                  >
                    {room.name}
                  </h3>

                  <p
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    style={{ color: KINSHIP_COLORS.greenDark, opacity: 0.8 }}
                  >
                    {room.description}
                  </p>
                </div>

                {/* CTA Button - Mobile Optimized */}
                <motion.button
                  className="w-full py-2.5 sm:py-3 mt-3 sm:mt-4 text-sm sm:text-base font-semibold transition-all duration-300 touch-manipulation"
                  style={{
                    backgroundColor: hoveredCard === room.id ? KINSHIP_COLORS.green : KINSHIP_COLORS.greenDark,
                    color: KINSHIP_COLORS.white,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore {title}
                </motion.button>
              </div>
            </article>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function RoomsGridEnhanced() {
  return (
    <section
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{
        backgroundColor: KINSHIP_COLORS.white,
        backgroundImage: 'url("/textures/KL-Pikes-Peak-Topo-Map-Gray.webp")',
        backgroundSize: '500%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'multiply'
      }}
      id="rooms"
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-white/[0.83] z-0" />

      {/* Section Title - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 md:mb-12"
      >
        <h2
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight"
          style={{ color: KINSHIP_COLORS.greenDark }}
        >
          Find Your Perfect Room
        </h2>
      </motion.div>

      {/* Mobile-First Responsive Grid Layout */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
          {/* King Rooms Carousel */}
          <RoomCarousel
            title="King Rooms"
            rooms={roomsByType.king}
            roomType="King Rooms"
          />

          {/* Queen Rooms Carousel */}
          <RoomCarousel
            title="Queen Rooms"
            rooms={roomsByType.queen}
            roomType="Queen Rooms"
          />

          {/* Family Suite Section */}
          <RoomCarousel
            title="Family"
            rooms={roomsByType.family}
            roomType="Family"
          />

          {/* Camp Deck Section */}
          <RoomCarousel
            title="Camp Deck"
            rooms={roomsByType.campDeck}
            roomType="Camp Deck"
          />
        </div>
      </div>

      {/* Explore All Rooms Button - Mobile Optimized */}
      <div className="text-center mt-8 sm:mt-10 md:mt-12 relative z-10 px-4">
        <Link href="/rooms">
          <motion.button
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 font-semibold text-white transition-all duration-300 text-sm sm:text-base touch-manipulation"
            style={{
              backgroundColor: KINSHIP_COLORS.greenDark,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 4px 12px rgba(102, 124, 88, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Rooms
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </Link>
      </div>
    </section>
  );
}