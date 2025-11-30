'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { content } from '@/content/copy';
import { KINSHIP_COLORS, KINSHIP_FONTS } from '@/lib/config/brand';

export function MapBlock() {
  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: KINSHIP_COLORS.white }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          style={{
            fontFamily: KINSHIP_FONTS.heading,
            color: KINSHIP_COLORS.greenDark
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {content.home.map.title}
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Clean map container */}
          <motion.div
            className="relative h-[400px] overflow-hidden border-2"
            style={{
              borderColor: KINSHIP_COLORS.greenDark,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.7776892857796!2d-104.8242378!3d38.8273544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8713451f8479c989%3A0xc76c7cb641b1997a!2sKinship%20Landing!5e0!3m2!1sen!2sus!4v1693234567890!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kinship Landing Location"
              className="w-full h-full"
            />
          </motion.div>

          {/* Clean info section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <h3
                className="text-xl font-bold mb-4"
                style={{
                  fontFamily: KINSHIP_FONTS.heading,
                  color: KINSHIP_COLORS.greenDark
                }}
              >
                Convenience to Everything
              </h3>
              <div className="space-y-2">
                {content.home.map.walkTo.map((location) => {
                  const isClickable = location.link;
                  const isExternal = isClickable && location.link.startsWith('http');
                  const ItemWrapper = isClickable ? (isExternal ? 'a' : Link) : 'div';
                  const wrapperProps = isClickable
                    ? isExternal
                      ? { href: location.link, target: '_blank', rel: 'noopener noreferrer' }
                      : { href: location.link }
                    : {};

                  return (
                    <ItemWrapper
                      key={location.name}
                      {...wrapperProps}
                      className={`flex items-center justify-between py-2 ${isClickable ? 'hover:brightness-110 transition-all cursor-pointer' : ''}`}
                      style={{
                        borderBottom: `1px solid ${KINSHIP_COLORS.divider}`,
                      }}
                    >
                      <span
                        className="text-base"
                        style={{
                          fontFamily: KINSHIP_FONTS.body,
                          color: KINSHIP_COLORS.greenDark
                        }}
                      >
                        {location.name}
                      </span>
                      <span
                        className="font-semibold"
                        style={{
                          color: KINSHIP_COLORS.greenDark,
                          fontFamily: KINSHIP_FONTS.body
                        }}
                      >
                        {location.time}
                      </span>
                    </ItemWrapper>
                  );
                })}
              </div>
            </div>

            {/* Book Your Stay CTA */}
            <div className="mt-6">
              <a
                href="https://hotels.cloudbeds.com/reservation/4nfQ6E"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 font-semibold text-white transition-all hover:brightness-110"
                style={{
                  backgroundColor: KINSHIP_COLORS.greenDark,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}
              >
                Book Your Stay
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
