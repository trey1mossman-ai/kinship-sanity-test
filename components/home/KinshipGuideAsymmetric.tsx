'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { welcomeReveal, viewportConfig } from '@/lib/utils/animations';
import { KINSHIP_COLORS, KINSHIP_FONTS } from '@/lib/config/brand';
import type { Homepage } from '@/lib/sanity/queries';

// Default content for fallback
const defaults = {
  title: 'Kinship is Your Guide',
  paragraph1: 'It makes a difference landing in a place where you know a friend. Consider us your insider guide to exploring the real gems of Colorado Springs.',
  paragraph2: "Whether you're excited for an immersion into the local food, arts, and culture scene just steps from our front door, or you are planning to go play outside at our nearby hiking, biking, or outdoor experiences on Pikes Peak, we'll connect you to an authentic way to experience our beloved Colorado Springs area.",
  paragraph3: "One of our favorite things to do is help you have an amazing time, and we'll gladly point you in the right direction. Hey, we may even come along with you for the ride!",
  cta1Text: 'Events',
  cta1Url: '/events',
  cta2Text: 'Explore',
  cta2Url: '/explore',
  cta3Text: 'Book Your Room',
  cta3Url: 'https://hotels.cloudbeds.com/reservation/4nfQ6E'
};

interface KinshipGuideAsymmetricProps {
  sanityData?: Homepage | null;
}

export function KinshipGuideAsymmetric({ sanityData }: KinshipGuideAsymmetricProps) {
  // Use Sanity data if provided, otherwise fall back to defaults
  const guideTitle = sanityData?.guideTitle || defaults.title;
  const paragraph1 = sanityData?.guideParagraph1 || defaults.paragraph1;
  const paragraph2 = sanityData?.guideParagraph2 || defaults.paragraph2;
  const paragraph3 = sanityData?.guideParagraph3 || defaults.paragraph3;
  const cta1Text = sanityData?.guideCta1Text || defaults.cta1Text;
  const cta1Url = sanityData?.guideCta1Url || defaults.cta1Url;
  const cta2Text = sanityData?.guideCta2Text || defaults.cta2Text;
  const cta2Url = sanityData?.guideCta2Url || defaults.cta2Url;
  const cta3Text = sanityData?.guideCta3Text || defaults.cta3Text;
  const cta3Url = sanityData?.guideCta3Url || defaults.cta3Url;

  // Use Sanity images with fallbacks
  const guideBackgroundImage = sanityData?.guideBackgroundImageUrl || '/images/HomePage/GardenoftheGods, SamStarr-mobile.webp';
  const guideStampImage = sanityData?.guideStampImageUrl || '/images/HomePage/background for stay explore gather drink eat-mobile.webp';

  // Check if the third CTA is external
  const isCta3External = cta3Url.startsWith('http');

  return (
    <section
      className="relative py-12 md:py-16 overflow-hidden"
      style={{ backgroundColor: KINSHIP_COLORS.white }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={guideBackgroundImage}
          alt="Garden of the Gods Colorado Springs"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/55 to-white/60" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={welcomeReveal}
          >
            <h2
              className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4"
              style={{
                fontFamily: KINSHIP_FONTS.heading,
                color: KINSHIP_COLORS.greenDark,
                lineHeight: '1.1',
              }}
            >
              {guideTitle}
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-3"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                color: KINSHIP_COLORS.greenDark,
                opacity: 0.9,
              }}
            >
              {paragraph1}
            </p>
            <p
              className="text-base md:text-lg leading-relaxed mb-3"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                color: KINSHIP_COLORS.greenDark,
                opacity: 0.9,
              }}
            >
              {paragraph2}
            </p>
            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                color: KINSHIP_COLORS.greenDark,
                opacity: 0.9,
              }}
            >
              {paragraph3}
            </p>

            {/* Three CTAs - Full Width on Mobile */}
            <div className="flex gap-2 sm:gap-3 w-full">
              <Link href={cta1Url} className="flex-1">
                <motion.button
                  className="w-full inline-flex items-center justify-center px-2 sm:px-4 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold text-white transition-all duration-300"
                  style={{
                    backgroundColor: KINSHIP_COLORS.greenDark,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 4px 12px rgba(102, 124, 88, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {cta1Text}
                </motion.button>
              </Link>

              <Link href={cta2Url} className="flex-1">
                <motion.button
                  className="w-full inline-flex items-center justify-center px-2 sm:px-4 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold text-white transition-all duration-300"
                  style={{
                    backgroundColor: KINSHIP_COLORS.greenDark,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 4px 12px rgba(102, 124, 88, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {cta2Text}
                </motion.button>
              </Link>

              <motion.a
                href={cta3Url}
                target={isCta3External ? '_blank' : undefined}
                rel={isCta3External ? 'noopener noreferrer' : undefined}
                className="flex-1 inline-flex items-center justify-center px-2 sm:px-4 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold text-white transition-all duration-300"
                style={{
                  backgroundColor: KINSHIP_COLORS.greenDark,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 4px 12px rgba(102, 124, 88, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {cta3Text}
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Stay Gather Explore Image */}
          <motion.div
            className="relative h-[300px] lg:h-[400px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative w-full h-full">
              {/* Background image */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
                }}
              >
                <Image
                  src={guideStampImage}
                  alt="Kinship Landing interior"
                  fill
                  className="object-cover"
                />
                {/* Tint overlay - increased opacity for visible tinting */}
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Stay Explore Gather Drink Eat Overlay Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/HomePage/STAY EXPLORE GATHER DRINK EAT-mobile.webp"
                  alt="Stay Explore Gather Drink Eat"
                  width={240}
                  height={160}
                  className="object-contain w-[160px] sm:w-[200px] lg:w-[240px] h-auto"
                  
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}