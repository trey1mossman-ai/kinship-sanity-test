import { Metadata } from 'next';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { Footer } from '@/components/Footer';
import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';

export const metadata: Metadata = {
  title: 'Accessibility | Kinship Landing',
  description: 'Learn about accessibility features and accommodations at Kinship Landing boutique hotel in Colorado Springs.',
};

export default function AccessibilityPage() {
  return (
    <ScrollEffectsWrapper>
      <HeaderNav />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 md:py-24 bg-kinship-sage/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{
                fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                color: '#667C58'
              }}
            >
              Accessibility
            </h1>
            <p
              className="text-lg md:text-xl"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58',
                opacity: 0.8
              }}
            >
              Making our hotel and website accessible to everyone
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="space-y-8"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58'
              }}
            >
              {/* Website Accessibility */}
              <div>
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Website Accessibility
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  At Kinship Landing, it's important to us that our website and property is accessible and easy to use for all persons of varying abilities. When creating our website, our development team used software tools to identify web accessibility standards as outlined by the World Wide Web Consortium's Web Content Accessibility Guidelines 2.0 Level AA (WCAG 2.0 AA).
                </p>
                <p className="text-lg leading-relaxed">
                  While the industry is not operating from approved, regulated legislation, Kinship Landing is committed to our good faith effort to follow guidelines that are available and making every effort to go beyond the minimum level of accessibility wherever we can.
                </p>
              </div>

              {/* Contact for Issues */}
              <div className="p-8 bg-kinship-sage/10 border-l-4" style={{ borderColor: '#667C58' }}>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Found an Accessibility Issue?
                </h3>
                <p className="text-lg leading-relaxed mb-4">
                  If you have questions, concerns or have discovered an accessibility issue on our site, please contact us by emailing{' '}
                  <a
                    href="mailto:hello@kinshiplanding.com"
                    className="underline hover:brightness-110 transition-colors font-semibold"
                    style={{ color: '#667C58' }}
                  >
                    hello@kinshiplanding.com
                  </a>
                  . Please include specifics and any page where an issue has occurred. We will make every reasonable effort to make the page accessible for you.
                </p>
              </div>

              {/* ADA Compliance */}
              <div>
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Americans with Disability Act (ADA)
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Our Downtown Colorado Springs hotel offers accessible features throughout, such as accessible guestrooms in our three different room types and accessible entrances to most spaces.
                </p>

                <h3
                  className="text-2xl font-bold mb-4 mt-8"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Accessible Room Amenities
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="block w-2 h-2 mt-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: '#849e74' }} />
                    <span>40" flat-screen TV in private rooms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="block w-2 h-2 mt-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: '#849e74' }} />
                    <span>49" flat-screen TV in suites</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="block w-2 h-2 mt-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: '#849e74' }} />
                    <span>Accessible entry/exits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="block w-2 h-2 mt-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: '#849e74' }} />
                    <span>Electronically keyed lockers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="block w-2 h-2 mt-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: '#849e74' }} />
                    <span>ADA showers with transfer seat</span>
                  </li>
                </ul>
              </div>

              {/* Contact Section */}
              <div className="mt-12 p-8 bg-kinship-sage/10">
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Questions About Accessibility?
                </h3>
                <p className="mb-4 text-lg">
                  If you have specific accessibility needs or questions about our facilities, please contact us:
                </p>
                <div className="space-y-2 text-lg">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a
                      href="mailto:hello@kinshiplanding.com"
                      className="underline hover:brightness-110 transition-colors"
                      style={{ color: '#667C58' }}
                    >
                      hello@kinshiplanding.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a
                      href="tel:+17192039309"
                      className="underline hover:brightness-110 transition-colors"
                      style={{ color: '#667C58' }}
                    >
                      (719) 203-9309
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </ScrollEffectsWrapper>
  );
}
