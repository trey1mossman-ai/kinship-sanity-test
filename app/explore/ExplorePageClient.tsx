'use client';

import { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { Wine, Music, UtensilsCrossed, Coffee, Cake, Leaf } from 'lucide-react';

// Critical above-fold components
import { HeaderNav } from '@/components/layout/HeaderNav';
import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';
import { KINSHIP_COLORS, KINSHIP_FONTS } from '@/lib/config/brand';
import { ExplorePage as ExplorePageData } from '@/lib/sanity/queries';

// Filter categories for quick navigation
const EXPLORE_FILTERS = [
  { id: 'speakeasies', label: 'Speakeasies', Icon: Wine },
  { id: 'entertainment', label: 'Entertainment', Icon: Music },
  { id: 'dining', label: 'Eats', Icon: UtensilsCrossed },
  { id: 'coffee', label: 'Coffee', Icon: Coffee },
  { id: 'desserts', label: 'Desserts', Icon: Cake },
  { id: 'wellness', label: 'Wellness', Icon: Leaf },
] as const;

type FilterId = typeof EXPLORE_FILTERS[number]['id'];

// Dynamic imports for below-fold components
const ExploreFAQ = dynamic(() => import('@/components/explore/ExploreFAQ').then(mod => ({ default: mod.ExploreFAQ })));
const Newsletter = dynamic(() => import('@/components/sections/Newsletter').then(mod => ({ default: mod.Newsletter })));
const MapBlock = dynamic(() => import('@/components/home/MapBlock').then(mod => ({ default: mod.MapBlock })));
const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })));
const CallToBook = dynamic(() => import('@/components/CallToBook').then(mod => ({ default: mod.CallToBook })));

interface ExplorePageClientProps {
  exploreData: ExplorePageData | null;
}

// Default data arrays for fallback
const defaultSpeakeasies = [
  {
    name: 'Rabbit Hole',
    description: 'Take the subway steps down to the rabbit hole and be immersed in Alice in Wonderland vibes with delicious wine, cuisine and cocktails.',
    address: '101 N Tejon Street',
    howToFind: 'Look for the subway entrance on N Tejon Street and follow the steps down the rabbit hole.',
    suggestedDrink: 'The famous "White Rabbit"',
    link: 'https://www.rabbitholedinner.com/'
  },
  {
    name: 'Shame and Regret',
    description: 'This alley way retreat has a long history of housing speakeasys. If there wasn\'t a neon sign, you wouldn\'t know this was a bar. Blending into an alley wall, Shame and Regret features 90 American whiskeys, 90 scotch whiskeys and bold craft cocktails.',
    address: '15 E Bijou Street, Suite C',
    howToFind: 'Find the alley on Bijou street and look for the neon sign!',
    suggestedDrink: 'The Prenup',
    link: 'https://www.shameandregret.com/'
  },
  {
    name: 'Allusion Cocktail Bar',
    description: 'Get ready for a fun experience! This hidden gem is a revolving pop up concept, featuring themes such as Disney, Harry Potter, Alice and Wonderland, and more.',
    address: '323 N Tejon Street',
    howToFind: 'Located behind Rooster\'s House of Ramen.',
    suggestedDrink: 'Definitely a themed drink!',
    link: 'https://www.allusionbar.com/'
  },
  {
    name: 'The Archives',
    description: 'Founded by a group of hospitality professionals, this underground cocktail bar features late-night food and classic/modern cocktails.',
    address: '15 S Tejon Street',
    howToFind: 'Located downstairs inside of Colorado Craft.',
    suggestedDrink: 'A Martini definitely fits the underground vibe.',
    link: 'http://www.thearchivescos.com/'
  }
];

const defaultEntertainment = {
  liveMusic: [
      {
        name: 'Lulu\'s Live Music and Bar',
        description: 'Located in Downtown Colorado Springs (just a few blocks away!), Lulu\'s is your go-to spot for cocktails, beer and music. With a fun atmosphere and a full calendar, there\'s plenty of entertainment to enjoy here.'
      },
      {
        name: 'Boot Barn Hall',
        description: 'Country and bluegrass lovers, rejoice! This 15,000 square foot venue features international, national, regional, and local musicians in a barn-style auditorium.'
      },
      {
        name: 'The Black Sheep',
        description: 'An intimate venue meets a "punk rock" vibe on the east side of the city. The venue has hosted everyone from Imagine Dragons to local Colorado Springs bands.'
      }
    ],
    performingArts: [
      {
        name: 'Pikes Peak Center for the Performing Arts',
        description: 'The Pikes Peak Center is a concert venue in Colorado Springs that hosts everything from cultural performances to Broadway shows.'
      },
      {
        name: 'Fine Arts Center',
        description: 'This museum at Colorado College provides local exhibits, as well as many monthly theater happenings.'
      },
      {
        name: 'ENT Center for the Arts',
        description: 'Part of the University of Colorado, Colorado Springs, ENT Center for the Arts has a wide variety of plays and performances by local students.'
      },
      {
        name: 'Millibo Art Theatre',
        description: 'The Millibo Art Theatre (originally the Manitou Art Theatre) was founded to provide new and original live performances in an intimate, accessible theatre for audiences of all ages in the Pikes Peak region. Don\'t miss their Circus shows!'
      }
    ],
    comedy: [
      {
        name: 'Loonees Comedy Corner',
        description: 'A small, locally-owned comedy club, Loonees hosts touring stand-up comics and open mic nights.'
      }
    ],
    artClasses: [
      {
        name: 'Cottonwood Center for the Arts',
        description: 'Cottonwood has a variety of classes such as pottery, painting, watercolor, digital art, and writing - all offered at an adult or youth level.'
      },
      {
        name: 'Painting with a Twist',
        description: 'Painting with a Twist offers a unique experience where you\'re able to sip on wine and paint your own masterpiece - no artistic skills required!'
      }
    ],
    cooking: [
      {
        name: 'Gather Food Studio & Spice Shop',
        description: 'Located in Old Colorado City, gather with your friends and family and make a meal around the table with other like-minded folks.'
      },
      {
        name: 'The French Kitchen',
        description: 'This local bakery also provides individual adult cooking classes, kids\' skills classes, and private events.'
      }
  ]
};

const defaultEatsNearby = [
    {
      name: 'Loyal Coffee',
      distance: '2-minute walk',
      description: 'Loyal Coffee is a barista-owned and operated specialty coffee company based in Colorado Springs, Colorado. They roast and brew coffee they love, for people they love, in the city they love.',
      link: 'https://loyalcoffee.co/'
    },
    {
      name: 'COATI',
      distance: '5-minute walk',
      description: 'COATI is an event and experience venue in Colorado Springs. The industrial-styled building houses 7 independently owned culinary incubator pods which house some of the city\'s best up-and-coming chefs. The space also hosts weekly live music, yoga and other eclectic events.'
    },
    {
      name: 'Cerberus Brewing Company',
      distance: '7-minute bike ride',
      description: 'A great Brewpub located just west of downtown Colorado Springs, CO. The brewery offers fun twists on traditional pub food with 24 taps. Plenty of Cerberus beer on tap, along with occasional guest taps and house-made sodas. Cerberus also has a huge patio, great for pups and yard games.'
    },
    {
      name: 'Historic Old Colorado City',
      distance: '17-minute bike ride',
      description: 'Affectionately referred to as "OCC" by the locals, this charming neighborhood of Colorado Springs features locally-owned shops, restaurants and galleries.',
      link: 'https://goo.gl/maps/AADLcnGhrThBGP9H6',
      linkText: 'Open bike route in Google Maps'
  }
];

const defaultWellness = [
    {
      name: 'SunWater Spa',
      description: 'Year-round cedar soaking tubs in the heart of Manitou Springs, SunWater\'s natural hot tubs use natural Manitou mineral-water. Take in views of Pikes Peak and the Front Range mountain views as you rest and relax in your own little oasis.',
      link: 'https://www.sunwellness.net/'
    },
    {
      name: 'Daily Walks',
      description: 'Garden of the Gods is absolutely stunning in the winter. Wind through red rock formations dusted in snow. We also love Mueller State Park, outside of Woodland Park, CO as there are a ton of trails that range from easy-peasy to heart pumpers.'
    },
    {
      name: 'Yoga in The Springs',
      description: 'Warm up and find your inner calm while building strength and endurance at a yoga class. Cambio Yoga, a donation based yoga studio just outside of downtown Colorado Springs, and Hot Asana provide hot yoga classes to warm you up during those cold January days. Root Center for Yoga is a space dedicated to community and spiritual practices.',
      link: 'https://www.cambioyoga.com/'
    },
    {
      name: 'Massage',
      description: 'A spa day is always a good idea. Let Mateos Day Spa, near Ute Valley Park & other Colorado Springs Gems, take care of you with a massage, nail service, facial or spa package.',
      link: 'https://www.mateosdayspa.com/'
  }
];

const defaultCoffeeShops = [
    {
      name: 'Loyal Coffee',
      distance: '486 feet from Kinship Landing',
      whatToGet: 'Horchata or Cappuccino and any of their toasts',
      link: 'https://loyalcoffee.co/'
    },
    {
      name: 'The Exchange on Tejon',
      distance: '0.2 miles from Kinship Landing',
      whatToGet: 'Coffee flight or cubano and anything from their baked goods shelf',
      link: 'https://theexchangeontejon.com/'
    },
    {
      name: 'Story Coffee Co.',
      distance: '0.7 miles from Kinship Landing',
      whatToGet: 'Vanilla latte and go on Tuesdays for their pop tart tuesday!',
      link: 'https://www.storycoffeecompany.com/'
    },
    {
      name: 'Bird Tree Cafe',
      distance: '0.8 miles from Kinship Landing',
      whatToGet: 'Macchiato or Iced Latte and the Wake n Bacon sandwich',
      link: 'https://www.birdtreecafe.org/'
    },
    {
      name: 'Switchback Coffee Roasters',
      distance: '1.5 miles from Kinship Landing',
      whatToGet: 'Matcha or 50/50 and their avocado toast',
      link: 'https://switchbackroasters.com/'
  }
];

const defaultDesserts = [
    {
      name: 'Josh & John\'s Ice Cream',
      description: 'Churning the best homemade ice cream using local dairy, right in the heart of Downtown Colorado Springs!',
      distance: '0.9 miles from Kinship Landing',
      suggested: 'Purple Mountain Majesty or Moose on the Loose',
      link: 'https://www.joshandjohns.com/'
    },
    {
      name: 'Cacao Chemistry Chocolatier and Patisserie',
      description: 'Satisfy your sweet tooth with not just delicious and beautifully crafted chocolate. Cacao Chemistry using simple ingredients including cacao, sugar, and real vanilla extract to craft each bite-sized piece into an artistic masterpiece.',
      distance: '0.6 miles from Kinship Landing',
      suggested: 'Any of their truffles, or their white chocolate strawberries & cream bark',
      link: 'https://www.cacaochemistry.com/'
    },
    {
      name: 'Provision Bread & Bakery',
      description: 'Scones, cookies, pastries - oh my. New to the Downtown Colorado Springs \'hood, Provision strives for excellence in every loaf or pastry they create by selecting quality ingredients - and it shows. Their cookies are gooey, the pastries are flaky, and the bread melts in your mouth. Plus, it\'s pretty freaking cute on the inside.',
      distance: '0.6 miles from Kinship Landing',
      suggested: 'Caramel apple danish',
      link: 'https://www.provisionbread.com/offerings'
    },
    {
      name: 'Sasquatch Cookies',
      description: 'Fresh-baked, warm cookies made locally here in Colorado Springs! Their 12 signature flavors range from classic chocolate chip to birthday confetti, and are sure to brighten anyone\'s day. Plus, you\'re able add on an option to have your cookies delivered by an actual Sasquatch. Not kidding, fam. Look it up.',
      distance: '3 miles from Kinship Landing',
      suggested: 'Classic Chocolate Chip',
      link: 'https://www.sasquatchcookies.com/'
    },
    {
      name: 'Drive-In Tasty Freeze',
      description: 'Be transported to the 60s with this classic drive-in diner, featuring everything from burgers to dipped cones. Oldies playing on the radio and right next to a bike bath, this mom and pop shop brings all the feels.',
      distance: '2.8 miles from Kinship Landing',
      suggested: 'Chocolate dipped cone',
      link: 'https://www.driveintastyfreeze.com/'
    },
    {
      name: 'Homa Cafe + Bar',
      description: 'Although Homa Cafe + Bar is known for their nutrient-dense sandwiches and flavorful bowls, many don\'t know they also have a killer sweets menu. Menu items range from a flaky, warm apple hand pie to an ice cream sandwich made with 5 different cookie doughs!',
      distance: 'Head to our first floor & satiate that sweet tooth',
      suggested: 'Ice Cream Sandwich or Polenta Cake',
      link: '/homa'
  }
];

export function ExplorePageClient({ exploreData }: ExplorePageClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId | null>(null);

  // Scroll to section when filter is clicked
  const handleFilterClick = (filterId: FilterId) => {
    setActiveFilter(filterId);

    // Map filter IDs to section IDs
    const sectionMap: Record<string, string> = {
      speakeasies: 'speakeasies',
      entertainment: 'entertainment',
      dining: 'dining',
      coffee: 'coffee-section',
      desserts: 'desserts-section',
      wellness: 'wellness-section',
    };

    const sectionId = sectionMap[filterId];
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 100; // Account for sticky header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Use Sanity data with fallbacks
  const heroTitle = exploreData?.heroTitle || 'Explore Colorado Springs';
  const heroSubtitle = exploreData?.heroSubtitle || 'Your local guide to hidden gems, insider adventures, and authentic experiences';
  const introText = exploreData?.introText || 'There are a ton of coffee shops, cocktail joints, places to grab a bite, and entertainment within just a few blocks of Kinship! Grab your buddies and swing by one of our favorite hot spots!';

  // Use Sanity data arrays or defaults
  const speakeasies = exploreData?.speakeasies && exploreData.speakeasies.length > 0
    ? exploreData.speakeasies
    : defaultSpeakeasies;

  const entertainment = {
    liveMusic: exploreData?.liveMusic && exploreData.liveMusic.length > 0
      ? exploreData.liveMusic
      : defaultEntertainment.liveMusic,
    performingArts: exploreData?.performingArts && exploreData.performingArts.length > 0
      ? exploreData.performingArts
      : defaultEntertainment.performingArts,
    comedy: exploreData?.comedy && exploreData.comedy.length > 0
      ? exploreData.comedy
      : defaultEntertainment.comedy,
    artClasses: exploreData?.artClasses && exploreData.artClasses.length > 0
      ? exploreData.artClasses
      : defaultEntertainment.artClasses,
    cooking: exploreData?.cooking && exploreData.cooking.length > 0
      ? exploreData.cooking
      : defaultEntertainment.cooking,
  };

  const eatsNearby = exploreData?.eatsNearby && exploreData.eatsNearby.length > 0
    ? exploreData.eatsNearby
    : defaultEatsNearby;

  const wellness = exploreData?.wellness && exploreData.wellness.length > 0
    ? exploreData.wellness
    : defaultWellness;

  const coffeeShops = exploreData?.coffeeShops && exploreData.coffeeShops.length > 0
    ? exploreData.coffeeShops
    : defaultCoffeeShops;

  const desserts = exploreData?.desserts && exploreData.desserts.length > 0
    ? exploreData.desserts
    : defaultDesserts;

  return (
    <ScrollEffectsWrapper>
      <HeaderNav />

      {/* FAQ Schema Markup */}
      <Script
        id="explore-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What outdoor attractions are near Kinship Landing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nearby outdoor attractions include Garden of the Gods, Pulpit Rock, Rampart Reservoir, and the Manitou Incline. Each offers scenic trails and breathtaking views within minutes of Kinship Landing."
                }
              },
              {
                "@type": "Question",
                "name": "How far is the Great Sand Dunes National Park from Kinship Landing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Great Sand Dunes National Park & Preserve is about a 2 hour 37 minute drive from Kinship Landing. Guests can sled, sandboard, and explore 30 miles of dunes up to 750 feet tall year-round."
                }
              },
              {
                "@type": "Question",
                "name": "Where can I go cliff jumping or white-water rafting near Kinship Landing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Paradise Cove (Guffey Gorge) offers cliff jumping surrounded by waterfalls and rock formations, about an hour away. For rafting, the Royal Gorge provides guided white-water trips ranging from family floats to extreme rapids."
                }
              },
              {
                "@type": "Question",
                "name": "Which hikes around Kinship Landing are suitable for all abilities?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Accessible hikes include Garden of the Gods, Section 16, Rampart Reservoir, and Cheyenne Mountain State Park, each offering trails for a variety of skill levels."
                }
              },
              {
                "@type": "Question",
                "name": "What fall leaf-peeping experiences are nearby?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Guests can enjoy fall colors on the Pikes Peak Cog Railway, Cripple Creek & Victor Railroad, and Royal Gorge Route Railroad, or hike Mueller State Park, Pancake Rocks, The Crags, and Vindicator Valley Trailhead for stunning autumn scenery."
                }
              },
              {
                "@type": "Question",
                "name": "What winter activities are available near Kinship Landing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Winter options include skiing or snowshoeing around Pikes Peak, snowshoeing at Rampart Range or Rainbow Gulch, cross-country skiing at Mueller State Park, and off-roading or dog sledding tours."
                }
              },
              {
                "@type": "Question",
                "name": "Are there hidden speakeasies or bars nearby?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, downtown Colorado Springs has several hidden bars including Rabbit Hole, District E11even, Shame and Regret, Fifty Niner, Allusion Cocktail Bar, The Archives, and The Tipperary Cocktail Parlour—all minutes from Kinship Landing."
                }
              },
              {
                "@type": "Question",
                "name": "What live music or performing arts venues are near Kinship Landing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Guests can visit Lulu's Live Music & Bar, Boot Barn Hall, and The Black Sheep for live shows, or explore performing arts at the Pikes Peak Center, Fine Arts Center, ENT Center for the Arts, and Millibo Art Theatre."
                }
              },
              {
                "@type": "Question",
                "name": "Where can I find great coffee near Kinship Landing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Top nearby coffee shops include Loyal Coffee, The Exchange on Tejon, The Perk Downtown, Story Coffee Co., Bird Tree Café, Switchback Coffee Roasters, and The Wild Goose Meeting House."
                }
              },
              {
                "@type": "Question",
                "name": "What dessert spots are close to the hotel?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Local favorites include Josh & John's Ice Cream, Cacao Chemistry Chocolatier, Provision Bread & Bakery, Sasquatch Cookies, and Drive-In Tasty Freeze."
                }
              },
              {
                "@type": "Question",
                "name": "Are there dog-friendly trails and bars near Kinship Landing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dog-friendly trails include Fox Run, Mount Cutler, Section 16, Rampart Reservoir, Red Rock Canyon, The Crags, and Garden of the Gods Off-Leash Area. Pups are welcome at Homa Café + Bar, Pub Dog Colorado, Goat Patch Brewing, Metric Brewing, Cerberus Brewing, and FH Beerworks."
                }
              },
              {
                "@type": "Question",
                "name": "What unique experiences or tours does Kinship Landing recommend?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Recommended experiences include rafting with Echo Canyon (discount code ECHO10), visiting the U.S. Olympic & Paralympic Museum, and booking guided fly-fishing with Angler's Covey using code KINSHIP."
                }
              },
              {
                "@type": "Question",
                "name": "How can I travel sustainably while staying at Kinship Landing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kinship Landing was designed with sustainability in mind—featuring recycled and locally sourced materials, minimal single-use plastics, and energy-efficient design. Guests are encouraged to walk or bike to nearby attractions and restaurants downtown."
                }
              }
            ]
          })
        }}
      />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={exploreData?.heroImageUrl || "/images/Explore Page/explore-hero-optimized.webp"}
            alt="Explore Colorado Springs"
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
              fontFamily: KINSHIP_FONTS.display,
              textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 8px',
            }}
          >
            {heroTitle}
          </h1>
          <p
            className="text-white font-light text-lg sm:text-xl md:text-2xl leading-relaxed"
            style={{
              fontFamily: KINSHIP_FONTS.body,
              textShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 4px',
            }}
          >
            {heroSubtitle}
          </p>
        </div>
      </section>

      <main id="main-content">
        {/* INTRO BLOCK */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8"
              style={{
                fontFamily: KINSHIP_FONTS.display,
                color: KINSHIP_COLORS.greenDark,
                lineHeight: '1.2'
              }}
            >
              Eat, See, Do
            </h2>
            <p
              className="text-2xl md:text-3xl font-bold mb-8"
              style={{
                fontFamily: KINSHIP_FONTS.display,
                color: KINSHIP_COLORS.green,
                lineHeight: '1.3'
              }}
            >
              Places to Eat, Drink and Do in Downtown Colorado Springs
            </p>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                color: KINSHIP_COLORS.greenDark,
                lineHeight: '1.8'
              }}
            >
              {introText}
            </p>
          </div>
        </section>

        {/* STICKY FILTER BAR */}
        <div
          id="filter-bar"
          className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {EXPLORE_FILTERS.map((filter) => {
                const IconComponent = filter.Icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterClick(filter.id)}
                    className={`
                      inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5
                      text-sm sm:text-base font-semibold transition-all duration-200
                      border-2 hover:shadow-md active:scale-95
                    `}
                    style={{
                      fontFamily: KINSHIP_FONTS.body,
                      backgroundColor: activeFilter === filter.id ? KINSHIP_COLORS.green : 'white',
                      color: activeFilter === filter.id ? 'white' : KINSHIP_COLORS.greenDark,
                      borderColor: activeFilter === filter.id ? KINSHIP_COLORS.green : KINSHIP_COLORS.greenDark,
                    }}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>
            <p
              className="text-center text-sm mt-3 opacity-70"
              style={{ fontFamily: KINSHIP_FONTS.body, color: KINSHIP_COLORS.greenDark }}
            >
              Click a category to jump to that section
            </p>
          </div>
        </div>

        {/* SPEAKEASIES IMAGE BREAK */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src={exploreData?.speakeasiesBreakImageUrl || "/images/Explore Page/speakeasies-break.webp"}
            alt="Hidden speakeasies in Colorado Springs"
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-black/10" />
        </section>

        {/* SPEAKEASIES SECTION */}
        <section id="speakeasies" className="py-20 md:py-28 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-20">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.2'
                }}
              >
                Hidden Gems in Colorado Springs
              </h2>
              <p
                className="text-2xl md:text-3xl font-bold mb-10"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.green,
                  lineHeight: '1.3'
                }}
              >
                Off the beaten path speakeasies
              </p>
              <div className="max-w-[900px] mx-auto space-y-6">
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{
                    fontFamily: KINSHIP_FONTS.body,
                    color: KINSHIP_COLORS.greenDark,
                    lineHeight: '1.8'
                  }}
                >
                  Looking for a different type of "off the beaten path" experience? Trade in your hiking boots for a coupe glass and experience Colorado Springs' speakeasies.
                </p>
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{
                    fontFamily: KINSHIP_FONTS.body,
                    color: KINSHIP_COLORS.greenDark,
                    lineHeight: '1.8'
                  }}
                >
                  It's no wonder that Colorado Springs has so many hidden gems. Founder of Colorado Springs, Civil War hero William J Palmer, outlawed saloons, gambling, and alcohol, resulting in hidden trap doors and rebellious behavior.
                </p>
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{
                    fontFamily: KINSHIP_FONTS.body,
                    color: KINSHIP_COLORS.greenDark,
                    lineHeight: '1.8'
                  }}
                >
                  From an oyster bar to underground subway steps, experience Colorado Springs' history - with a cocktail in hand.
                </p>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {speakeasies.map((place) => (
                <div
                  key={place.name}
                  className="border-2 p-8 md:p-10 transition-all duration-300 hover:shadow-xl bg-white flex flex-col"
                  style={{
                    borderColor: KINSHIP_COLORS.greenDark,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-5"
                    style={{
                      fontFamily: KINSHIP_FONTS.display,
                      color: KINSHIP_COLORS.green,
                      lineHeight: '1.3'
                    }}
                  >
                    {place.name}
                  </h3>
                  <p
                    className="text-base md:text-lg mb-6 leading-relaxed"
                    style={{
                      fontFamily: KINSHIP_FONTS.body,
                      color: KINSHIP_COLORS.greenDark,
                      lineHeight: '1.7'
                    }}
                  >
                    {place.description}
                  </p>
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 flex-grow">
                    <p
                      className="text-sm md:text-base"
                      style={{ fontFamily: KINSHIP_FONTS.body, color: KINSHIP_COLORS.greenDark, lineHeight: '1.6' }}
                    >
                      <span className="font-bold">Address:</span> {place.address}
                    </p>
                    <p
                      className="text-sm md:text-base"
                      style={{ fontFamily: KINSHIP_FONTS.body, color: KINSHIP_COLORS.greenDark, lineHeight: '1.6' }}
                    >
                      <span className="font-bold">How to Find:</span> {place.howToFind}
                    </p>
                    <p
                      className="text-sm md:text-base font-semibold"
                      style={{ fontFamily: KINSHIP_FONTS.body, color: KINSHIP_COLORS.green, lineHeight: '1.6' }}
                    >
                      <span className="font-bold">Suggested Cocktail:</span> {place.suggestedDrink}
                    </p>
                  </div>
                  {place.link && (
                    <a
                      href={place.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-base font-semibold transition-transform duration-300 hover:translate-x-2 mt-auto"
                      style={{ color: KINSHIP_COLORS.green }}
                    >
                      <span>Visit Website</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENTERTAINMENT IMAGE BREAK */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src={exploreData?.entertainmentBreakImageUrl || "/images/Explore Page/entertainment-break.webp"}
            alt="Arts and entertainment in Colorado Springs"
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-black/10" />
        </section>

        {/* ENTERTAINMENT SECTION */}
        <section id="entertainment" className="py-20 md:py-28" style={{ backgroundColor: KINSHIP_COLORS.latte }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-20">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.2'
                }}
              >
                Entertainment in COS
              </h2>
              <p
                className="text-2xl md:text-3xl font-bold mb-10"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.green,
                  lineHeight: '1.3'
                }}
              >
                Theaters, Live Music, Art Classes and More
              </p>
              <p
                className="text-lg md:text-xl leading-relaxed max-w-[900px] mx-auto"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.8'
                }}
              >
                Downtown Colorado Springs is exploding with lots of different entertainment options. From live music to performing arts, we aren't just known for our outdoor recreation! Weekly live music, comedy shows, art classes, cooking classes and more await you.
              </p>
            </div>

            {/* Live Music */}
            <div className="mb-16">
              <h3
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.3'
                }}
              >
                Live Music Venues
              </h3>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {entertainment.liveMusic.map((venue) => (
                  <div
                    key={venue.name}
                    className="border-2 p-7 bg-white transition-all duration-300 hover:shadow-lg"
                    style={{
                      borderColor: KINSHIP_COLORS.greenDark,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                  >
                    <h4
                      className="text-xl md:text-2xl font-bold mb-4"
                      style={{
                        fontFamily: KINSHIP_FONTS.display,
                        color: KINSHIP_COLORS.green,
                        lineHeight: '1.3'
                      }}
                    >
                      {venue.name}
                    </h4>
                    <p
                      className="text-base leading-relaxed"
                      style={{
                        fontFamily: KINSHIP_FONTS.body,
                        color: KINSHIP_COLORS.greenDark,
                        lineHeight: '1.7'
                      }}
                    >
                      {venue.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Performing Arts */}
            <div className="mb-16">
              <h3
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.3'
                }}
              >
                Performing Arts
              </h3>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {entertainment.performingArts.map((venue) => (
                  <div
                    key={venue.name}
                    className="border-2 p-7 bg-white transition-all duration-300 hover:shadow-lg"
                    style={{
                      borderColor: KINSHIP_COLORS.greenDark,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                  >
                    <h4
                      className="text-xl md:text-2xl font-bold mb-4"
                      style={{
                        fontFamily: KINSHIP_FONTS.display,
                        color: KINSHIP_COLORS.green,
                        lineHeight: '1.3'
                      }}
                    >
                      {venue.name}
                    </h4>
                    <p
                      className="text-base leading-relaxed"
                      style={{
                        fontFamily: KINSHIP_FONTS.body,
                        color: KINSHIP_COLORS.greenDark,
                        lineHeight: '1.7'
                      }}
                    >
                      {venue.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comedy Shows & Art Classes */}
            <div className="mb-16">
              <h3
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.3'
                }}
              >
                Comedy Shows & Art Classes
              </h3>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {/* Comedy Show */}
                {entertainment.comedy.map((venue) => (
                  <div
                    key={venue.name}
                    className="border-2 p-7 bg-white transition-all duration-300 hover:shadow-lg"
                    style={{
                      borderColor: KINSHIP_COLORS.greenDark,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                  >
                    <h4
                      className="text-xl md:text-2xl font-bold mb-4"
                      style={{
                        fontFamily: KINSHIP_FONTS.display,
                        color: KINSHIP_COLORS.green,
                        lineHeight: '1.3'
                      }}
                    >
                      {venue.name}
                    </h4>
                    <p
                      className="text-base leading-relaxed"
                      style={{
                        fontFamily: KINSHIP_FONTS.body,
                        color: KINSHIP_COLORS.greenDark,
                        lineHeight: '1.7'
                      }}
                    >
                      {venue.description}
                    </p>
                  </div>
                ))}

                {/* Art Classes */}
                {entertainment.artClasses.map((venue) => (
                  <div
                    key={venue.name}
                    className="border-2 p-7 bg-white transition-all duration-300 hover:shadow-lg"
                    style={{
                      borderColor: KINSHIP_COLORS.greenDark,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                  >
                    <h4
                      className="text-xl md:text-2xl font-bold mb-4"
                      style={{
                        fontFamily: KINSHIP_FONTS.display,
                        color: KINSHIP_COLORS.green,
                        lineHeight: '1.3'
                      }}
                    >
                      {venue.name}
                    </h4>
                    <p
                      className="text-base leading-relaxed"
                      style={{
                        fontFamily: KINSHIP_FONTS.body,
                        color: KINSHIP_COLORS.greenDark,
                        lineHeight: '1.7'
                      }}
                    >
                      {venue.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cooking Classes */}
            <div className="mb-0">
              <h3
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.3'
                }}
              >
                Cooking Classes
              </h3>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {entertainment.cooking.map((venue) => (
                  <div
                    key={venue.name}
                    className="border-2 p-7 bg-white transition-all duration-300 hover:shadow-lg"
                    style={{
                      borderColor: KINSHIP_COLORS.greenDark,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                  >
                    <h4
                      className="text-xl md:text-2xl font-bold mb-4"
                      style={{
                        fontFamily: KINSHIP_FONTS.display,
                        color: KINSHIP_COLORS.green,
                        lineHeight: '1.3'
                      }}
                    >
                      {venue.name}
                    </h4>
                    <p
                      className="text-base leading-relaxed"
                      style={{
                        fontFamily: KINSHIP_FONTS.body,
                        color: KINSHIP_COLORS.greenDark,
                        lineHeight: '1.7'
                      }}
                    >
                      {venue.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FIRST FRIDAY SECTION */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-10"
              style={{
                fontFamily: KINSHIP_FONTS.display,
                color: KINSHIP_COLORS.greenDark,
                lineHeight: '1.2'
              }}
            >
              First Friday
            </h2>
            <p
              className="text-lg md:text-xl leading-relaxed mb-8"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                color: KINSHIP_COLORS.greenDark,
                lineHeight: '1.8'
              }}
            >
              Every first Friday of the month, dozens of venues host local artists and musicians from 5-9pm for a night-full of fun. We are one of these venues, and feel so lucky to be a landing spot for it!
            </p>
            <p
              className="text-lg md:text-xl leading-relaxed italic"
              style={{
                fontFamily: KINSHIP_FONTS.body,
                color: KINSHIP_COLORS.greenDark,
                lineHeight: '1.8'
              }}
            >
              We are so grateful for our amazing local artists in Colorado Springs. Art is such an important part of Kinship culture - we hope it inspires you when you land here.
            </p>
          </div>
        </section>

        {/* EATS IMAGE BREAK */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src={exploreData?.eatsBreakImageUrl || "/images/Explore Page/eats-break.webp"}
            alt="Local restaurants and cafes near Kinship Landing"
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-black/10" />
        </section>

        {/* EATS NEAR KINSHIP SECTION */}
        <section id="dining" className="py-20 md:py-28" style={{ backgroundColor: KINSHIP_COLORS.latte }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 md:mb-20">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-10"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.2'
                }}
              >
                Eats Near Kinship
              </h2>
              <p
                className="text-lg md:text-xl leading-relaxed max-w-[900px] mx-auto"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.8'
                }}
              >
                There are a ton of coffee shops, cocktail joints and places to grab a bite within just a few blocks of Kinship! Grab your buddies and swing by one of our favorite hot spots:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {eatsNearby.map((place) => (
                <div
                  key={place.name}
                  className="border-2 p-8 md:p-10 bg-white transition-all duration-300 hover:shadow-xl flex flex-col"
                  style={{
                    borderColor: KINSHIP_COLORS.greenDark,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <h3
                      className="text-2xl sm:text-3xl font-bold"
                      style={{
                        fontFamily: KINSHIP_FONTS.display,
                        color: KINSHIP_COLORS.green,
                        lineHeight: '1.3'
                      }}
                    >
                      {place.name}
                    </h3>
                    <span
                      className="text-xs font-bold px-3 py-2 whitespace-nowrap ml-4"
                      style={{
                        backgroundColor: KINSHIP_COLORS.green,
                        color: 'white'
                      }}
                    >
                      {place.distance}
                    </span>
                  </div>
                  <p
                    className="text-base md:text-lg leading-relaxed mb-6 flex-grow"
                    style={{
                      fontFamily: KINSHIP_FONTS.body,
                      color: KINSHIP_COLORS.greenDark,
                      lineHeight: '1.7'
                    }}
                  >
                    {place.description}
                  </p>
                  {place.link && (
                    <a
                      href={place.link}
                      target={place.linkText ? "_blank" : undefined}
                      rel={place.linkText ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 font-semibold transition-transform duration-300 hover:translate-x-2 mt-auto"
                      style={{ color: KINSHIP_COLORS.green }}
                    >
                      <span>{place.linkText || 'Visit Website'}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p
                className="text-base md:text-lg font-semibold"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark
                }}
              >
                Make it a bike tour! Rent a bike at the PikeRide Station in front of Loyal Coffee and curate your very own food & beverage tour of Downtown & OCC!
              </p>
            </div>
          </div>
        </section>

        {/* WELLNESS IMAGE BREAK */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src={exploreData?.wellnessBreakImageUrl || "/images/Explore Page/wellness-break.webp"}
            alt="Wellness and relaxation in Colorado Springs"
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-black/10" />
        </section>

        {/* WELLNESS/RELAX SECTION */}
        <section id="wellness-section" className="py-20 md:py-28 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 md:mb-20">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.2'
                }}
              >
                Relax in COS
              </h2>
              <p
                className="text-2xl md:text-3xl font-bold mb-10"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.green,
                  lineHeight: '1.3'
                }}
              >
                A Colorado Springs Reset
              </p>
              <div className="max-w-[900px] mx-auto space-y-6">
                <p
                  className="text-lg md:text-xl leading-relaxed italic"
                  style={{
                    fontFamily: KINSHIP_FONTS.body,
                    color: KINSHIP_COLORS.greenDark,
                    lineHeight: '1.8'
                  }}
                >
                  POV: Waking up in Downtown Colorado Springs' best boutique hotel, on a Tuft & Needle mattress, a hot cup of brewed Switchback coffee in hand and a beautiful city sunrise. Take a deep breath. You've landed at Kinship. It's time to take a moment to yourself.
                </p>
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{
                    fontFamily: KINSHIP_FONTS.body,
                    color: KINSHIP_COLORS.greenDark,
                    lineHeight: '1.8'
                  }}
                >
                  There is no shortage of wellness to be had on a trip to Colorado Springs. Breathe in the fresh mountain air as you unwind and relax at one of these unique experiences:
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-16">
              {wellness.map((activity) => (
                <div
                  key={activity.name}
                  className="border-2 p-8 md:p-10 bg-white transition-all duration-300 hover:shadow-xl flex flex-col"
                  style={{
                    borderColor: KINSHIP_COLORS.greenDark,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-5"
                    style={{
                      fontFamily: KINSHIP_FONTS.display,
                      color: KINSHIP_COLORS.green,
                      lineHeight: '1.3'
                    }}
                  >
                    {activity.name}
                  </h3>
                  <p
                    className="text-base md:text-lg leading-relaxed mb-6 flex-grow"
                    style={{
                      fontFamily: KINSHIP_FONTS.body,
                      color: KINSHIP_COLORS.greenDark,
                      lineHeight: '1.7'
                    }}
                  >
                    {activity.description}
                  </p>
                  {activity.link && (
                    <a
                      href={activity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-semibold transition-transform duration-300 hover:translate-x-2 mt-auto"
                      style={{ color: KINSHIP_COLORS.green }}
                    >
                      <span>Learn More</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Book a Suite CTA */}
            <div
              className="border-2 p-8 md:p-12 text-center"
              style={{
                borderColor: KINSHIP_COLORS.greenDark,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                backgroundColor: KINSHIP_COLORS.latte
              }}
            >
              <h3
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.greenDark
                }}
              >
                Book a Suite & Take a Bath
              </h3>
              <p
                className="text-lg md:text-xl leading-relaxed mb-6 max-w-[800px] mx-auto"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark
                }}
              >
                Suites are the sweetest way to stay at Kinship. Take coziness to the next level in our uniquely designed rooms, styled with boutique art and textiles, all with beautiful Colorado Springs sunrise or inspiring sunset mountain views and access to that crisp mountain air. All suites at Kinship come with a deep bathtub and a warm fireplace for the ultimate zen.
              </p>
              <a
                href="/rooms"
                className="inline-block px-8 py-4 text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: KINSHIP_COLORS.green,
                  fontFamily: KINSHIP_FONTS.body
                }}
              >
                View All Suites
              </a>
            </div>
          </div>
        </section>

        {/* COFFEE IMAGE BREAK */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src={exploreData?.coffeeBreakImageUrl || "/images/Explore Page/coffee-break.webp"}
            alt="Local coffee shops in Colorado Springs"
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-black/10" />
        </section>

        {/* COFFEE ENTHUSIAST SECTION */}
        <section id="coffee-section" className="py-20 md:py-28" style={{ backgroundColor: KINSHIP_COLORS.latte }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 md:mb-20">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-10"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.2'
                }}
              >
                Go-To Spots for the Coffee Enthusiast
              </h2>
              <p
                className="text-lg md:text-xl leading-relaxed max-w-[900px] mx-auto"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.8'
                }}
              >
                Homa has amazing coffee and iced oat milk draft lattes from Hold Fast Coffee Co., a local roastery in Colorado Springs. But sometimes you just need a fancy latte with whipped cream, or a creamy cappuccino - we get it! There are plenty of coffee shops that we adore near Kinship Landing to tickle your inner coffee enthusiast.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-[1400px] mx-auto">
              {coffeeShops.map((shop) => (
                <div
                  key={shop.name}
                  className="border-2 p-7 bg-white transition-all duration-300 hover:shadow-xl w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
                  style={{
                    borderColor: KINSHIP_COLORS.greenDark,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-3"
                    style={{
                      fontFamily: KINSHIP_FONTS.display,
                      color: KINSHIP_COLORS.green,
                      lineHeight: '1.3'
                    }}
                  >
                    {shop.name}
                  </h3>
                  <p
                    className="text-xs font-semibold mb-5"
                    style={{
                      fontFamily: KINSHIP_FONTS.body,
                      color: KINSHIP_COLORS.greenDark,
                      opacity: 0.7,
                      lineHeight: '1.5'
                    }}
                  >
                    Distance: {shop.distance}
                  </p>
                  <p
                    className="text-sm mb-5"
                    style={{
                      fontFamily: KINSHIP_FONTS.body,
                      color: KINSHIP_COLORS.greenDark,
                      lineHeight: '1.6'
                    }}
                  >
                    <span className="font-bold">What to get:</span> {shop.whatToGet}
                  </p>
                  {shop.link && (
                    <a
                      href={shop.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-transform duration-300 hover:translate-x-2"
                      style={{ color: KINSHIP_COLORS.green }}
                    >
                      <span>Visit Website</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p
                className="text-base md:text-lg italic"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark
                }}
              >
                We love helping people find those hidden gems or don't-miss hotspots. We are so lucky to have our little spot in Downtown Colorado Springs and share space with such talented baristas.
              </p>
            </div>
          </div>
        </section>

        {/* DESSERTS IMAGE BREAK */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src={exploreData?.dessertsBreakImageUrl || "/images/Explore Page/desserts-break.webp"}
            alt="Sweet treats and desserts in Colorado Springs"
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-black/10" />
        </section>

        {/* DESSERTS SECTION */}
        <section id="desserts-section" className="py-20 md:py-28 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 md:mb-20">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-10"
                style={{
                  fontFamily: KINSHIP_FONTS.display,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.2'
                }}
              >
                Best Desserts in Colorado Springs
              </h2>
              <p
                className="text-lg md:text-xl leading-relaxed max-w-[900px] mx-auto"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark,
                  lineHeight: '1.8'
                }}
              >
                If you're a person that needs something sweet after dinner, you're in the right place! From hand-made ice cream to warm, freshly baked cookies, Colorado Springs has a bunch of dessert bars, sprinkled just steps from Kinship's front door. Life is short - indulge from time to time!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {desserts.map((place) => (
                <div
                  key={place.name}
                  className="border-2 p-8 md:p-10 bg-white transition-all duration-300 hover:shadow-xl flex flex-col w-full"
                  style={{
                    borderColor: KINSHIP_COLORS.greenDark,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-5 gap-3">
                    <h3
                      className="text-xl sm:text-2xl font-bold"
                      style={{
                        fontFamily: KINSHIP_FONTS.display,
                        color: KINSHIP_COLORS.green,
                        lineHeight: '1.3'
                      }}
                    >
                      {place.name}
                    </h3>
                    <span
                      className="text-xs font-bold px-3 py-2 whitespace-nowrap self-start sm:ml-4"
                      style={{
                        backgroundColor: KINSHIP_COLORS.green,
                        color: 'white'
                      }}
                    >
                      {place.distance}
                    </span>
                  </div>
                  <p
                    className="text-base leading-relaxed mb-6"
                    style={{
                      fontFamily: KINSHIP_FONTS.body,
                      color: KINSHIP_COLORS.greenDark,
                      lineHeight: '1.7'
                    }}
                  >
                    {place.description}
                  </p>
                  <p
                    className="text-sm font-semibold mb-6 pb-6 border-b border-gray-200 flex-grow"
                    style={{
                      fontFamily: KINSHIP_FONTS.body,
                      color: KINSHIP_COLORS.green,
                      lineHeight: '1.6'
                    }}
                  >
                    <span className="font-bold">Suggested:</span> {place.suggested}
                  </p>
                  {place.link && (
                    <a
                      href={place.link}
                      target={place.link.startsWith('http') ? "_blank" : undefined}
                      rel={place.link.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 font-semibold transition-transform duration-300 hover:translate-x-2 mt-auto"
                      style={{ color: KINSHIP_COLORS.green }}
                    >
                      <span>{place.link.startsWith('http') ? 'Visit Website' : 'View Menu'}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p
                className="text-base md:text-lg italic"
                style={{
                  fontFamily: KINSHIP_FONTS.body,
                  color: KINSHIP_COLORS.greenDark
                }}
              >
                Sweeten your trip to Kinship Landing with one of our amazing local dessert shops in Downtown Colorado Springs!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ExploreFAQ
          sectionTitle={exploreData?.faqSectionTitle}
          sectionSubtitle={exploreData?.faqSectionSubtitle}
          faqItems={exploreData?.faqItems}
        />

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
