'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { welcomeReveal, viewportConfig } from '@/lib/utils/animations';
import { KINSHIP_COLORS, KINSHIP_FONTS } from '@/lib/config/brand';

// Default content for fallback
const defaultContent = {
  title: 'Kinship is Your Guide',
  body: `It makes a difference landing in a place where you know a friend. Consider us your insider guide to exploring the real gems of Colorado Springs.

Whether you're excited for an immersion into the local food, arts, and culture scene just steps from our front door, or you are planning to go play outside at our nearby hiking, biking, or outdoor experiences on Pikes Peak, we'll connect you to an authentic way to experience our beloved Colorado Springs area.

One of our favorite things to do is help you have an amazing time, and we'll gladly point you in the right direction. Hey, we may even come along with you for the ride!`
};

interface KinshipGuideAsymmetricProps {
  title?: string;
  body?: string;
}

export function KinshipGuideAsymmetric({ title, body }: KinshipGuideAsymmetricProps) {
  // Use Sanity data if provided, otherwise fall back to defaults
  const guideTitle = title || defaultContent.title;
  const guideBody = body || defaultContent.body;

  // Split body into paragraphs
  const paragraphs = guideBody.split('\n\n').filter(p => p.trim());

  return (
    <section
      className="relative py-12 md:py-16 overflow-hidden"
      style={{ backgroundColor: KINSHIP_COLORS.white }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/HomePage/GardenoftheGods, SamStarr-mobile.webp"
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
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-base md:text-lg leading-relaxed ${index === paragraphs.length - 1 ? 'mb-6' : 'mb-3'}`}
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark,
                  opacity: 0.9,
                }}
              >
                {paragraph}
              </p>
            ))}

            {/* Three CTAs - Full Width on Mobile */}
            <div className="flex gap-2 sm:gap-3 w-full">
              <Link href="/events" className="flex-1">
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
                  Events
                </motion.button>
              </Link>

              <Link href="/explore" className="flex-1">
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
                  Explore
                </motion.button>
              </Link>

              <motion.a
                href="https://hotels.cloudbeds.com/reservation/4nfQ6E"
                target="_blank"
                rel="noopener noreferrer"
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
                Book Your Room
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
                  src="/images/HomePage/background for stay explore gather drink eat-mobile.webp"
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