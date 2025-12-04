import { Metadata } from 'next';
import Image from 'next/image';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { Footer } from '@/components/Footer';
import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';
import { getCareersPage } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Careers | Kinship Landing',
  description: 'Join the Kinship Landing team in Colorado Springs. Work-life balance, career growth, and outrageous hospitality await.',
};

export default async function CareersPage() {
  const careersData = await getCareersPage();

  // Use Sanity data with fallbacks
  const heroTitle = careersData?.heroTitle || "Let's Work Together!";
  const heroSubtitle = careersData?.heroSubtitle || 'Careers at Kinship Landing & Homa Cafe and Bar';
  const introText = careersData?.introText || 'Do you crave the freedom to use your hospitality superpowers to make a lasting impact? We are a values-driven startup that is fueled by courage, trust, generosity, community and adventure.';

  return (
    <ScrollEffectsWrapper>
      <HeaderNav />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/events-page/Gatherings/kinship-119.webp"
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
              Ready for outrageous hospitality?!
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
              Why Join our Team
            </h2>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Work Life Balance */}
              <div className="bg-white p-8 border-l-4" style={{ borderColor: '#849e74' }}>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Work Life Balance
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{
                    fontFamily: '"europa", "Hind", system-ui, sans-serif',
                    color: '#667C58',
                    opacity: 0.9
                  }}
                >
                  At Kinship Landing, we know that life is all about the adventure. That's why we prioritize a work-life balance for our staff, at all levels of the organization. We work to live, not live to work. From Paid Volunteer days for hotel team members to hotel discounts for Homa employees - we are always finding fun ways to make sure that you're able to enjoy your life and your work. Join the Kinship Landing fam and let's create outrageous hospitality and embark on the amazing adventures ahead!
                </p>
              </div>

              {/* Service Minded */}
              <div className="bg-white p-8 border-l-4" style={{ borderColor: '#849e74' }}>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Service Minded
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{
                    fontFamily: '"europa", "Hind", system-ui, sans-serif',
                    color: '#667C58',
                    opacity: 0.9
                  }}
                >
                  Here at Kinship, we're deeply passionate about outrageous hospitality. We're on a mission to experience the fullness of life through hospitality, friendship, and adventure. Our guests are our priority. We strive to make their travels and stay better in every way that we can.
                </p>
              </div>

              {/* Diversity & Inclusion */}
              <div className="bg-white p-8 border-l-4" style={{ borderColor: '#849e74' }}>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Diversity & Inclusion
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{
                    fontFamily: '"europa", "Hind", system-ui, sans-serif',
                    color: '#667C58',
                    opacity: 0.9
                  }}
                >
                  We value, respect and support all types of diversity across all identities including, but not limited to LGBTQIA+, race, ethnicity, gender, religion, age and abilities. We've created a community that makes everyone feel welcome, seen and heard. Our company exists to help everyone have the best possible trip to Colorado Springs. We're looking for team members who can add value to these spaces, serve our people like their own and care deeply about their enjoyment.
                </p>
              </div>

              {/* A Career Path */}
              <div className="bg-white p-8 border-l-4" style={{ borderColor: '#849e74' }}>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  A Career Path
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{
                    fontFamily: '"europa", "Hind", system-ui, sans-serif',
                    color: '#667C58',
                    opacity: 0.9
                  }}
                >
                  We're always brainstorming and implementing new ideas that will best serve our guests. Although we'll expect you to adhere to the roles, responsibilities and systems that enable Kinship to run smoothly, your creativity and initiative will always be welcome and rewarded. Once you've mastered the basics, there are plenty of ways you can move up and around within the company.
                </p>
              </div>
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
              Other Benefits Include
            </h2>
            <ul
              className="grid md:grid-cols-2 gap-4 text-lg"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58'
              }}
            >
              <li className="flex items-start gap-3">
                <span className="block w-2 h-2 mt-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: '#849e74' }} />
                <span>Hotel & Restaurant Discounts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="block w-2 h-2 mt-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: '#849e74' }} />
                <span>Paid Volunteer days for hotel team members</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="block w-2 h-2 mt-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: '#849e74' }} />
                <span>Transferable skills</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="block w-2 h-2 mt-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: '#849e74' }} />
                <span>Professional certification trainings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="block w-2 h-2 mt-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: '#849e74' }} />
                <span>Adventure credits for hotel team members</span>
              </li>
            </ul>
          </div>
        </section>

      </main>

      <Footer />
    </ScrollEffectsWrapper>
  );
}
