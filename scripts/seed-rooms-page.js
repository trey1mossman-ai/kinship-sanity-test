#!/usr/bin/env node
/**
 * Seed script to populate the Rooms page in Sanity with actual website content
 *
 * This script seeds:
 * - Hero section content
 * - Filter labels
 * - Rooms array (all 10 room types)
 * - Room Blocks section
 * - FAQ section (5 FAQs)
 * - SEO metadata
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-rooms-page.js
 */

const { createClient } = require('@sanity/client');

// Check for API token
const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('\n❌ ERROR: SANITY_API_TOKEN environment variable is required');
  console.error('   Get a token from: https://www.sanity.io/manage/project/u2qzrboc/api#tokens\n');
  process.exit(1);
}

// Sanity client with write access
const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token,
});

// Rooms data (from lib/data/rooms.ts)
const rooms = [
  {
    _key: 'room-1',
    id: 'mountain-king-suite',
    name: 'Mountain King Suite',
    slug: 'mountain-king-suite',
    category: 'suites',
    description: 'Take in breathtaking views through an overhead garage door, opening to Rocky Mountain vistas and crisp Colorado air. Cozy, inspiring, and luxurious, cozy up with ridiculously comfortable beds, free-standing soaking tub, and a soothing fireplace.',
    features: [
      'Tuft and Needle Mattress',
      'Brooklinen sheets and towels',
      'Overhead Garage Door',
      'Soothing Fireplace',
      'Free Standing Soaking Tub',
      'Kettle, Microwave, Mini Chiller',
      '50" HD smart TV',
      'Freaky fast Wifi'
    ],
    displayOrder: 1,
    isActive: true
  },
  {
    _key: 'room-2',
    id: 'king-suite',
    name: 'King Suite',
    slug: 'king-suite',
    category: 'suites',
    description: "Take coziness to the next level in uniquely designed King suites. Enjoy ridiculously comfortable beds, free-standing soaking tub, soothing fireplace, and an overhead garage door that opens to crisp Colorado air. Take a deep breath, you've made it.",
    features: [
      'Tuft and Needle Mattress',
      'Brooklinen sheets and towels',
      'Overhead Garage Door',
      'Soothing Fireplace',
      'Free Standing Soaking Tub',
      'Kettle, Microwave, Mini Chiller',
      '50" HD smart TV',
      'Freaky fast Wifi'
    ],
    displayOrder: 2,
    isActive: true
  },
  {
    _key: 'room-3',
    id: 'executive-king-suite',
    name: 'Executive King Suite',
    slug: 'executive-king-suite',
    category: 'suites',
    description: 'Superbly inviting King Bed, adjustable sit or stand desk work station, and a curated sitting area, all set in inspiring touches and luxury comfort. Our Executive King Suites are designed with the guest who needs a space to be productive and enjoyed by any looking for an inviting, spacious, and practical place to hunker down comfortably.',
    features: [
      'Tuft and Needle Mattress',
      'Brooklinen sheets and towels',
      'Adjustable desk with charging port',
      'Sitting area with couch, table, chairs',
      'Whiteboard',
      'Kettle, Microwave, Mini Chiller',
      '50" HD smart TV',
      'Freaky fast Wifi'
    ],
    displayOrder: 3,
    isActive: true
  },
  {
    _key: 'room-4',
    id: 'queen-balcony-suite',
    name: 'Mountain Queen Balcony Suite',
    slug: 'queen-balcony-suite',
    category: 'suites',
    description: "Rest easy in a cozy Queen bed or one of two twin trundle bed Tuft and Needle mattress adorned with luxury Brooklinen sheets. All Kinship's charming style finishes in one of only three rooms with a spacious balcony, rocking chairs and absolutely breathtaking views of Pikes Peak and the Rocky Mountains. Spacious, comfy, and inspiring.",
    features: [
      'Tuft and Needle Mattress',
      'Brooklinen sheets and towels',
      'Mountain Views',
      'Overhead Garage Door',
      'Spacious outdoor balcony',
      'Kettle, Microwave, Mini Chiller',
      '50" HD smart TV',
      'Freaky fast Wifi'
    ],
    displayOrder: 4,
    isActive: true
  },
  {
    _key: 'room-5',
    id: 'double-queen-balcony-suite',
    name: 'Double Queen Balcony Suite',
    slug: 'double-queen-balcony-suite',
    category: 'suites',
    description: "Snuggle up in two charmingly designed double queen beds and enjoy the sunrise on a spacious balcony and rocking chairs with fresh Mountain air and soothing in room tea and coffee. Double Queen Balcony Suites are clean, functional, and spacious with all of Kinship's custom finishes and luxurious touches.",
    features: [
      'Tuft and Needle Mattress',
      'Brooklinen sheets and towels',
      'Overhead Garage Door',
      'Spacious outdoor balcony',
      'Kettle, Microwave, Mini Chiller',
      '50" HD smart TV',
      'Freaky fast Wifi'
    ],
    displayOrder: 5,
    isActive: true
  },
  {
    _key: 'room-6',
    id: 'mountain-double-queen',
    name: 'Mountain Double Queen Suite',
    slug: 'mountain-double-queen',
    category: 'suites',
    description: 'Two queen beds with stunning mountain views and extra space.',
    features: [
      'Two queen beds',
      'Mountain views',
      'Extra space',
      'Premium amenities'
    ],
    displayOrder: 6,
    isActive: true
  },
  {
    _key: 'room-7',
    id: 'mountain-jr-queen',
    name: 'Mountain Jr Queen',
    slug: 'mountain-jr-queen',
    category: 'junior',
    description: "Our Mountain Junior Queen rooms are designed with travelers in mind. Enjoy mountain views, boutique art and decor, extremely comfy bed fitted with Tuft and Needle mattress and Brooklinen luxury sheets, a sit or stand built in desk, and handpicked essentials, this room is everything you need for a memorable stay, and nothing you don't! Bring those furry friends along, with pet-friendly upgrades available in this room type.",
    features: [
      'Queen bed on platform',
      'Tuft and Needle Mattress',
      'Brooklinen sheets and towels',
      'Pet friendly options',
      'Mountain view',
      'Sit or stand built in desk',
      'Kettle and Mini Chiller',
      '50" HD smart TV'
    ],
    displayOrder: 7,
    isActive: true
  },
  {
    _key: 'room-8',
    id: 'jr-queen-suite',
    name: 'Jr Queen',
    slug: 'jr-queen-suite',
    category: 'junior',
    description: "Our Junior Queen rooms are designed with travelers in mind. Enjoy sliding door to fresh air, boutique art and decor, extremely comfy bed fitted with Tuft and Needle mattress and Brooklinen luxury sheets, a sit or stand built in desk, and handpicked essentials, this room is everything you need for a memorable stay, and nothing you don't! Bring those furry friends along, with pet-friendly upgrades available in this room type.",
    features: [
      'Queen bed on platform',
      'Tuft and Needle Mattress',
      'Brooklinen sheets and towels',
      'Pet friendly options',
      'Mountain view',
      'Sit or stand built in desk',
      'Kettle and Mini Chiller',
      '50" HD smart TV'
    ],
    displayOrder: 8,
    isActive: true
  },
  {
    _key: 'room-9',
    id: 'family-suite',
    name: 'Family Suite',
    slug: 'family-suite',
    category: 'family',
    description: 'These delightfully functional and tiny rooms sleep six full grown guests, all with Kinship comfort, cleanliness, and tasteful design. In room access to two sinks and toilets plus a shower in room and another down the hall, Family Suites make great wedding party rooms, large family suites, or a place for a group of pals to crash in style.',
    features: [
      'Queen bed',
      '4 twin beds',
      'Tuft and Needle Mattresses',
      'Brooklinen sheets and towels',
      '2 restrooms and 1 luxury shower',
      '8 programmable custom built lockers',
      'Kettle, Microwave, and Mini Chiller',
      '50" HD smart TV'
    ],
    displayOrder: 9,
    isActive: true
  },
  {
    _key: 'room-10',
    id: 'camp-deck',
    name: 'Camp Deck',
    slug: 'camp-deck',
    category: 'specialty',
    description: 'Urban camping in the heart of Downtown Colorado Springs for up to six people! The camping room is just that: your own personal campsite. The best part about camping here? Unlike the wilderness, this room includes a private three piece bathroom with sink, shower, toilet and soft Brooklinen towels. Four stories up and open to the elements and sky, this camp spot provides great views of Pikes Peak, Cheyenne Mountain, and the Front Range. Bring your own camping gear! *GEAR PICTURED NOT INCLUDED.',
    features: [
      'Flat turf camping area. Bring your own sleeping gear.',
      'Private in room restroom included in rate',
      'Bathroom: Private toilet + sink + walk-in shower',
      'Mountain View',
      'Hammock hanging hooks',
      'Bluetooth speaker system',
      'Available to rent as a meeting space!',
      'Table and chairs'
    ],
    displayOrder: 10,
    isActive: true
  }
];

// FAQ data (from components/rooms/faq-data.ts)
const faqItems = [
  {
    _key: 'faq-1',
    id: 'how-to-book',
    question: 'How can I book a room at Kinship Landing?',
    answerShort: 'Book direct on our website, email stay@kinshiplanding.com, or call us at (719) 203-9309.',
    answerLong: 'Book direct through our website for the best rates. You can also email us at stay@kinshiplanding.com with questions or special requests. Prefer to talk it through? Give us a call at (719) 203-9309 to connect with our team. Sign up for our email newsletter to get first dibs on special offers. For events or group travel, fill out the group booking form or email groups@kinshiplanding.com.'
  },
  {
    _key: 'faq-2',
    id: 'kids-occupancy',
    question: 'Are kids included in room occupancy?',
    answerShort: 'Yes, two children under age two are included in room occupancy at no extra charge.',
    answerLong: 'Two children under age two stay free with your booking. We can provide cribs, playground recommendations, and kid-friendly activities around town. Family-friendly room options include: Double Queen Balcony Suite, two beds plus balcony; Mountain Queen Balcony Suite, queen bed plus two trundles and mountain view balcony; Jr. Queen + Bunk Suite, lofted bed over main queen; Family Suites, queen bed for parents plus bunks for kids in one room.'
  },
  {
    _key: 'faq-3',
    id: 'ada-accessible',
    question: 'Do you have ADA-accessible room options?',
    answerShort: 'Yes, we offer ADA-accessible options for every room type with first-floor accessibility.',
    answerLong: 'Every room type at Kinship Landing has an ADA-accessible option. Our first-floor layout is designed with accessibility in mind. We worked with Olympic athletes, state representatives, and accessibility experts to get the details right. We are always open to learning and improving the ADA experience. Let us know during booking so we can make sure your space fits your needs perfectly.'
  },
  {
    _key: 'faq-4',
    id: 'camp-deck-room',
    question: 'What is the story on the Camp Deck Room?',
    answerShort: 'One private outdoor camping room for up to six people at $89 per night plus tax.',
    answerLong: 'The Camp Deck Room is one private camping space that fits up to six adults and two children under two. Bring your own tent and camping gear, or rent hammocks from us. The space includes a flat turf surface, heated bathroom with shower, Bluetooth speaker, secure door lock, and Pikes Peak views. You will also have a covered overhang and access to indoor restrooms. Homa Café + Bar is just a short staircase away. No pets are allowed to help keep the space pristine. A $50 cleaning fee applies if you leave it messy, following Leave No Trace principles. It is the perfect way to practice your backcountry skills while still enjoying a few comforts.'
  },
  {
    _key: 'faq-5',
    id: 'room-availability',
    question: 'Why cannot I book a certain room type on certain dates?',
    answerShort: 'Our booking platform shows real-time availability. If a room type is not listed, it is already booked.',
    answerLong: 'Our online system shows all available rooms in real time. We only have 41 private rooms, and they book fast. If your preferred room type is not showing, it means it is already reserved for those dates. Try adjusting your dates or reach out to our team for alternate options.'
  }
];

// The actual content from the live website
const roomsPageContent = {
  _id: 'roomsPage',
  _type: 'roomsPage',

  // ==================== HERO SECTION ====================
  heroTitle: 'Stay With Us',
  heroSubtitle: 'Your Colorado Springs basecamp',

  // ==================== FILTER LABELS ====================
  filterAllLabel: 'All Rooms',
  filterKingLabel: 'King Rooms',
  filterQueenLabel: 'Queen Rooms',
  filterFamilyLabel: 'Family Rooms',
  filterCampDeckLabel: 'Camp Deck',

  // ==================== ROOMS ARRAY ====================
  rooms: rooms,

  // ==================== ROOM BLOCKS SECTION ====================
  roomBlocksTitle: 'Book a Bunch of Rooms',
  roomBlocksTagline: 'Keep Your Crew Close',
  roomBlocksDescription1: "Keep your favorite people close. Whether it's a wedding weekend, a family reunion, or a team retreat, reserving a room block at Kinship makes it easy for everyone to stay together under one roof.",
  roomBlocksDescription2: "Your crew will love our unique rooms, downtown location, and the chance to gather around the fire pit, share a meal at Homa Café, or head out on an adventure right from our front door.",
  roomBlocksDescription3: 'Ask us about setting up a block so your group can focus on making memories, not logistics.',
  roomBlocksCtaText: 'Book Your Gathering at Kinship Landing',
  roomBlocksCtaUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',

  // ==================== FAQ SECTION ====================
  faqSectionTitle: 'Rooms FAQs',
  faqSectionSubtitle: 'Everything you need to know about booking and staying',
  faqItems: faqItems,

  // ==================== SEO ====================
  seoTitle: 'Rooms & Suites | Kinship Landing Boutique Hotel',
  seoDescription: 'Explore our unique rooms and suites at Kinship Landing. From cozy king suites to family rooms and the one-of-a-kind Camp Deck, find your perfect Colorado Springs basecamp.',
};

async function seedRoomsPage() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║         SEEDING ROOMS PAGE CONTENT TO SANITY               ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  try {
    // Use createOrReplace to update the singleton document
    const result = await client.createOrReplace(roomsPageContent);

    console.log('✅ Successfully seeded Rooms page content!');
    console.log('\n📋 Document ID:', result._id);

    // Summary
    console.log('\n📊 CONTENT SUMMARY');
    console.log('─────────────────────────────────────────────────────────────');
    console.log(`   Hero: "${roomsPageContent.heroTitle}"`);
    console.log(`   Filters: 5 labels set`);
    console.log(`   Rooms: ${rooms.length} room types`);
    console.log(`   Room Blocks: All content set`);
    console.log(`   FAQs: ${faqItems.length} items`);
    console.log(`   SEO: Title and description set`);

    console.log('\n📋 ROOMS ADDED:');
    rooms.forEach((room, idx) => {
      console.log(`   ${idx + 1}. ${room.name} (${room.category})`);
    });

    console.log('\n📋 FAQs ADDED:');
    faqItems.forEach((faq, idx) => {
      console.log(`   ${idx + 1}. ${faq.question.substring(0, 50)}...`);
    });

    console.log('\n🔗 View in Sanity Studio:');
    console.log('   https://kinship-landing.sanity.studio/structure/roomsPage\n');

    console.log('\n⚠️  NOTE: Room images need to be uploaded separately.');
    console.log('   Run: SANITY_API_TOKEN=your_token node scripts/seed-rooms-images.js\n');

  } catch (error) {
    console.error('\n❌ Error seeding content:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\n💡 Make sure your SANITY_API_TOKEN has "Editor" permissions.');
      console.error('   Get a token from: https://www.sanity.io/manage/project/u2qzrboc/api#tokens');
    }
    process.exit(1);
  }
}

// Run the seed function
seedRoomsPage();
