'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { OptimizedImage } from '@/components/OptimizedImage';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from '@/components/icons';
import { KINSHIP_COLORS } from '@/lib/config/brand';

// Room type from Sanity
export interface SanityRoom {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description: string;
  heroImage: string;
  gallery?: string[];
  features?: string[];
  maxOccupancy?: number;
  homepageGroup?: 'king' | 'queen' | 'family' | 'campDeck';
}

// Fallback rooms data (matches current website exactly)
// King/Queen: carousel through different room types
// Family/Camp Deck: carousel through gallery images of ONE room
const fallbackRoomsByType = {
  king: [
    {
      _id: 'king-suite',
      name: 'King Suite',
      slug: 'king-suite',
      shortDescription: 'King bed, sunrise views, in-room fireplace and soaking tub.',
      heroImage: '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (1) (1)-optimized.webp',
      maxOccupancy: 2,
      features: ['King bed', 'Sunrise views', 'In-room fireplace', 'Soaking tub'],
    },
    {
      _id: 'executive-king-suite',
      name: 'Executive King Suite',
      slug: 'executive-king-suite',
      shortDescription: 'King bed, premium finishes, adjustable work desk, executive amenities.',
      heroImage: '/images/Rooms Page:section/executive-king/exec-king-3-optimized.webp',
      maxOccupancy: 2,
      features: ['King bed', 'Premium finishes', 'Adjustable work desk', 'Executive amenities'],
    },
    {
      _id: 'mountain-king-suite',
      name: 'Mountain King Suite',
      slug: 'mountain-king-suite',
      shortDescription: 'King bed with mountain views, fireplace and soaking tub.',
      heroImage: '/images/Rooms Page:section/Mountain King Suite/MountainKingSuite-RichardSeldomridge (1)-optimized.webp',
      maxOccupancy: 2,
      features: ['King bed', 'Mountain views', 'In-room fireplace', 'Soaking tub'],
    },
  ],
  queen: [
    {
      _id: 'mountain-jr-queen',
      name: 'Mountain Jr Queen',
      slug: 'mountain-jr-queen',
      shortDescription: 'Queen bed, custom touches, Rocky Mountain views',
      heroImage: '/images/Rooms Page:section/Mountain Jr. Queen/MountainJrQueenSuite-RichardSeldomridge-optimized.webp',
      maxOccupancy: 2,
      features: ['Queen bed', 'Mountain views', 'Boutique art', 'Handpicked essentials'],
    },
    {
      _id: 'queen-balcony-suite',
      name: 'Mountain Queen Balcony Suite',
      slug: 'queen-balcony-suite',
      shortDescription: 'Queen bed, full balcony to mountain view, plus trundle with two twins',
      heroImage: '/images/Rooms Page:section/Queen Balcony Suite/MountainQueenBalconySuite-AshleeKay (1)-optimized.webp',
      maxOccupancy: 4,
      features: ['Queen bed + trundle', 'Mountain view', 'Full balcony', 'Sleeps 4'],
    },
    {
      _id: 'jr-queen-suite',
      name: 'Jr Queen',
      slug: 'jr-queen-suite',
      shortDescription: 'Queen bed, custom touches, cozy and clean',
      heroImage: '/images/Rooms Page:section/Jr. Queen/junior-queen-suite-optimized.webp',
      maxOccupancy: 2,
      features: ['Queen bed', 'City view', 'Modern design', 'Urban convenience'],
    },
    {
      _id: 'double-queen-balcony-suite',
      name: 'Double Queen Balcony Suite',
      slug: 'double-queen-balcony-suite',
      shortDescription: 'Two queen beds, full balcony with rockers, delightful finishes',
      heroImage: '/images/Rooms Page:section/Double Queen Balcony/DoubleQueenSuite-RichardSeldomridge-optimized.webp',
      maxOccupancy: 4,
      features: ['Two queen beds', 'City or mountain views', 'Full balcony', 'Spacious layout'],
    },
    {
      _id: 'mountain-double-queen',
      name: 'Mountain Double Queen Suite',
      slug: 'mountain-double-queen',
      shortDescription: 'Two queen beds, overhead door to mountain views, curated and clean',
      heroImage: '/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-RichardSeldomridge (4)-optimized.webp',
      maxOccupancy: 4,
      features: ['Two queen beds', 'Mountain views', 'Extra space', 'Premium amenities'],
    },
  ],
  // Family: ONE room with gallery images shown in carousel
  family: [
    {
      _id: 'family-suite',
      name: 'Family Suite',
      slug: 'family-suite',
      shortDescription: 'Queen bed + twin bunks, two bathrooms, cozy and functional. Sleeps 6.',
      heroImage: '/images/Rooms Page:section/Family Suite/AK_03363-optimized.webp',
      gallery: [
        '/images/Rooms Page:section/Family Suite/AK_03363-optimized.webp',
        '/images/Rooms Page:section/Family Suite/Bunkroom-RichardSeldomridge (1)-optimized.webp',
        '/images/Rooms Page:section/Family Suite/Bunkroom-RichardSeldomridge (2)-optimized.webp',
        '/images/Rooms Page:section/Family Suite/Family-Suite-AshleeKay-4-optimized.webp',
        '/images/Rooms Page:section/Family Suite/Family-Suite-AshleeKay-5-optimized.webp',
      ],
      maxOccupancy: 6,
      features: ['Queen bed + twin bunks', 'Two bathrooms', 'Kitchen access', 'Sleeps 6'],
    },
  ],
  // Camp Deck: ONE room with gallery images shown in carousel
  campDeck: [
    {
      _id: 'camp-deck',
      name: 'Camp Deck',
      slug: 'camp-deck',
      shortDescription: 'Outdoor camping deck with private restroom and mountain views.',
      heroImage: '/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge (1)-optimized.webp',
      gallery: [
        '/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge (1)-optimized.webp',
        '/images/Rooms Page:section/Camp Deck/CampDeck-SamStarrMedia (2)-optimized.webp',
        '/images/Rooms Page:section/Camp Deck/CampDeck-SamStarrMedia-optimized.webp',
        '/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge-optimized.webp',
      ],
      maxOccupancy: 2,
      features: ['Outdoor camping deck', 'Mountain views', 'Private restroom', 'Hammock hooks'],
    },
  ],
};

interface RoomsGridSanityProps {
  rooms?: SanityRoom[];
  sectionTitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  // Room data from Sanity Homepage
  kingRoomsLabel?: string;
  kingRooms?: Array<{ _key: string; name: string; slug: string; shortDescription: string; imageUrl?: string }>;
  queenRoomsLabel?: string;
  queenRooms?: Array<{ _key: string; name: string; slug: string; shortDescription: string; imageUrl?: string }>;
  familyRoomLabel?: string;
  familyRoomName?: string;
  familyRoomSlug?: string;
  familyRoomDescription?: string;
  familyRoomImageUrl?: string;
  campDeckLabel?: string;
  campDeckName?: string;
  campDeckSlug?: string;
  campDeckDescription?: string;
  campDeckImageUrl?: string;
}

// Carousel component for room types
function RoomCarousel({
  title,
  rooms,
  roomType
}: {
  title: string;
  rooms: SanityRoom[];
  roomType: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload all room images for smooth transitions
  useEffect(() => {
    rooms.forEach(room => {
      const img = new window.Image();
      img.src = room.heroImage;
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

  if (rooms.length === 0) return null;

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
                  key={room._id}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(room._id)}
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
                            scale: hoveredCard === room._id ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                          <OptimizedImage
                            src={room.heroImage} preset="card"
                            alt={room.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={75}
                            priority={true}
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
                            background: hoveredCard === room._id
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
                              color: hoveredCard === room._id ? KINSHIP_COLORS.green : KINSHIP_COLORS.greenDark
                            }}
                          >
                            {room.name}
                          </h3>

                          <p
                            className="text-sm sm:text-base md:text-lg leading-relaxed"
                            style={{ color: KINSHIP_COLORS.greenDark, opacity: 0.8 }}
                          >
                            {room.shortDescription || room.description}
                          </p>
                        </div>

                        {/* CTA Button - Mobile Optimized */}
                        <motion.button
                          className="w-full py-2.5 sm:py-3 mt-3 sm:mt-4 text-sm sm:text-base font-semibold transition-all duration-300 touch-manipulation"
                          style={{
                            backgroundColor: hoveredCard === room._id ? KINSHIP_COLORS.green : KINSHIP_COLORS.greenDark,
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

// Gallery carousel for single rooms (Family Suite, Camp Deck)
// Carousels through gallery images of ONE room, not multiple rooms
function GalleryCarousel({
  title,
  room,
  roomType
}: {
  title: string;
  room: SanityRoom;
  roomType: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get gallery images, falling back to heroImage if no gallery
  const galleryImages = room.gallery && room.gallery.length > 0
    ? room.gallery
    : [room.heroImage];

  // Preload all gallery images for smooth transitions
  useEffect(() => {
    galleryImages.forEach(imgUrl => {
      const img = new window.Image();
      img.src = imgUrl;
    });
  }, [galleryImages]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  return (
    <div className="relative z-10">
      <div className="relative">
        {/* Arrow buttons */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 sm:-ml-4 bg-white/95 hover:bg-white shadow-lg p-2 sm:p-3 transition-all duration-200 hover:scale-105 sm:hover:scale-110"
              style={{
                color: KINSHIP_COLORS.greenDark,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              }}
              aria-label="Previous image"
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
              aria-label="Next image"
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
              <div
                className="group relative"
                onMouseEnter={() => setHoveredCard(room._id)}
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
                          scale: hoveredCard === room._id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      >
                        <OptimizedImage
                          src={galleryImages[currentIndex]} preset="gallery"
                          alt={`${room.name} - Image ${currentIndex + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={75}
                          priority={true}
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
                          background: hoveredCard === room._id
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
                            color: hoveredCard === room._id ? KINSHIP_COLORS.green : KINSHIP_COLORS.greenDark
                          }}
                        >
                          {room.name}
                        </h3>

                        <p
                          className="text-sm sm:text-base md:text-lg leading-relaxed"
                          style={{ color: KINSHIP_COLORS.greenDark, opacity: 0.8 }}
                        >
                          {room.shortDescription || room.description}
                        </p>
                      </div>

                      {/* CTA Button - Mobile Optimized */}
                      <motion.button
                        className="w-full py-2.5 sm:py-3 mt-3 sm:mt-4 text-sm sm:text-base font-semibold transition-all duration-300 touch-manipulation"
                        style={{
                          backgroundColor: hoveredCard === room._id ? KINSHIP_COLORS.green : KINSHIP_COLORS.greenDark,
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
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator - Mobile Optimized */}
        {galleryImages.length > 1 && (
          <div className="flex justify-center gap-2 mt-4 sm:mt-6 py-2">
            {galleryImages.map((_, index) => (
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
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function RoomsGridSanity({
  rooms,
  sectionTitle,
  ctaText,
  ctaUrl,
  kingRoomsLabel,
  kingRooms,
  queenRoomsLabel,
  queenRooms,
  familyRoomLabel,
  familyRoomName,
  familyRoomSlug,
  familyRoomDescription,
  familyRoomImageUrl,
  campDeckLabel,
  campDeckName,
  campDeckSlug,
  campDeckDescription,
  campDeckImageUrl,
}: RoomsGridSanityProps) {
  // Use props or fallback defaults
  const title = sectionTitle || 'Find Your Perfect Room';
  const buttonText = ctaText || 'Explore All Rooms';
  const buttonUrl = ctaUrl || '/rooms';

  // Labels for room categories
  const kingLabel = kingRoomsLabel || 'King Rooms';
  const queenLabel = queenRoomsLabel || 'Queen Rooms';
  const familyLabel = familyRoomLabel || 'Family';
  const campLabel = campDeckLabel || 'Camp Deck';

  // Build room data from Sanity or use fallback
  const displayRooms = {
    king: kingRooms && kingRooms.length > 0
      ? kingRooms.map(r => {
          // Use Sanity imageUrl if available, otherwise fallback to matched slug or first image
          const fallbackImage = fallbackRoomsByType.king.find(fr => fr.slug === r.slug)?.heroImage || fallbackRoomsByType.king[0].heroImage;
          return {
            _id: r._key,
            name: r.name,
            slug: r.slug,
            shortDescription: r.shortDescription,
            heroImage: r.imageUrl || fallbackImage,
            maxOccupancy: 2,
            features: [],
          };
        })
      : fallbackRoomsByType.king,
    queen: queenRooms && queenRooms.length > 0
      ? queenRooms.map(r => {
          // Use Sanity imageUrl if available, otherwise fallback to matched slug or first image
          const fallbackImage = fallbackRoomsByType.queen.find(fr => fr.slug === r.slug)?.heroImage || fallbackRoomsByType.queen[0].heroImage;
          return {
            _id: r._key,
            name: r.name,
            slug: r.slug,
            shortDescription: r.shortDescription,
            heroImage: r.imageUrl || fallbackImage,
            maxOccupancy: 2,
            features: [],
          };
        })
      : fallbackRoomsByType.queen,
    family: familyRoomName
      ? [{
          _id: 'family-suite',
          name: familyRoomName,
          slug: familyRoomSlug || 'family-suite',
          shortDescription: familyRoomDescription || '',
          // Use Sanity familyRoomImageUrl if available, otherwise fallback
          heroImage: familyRoomImageUrl || fallbackRoomsByType.family[0].heroImage,
          gallery: fallbackRoomsByType.family[0].gallery,
          maxOccupancy: 6,
          features: [],
        }]
      : fallbackRoomsByType.family,
    campDeck: campDeckName
      ? [{
          _id: 'camp-deck',
          name: campDeckName,
          slug: campDeckSlug || 'camp-deck',
          shortDescription: campDeckDescription || '',
          // Use Sanity campDeckImageUrl if available, otherwise fallback
          heroImage: campDeckImageUrl || fallbackRoomsByType.campDeck[0].heroImage,
          gallery: fallbackRoomsByType.campDeck[0].gallery,
          maxOccupancy: 2,
          features: [],
        }]
      : fallbackRoomsByType.campDeck,
  };

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
          {title}
        </h2>
      </motion.div>

      {/* Mobile-First Responsive Grid Layout */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
          {/* King Rooms Carousel */}
          {displayRooms.king.length > 0 && (
            <RoomCarousel
              title={kingLabel}
              rooms={displayRooms.king}
              roomType={kingLabel}
            />
          )}

          {/* Queen Rooms Carousel */}
          {displayRooms.queen.length > 0 && (
            <RoomCarousel
              title={queenLabel}
              rooms={displayRooms.queen}
              roomType={queenLabel}
            />
          )}

          {/* Family Suite Section - Gallery carousel for ONE room */}
          {displayRooms.family.length > 0 && (
            <GalleryCarousel
              title={familyLabel}
              room={displayRooms.family[0]}
              roomType={familyLabel}
            />
          )}

          {/* Camp Deck Section - Gallery carousel for ONE room */}
          {displayRooms.campDeck.length > 0 && (
            <GalleryCarousel
              title={campLabel}
              room={displayRooms.campDeck[0]}
              roomType={campLabel}
            />
          )}
        </div>
      </div>

      {/* Explore All Rooms Button - Mobile Optimized */}
      <div className="text-center mt-8 sm:mt-10 md:mt-12 relative z-10 px-4">
        <Link href={buttonUrl}>
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
            {buttonText}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
