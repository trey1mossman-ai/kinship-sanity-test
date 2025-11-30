import Image from 'next/image';
import { KINSHIP_COLORS, KINSHIP_FONTS } from '@/lib/config/brand';

export function HomaLoyalty() {
  return (
    <section className="section-spacing" style={{ backgroundColor: '#aec69a' }}>
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Content */}
            <div className="text-center md:text-left">
              {/* Heading */}
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                style={{
                  fontFamily: KINSHIP_FONTS.heading,
                  color: KINSHIP_COLORS.slate
                }}
              >
                HOMA Loyalty and Rewards
              </h2>

              <p
                className="text-lg mb-8 leading-relaxed"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.slate,
                  opacity: 0.9
                }}
              >
                Become a Homa Homie for FREE and get $5 right off the bat plus $0.10 per dollar spent towards future purchase, special deals, event invites, free birthday goodies, and more.
              </p>

              {/* CTA Button */}
              <a
                href="https://www.toasttab.com/kinship-landing-homa-415-south-nevada-avenue/rewardsSignup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 font-semibold hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-kinship-evergreen focus:ring-offset-2 focus:ring-offset-[#aec69a] transition-all duration-200 min-h-[48px]"
                style={{
                  backgroundColor: KINSHIP_COLORS.greenDark,
                  color: KINSHIP_COLORS.white,
                  border: `2px solid ${KINSHIP_COLORS.greenDark}`,
                  fontFamily: KINSHIP_FONTS.body
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#556649';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = KINSHIP_COLORS.greenDark;
                }}
              >
                Join HOMA Rewards
              </a>

              <p
                className="text-xs mt-4"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.slate,
                  opacity: 0.6
                }}
              >
                Sign up takes less than a minute. Start earning rewards today!
              </p>
            </div>

            {/* Right: Image */}
            <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/images/HOMA Page/homa 8.13.24-6 (1).webp"
                alt="HOMA Homies Loyalty Rewards"
                fill
                className="object-cover"
                quality={75}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
