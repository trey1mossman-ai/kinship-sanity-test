'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { welcomeReveal, staggerContainer, staggerItem, viewportConfig } from '@/lib/utils/animations';
import { KINSHIP_COLORS, KINSHIP_FONTS } from '@/lib/config/brand';
import type { Homepage } from '@/lib/sanity/queries';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import type { PortableTextBlock } from '@portabletext/types';

interface HomaSectionEnhancedProps {
  sanityData?: Homepage | null;
}

// Fallback values
const defaults = {
  paragraph1: "Anchoring the public first floor of Kinship Landing is Homa, our craft café and bar. We took fresh, locally sourced ingredients and combined them with our favorite globally inspired dishes to offer nutrient dense and delightfully delicious food and drinks to fuel your adventures from sunrise to late night.",
  paragraph2: "Designed for the hungry and the healthy alike, locals, hotel guests, and old friends gather and enjoy hearty sandwiches, flavorful whole grain or salad bowls, small bites like our signature hand pies, fresh soups, and entrees or brunch and breakfast packed full of yummy goodness. Share it all with a pint of local craft beer, freshly roasted coffee, in house custom cocktails, or the perfect glass of wine, kombucha, or an ice-oat milk latte.",
  promoTitle: "Join HOMA Homies & Get $5!",
  promoDescription: "Sign up for our loyalty program and get $5 instantly. Earn points, exclusive specials, and unlock in-room ordering coming soon!",
  promoUrl: "https://www.toasttab.com/kinship-landing-homa-415-south-nevada-avenue/rewardsSignup",
  ctaText: "View Menu",
  ctaUrl: "/homa#menu"
};

export function HomaSectionEnhanced({ sanityData }: HomaSectionEnhancedProps) {
  // Use Sanity data if provided, otherwise use fallback defaults
  const desc1 = sanityData?.homaParagraph1 || defaults.paragraph1;
  const desc2 = sanityData?.homaParagraph2 || defaults.paragraph2;
  const promoTitle = sanityData?.homaPromoTitle || defaults.promoTitle;
  const promoDescription = sanityData?.homaPromoDescription || defaults.promoDescription;
  const promoUrl = sanityData?.homaPromoUrl || defaults.promoUrl;
  const ctaText = sanityData?.homaCtaText || defaults.ctaText;
  const ctaUrl = sanityData?.homaCtaUrl || defaults.ctaUrl;

  // Image URLs with Sanity fallbacks
  const homaLogoUrl = sanityData?.homaLogoImageUrl || '/images/homa-logo-sq.svg';
  const homaBackgroundUrl = sanityData?.homaBackgroundImageUrl;

  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const homaImages = [
    {
      src: '/images/HOMA Page/Fresh and local.webp',
      alt: 'HOMA restaurant food',
      title: 'Fresh & Local',
    },
    {
      src: '/images/HOMA Page/Craft Cocktails.webp',
      alt: 'HOMA cocktails and drinks',
      title: 'Beer, Wine, Craft Cocktails',
      subtitle: 'Happy hour 3-6pm M-F',
    },
    {
      src: '/images/HOMA Page/Signature Dishes.webp',
      alt: 'HOMA signature steak',
      title: 'Signature Dishes',
    },
    {
      src: '/images/HOMA Page/Homa Bar, Jennie Campbell (@fsupecas21)-optimized.webp',
      alt: 'HOMA bar atmosphere',
      title: 'Café & Bar',
      subtitle: 'Open Daily 7am - 10pm',
    },
  ];

  return (
    <section className="relative pt-4 sm:pt-8 md:pt-10 pb-2 sm:pb-4 md:pb-6 overflow-hidden" style={{ backgroundColor: KINSHIP_COLORS.white }}>
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Flex column layout with order, Desktop: Grid layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-8 lg:items-start">

          {/* Left Column Content - Desktop only */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="hidden lg:block"
          >
            {/* HOMA Logo */}
            <motion.div variants={staggerItem} className="mb-2">
              <Link href="/homa" className="inline-block transition-opacity hover:opacity-80">
                <Image
                  src={homaLogoUrl}
                  alt="HOMA Café + Bar"
                  width={220}
                  height={130}
                  className="object-contain w-[220px] h-auto"
                />
              </Link>
            </motion.div>

            {/* Description */}
            <motion.div variants={staggerItem} className="space-y-3 mb-4 mt-0">
              <div
                className="text-base md:text-lg leading-snug"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark,
                  opacity: 0.9,
                }}
              >
                {Array.isArray(desc1) ? (
                  <RichTextRenderer value={desc1} />
                ) : (
                  <p>{desc1}</p>
                )}
              </div>

              {/* HOMA Homies Promo Callout - Clickable */}
              <a
                href={promoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border-2 my-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                style={{
                  backgroundColor: KINSHIP_COLORS.wasabi,
                  borderColor: KINSHIP_COLORS.greenDark,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}
              >
                <p
                  className="text-sm md:text-base font-semibold mb-1"
                  style={{
                    fontFamily: KINSHIP_FONTS.body,
                    color: KINSHIP_COLORS.greenDark,
                  }}
                >
                  {promoTitle}
                </p>
                <div
                  className="text-xs md:text-sm"
                  style={{
                    fontFamily: KINSHIP_FONTS.body,
                    color: KINSHIP_COLORS.greenDark,
                    opacity: 0.9,
                  }}
                >
                  {Array.isArray(promoDescription) ? (
                    <RichTextRenderer value={promoDescription} />
                  ) : (
                    <p>{promoDescription}</p>
                  )}
                </div>
              </a>

              <div
                className="text-base md:text-lg leading-snug"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark,
                  opacity: 0.9,
                }}
              >
                {Array.isArray(desc2) ? (
                  <RichTextRenderer value={desc2} />
                ) : (
                  <p>{desc2}</p>
                )}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-3 items-center">
              <Link href={ctaUrl}>
                <motion.button
                  className="px-6 py-3 sm:px-8 sm:py-4 font-semibold text-white transition-all duration-300"
                  style={{
                    backgroundColor: KINSHIP_COLORS.greenDark,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 4px 12px rgba(102, 124, 88, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {ctaText}
                </motion.button>
              </Link>

              <Link href="/homa#promos">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="transition-all duration-300"
                >
                  <Image
                    src="/images/HOMA Page/megaphone-promo.webp"
                    alt="HOMA Homies Loyalty - Get $5 When You Sign Up"
                    width={180}
                    height={180}
                    className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] object-contain cursor-pointer"
                  />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* HOMA Logo - Mobile only, Order 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="order-1 lg:hidden -mb-6"
          >
            <motion.div variants={staggerItem} className="mb-0">
              <Link href="/homa" className="inline-block transition-opacity hover:opacity-80">
                <Image
                  src={homaLogoUrl}
                  alt="HOMA Café + Bar"
                  width={220}
                  height={130}
                  className="object-contain w-[220px] h-auto"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* First Paragraph - Mobile only, Order 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="order-2 lg:hidden mb-2 space-y-3"
          >
            <motion.div
              variants={staggerItem}
              className="text-base md:text-lg leading-snug"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                color: KINSHIP_COLORS.greenDark,
                opacity: 0.9,
              }}
            >
              {Array.isArray(desc1) ? (
                <RichTextRenderer value={desc1} />
              ) : (
                <p>{desc1}</p>
              )}
            </motion.div>

            {/* HOMA Homies Promo Callout - Mobile - Clickable */}
            <motion.a
              href={promoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              className="block p-4 border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              style={{
                backgroundColor: KINSHIP_COLORS.wasabi,
                borderColor: KINSHIP_COLORS.greenDark,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              }}
            >
              <p
                className="text-sm md:text-base font-semibold mb-1"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark,
                }}
              >
                {promoTitle}
              </p>
              <div
                className="text-xs md:text-sm"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark,
                  opacity: 0.9,
                }}
              >
                {Array.isArray(promoDescription) ? (
                  <RichTextRenderer value={promoDescription} />
                ) : (
                  <p>{promoDescription}</p>
                )}
              </div>
            </motion.a>
          </motion.div>

          {/* 3-Image Grid - Order 3 on mobile, right column on desktop (shows all 4 images on desktop) */}
          <motion.div
            className="relative h-[200px] lg:h-[500px] order-3 lg:order-none lg:mt-[220px] mb-2 lg:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Top Left - Large Food Image */}
              <Link href="/homa" className="block h-full">
                <motion.div
                  className="relative h-full overflow-hidden shadow-xl cursor-pointer"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 95%)'
                  }}
                >
                  <Image
                    src={homaImages[0].src}
                    alt={homaImages[0].alt}
                    fill
                    className="object-cover"
                    style={{ objectPosition: '50% 75%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-2 sm:bottom-6 sm:left-6 text-white">
                    <h4 className="text-xs sm:text-2xl font-bold">{homaImages[0].title}</h4>
                  </div>
                  {/* HOMA Overlay on Fresh & Local - Top Left */}
                  <div className="absolute top-2 left-2 z-10 opacity-90" style={{ filter: 'brightness(0) invert(1)' }}>
                    <Image
                      src="/images/Homa overlay .webp"
                      alt="HOMA Logo"
                      width={60}
                      height={40}
                      className="w-[40px] h-[27px] sm:w-[50px] sm:h-[33px] lg:w-[60px] lg:h-[40px] object-contain"
                    />
                  </div>
                </motion.div>
              </Link>

              {/* Top Right - Two Stacked Images */}
              <div className="flex flex-col gap-4">
                <Link href="/homa" className="block h-[48%]">
                  <motion.div
                    className="relative h-full overflow-hidden shadow-xl bg-black cursor-pointer"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0 95%)'
                    }}
                  >
                    <Image
                      src={homaImages[1].src}
                      alt={homaImages[1].alt}
                      fill
                      className="object-cover scale-110 lg:scale-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-white text-right">
                      <h4 className="text-xs sm:text-xl font-bold">{homaImages[1].title}</h4>
                      {homaImages[1].subtitle && (
                        <p className="text-[10px] sm:text-sm opacity-90">{homaImages[1].subtitle}</p>
                      )}
                    </div>
                  </motion.div>
                </Link>

                <Link href="/homa" className="block flex-1">
                  <motion.div
                    className="relative h-full overflow-hidden shadow-xl cursor-pointer"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      clipPath: 'polygon(0 5%, 100% 0, 100% 100%, 5% 100%)'
                    }}
                  >
                    <Image
                      src={homaImages[2].src}
                      alt={homaImages[2].alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-3 sm:bottom-4 sm:left-4 text-white">
                      <h4 className="text-xs sm:text-xl font-bold">{homaImages[2].title}</h4>
                    </div>
                  </motion.div>
                </Link>
              </div>

              {/* Bottom Full Width - Bar Image - Hidden on mobile, shown on desktop */}
              <Link href="/homa" className="col-span-2 hidden lg:block">
                <motion.div
                  className="relative h-[150px] overflow-hidden shadow-xl cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0 100%)'
                  }}
                >
                  <Image
                    src={homaImages[3].src}
                    alt={homaImages[3].alt}
                    fill
                    className="object-cover"
                    style={{ objectPosition: '50% 48%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                  <div className="absolute bottom-2 left-2 sm:bottom-8 sm:left-8 text-white">
                    <h4 className="text-xs sm:text-3xl font-bold mb-0 sm:mb-2">{homaImages[3].title}</h4>
                    {homaImages[3].subtitle && (
                      <p className="text-xs sm:text-lg opacity-90">{homaImages[3].subtitle}</p>
                    )}
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Second Paragraph - Mobile only, Order 4 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="order-4 lg:hidden mb-2"
          >
            <motion.div
              variants={staggerItem}
              className="text-base md:text-lg leading-snug"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                color: KINSHIP_COLORS.greenDark,
                opacity: 0.9,
              }}
            >
              {Array.isArray(desc2) ? (
                <RichTextRenderer value={desc2} />
              ) : (
                <p>{desc2}</p>
              )}
            </motion.div>
          </motion.div>

          {/* Bottom Bar Image - Mobile only, Order 5 */}
          <Link href="/homa" className="col-span-2 order-5 lg:hidden mb-3 block">
            <motion.div
              className="relative h-[200px] overflow-hidden shadow-xl cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0 100%)'
              }}
            >
              <Image
                src={homaImages[3].src}
                alt={homaImages[3].alt}
                fill
                className="object-cover"
                style={{ objectPosition: '50% 48%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
              <div className="absolute bottom-2 left-2 text-white">
                <h4 className="text-base font-bold mb-1">{homaImages[3].title}</h4>
                {homaImages[3].subtitle && (
                  <p className="text-xs opacity-90">{homaImages[3].subtitle}</p>
                )}
              </div>
            </motion.div>
          </Link>

          {/* CTAs - Mobile only, Order 6 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="order-6 lg:hidden"
          >
            <motion.div variants={staggerItem} className="flex flex-wrap gap-3 justify-center items-center">
              <Link href={ctaUrl}>
                <motion.button
                  className="px-6 py-3 sm:px-8 sm:py-4 font-semibold text-white transition-all duration-300"
                  style={{
                    backgroundColor: KINSHIP_COLORS.greenDark,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 4px 12px rgba(102, 124, 88, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {ctaText}
                </motion.button>
              </Link>

              <Link href="/homa#promos">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="transition-all duration-300"
                >
                  <Image
                    src="/images/HOMA Page/megaphone-promo.webp"
                    alt="HOMA Homies Loyalty - Get $5 When You Sign Up"
                    width={180}
                    height={180}
                    className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] object-contain cursor-pointer"
                  />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
