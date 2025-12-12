import { Metadata } from 'next';
import Image from 'next/image';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { Footer } from '@/components/Footer';
import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';
import { getCareersPage, WhyJoinReason } from '@/lib/sanity/queries';

// Default content (fallbacks)
const defaultWhyJoinReasons: WhyJoinReason[] = [
  {
    _key: 'work-life-balance',
    title: 'Work Life Balance',
    description: "At Kinship Landing, we know that life is all about the adventure. That's why we prioritize a work-life balance for our staff, at all levels of the organization. We work to live, not live to work. From Paid Volunteer days for hotel team members to hotel discounts for Homa employees - we are always finding fun ways to make sure that you're able to enjoy your life and your work. Join the Kinship Landing fam and let's create outrageous hospitality and embark on the amazing adventures ahead!"
  },
  {
    _key: 'service-minded',
    title: 'Service Minded',
    description: "Here at Kinship, we're deeply passionate about outrageous hospitality. We're on a mission to experience the fullness of life through hospitality, friendship, and adventure. Our guests are our priority. We strive to make their travels and stay better in every way that we can."
  },
  {
    _key: 'diversity-inclusion',
    title: 'Diversity & Inclusion',
    description: "We value, respect and support all types of diversity across all identities including, but not limited to LGBTQIA+, race, ethnicity, gender, religion, age and abilities. We've created a community that makes everyone feel welcome, seen and heard. Our company exists to help everyone have the best possible trip to Colorado Springs. We're looking for team members who can add value to these spaces, serve our people like their own and care deeply about their enjoyment."
  },
  {
    _key: 'career-path',
    title: 'A Career Path',
    description: "We're always brainstorming and implementing new ideas that will best serve our guests. Although we'll expect you to adhere to the roles, responsibilities and systems that enable Kinship to run smoothly, your creativity and initiative will always be welcome and rewarded. Once you've mastered the basics, there are plenty of ways you can move up and around within the company."
  }
];

const defaultBenefits = [
  'Hotel & Restaurant Discounts',
  'Paid Volunteer days for hotel team members',
  'Transferable skills',
  'Professional certification trainings',
  'Adventure credits for hotel team members'
];

const defaultContent = {
  heroTitle: "Let's Work Together!",
  heroSubtitle: 'Careers at Kinship Landing & Homa Cafe and Bar',
  heroImage: '/images/events-page/Gatherings/kinship-119.webp',
  introTitle: 'Ready for outrageous hospitality?!',
  introText: 'Do you crave the freedom to use your hospitality superpowers to make a lasting impact? We are a values-driven startup that is fueled by courage, trust, generosity, community and adventure.',
  whyJoinTitle: 'Why Join our Team',
  benefitsTitle: 'Other Benefits Include',
  ctaTitle: 'Ready to Join Us?',
  ctaText: 'Browse our current openings and take the first step toward your next adventure.',
  ctaButtonText: 'View Open Positions',
  ctaButtonUrl: 'https://imprinthospitality.hrmdirect.com/employment/job-openings.php?search=true&'
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCareersPage();

  return {
    title: data?.seoTitle || 'Careers | Kinship Landing',
    description: data?.seoDescription || 'Join the Kinship Landing team in Colorado Springs. Work-life balance, career growth, and outrageous hospitality await.',
  };
}

export default async function CareersPage() {
  const careersData = await getCareersPage();

  // Use Sanity data with fallbacks
  const heroTitle = careersData?.heroTitle || defaultContent.heroTitle;
  const heroSubtitle = careersData?.heroSubtitle || defaultContent.heroSubtitle;
  const heroImage = careersData?.heroImageUrl || defaultContent.heroImage;
  const introTitle = careersData?.introTitle || defaultContent.introTitle;
  const introText = careersData?.introText || defaultContent.introText;
  const whyJoinTitle = careersData?.whyJoinTitle || defaultContent.whyJoinTitle;
  const whyJoinReasons = careersData?.whyJoinReasons && careersData.whyJoinReasons.length > 0
    ? careersData.whyJoinReasons
    : defaultWhyJoinReasons;
  const benefitsTitle = careersData?.benefitsTitle || defaultContent.benefitsTitle;
  const benefitsList = careersData?.benefitsList && careersData.benefitsList.length > 0
    ? careersData.benefitsList
    : defaultBenefits;
  const ctaTitle = careersData?.ctaTitle || defaultContent.ctaTitle;
  const ctaText = careersData?.ctaText || defaultContent.ctaText;
  const ctaButtonText = careersData?.ctaButtonText || defaultContent.ctaButtonText;
  const ctaButtonUrl = careersData?.ctaButtonUrl || defaultContent.ctaButtonUrl;

  return (
    <ScrollEffectsWrapper>
      <HeaderNav />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="Join the Kinship Landing team"
              fill
              className="object-cover"
              priority
              quality={75}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
              style={{
                fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 8px',
              }}
            >
              {heroTitle}
            </h1>
            <p
              className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                textShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px'
              }}
            >
              {heroSubtitle}
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 md:py-20 bg-kinship-sage/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{
                fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                color: '#667C58'
              }}
            >
              {introTitle}
            </h2>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58'
              }}
            >
              {introText}
            </p>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              style={{
                fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                color: '#667C58'
              }}
            >
              {whyJoinTitle}
            </h2>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {whyJoinReasons.map((reason) => (
                <div key={reason._key} className="bg-white p-8 border-l-4" style={{ borderColor: '#849e74' }}>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{
                      fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                      color: '#667C58'
                    }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
                    style={{
                      fontFamily: '"europa", "Hind", system-ui, sans-serif',
                      color: '#667C58',
                      opacity: 0.9
                    }}
                  >
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 bg-kinship-sage/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-8"
              style={{
                fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                color: '#667C58'
              }}
            >
              {benefitsTitle}
            </h2>
            <ul
              className="grid md:grid-cols-2 gap-4 text-lg"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58'
              }}
            >
              {benefitsList.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="block w-2 h-2 mt-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: '#849e74' }} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{
                fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                color: '#667C58'
              }}
            >
              {ctaTitle}
            </h2>
            <p
              className="text-lg md:text-xl leading-relaxed mb-8"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58'
              }}
            >
              {ctaText}
            </p>
            <a
              href={ctaButtonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 text-white font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0"
              style={{
                backgroundColor: '#849e74',
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              }}
            >
              {ctaButtonText}
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </ScrollEffectsWrapper>
  );
}
