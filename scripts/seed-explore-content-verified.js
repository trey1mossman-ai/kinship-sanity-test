#!/usr/bin/env node

/**
 * EXPLORE PAGE - VERIFIED CONTENT SEED SCRIPT
 *
 * This script seeds all Explore page content to Sanity.
 * Each value has been verified by reading the component fallbacks.
 *
 * AUDIT DATE: December 2024
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-explore-content-verified.js
 */

const { createClient } = require('@sanity/client');

// Sanity configuration
const SANITY_PROJECT_ID = 'u2qzrboc';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

const SANITY_TOKEN = process.env.SANITY_API_TOKEN;
if (!SANITY_TOKEN) {
  console.error('Error: SANITY_API_TOKEN environment variable is required');
  console.error('Run with: SANITY_API_TOKEN=your_token node scripts/seed-explore-content-verified.js');
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  token: SANITY_TOKEN,
  useCdn: false,
});

/**
 * HERO SECTION
 * Source: app/explore/ExplorePageClient.tsx:295-297
 */
const HERO_CONTENT = {
  heroTitle: 'Explore Colorado Springs',
  heroSubtitle: 'Your local guide to hidden gems, insider adventures, and authentic experiences',
  introText: "There are a ton of coffee shops, cocktail joints, places to grab a bite, and entertainment within just a few blocks of Kinship! Grab your buddies and swing by one of our favorite hot spots!",
};

/**
 * SPEAKEASIES
 * Source: app/explore/ExplorePageClient.tsx:39-72
 */
const SPEAKEASIES = [
  {
    _key: 'rabbit-hole',
    name: 'Rabbit Hole',
    description: 'Take the subway steps down to the rabbit hole and be immersed in Alice in Wonderland vibes with delicious wine, cuisine and cocktails.',
    address: '101 N Tejon Street',
    howToFind: 'Look for the subway entrance on N Tejon Street and follow the steps down the rabbit hole.',
    suggestedDrink: 'The famous "White Rabbit"',
    link: 'https://www.rabbitholedinner.com/'
  },
  {
    _key: 'shame-regret',
    name: 'Shame and Regret',
    description: "This alley way retreat has a long history of housing speakeasys. If there wasn't a neon sign, you wouldn't know this was a bar. Blending into an alley wall, Shame and Regret features 90 American whiskeys, 90 scotch whiskeys and bold craft cocktails.",
    address: '15 E Bijou Street, Suite C',
    howToFind: 'Find the alley on Bijou street and look for the neon sign!',
    suggestedDrink: 'The Prenup',
    link: 'https://www.shameandregret.com/'
  },
  {
    _key: 'allusion',
    name: 'Allusion Cocktail Bar',
    description: "Get ready for a fun experience! This hidden gem is a revolving pop up concept, featuring themes such as Disney, Harry Potter, Alice and Wonderland, and more.",
    address: '323 N Tejon Street',
    howToFind: "Located behind Rooster's House of Ramen.",
    suggestedDrink: 'Definitely a themed drink!',
    link: 'https://www.allusionbar.com/'
  },
  {
    _key: 'archives',
    name: 'The Archives',
    description: 'Founded by a group of hospitality professionals, this underground cocktail bar features late-night food and classic/modern cocktails.',
    address: '15 S Tejon Street',
    howToFind: 'Located downstairs inside of Colorado Craft.',
    suggestedDrink: 'A Martini definitely fits the underground vibe.',
    link: 'http://www.thearchivescos.com/'
  }
];

/**
 * ENTERTAINMENT - LIVE MUSIC
 * Source: app/explore/ExplorePageClient.tsx:75-88
 */
const LIVE_MUSIC = [
  {
    _key: 'lulus',
    name: "Lulu's Live Music and Bar",
    description: "Located in Downtown Colorado Springs (just a few blocks away!), Lulu's is your go-to spot for cocktails, beer and music. With a fun atmosphere and a full calendar, there's plenty of entertainment to enjoy here."
  },
  {
    _key: 'boot-barn',
    name: 'Boot Barn Hall',
    description: 'Country and bluegrass lovers, rejoice! This 15,000 square foot venue features international, national, regional, and local musicians in a barn-style auditorium.'
  },
  {
    _key: 'black-sheep',
    name: 'The Black Sheep',
    description: 'An intimate venue meets a "punk rock" vibe on the east side of the city. The venue has hosted everyone from Imagine Dragons to local Colorado Springs bands.'
  }
];

/**
 * ENTERTAINMENT - PERFORMING ARTS
 * Source: app/explore/ExplorePageClient.tsx:89-106
 */
const PERFORMING_ARTS = [
  {
    _key: 'pikes-peak-center',
    name: 'Pikes Peak Center for the Performing Arts',
    description: 'The Pikes Peak Center is a concert venue in Colorado Springs that hosts everything from cultural performances to Broadway shows.'
  },
  {
    _key: 'fine-arts',
    name: 'Fine Arts Center',
    description: 'This museum at Colorado College provides local exhibits, as well as many monthly theater happenings.'
  },
  {
    _key: 'ent-center',
    name: 'ENT Center for the Arts',
    description: 'Part of the University of Colorado, Colorado Springs, ENT Center for the Arts has a wide variety of plays and performances by local students.'
  },
  {
    _key: 'millibo',
    name: 'Millibo Art Theatre',
    description: "The Millibo Art Theatre (originally the Manitou Art Theatre) was founded to provide new and original live performances in an intimate, accessible theatre for audiences of all ages in the Pikes Peak region. Don't miss their Circus shows!"
  }
];

/**
 * ENTERTAINMENT - COMEDY
 * Source: app/explore/ExplorePageClient.tsx:107-112
 */
const COMEDY = [
  {
    _key: 'loonees',
    name: 'Loonees Comedy Corner',
    description: 'A small, locally-owned comedy club, Loonees hosts touring stand-up comics and open mic nights.'
  }
];

/**
 * ENTERTAINMENT - ART CLASSES
 * Source: app/explore/ExplorePageClient.tsx:113-122
 */
const ART_CLASSES = [
  {
    _key: 'cottonwood',
    name: 'Cottonwood Center for the Arts',
    description: 'Cottonwood has a variety of classes such as pottery, painting, watercolor, digital art, and writing - all offered at an adult or youth level.'
  },
  {
    _key: 'painting-twist',
    name: 'Painting with a Twist',
    description: "Painting with a Twist offers a unique experience where you're able to sip on wine and paint your own masterpiece - no artistic skills required!"
  }
];

/**
 * ENTERTAINMENT - COOKING
 * Source: app/explore/ExplorePageClient.tsx:123-132
 */
const COOKING = [
  {
    _key: 'gather',
    name: 'Gather Food Studio & Spice Shop',
    description: 'Located in Old Colorado City, gather with your friends and family and make a meal around the table with other like-minded folks.'
  },
  {
    _key: 'french-kitchen',
    name: 'The French Kitchen',
    description: "This local bakery also provides individual adult cooking classes, kids' skills classes, and private events."
  }
];

/**
 * EATS NEARBY
 * Source: app/explore/ExplorePageClient.tsx:135-159
 */
const EATS_NEARBY = [
  {
    _key: 'loyal-coffee',
    name: 'Loyal Coffee',
    distance: '2-minute walk',
    description: 'Loyal Coffee is a barista-owned and operated specialty coffee company based in Colorado Springs, Colorado. They roast and brew coffee they love, for people they love, in the city they love.',
    link: 'https://loyalcoffee.co/'
  },
  {
    _key: 'coati',
    name: 'COATI',
    distance: '5-minute walk',
    description: "COATI is an event and experience venue in Colorado Springs. The industrial-styled building houses 7 independently owned culinary incubator pods which house some of the city's best up-and-coming chefs. The space also hosts weekly live music, yoga and other eclectic events."
  },
  {
    _key: 'cerberus',
    name: 'Cerberus Brewing Company',
    distance: '7-minute bike ride',
    description: 'A great Brewpub located just west of downtown Colorado Springs, CO. The brewery offers fun twists on traditional pub food with 24 taps. Plenty of Cerberus beer on tap, along with occasional guest taps and house-made sodas. Cerberus also has a huge patio, great for pups and yard games.'
  },
  {
    _key: 'occ',
    name: 'Historic Old Colorado City',
    distance: '17-minute bike ride',
    description: 'Affectionately referred to as "OCC" by the locals, this charming neighborhood of Colorado Springs features locally-owned shops, restaurants and galleries.',
    link: 'https://goo.gl/maps/AADLcnGhrThBGP9H6',
    linkText: 'Open bike route in Google Maps'
  }
];

/**
 * WELLNESS
 * Source: app/explore/ExplorePageClient.tsx:161-181
 */
const WELLNESS = [
  {
    _key: 'sunwater',
    name: 'SunWater Spa',
    description: "Year-round cedar soaking tubs in the heart of Manitou Springs, SunWater's natural hot tubs use natural Manitou mineral-water. Take in views of Pikes Peak and the Front Range mountain views as you rest and relax in your own little oasis.",
    link: 'https://www.sunwellness.net/'
  },
  {
    _key: 'daily-walks',
    name: 'Daily Walks',
    description: 'Garden of the Gods is absolutely stunning in the winter. Wind through red rock formations dusted in snow. We also love Mueller State Park, outside of Woodland Park, CO as there are a ton of trails that range from easy-peasy to heart pumpers.'
  },
  {
    _key: 'yoga',
    name: 'Yoga in The Springs',
    description: 'Warm up and find your inner calm while building strength and endurance at a yoga class. Cambio Yoga, a donation based yoga studio just outside of downtown Colorado Springs, and Hot Asana provide hot yoga classes to warm you up during those cold January days. Root Center for Yoga is a space dedicated to community and spiritual practices.',
    link: 'https://www.cambioyoga.com/'
  },
  {
    _key: 'massage',
    name: 'Massage',
    description: 'A spa day is always a good idea. Let Mateos Day Spa, near Ute Valley Park & other Colorado Springs Gems, take care of you with a massage, nail service, facial or spa package.',
    link: 'https://www.mateosdayspa.com/'
  }
];

/**
 * COFFEE SHOPS
 * Source: app/explore/ExplorePageClient.tsx:183-214
 */
const COFFEE_SHOPS = [
  {
    _key: 'loyal',
    name: 'Loyal Coffee',
    distance: '486 feet from Kinship Landing',
    whatToGet: 'Horchata or Cappuccino and any of their toasts',
    link: 'https://loyalcoffee.co/'
  },
  {
    _key: 'exchange',
    name: 'The Exchange on Tejon',
    distance: '0.2 miles from Kinship Landing',
    whatToGet: 'Coffee flight or cubano and anything from their baked goods shelf',
    link: 'https://theexchangeontejon.com/'
  },
  {
    _key: 'story',
    name: 'Story Coffee Co.',
    distance: '0.7 miles from Kinship Landing',
    whatToGet: 'Vanilla latte and go on Tuesdays for their pop tart tuesday!',
    link: 'https://www.storycoffeecompany.com/'
  },
  {
    _key: 'bird-tree',
    name: 'Bird Tree Cafe',
    distance: '0.8 miles from Kinship Landing',
    whatToGet: 'Macchiato or Iced Latte and the Wake n Bacon sandwich',
    link: 'https://www.birdtreecafe.org/'
  },
  {
    _key: 'switchback',
    name: 'Switchback Coffee Roasters',
    distance: '1.5 miles from Kinship Landing',
    whatToGet: 'Matcha or 50/50 and their avocado toast',
    link: 'https://switchbackroasters.com/'
  }
];

/**
 * DESSERTS
 * Source: app/explore/ExplorePageClient.tsx:216-259
 */
const DESSERTS = [
  {
    _key: 'josh-johns',
    name: "Josh & John's Ice Cream",
    description: 'Churning the best homemade ice cream using local dairy, right in the heart of Downtown Colorado Springs!',
    distance: '0.9 miles from Kinship Landing',
    suggested: 'Purple Mountain Majesty or Moose on the Loose',
    link: 'https://www.joshandjohns.com/'
  },
  {
    _key: 'cacao',
    name: 'Cacao Chemistry Chocolatier and Patisserie',
    description: 'Satisfy your sweet tooth with not just delicious and beautifully crafted chocolate. Cacao Chemistry using simple ingredients including cacao, sugar, and real vanilla extract to craft each bite-sized piece into an artistic masterpiece.',
    distance: '0.6 miles from Kinship Landing',
    suggested: 'Any of their truffles, or their white chocolate strawberries & cream bark',
    link: 'https://www.cacaochemistry.com/'
  },
  {
    _key: 'provision',
    name: 'Provision Bread & Bakery',
    description: "Scones, cookies, pastries - oh my. New to the Downtown Colorado Springs 'hood, Provision strives for excellence in every loaf or pastry they create by selecting quality ingredients - and it shows. Their cookies are gooey, the pastries are flaky, and the bread melts in your mouth. Plus, it's pretty freaking cute on the inside.",
    distance: '0.6 miles from Kinship Landing',
    suggested: 'Caramel apple danish',
    link: 'https://www.provisionbread.com/offerings'
  },
  {
    _key: 'sasquatch',
    name: 'Sasquatch Cookies',
    description: "Fresh-baked, warm cookies made locally here in Colorado Springs! Their 12 signature flavors range from classic chocolate chip to birthday confetti, and are sure to brighten anyone's day. Plus, you're able add on an option to have your cookies delivered by an actual Sasquatch. Not kidding, fam. Look it up.",
    distance: '3 miles from Kinship Landing',
    suggested: 'Classic Chocolate Chip',
    link: 'https://www.sasquatchcookies.com/'
  },
  {
    _key: 'tasty-freeze',
    name: 'Drive-In Tasty Freeze',
    description: 'Be transported to the 60s with this classic drive-in diner, featuring everything from burgers to dipped cones. Oldies playing on the radio and right next to a bike bath, this mom and pop shop brings all the feels.',
    distance: '2.8 miles from Kinship Landing',
    suggested: 'Chocolate dipped cone',
    link: 'https://www.driveintastyfreeze.com/'
  },
  {
    _key: 'homa',
    name: 'Homa Cafe + Bar',
    description: "Although Homa Cafe + Bar is known for their nutrient-dense sandwiches and flavorful bowls, many don't know they also have a killer sweets menu. Menu items range from a flaky, warm apple hand pie to an ice cream sandwich made with 5 different cookie doughs!",
    distance: "Head to our first floor & satiate that sweet tooth",
    suggested: 'Ice Cream Sandwich or Polenta Cake',
    link: '/homa'
  }
];

/**
 * SEO CONTENT
 * Source: app/explore/page.tsx:6-7
 */
const SEO_CONTENT = {
  seoTitle: 'Explore Colorado Springs | Kinship Landing',
  seoDescription: 'Discover hidden gems, speakeasies, local restaurants, coffee shops, entertainment venues, and wellness experiences near Kinship Landing in downtown Colorado Springs.',
};

async function main() {
  console.log('\n🚀 EXPLORE PAGE - Content Seed Script (Verified)\n');
  console.log('='.repeat(50));

  // Combine all content
  const allContent = {
    ...HERO_CONTENT,
    speakeasies: SPEAKEASIES,
    liveMusic: LIVE_MUSIC,
    performingArts: PERFORMING_ARTS,
    comedy: COMEDY,
    artClasses: ART_CLASSES,
    cooking: COOKING,
    eatsNearby: EATS_NEARBY,
    wellness: WELLNESS,
    coffeeShops: COFFEE_SHOPS,
    desserts: DESSERTS,
    ...SEO_CONTENT,
  };

  console.log('\n📝 Content sections to seed:');
  console.log('  - Hero Section (3 fields)');
  console.log(`  - Speakeasies (${SPEAKEASIES.length} venues)`);
  console.log(`  - Live Music (${LIVE_MUSIC.length} venues)`);
  console.log(`  - Performing Arts (${PERFORMING_ARTS.length} venues)`);
  console.log(`  - Comedy (${COMEDY.length} venues)`);
  console.log(`  - Art Classes (${ART_CLASSES.length} venues)`);
  console.log(`  - Cooking Classes (${COOKING.length} venues)`);
  console.log(`  - Eats Nearby (${EATS_NEARBY.length} venues)`);
  console.log(`  - Wellness (${WELLNESS.length} activities)`);
  console.log(`  - Coffee Shops (${COFFEE_SHOPS.length} shops)`);
  console.log(`  - Desserts (${DESSERTS.length} shops)`);
  console.log('  - SEO (2 fields)');

  console.log('\n📤 Updating Sanity document...');

  await client.patch('explorePage').set(allContent).commit();

  const totalVenues = SPEAKEASIES.length + LIVE_MUSIC.length + PERFORMING_ARTS.length +
    COMEDY.length + ART_CLASSES.length + COOKING.length + EATS_NEARBY.length +
    WELLNESS.length + COFFEE_SHOPS.length + DESSERTS.length;

  console.log('\n✅ COMPLETE! All Explore page content seeded to Sanity.');
  console.log('\n📊 SUMMARY:');
  console.log(`  - Total fields updated: ${Object.keys(allContent).length}`);
  console.log(`  - Total venues/activities: ${totalVenues}`);
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/explorePage');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
