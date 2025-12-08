'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { KINSHIP_COLORS } from '@/lib/config/brand';

interface EventsSectionDynamicProps {
  title?: string;
  description?: string;
}

// Fallback values (from current hardcoded text)
const fallbackTitle = 'Gather Together';
const fallbackDescription = 'Unique spaces for unforgettable events';

export function EventsSectionDynamic({ title, description }: EventsSectionDynamicProps) {
  // Use Sanity data if available, otherwise fallback to hardcoded
  const displayTitle = title || fallbackTitle;
  const displayDescription = description || fallbackDescription;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax for different elements
  const yLeft = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // GreenHaus carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // The Yard carousel state
  const [yardImageIndex, setYardImageIndex] = useState(0);

  const greenhausImages = [
    '/images/events-page/Meetings:Retreats/Kinship-4G3A9437-1 (1).webp',
    '/images/events-page/Gatherings/0B1A0328-optimized.webp',
    '/images/events-page/GreenHaus/Greenhaus-SamStarrMedia (1).webp',
    '/images/events-page/GreenHaus/Greenhaus-ErinWinterPhotography-8502.webp',
    '/images/events-page/GreenHaus/Greenhaus-RichardSeldomridge.webp',
  ];

  const yardImages = [
    '/images/events-page/The Yard/IMG_1494.webp',
    '/images/events-page/The Yard/DSC_6966.webp',
    '/images/events-page/The Yard/D85A8970.webp',
    '/images/events-page/The Yard/IMG_1487 (1).webp',
  ];

  // Auto-advance GreenHaus carousel every 5 seconds (slower, more premium feel)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % greenhausImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [greenhausImages.length]);

  // Auto-advance The Yard carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setYardImageIndex((prev) => (prev + 1) % yardImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [yardImages.length]);

  const venues = [
    {
      id: 'greenhaus',
      name: 'GreenHaus',
      capacity: '80',
      image: '/images/home/green-haus.webp',
      href: '/events#greenhaus',
      position: 'left',
      size: 'large'
    },
    {
      id: 'the-yard',
      name: 'The Yard',
      capacity: '200',
      image: '/images/home/kinship yard.webp',
      href: '/events#the-yard',
      position: 'right',
      size: 'medium'
    },
    {
      id: 'camp-deck',
      name: 'Camp Deck',
      capacity: '20',
      image: '/images/Rooms Page:section/Camp Deck/1249DB9B-89AB-49F3-9D31-CBF581E440C6_1_201_a-optimized.webp',
      href: '/events#camp-deck',
      position: 'left',
      size: 'small'
    },
    {
      id: 'conference-room',
      name: 'Conference Room',
      capacity: '12',
      image: '/images/events-page/The Conference room /conference-room-new.webp',
      href: '/events#conference-room',
      position: 'right',
      size: 'small'
    }
  ];

  return (
    <>
    <section
      ref={sectionRef}
      className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-12 sm:pb-64 md:pb-80 lg:pb-96 overflow-visible"
      style={{ backgroundColor: KINSHIP_COLORS.latte }}
    >
      {/* Title Section - Proper spacing, no overlap */}
      <div className="max-w-[1400px] mx-auto px-8 mb-24 md:mb-32">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-5xl md:text-6xl font-bold mb-3"
            style={{ color: KINSHIP_COLORS.greenDark }}
          >
            {displayTitle}
          </h2>
          <p className="text-lg mb-6" style={{ color: KINSHIP_COLORS.greenDark, opacity: 0.7 }}>
            {displayDescription}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/events/"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: KINSHIP_COLORS.green,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              }}
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Clean asymmetric layout with proper spacing */}
      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Mobile stacked layout */}
        <div className="sm:hidden space-y-6">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              className="relative w-full h-[300px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={venue.href} className="group block relative w-full h-full">
                <div
                  className="relative w-full h-full overflow-hidden shadow-xl"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                >
                  {/* GreenHaus premium carousel on mobile */}
                  {venue.id === 'greenhaus' ? (
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{
                          opacity: 1,
                          scale: 1.02,
                          transition: {
                            opacity: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
                            scale: { duration: 5, ease: "linear" }
                          }
                        }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
                        }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={greenhausImages[currentImageIndex]}
                          alt={`${venue.name} - Image ${currentImageIndex + 1}`}
                          fill
                          className="object-cover"
                          quality={75}
                          priority={currentImageIndex === 0}
                        />
                      </motion.div>
                    </AnimatePresence>
                  ) : venue.id === 'the-yard' ? (
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={yardImageIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{
                          opacity: 1,
                          scale: 1.02,
                          transition: {
                            opacity: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
                            scale: { duration: 5, ease: "linear" }
                          }
                        }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
                        }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={yardImages[yardImageIndex]}
                          alt={`${venue.name} - Image ${yardImageIndex + 1}`}
                          fill
                          className="object-cover"
                          quality={75}
                          priority={yardImageIndex === 0}
                        />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <>
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
                    </>
                  )}

                  {/* Square label matching rooms style */}
                  <div
                    className="absolute top-3 left-3 px-2 py-1 bg-white font-semibold text-xs uppercase tracking-wider shadow-md"
                    style={{
                      color: KINSHIP_COLORS.greenDark,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    }}
                  >
                    {venue.name}
                  </div>

                  {/* Capacity badge */}
                  <div
                    className="absolute bottom-3 left-3 px-2 py-1 bg-kinship-green text-white text-xs font-bold shadow-md"
                    style={{
                      backgroundColor: KINSHIP_COLORS.greenDark,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    }}
                  >
                    UP TO {venue.capacity} GUESTS
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop asymmetric layout */}
        <div className="hidden sm:block relative h-[1100px] lg:h-[1050px]">

          {/* GreenHaus - Hero image with premium auto-carousel, left side with proper spacing */}
          <motion.div
            className="absolute left-[-2%] lg:left-0 top-0 w-[53%] lg:w-[55%] h-[400px] lg:h-[420px] z-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link href={venues[0].href} className="group block relative w-full h-full">
              <div
                className="relative w-full h-full overflow-hidden shadow-2xl"
                style={{
                  clipPath: 'polygon(0 0, 100% 2%, 98% 100%, 0 98%)'
                }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{
                      opacity: 1,
                      scale: 1.02,
                      transition: {
                        opacity: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
                        scale: { duration: 5, ease: "linear" }
                      }
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={greenhausImages[currentImageIndex]}
                      alt={`${venues[0].name} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      quality={75}
                      priority={currentImageIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </Link>
          </motion.div>

          {/* GreenHaus text with enhanced label - hidden on mobile */}
          <div className="hidden sm:flex absolute left-0 sm:left-0 top-[390px] sm:top-[420px] lg:top-[440px] items-start gap-2 sm:gap-4 z-15">
            <div className="flex flex-col items-start">
              <Link href={venues[0].href} className="bg-white px-3 py-1 mb-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ border: `2px solid ${KINSHIP_COLORS.greenDark}` }}>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: KINSHIP_COLORS.greenDark }}>
                  {venues[0].name}
                </h3>
              </Link>
              <span className="px-3 sm:px-5 py-2 sm:py-3 bg-kinship-green text-white text-sm sm:text-base font-bold inline-block shadow-md"
                style={{
                  backgroundColor: KINSHIP_COLORS.greenDark,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}>
                UP TO {venues[0].capacity} GUESTS
              </span>
            </div>
            {/* Thicker arrow pointing up to GreenHaus image */}
            <svg width="50" height="70" className="mt-2">
              <line
                x1="15" y1="60"
                x2="15" y2="15"
                stroke={KINSHIP_COLORS.greenDark}
                strokeWidth="4"
              />
              <polygon
                points="15,5 5,20 25,20"
                fill={KINSHIP_COLORS.greenDark}
              />
            </svg>
          </div>

          {/* The Yard - Right side, matching angle with GreenHaus - Premium carousel */}
          <motion.div
            className="absolute right-0 top-80 w-[48%] sm:w-[42%] h-[260px] sm:h-[340px] z-5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href={venues[1].href} className="group block relative w-full h-full">
              <div
                className="relative w-full h-full overflow-hidden shadow-2xl"
                style={{
                  clipPath: 'polygon(2% 0, 100% 2%, 100% 100%, 0 98%)'
                }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={yardImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{
                      opacity: 1,
                      scale: 1.02,
                      transition: {
                        opacity: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
                        scale: { duration: 5, ease: "linear" }
                      }
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={yardImages[yardImageIndex]}
                      alt={`${venues[1].name} - Image ${yardImageIndex + 1}`}
                      fill
                      className="object-cover"
                      quality={75}
                      priority={yardImageIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </Link>
          </motion.div>

          {/* The Yard text with pointer line - hidden on mobile */}
          <div
            className="hidden sm:flex absolute right-0 sm:right-[10%] lg:right-[15%] top-[230px] sm:top-[210px] lg:top-[200px] items-end gap-2 sm:gap-4 z-15"
          >
            <div className="flex flex-col items-start">
              <Link href={venues[1].href} className="bg-white px-3 py-1 mb-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ border: `2px solid ${KINSHIP_COLORS.greenDark}` }}>
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold" style={{ color: KINSHIP_COLORS.greenDark }}>
                  {venues[1].name}
                </h3>
              </Link>
              <span className="px-3 sm:px-5 py-2 sm:py-3 bg-kinship-green text-white text-sm sm:text-base font-bold inline-block shadow-md"
                style={{
                  backgroundColor: KINSHIP_COLORS.greenDark,
                  clipPath: 'polygon(2% 0, 100% 2%, 100% 100%, 0 98%)'
                }}>
                UP TO {venues[1].capacity} GUESTS
              </span>
            </div>
            {/* Thicker arrow pointing down to The Yard */}
            <svg width="50" height="50" className="mb-0 sm:mb-1 mt-2 sm:mt-0">
              <line
                x1="20" y1="10"
                x2="20" y2="35"
                stroke={KINSHIP_COLORS.greenDark}
                strokeWidth="4"
              />
              <polygon
                points="20,45 10,30 30,30"
                fill={KINSHIP_COLORS.greenDark}
              />
            </svg>
          </div>

          {/* Camp Deck - Bottom left, larger and lower */}
          <motion.div
            className="absolute left-[2%] bottom-[200px] sm:bottom-[120px] lg:bottom-[100px] w-[46%] sm:w-[50%] lg:w-[52%] h-[260px] sm:h-[300px] lg:h-[320px] z-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href={venues[2].href} className="group block relative w-full h-full">
              <div
                className="relative w-full h-full overflow-hidden shadow-xl"
                style={{
                  clipPath: 'polygon(0 2%, 100% 0, 98% 100%, 2% 98%)'
                }}
              >
                <Image
                  src={venues[2].image}
                  alt={venues[2].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
              </div>
            </Link>
          </motion.div>

          {/* Camp Deck text with pointer line - hidden on mobile */}
          <div className="hidden sm:flex absolute left-[50%] sm:left-[58%] lg:left-[56%] bottom-[310px] sm:bottom-[260px] lg:bottom-[250px] flex-col items-start z-15">
            <div className="flex items-start gap-2 sm:gap-4">
              <svg width="60" height="40" className="mt-2 sm:mt-4">
                <line
                  x1="50" y1="20"
                  x2="15" y2="20"
                  stroke={KINSHIP_COLORS.greenDark}
                  strokeWidth="4"
                />
                <polygon
                  points="5,20 20,10 20,30"
                  fill={KINSHIP_COLORS.greenDark}
                />
              </svg>
              <div className="flex flex-col items-start">
                <Link href={venues[2].href} className="bg-white px-3 py-1 mb-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ border: `2px solid ${KINSHIP_COLORS.greenDark}` }}>
                  <h3 className="text-base sm:text-xl lg:text-2xl font-bold" style={{ color: KINSHIP_COLORS.greenDark }}>
                    {venues[2].name}
                  </h3>
                </Link>
                <span className="px-3 sm:px-4 py-2 sm:py-2 bg-kinship-green text-white text-xs sm:text-sm font-bold inline-block shadow-md"
                  style={{
                    backgroundColor: KINSHIP_COLORS.greenDark,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}>
                  UP TO {venues[2].capacity} GUESTS
                </span>
              </div>
            </div>
          </div>
          {/* Conference Room - Bottom right, below The Yard */}
          <motion.div
            className="absolute right-[2%] bottom-[-200px] sm:bottom-[-250px] lg:bottom-[-300px] w-[44%] sm:w-[48%] lg:w-[50%] h-[240px] sm:h-[280px] lg:h-[300px] z-7"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-full h-full">
              <Link href={venues[3].href} className="group block relative w-full h-full">
                <div
                  className="relative w-full h-full overflow-hidden shadow-xl"
                  style={{
                    clipPath: 'polygon(2% 0, 100% 2%, 98% 98%, 0 100%)'
                  }}
                >
                  <Image
                    src={venues[3].image}
                    alt={venues[3].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tl from-black/50 via-black/20 to-transparent" />

                  {/* Elegant Minimalist Overlay Button */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open('https://portal.tripleseat.com/direct_bookings/rkya23vv6y2', '_blank', 'noopener,noreferrer');
                      }}
                      className="group/btn relative inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 font-semibold text-white transition-all duration-300 overflow-hidden"
                    style={{
                      backgroundColor: 'rgba(102, 124, 88, 0.95)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '0',
                      fontSize: 'clamp(0.7rem, 1.2vw, 0.875rem)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(102, 124, 88, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(85, 102, 73, 1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3), 0 3px 8px rgba(102, 124, 88, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(102, 124, 88, 0.95)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(102, 124, 88, 0.3)';
                    }}
                  >
                    <span className="relative z-10 whitespace-nowrap">Book Now</span>
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              </Link>
            </div>
          </motion.div>

          {/* Conference Room text with pointer line - hidden on mobile */}
          <div className="hidden sm:flex absolute right-[48%] sm:right-[52%] lg:right-[53%] bottom-[-130px] sm:bottom-[-170px] lg:bottom-[-220px] items-start gap-2 sm:gap-4 z-15">
            <div className="flex flex-col items-end text-right">
              <Link href={venues[3].href} className="bg-white px-3 py-1 mb-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ border: `2px solid ${KINSHIP_COLORS.greenDark}` }}>
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold" style={{ color: KINSHIP_COLORS.greenDark }}>
                  {venues[3].name}
                </h3>
              </Link>
              <span className="px-3 sm:px-4 py-2 sm:py-2 bg-kinship-green text-white text-xs sm:text-sm font-bold inline-block shadow-md"
                style={{
                  backgroundColor: KINSHIP_COLORS.greenDark,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}>
                UP TO {venues[3].capacity} GUESTS
              </span>
            </div>
            {/* Thicker arrow pointing right to Conference Room */}
            <svg width="60" height="40" className="mt-2 sm:mt-4">
              <line
                x1="10" y1="20"
                x2="45" y2="20"
                stroke={KINSHIP_COLORS.greenDark}
                strokeWidth="4"
              />
              <polygon
                points="55,20 40,10 40,30"
                fill={KINSHIP_COLORS.greenDark}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile-only CTA below events */}
      <div className="sm:hidden max-w-[1400px] mx-auto px-4 mt-12 text-center">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-6 py-2.5 font-semibold transition-all duration-300"
          style={{
            backgroundColor: KINSHIP_COLORS.green,
            color: '#ffffff'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = KINSHIP_COLORS.greenDark;
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = KINSHIP_COLORS.green;
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Book Your Event
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>

    {/* Desktop CTA below Conference Room - OUTSIDE section to clear overflow */}
    <div className="hidden sm:block w-full px-4 py-8 sm:py-10 md:py-12 text-center" style={{ backgroundColor: KINSHIP_COLORS.latte }}>
      <Link
        href="/events/"
        className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: KINSHIP_COLORS.green,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        }}
      >
        Learn More
      </Link>
    </div>
    </>
  );
}