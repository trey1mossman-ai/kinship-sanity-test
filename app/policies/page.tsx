import { Metadata } from 'next';
import Link from 'next/link';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { Footer } from '@/components/Footer';
import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';
import { getPoliciesPage, PolicySection } from '@/lib/sanity/queries';

// Default policy sections (fallbacks)
const defaultPolicies: PolicySection[] = [
  {
    _key: 'check-in',
    title: 'Check-in + Check-out',
    content: '',
    bulletPoints: [
      'Check-In: 4:00 PM',
      'Check-Out: 10:00 AM',
      'Late Check-Out Hour: 11:00 AM',
      'Late check-out (after 10:00 AM and before 11:00 AM) may result in a $10 fee.'
    ]
  },
  {
    _key: 'pricing',
    title: 'Pricing',
    content: 'Room and bed rates are nightly and based on occupancies described in the room types visible when booking. All room rates include at least double occupancies (2 adults) and two children under age 2. Taxes and fees are subject to change, are not displayed in the room rate, and will be applied to the total booking amount at checkout.'
  },
  {
    _key: 'smoking',
    title: 'Smoking and Alcohol',
    content: 'You must be 21 years of age to drink alcohol on property. Drinking is allowed, drunkenness is not. Consumption of outside alcohol on the property is prohibited.\n\nKinship Landing is a non-smoking property. An additional $500 cleaning fee will automatically be applied to any room that has been smoked in. Public areas where smoking is allowed are nearby.\n\nMarijuana is not tolerated on the premises, but we will gladly point you in the right direction. #coloradomountainhigh'
  },
  {
    _key: 'pets',
    title: 'Pets',
    content: "Up to two dogs under 80lbs each may be added to your booking for an additional $49/night fee. Check for the pet-friendly icon when booking dog-friendly Jr. Queen rooms, each on the pet-friendly second floor. Due to allergies, cats are not allowed on property. If you have other types of pets you wish to bring, contact us before booking. We've always wanted to host a flying squirrel. Please request a copy of our pet policy for more info.\n\nEmotional support animals (ESA's) are not covered under the ADA as certified service animals. All guests with ESA's are welcome to stay in one of our pet-friendly second floor Jr. Queen Suites for a $49/night fee. All pet-friendly rooms are subject to availability."
  },
  {
    _key: 'parking',
    title: 'Parking and Dropoff',
    content: 'On-site overnight parking is available for overnight guests for $18.99 plus a $0.99 service fee for up to 24 hours, including in and out privileges. We reserve select spaces for overnight guests, so please look for the signs indicating those spots when you pull in.\n\nWe have partnered with Metropolis to manage our parking lot. To park on site, you will need to create a Metropolis user account, which we recommend you do in advance of your arrival. When you arrive at Kinship, please scan the QR code posted in the parking lot to begin your session.\n\nThe hotel is not responsible for theft or damage to vehicles or contents of vehicles parked on site nor in nearby public parking areas. Street parking is available around the building on Nevada Avenue and Costilla Street, with meters costing $1-1.50 per hour. City parking garages are located at 130 S Nevada Ave., 120 E Kiowa St., and 117 N Nevada Ave.'
  },
  {
    _key: 'events',
    title: 'Events',
    content: 'Please contact us at events@kinshiplanding.com to discuss throwing an epic party at Kinship Landing. See our events page for more information.'
  },
  {
    _key: 'minors',
    title: 'Minors and Children',
    content: 'Reservations by anyone under the age of 18 are not permitted. Minors under age 18 may stay in the hotel with a guardian on property. With the exceptions of shared bunkrooms, children under two are included in booking. The number of children included depends on the room booked. Contact us for more info or if we can help make your stay with children more comfortable.'
  },
  {
    _key: 'locker',
    title: 'Locker Policy',
    content: 'Lockers are available on the main level as well as in all shared bunkrooms. Main Level lockers, some containing charging ports, are available for up to 6 hours at a time unless otherwise arranged. Please see the front desk for access.\n\nAll lockers are property of Kinship Landing. At no time does the property relinquish its exclusive control of lockers which are assigned to its guests for convenience and temporary use. Guests are responsible for any items placed in the lockers and Kinship Landing will not be responsible for the loss or damage of goods under any conditions. Furthermore, guests are prohibited to store any drugs, alcohol, illegal substances, firearms, explosives, chemicals, food or live animals in lockers. Items that are, in the opinion of Kinship Landing, hazardous or could cause a nuisance to the property, staff, or guests may be refused, destroyed or removed at the user\'s expense without the user being entitled to enforce any claim to the items at any time thereafter.\n\nInspection of the interior of lockers may be conducted by Kinship Landing, for any reason at any time, without notice, without guest consent, and without a search warrant. The personal possessions of guests within a Kinship Landing locker may be searched when reasonable suspicion that the search will uncover evidence of a violation of state or federal law or property policy exists. As soon as practical before the search of a locker, notice of the search will be informed to the guest before lockers will be searched unless disclosure would impede an investigation.\n\nAny material left in a locker after the assignment ceases will be removed and secured by Kinship Landing. These items will be stored at the Front Desk for up to 24 hours, after which all unclaimed items will become property of Kinship Landing.'
  },
  {
    _key: 'cancellation',
    title: 'Deposit and Cancellation',
    content: 'The card used to book your reservation will be authorized $50 upon arrival for potential incidentals to include, but not limited to, food and beverage, on-site parking, optional amenities, smoking fees and damages. If incidentals are incurred, payment will be taken upon your departure.\n\nAll cancellations must be made by contacting us directly by phone or email at 719-203-9309 or stay@kinshiplanding.com.\n\nIndividual reservations which are part of a group contract, reservations booked with a nonrefundable promotion and some other reservation types, a full refund will be honored for cancellations made at least 48 hours prior to check in time. Cancellations within 48 hours of check in will be charged one night\'s stay plus any associated fees and taxes. Reservations made with a non refundable promotion may be cancelled but may not be refunded. Reservations made as part of a group reservation, room block, using a promo code or group code, and some specials, discounts, and event reservations may be subject to alternate cancellation policies per contract or promotion policy.',
    bulletPoints: [
      '0% Due - 180+ days before check-in',
      '20% Due - 90-179 days before check-in',
      '40% Due - 60-89 days before check-in',
      '60% Due - 30-59 days before check-in',
      '100% Due - 0-29 days before check-in'
    ],
    isHighlighted: true
  }
];

const defaultContent = {
  heroTitle: 'Hotel Policies',
  heroSubtitle: 'While our hotel policies are thoughtfully implemented, if there is a safe and responsible way to work together to make your stay that much more comfortable and enjoyable, please do not hesitate to reach out to us. We love finding solutions to meet your needs!',
  contactTitle: 'Questions About Our Policies?',
  contactText: "If you have questions or need clarification about any of our policies, we're here to help:",
  contactEmail: 'hello@kinshiplanding.com',
  contactPhone: '(719) 203-9309'
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPoliciesPage();

  return {
    title: data?.seoTitle || 'Hotel Policies | Kinship Landing',
    description: data?.seoDescription || 'Review hotel policies including check-in, check-out, parking, pets, cancellations and more at Kinship Landing in Colorado Springs.',
    alternates: {
      canonical: 'https://www.kinshiplanding.com/policies',
    },
  };
}

export default async function PoliciesPage() {
  const data = await getPoliciesPage();

  // Use Sanity data with fallbacks
  const heroTitle = data?.heroTitle || defaultContent.heroTitle;
  const heroSubtitle = data?.heroSubtitle || defaultContent.heroSubtitle;
  const policies = data?.policies && data.policies.length > 0 ? data.policies : defaultPolicies;
  const contactTitle = data?.contactTitle || defaultContent.contactTitle;
  const contactText = data?.contactText || defaultContent.contactText;
  const contactEmail = data?.contactEmail || defaultContent.contactEmail;
  const contactPhone = data?.contactPhone || defaultContent.contactPhone;

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
              {heroTitle}
            </h1>
            <p
              className="text-lg md:text-xl max-w-3xl mx-auto"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58',
                opacity: 0.8
              }}
            >
              {heroSubtitle}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="space-y-12"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58'
              }}
            >
              {policies.map((policy) => (
                <div
                  key={policy._key}
                  id={policy._key === 'parking' ? 'parking' : undefined}
                  className={`border-l-4 pl-6 ${policy._key === 'parking' ? 'scroll-mt-20' : ''} ${
                    policy.isHighlighted ? 'bg-kinship-sage/5 p-6 -ml-6' : ''
                  }`}
                  style={{ borderColor: policy.isHighlighted ? '#667C58' : '#849e74' }}
                >
                  <h2
                    className="text-3xl font-bold mb-4"
                    style={{
                      fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                      color: '#667C58'
                    }}
                  >
                    {policy.title}
                  </h2>

                  {/* Render content paragraphs */}
                  {policy.content && (
                    <div className="space-y-4 text-lg leading-relaxed">
                      {policy.content.split('\n\n').map((paragraph, idx) => {
                        // Handle special cases for links
                        if (policy._key === 'events' && paragraph.includes('events@kinshiplanding.com')) {
                          return (
                            <p key={idx}>
                              Please contact us at{' '}
                              <a
                                href="mailto:events@kinshiplanding.com"
                                className="underline hover:brightness-110 transition-colors font-semibold"
                                style={{ color: '#667C58' }}
                              >
                                events@kinshiplanding.com
                              </a>{' '}
                              to discuss throwing an epic party at Kinship Landing. See our{' '}
                              <Link
                                href="/events"
                                className="underline hover:brightness-110 transition-colors font-semibold"
                                style={{ color: '#667C58' }}
                              >
                                events page
                              </Link>{' '}
                              for more information.
                            </p>
                          );
                        }
                        if (policy._key === 'cancellation' && paragraph.includes('stay@kinshiplanding.com')) {
                          return (
                            <p key={idx} className="font-semibold">
                              All cancellations must be made by contacting us directly by phone or email at{' '}
                              <a
                                href="tel:+17192039309"
                                className="underline hover:brightness-110 transition-colors"
                                style={{ color: '#667C58' }}
                              >
                                719-203-9309
                              </a>{' '}
                              or{' '}
                              <a
                                href="mailto:stay@kinshiplanding.com"
                                className="underline hover:brightness-110 transition-colors"
                                style={{ color: '#667C58' }}
                              >
                                stay@kinshiplanding.com
                              </a>
                              .
                            </p>
                          );
                        }
                        return <p key={idx}>{paragraph}</p>;
                      })}
                    </div>
                  )}

                  {/* Render bullet points if present */}
                  {policy.bulletPoints && policy.bulletPoints.length > 0 && (
                    <ul className={`space-y-2 text-lg ${policy.content ? 'mt-4' : ''}`}>
                      {policy.bulletPoints.map((point, idx) => {
                        // Check if it's a key-value format like "Check-In: 4:00 PM"
                        const colonIndex = point.indexOf(':');
                        if (colonIndex > 0 && colonIndex < 30) {
                          const label = point.substring(0, colonIndex);
                          const value = point.substring(colonIndex + 1).trim();
                          // If it contains "Due -" it's a cancellation bullet
                          if (point.includes('Due -')) {
                            return (
                              <li key={idx} className="ml-6">
                                <strong>{label}:</strong> {value}
                              </li>
                            );
                          }
                          return (
                            <li key={idx}>
                              <strong>{label}:</strong> {value}
                            </li>
                          );
                        }
                        return (
                          <li key={idx} className="text-base opacity-80">
                            {point}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {/* Special section for cancellation room drops */}
                  {policy._key === 'cancellation' && (
                    <>
                      <h3
                        className="text-2xl font-bold mt-6 mb-3"
                        style={{
                          fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                          color: '#667C58'
                        }}
                      >
                        Individual Room Drops/Cancellation:
                      </h3>
                      <p className="text-lg leading-relaxed mb-4">
                        Individually dropped/released/cancelled rooms in your group reservation will be charged to the card on file as a percentage of the cost of the room. If your group reservation has dropped below 50% of the originally agreed upon rooms, you will be subject to the full group reservation cancellation policy shown above.
                      </p>
                    </>
                  )}
                </div>
              ))}

              {/* Contact Section */}
              <div className="mt-12 p-8 bg-kinship-sage/10 border-l-4" style={{ borderColor: '#667C58' }}>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  {contactTitle}
                </h3>
                <p className="mb-4 text-lg">
                  {contactText}
                </p>
                <div className="space-y-2 text-lg">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a
                      href={`mailto:${contactEmail}`}
                      className="underline hover:brightness-110 transition-colors"
                      style={{ color: '#667C58' }}
                    >
                      {contactEmail}
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a
                      href={`tel:${contactPhone.replace(/\D/g, '')}`}
                      className="underline hover:brightness-110 transition-colors"
                      style={{ color: '#667C58' }}
                    >
                      {contactPhone}
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
