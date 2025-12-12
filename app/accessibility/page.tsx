import { Metadata } from 'next';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { Footer } from '@/components/Footer';
import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';
import { getAccessibilityPage } from '@/lib/sanity/queries';

// Default content (fallbacks)
const defaultContent = {
  heroTitle: 'Accessibility',
  heroSubtitle: 'Making our hotel and website accessible to everyone',
  websiteTitle: 'Website Accessibility',
  websiteParagraph1: "At Kinship Landing, it's important to us that our website and property is accessible and easy to use for all persons of varying abilities. When creating our website, our development team used software tools to identify web accessibility standards as outlined by the World Wide Web Consortium's Web Content Accessibility Guidelines 2.0 Level AA (WCAG 2.0 AA).",
  websiteParagraph2: "While the industry is not operating from approved, regulated legislation, Kinship Landing is committed to our good faith effort to follow guidelines that are available and making every effort to go beyond the minimum level of accessibility wherever we can.",
  issueTitle: 'Found an Accessibility Issue?',
  issueText: 'If you have questions, concerns or have discovered an accessibility issue on our site, please contact us by emailing hello@kinshiplanding.com. Please include specifics and any page where an issue has occurred. We will make every reasonable effort to make the page accessible for you.',
  adaTitle: 'Americans with Disability Act (ADA)',
  adaIntro: 'Our Downtown Colorado Springs hotel offers accessible features throughout, such as accessible guestrooms in our three different room types and accessible entrances to most spaces.',
  amenitiesTitle: 'Accessible Room Amenities',
  amenities: [
    '40" flat-screen TV in private rooms',
    '49" flat-screen TV in suites',
    'Accessible entry/exits',
    'Electronically keyed lockers',
    'ADA showers with transfer seat'
  ],
  contactTitle: 'Questions About Accessibility?',
  contactText: 'If you have specific accessibility needs or questions about our facilities, please contact us:',
  contactEmail: 'hello@kinshiplanding.com',
  contactPhone: '(719) 203-9309'
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAccessibilityPage();

  return {
    title: data?.seoTitle || 'Accessibility | Kinship Landing',
    description: data?.seoDescription || 'Learn about accessibility features and accommodations at Kinship Landing boutique hotel in Colorado Springs.',
  };
}

export default async function AccessibilityPage() {
  const data = await getAccessibilityPage();

  // Merge Sanity data with defaults
  const content = {
    heroTitle: data?.heroTitle || defaultContent.heroTitle,
    heroSubtitle: data?.heroSubtitle || defaultContent.heroSubtitle,
    websiteTitle: data?.websiteTitle || defaultContent.websiteTitle,
    websiteParagraph1: data?.websiteParagraph1 || defaultContent.websiteParagraph1,
    websiteParagraph2: data?.websiteParagraph2 || defaultContent.websiteParagraph2,
    issueTitle: data?.issueTitle || defaultContent.issueTitle,
    issueText: data?.issueText || defaultContent.issueText,
    adaTitle: data?.adaTitle || defaultContent.adaTitle,
    adaIntro: data?.adaIntro || defaultContent.adaIntro,
    amenitiesTitle: data?.amenitiesTitle || defaultContent.amenitiesTitle,
    amenities: data?.amenities || defaultContent.amenities,
    contactTitle: data?.contactTitle || defaultContent.contactTitle,
    contactText: data?.contactText || defaultContent.contactText,
    contactEmail: data?.contactEmail || defaultContent.contactEmail,
    contactPhone: data?.contactPhone || defaultContent.contactPhone
  };

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
              {content.heroTitle}
            </h1>
            <p
              className="text-lg md:text-xl"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58',
                opacity: 0.8
              }}
            >
              {content.heroSubtitle}
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
                  {content.websiteTitle}
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  {content.websiteParagraph1}
                </p>
                <p className="text-lg leading-relaxed">
                  {content.websiteParagraph2}
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
                  {content.issueTitle}
                </h3>
                <p className="text-lg leading-relaxed mb-4">
                  {content.issueText.includes(content.contactEmail) ? (
                    <>
                      {content.issueText.split(content.contactEmail)[0]}
                      <a
                        href={`mailto:${content.contactEmail}`}
                        className="underline hover:brightness-110 transition-colors font-semibold"
                        style={{ color: '#667C58' }}
                      >
                        {content.contactEmail}
                      </a>
                      {content.issueText.split(content.contactEmail)[1]}
                    </>
                  ) : (
                    content.issueText
                  )}
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
                  {content.adaTitle}
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  {content.adaIntro}
                </p>

                <h3
                  className="text-2xl font-bold mb-4 mt-8"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  {content.amenitiesTitle}
                </h3>
                <ul className="space-y-3 text-lg">
                  {content.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="block w-2 h-2 mt-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: '#849e74' }} />
                      <span>{amenity}</span>
                    </li>
                  ))}
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
                  {content.contactTitle}
                </h3>
                <p className="mb-4 text-lg">
                  {content.contactText}
                </p>
                <div className="space-y-2 text-lg">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a
                      href={`mailto:${content.contactEmail}`}
                      className="underline hover:brightness-110 transition-colors"
                      style={{ color: '#667C58' }}
                    >
                      {content.contactEmail}
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a
                      href={`tel:${content.contactPhone.replace(/\D/g, '')}`}
                      className="underline hover:brightness-110 transition-colors"
                      style={{ color: '#667C58' }}
                    >
                      {content.contactPhone}
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
