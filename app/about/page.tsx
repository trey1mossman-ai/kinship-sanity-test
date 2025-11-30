'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';

// Critical above-fold components
import { HeaderNav } from '@/components/layout/HeaderNav';
import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';
import { AboutTestimonials } from '@/components/about/AboutTestimonials';

// Dynamic imports for below-fold components
const Newsletter = dynamic(() => import('@/components/sections/Newsletter').then(mod => ({ default: mod.Newsletter })));
const MapBlock = dynamic(() => import('@/components/home/MapBlock').then(mod => ({ default: mod.MapBlock })));
const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })));
const CallToBook = dynamic(() => import('@/components/CallToBook').then(mod => ({ default: mod.CallToBook })));

export default function AboutPage() {
  const milestones = [
    {
      year: '2019',
      title: 'The Vision',
      description: 'A group of Colorado Springs locals dreamed of creating a place that would connect travelers to authentic local experiences.',
    },
    {
      year: '2020',
      title: 'Historic Renovation',
      description: 'We transformed a historic building in downtown Colorado Springs, preserving its character while creating modern, comfortable spaces.',
    },
    {
      year: '2021',
      title: 'Grand Opening',
      description: 'Kinship Landing opened its doors, welcoming travelers and locals alike to experience outrageous hospitality.',
    },
    {
      year: '2024',
      title: 'Awards & Recognition',
      description: 'Featured in Forbes, Condé Nast Traveler, and USA Today as a must-visit destination in Colorado Springs.',
    },
  ];

  const contactCards = [
    {
      title: 'Call',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      content: '(719) 203-9309',
      link: 'tel:+17192039309',
    },
    {
      title: 'Email',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      content: 'hello@kinshiplanding.com',
      link: 'mailto:hello@kinshiplanding.com',
    },
    {
      title: 'Visit',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      content: '415 S Nevada Ave, Colorado Springs, CO 80903',
      link: 'https://www.google.com/maps/place/415+S+Nevada+Ave,+Colorado+Springs,+CO+80903',
    },
  ];

  return (
    <ScrollEffectsWrapper>
      <HeaderNav />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/About/911A2070-2-optimized.webp"
            alt="About Kinship Landing - Crafted by locals, built for adventurers"
            fill
            className="object-cover"
            priority
            quality={75}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            style={{
              fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
              textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 8px',
            }}
          >
            About Kinship Landing
          </h1>
          <AboutTestimonials />
        </div>
      </section>

      <main id="main-content">
        {/* VIDEO SECTION */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="relative w-full overflow-hidden"
              style={{
                paddingBottom: '56.25%', // 16:9 aspect ratio
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              }}
            >
              <iframe
                src="https://player.vimeo.com/video/854855486?badge=0&autopause=0&player_id=0&app_id=58479"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title="Kinship Landing Video"
              />
            </div>
          </div>
        </section>

        {/* THE KINSHIP STORY */}
        <section id="our-story" className="py-16 md:py-20" style={{ backgroundColor: '#EEF0EB' }}>
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12"
              style={{
                fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                color: '#667C58'
              }}
            >
              The Kinship Story
            </h2>
            <div className="space-y-6 text-center">
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: '"europa", "Hind", system-ui, sans-serif',
                  color: '#667C58',
                }}
              >
                Our story began with friendship and adventure. After extended time traveling the world to dozens of countries, sinking our teeth deep into our local community, making lifelong friends, and recognizing a global need for intentional, authentic hospitality, the founding team of three friends landed back home in Colorado Springs with a clear vision: create an awesome place to sleep and the easiest way to find friendship and adventure in Colorado Springs.
              </p>
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: '"europa", "Hind", system-ui, sans-serif',
                  color: '#667C58',
                }}
              >
                Through a values-driven start-up, we are creating a community-powered accommodation concept with courage, trust, adventure, generosity, and community at the helm. Our first endeavor in Colorado Springs is a friendly boutique hotel in the heart of downtown called Kinship Landing, the very first of its kind.
              </p>
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: '"europa", "Hind", system-ui, sans-serif',
                  color: '#667C58',
                }}
              >
                Here, locals and travelers connect to the best of the region's outdoor and cultural resources. We've found that having a place to launch from and land at makes all the difference. Our future vision: a worldwide network of different hospitality concepts, each cherished by the local community and contributing to the global family.
              </p>
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: '"europa", "Hind", system-ui, sans-serif',
                  color: '#667C58',
                }}
              >
                We've all experienced outrageous hospitality at some point - it fills you with a sense of belonging, friendship, and trust. You're not going to find it just anywhere. At Kinship Landing, down-to-earth hospitality provides just what you are hoping for in a place to stay.
              </p>
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: '"europa", "Hind", system-ui, sans-serif',
                  color: '#667C58',
                }}
              >
                You're part of the family. Land here.
              </p>
            </div>
          </div>
        </section>

        {/* OUR VALUES SECTION */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8"
              style={{
                fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                color: '#667C58'
              }}
            >
              Our Values
            </h2>
            <p
              className="text-lg md:text-xl leading-relaxed text-center mb-12 max-w-[800px] mx-auto"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58',
              }}
            >
              We make every decision and live every action through the lens of our values. From design decisions to staff recruitment and training, these values are our compass. We aspire to multiply them in the world and hope you carry them out the door with you when you say, "see ya again soon" at checkout.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Courage */}
              <div
                className="group relative bg-white p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center"
                style={{
                  borderTop: '4px solid #667C58',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                }}
              >
                {/* On-brand number box */}
                <div
                  className="w-12 h-12 flex items-center justify-center text-white font-bold text-xl mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundColor: '#849e74',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  1
                </div>

                <h3
                  className="text-3xl font-bold mb-4 transition-colors duration-300"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Courage
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: '"europa", "Hind", system-ui, sans-serif',
                    color: '#667C58',
                    opacity: 0.85
                  }}
                >
                  We act with integrity and do what is right in the face of challenges.
                </p>

                {/* Elegant bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-2"
                  style={{
                    background: 'linear-gradient(90deg, #849e74 0%, #667C58 100%)'
                  }}
                />
              </div>

              {/* Trust */}
              <div
                className="group relative bg-white p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center"
                style={{
                  borderTop: '4px solid #667C58',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center text-white font-bold text-xl mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundColor: '#849e74',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  2
                </div>

                <h3
                  className="text-3xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Trust
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: '"europa", "Hind", system-ui, sans-serif',
                    color: '#667C58',
                    opacity: 0.85
                  }}
                >
                  We choose to believe people are inherently good.
                </p>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-2"
                  style={{
                    background: 'linear-gradient(90deg, #849e74 0%, #667C58 100%)'
                  }}
                />
              </div>

              {/* Generosity */}
              <div
                className="group relative bg-white p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center"
                style={{
                  borderTop: '4px solid #667C58',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center text-white font-bold text-xl mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundColor: '#849e74',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  3
                </div>

                <h3
                  className="text-3xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Generosity
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: '"europa", "Hind", system-ui, sans-serif',
                    color: '#667C58',
                    opacity: 0.85
                  }}
                >
                  We insist there is more than enough, always, and look for ways to share it.
                </p>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-2"
                  style={{
                    background: 'linear-gradient(90deg, #849e74 0%, #667C58 100%)'
                  }}
                />
              </div>

              {/* Community */}
              <div
                className="group relative bg-white p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center"
                style={{
                  borderTop: '4px solid #667C58',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center text-white font-bold text-xl mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundColor: '#849e74',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  4
                </div>

                <h3
                  className="text-3xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Community
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: '"europa", "Hind", system-ui, sans-serif',
                    color: '#667C58',
                    opacity: 0.85
                  }}
                >
                  We know that we belong together.
                </p>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-2"
                  style={{
                    background: 'linear-gradient(90deg, #849e74 0%, #667C58 100%)'
                  }}
                />
              </div>

              {/* Adventure */}
              <div
                className="group relative bg-white p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center"
                style={{
                  borderTop: '4px solid #667C58',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center text-white font-bold text-xl mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundColor: '#849e74',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  5
                </div>

                <h3
                  className="text-3xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Adventure
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: '"europa", "Hind", system-ui, sans-serif',
                    color: '#667C58',
                    opacity: 0.85
                  }}
                >
                  We seek experiences that encourage us to grow.
                </p>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-2"
                  style={{
                    background: 'linear-gradient(90deg, #849e74 0%, #667C58 100%)'
                  }}
                />
              </div>
            </div>

            {/* Values Image - Interior Detail */}
            <div
              className="relative h-[300px] md:h-[400px] overflow-hidden mt-12 max-w-[1000px] mx-auto"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            >
              <Image
                src="/images/About/WoodWall-SamStarr.webp"
                alt="Kinship Landing interior craftsmanship"
                fill
                className="object-cover"
                quality={75}
                sizes="(max-width: 768px) 100vw, 1000px"
              />
            </div>

            <p
              className="text-lg md:text-xl leading-relaxed text-center mt-12 max-w-[900px] mx-auto"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58',
              }}
            >
              We genuinely hope that everyone who comes in our doors feels free -- free to relax, free to explore, free to dream and plan an exciting Colorado adventure, free to be themselves and feel right at home.
            </p>
          </div>
        </section>

        {/* MISSION SECTION */}
        <section className="py-16 md:py-20" style={{ backgroundColor: '#EEF0EB' }}>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Our Mission
                </h2>
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{
                    fontFamily: '"europa", "Hind", system-ui, sans-serif',
                    color: '#667C58',
                  }}
                >
                  To deliver outrageous hospitality by connecting travelers with authentic Colorado experiences.
                  We believe that the best trips aren't just about where you go—they're about who you meet and
                  the stories you share along the way.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#849e74' }}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold mb-1"
                        style={{
                          fontFamily: '"europa", "Hind", system-ui, sans-serif',
                          color: '#667C58'
                        }}
                      >
                        Local Connection
                      </h3>
                      <p
                        className="text-base"
                        style={{
                          fontFamily: '"europa", "Hind", system-ui, sans-serif',
                          color: '#667C58',
                          opacity: 0.9
                        }}
                      >
                        We're your insider guide to Colorado Springs—from the best hiking trails to hidden local gems.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#849e74' }}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold mb-1"
                        style={{
                          fontFamily: '"europa", "Hind", system-ui, sans-serif',
                          color: '#667C58'
                        }}
                      >
                        Adventure Ready
                      </h3>
                      <p
                        className="text-base"
                        style={{
                          fontFamily: '"europa", "Hind", system-ui, sans-serif',
                          color: '#667C58',
                          opacity: 0.9
                        }}
                      >
                        Your basecamp for exploring Garden of the Gods, Pikes Peak, and everything in between.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#849e74' }}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold mb-1"
                        style={{
                          fontFamily: '"europa", "Hind", system-ui, sans-serif',
                          color: '#667C58'
                        }}
                      >
                        Community First
                      </h3>
                      <p
                        className="text-base"
                        style={{
                          fontFamily: '"europa", "Hind", system-ui, sans-serif',
                          color: '#667C58',
                          opacity: 0.9
                        }}
                      >
                        A gathering place for travelers and locals alike—because the best experiences happen together.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div
                className="relative h-[400px] md:h-[500px] overflow-hidden order-first md:order-last"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              >
                <Image
                  src="/images/About/Greenhaus-CampDeckAdventure-SamStarrMedia.webp"
                  alt="Outdoor adventure space at Kinship Landing"
                  fill
                  className="object-cover"
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12"
              style={{
                fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                color: '#667C58'
              }}
            >
              Our Journey
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone) => (
                <div
                  key={milestone.year}
                  className="border-2 p-6 transition-all duration-300 hover:shadow-lg"
                  style={{
                    borderColor: '#667C58',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  <div
                    className="text-4xl font-bold mb-3"
                    style={{
                      fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                      color: '#849e74'
                    }}
                  >
                    {milestone.year}
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      fontFamily: '"europa", "Hind", system-ui, sans-serif',
                      color: '#667C58'
                    }}
                  >
                    {milestone.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: '"europa", "Hind", system-ui, sans-serif',
                      color: '#667C58',
                      opacity: 0.9
                    }}
                  >
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-16 md:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              style={{
                fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                color: '#667C58'
              }}
            >
              Get in Touch
            </h2>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
              {contactCards.map((card) => (
                <a
                  key={card.title}
                  href={card.link}
                  target={card.title === 'Visit' ? '_blank' : undefined}
                  rel={card.title === 'Visit' ? 'noopener noreferrer' : undefined}
                  className="group border-2 p-8 text-center transition-all duration-300 hover:shadow-xl bg-white"
                  style={{
                    borderColor: '#667C58',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: '#849e74' }}
                  >
                    {card.icon}
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{
                      fontFamily: '"europa", "Hind", system-ui, sans-serif',
                      color: '#667C58'
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-base"
                    style={{
                      fontFamily: '"europa", "Hind", system-ui, sans-serif',
                      color: '#667C58',
                      opacity: 0.9
                    }}
                  >
                    {card.content}
                  </p>
                </a>
              ))}
            </div>

          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />

        {/* Map */}
        <MapBlock />
      </main>

      <Footer />

      {/* Sticky Buttons */}
      <CallToBook />
    </ScrollEffectsWrapper>
  );
}
