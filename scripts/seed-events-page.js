#!/usr/bin/env node
/**
 * Seed script to populate the Events page in Sanity with actual website content
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-events-page.js
 */

const { createClient } = require('@sanity/client');

// Sanity client with write access
const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// The actual content from the live website
const eventsPageContent = {
  _id: 'eventsPage',
  _type: 'eventsPage',

  // ==================== HERO SECTION ====================
  heroTitle: 'Meetings & Events',
  heroSubtitle: 'Unforgettable events in the heart of downtown Colorado Springs',
  // Note: heroImage requires uploading an image asset to Sanity

  // ==================== GATHERINGS SECTION ====================
  gatheringsTitle: 'Gatherings',
  gatheringsDescription: 'Planning a gathering? The GreenHaus offers a unique, intimate setting for up to 80 guests: perfect for celebrations, workshops, and retreats. Pair your event with a room block and give your guests the full Kinship Landing experience, complete with stylish accommodations and all the perks of being downtown.',
  gatheringsCtaText: 'Host with Us',
  gatheringsCtaUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',

  // ==================== WEDDINGS SECTION ====================
  weddingsTitle: 'Weddings',
  weddingsDescription: "Your wedding deserves more than just a venue—it deserves a celebration that feels uniquely yours. At Kinship, we specialize in intimate gatherings for up to 80 guests, pairing warm hospitality with the energy of downtown Colorado Springs and the natural beauty of the Front Range.",
  weddingsDescription2: "From heartfelt \"I do's\" to unforgettable receptions, our team will help you create a day that's personal, joyful, and truly memorable. With catering from our onsite Homa Café, your celebration is infused with fresh, locally inspired flavors. Pair it all with a room block to keep your favorite people close and the party going all weekend long.",
  weddingsCtaText: 'Start Your Story',
  weddingsCtaUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',
  weddingsInfoDeckText: 'View Wedding Info Deck',
  weddingsInfoDeckUrl: 'https://www.canva.com/design/DAG0ZFm6rzg/mOJAknwnEXp6No-7ETsRzQ/view?utm_content=DAG0ZFm6rzg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb1e57cb91e',

  // ==================== MEETINGS & RETREATS SECTION ====================
  meetingsTitle: 'Meetings & Retreats',
  meetingsDescription: 'The best ideas happen when teams have space to connect. Kinship is ideal for retreats and offsite meetings in the 30–45 guest range, with a max capacity of 85. Our intimate scale keeps gatherings personal and collaborative while still giving you room to breathe and create.',
  meetingsDescription2: 'Fuel your team with fresh catering from Homa Café, featuring locally inspired menus that make every meal memorable. And to make your retreat truly stand out, our team partners with local experts to curate one-of-a-kind experiences—think ropes courses, guided hikes, yoga on the camp deck, and more.',
  meetingsDescription3: 'Pair your retreat with a room block for a seamless multi-day experience—complete with unique accommodations, downtown Colorado Springs at your doorstep, and our signature hospitality throughout.',
  meetingsNote: 'Because of our size and event spaces, Kinship is best suited for active leadership gatherings and small group retreats rather than traditional corporate gatherings. Share a few details with us—we would love to explore how we can bring your event to life.',
  meetingsCtaText: "Let's Make it Happen",
  meetingsCtaUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',

  // ==================== ROOM BLOCKS SECTION ====================
  roomBlocksTitle: 'Room Blocks',
  roomBlocksDescription: "Keep your favorite people close. Whether it's a wedding weekend, a family reunion, or a team retreat, reserving a room block at Kinship makes it easy for everyone to stay together under one roof.",
  roomBlocksDescription2: "Your crew will love our unique rooms, downtown location, and the chance to gather around the fire pit, share a meal at Homa Café, or head out on an adventure right from our front door.",
  roomBlocksDescription3: 'Ask us about setting up a block so your group can focus on making memories, not logistics.',
  roomBlocksCtaText: 'Plan Your Stay',
  roomBlocksCtaUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',

  // ==================== TAKEOVER SECTION ====================
  takeoverTitle: 'Make Kinship Yours',
  takeoverSubtitle: 'Your own private hotel',
  takeoverDescription: "Sometimes the best way to gather is to have the whole place to yourself. With a full hotel buyout, Kinship Landing becomes your group's home base, complete with 40 guest rooms, our GreenHaus event space, The Yard, and all the cozy corners in between.",
  takeoverDescription2: "Perfect for weddings, reunions, company retreats, or any gathering that deserves its own downtown adventure. Add catering from Homa Café and custom experiences with our local partners, and you've got the makings of an unforgettable takeover.",
  takeoverFeatures: [
    '40 unique guest rooms',
    'Indoor & outdoor event spaces',
    'Homa Café + Bar exclusive access',
    'Custom room booking link',
    'Dedicated event coordinator',
  ],
  takeoverCtaText: 'Explore a Kinship Takeover',
  takeoverCtaUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',

  // ==================== VENUE: GREENHAUS ====================
  greenhausTitle: 'GreenHaus',
  greenhausDescription: 'A truly one-of-a-kind venue in Colorado Springs—a greenhouse flooded with light in the heart of downtown. A beautiful backdrop for events, weddings, retreats, and gatherings.',
  greenhausCapacity: 'Up to 80 guests',
  greenhausFeatures: [
    'Light-filled greenhouse atmosphere',
    'Events, weddings, retreats, gatherings',
  ],

  // ==================== VENUE: THE YARD ====================
  yardTitle: 'The Yard',
  yardDescription: 'Our outdoor living room with string lights and mountain views perfect for gatherings, retreats, and celebrations. Fire pits, yard games, and that sweet Colorado sunshine make The Yard the ideal space for casual get-togethers or memorable outdoor events.',
  yardCapacity: 'Up to 100 guests',
  yardFeatures: [
    'String lights & mountain views',
    'Fire pits & yard games',
  ],

  // ==================== VENUE: CONFERENCE ROOM ====================
  conferenceRoomTitle: 'The Conference Room',
  conferenceRoomDescription: "For small meetings, private events, and professional gatherings without the stuffy vibe. Tucked on our first floor with Kinship's modern, cozy style: a large table and chairs, flatscreen with easy hookups, and catering options from Homa.",
  conferenceRoomCapacity: '12-15 guests',
  conferenceRoomFeatures: [
    'Flatscreen with easy hookups',
    'Catering available from Homa',
  ],

  // ==================== VENUE: FIREPLACE ====================
  fireplaceTitle: 'Café Fireplace',
  fireplaceDescription: 'A cozy, semi-private space with mixed seating for up to 20 guests. Perfect for intimate gatherings, small meetings, or casual celebrations. Order from Homa Café or book full catering to make your event complete.',
  fireplaceCapacity: 'Up to 20 guests',
  fireplaceFeatures: [
    'Semi-private space',
    'Order from Homa or book full catering',
  ],

  // ==================== VENUE: CAMP DECK ====================
  campDeckTitle: 'Camp Deck',
  campDeckDescription: 'A truly unique overnight experience—our outdoor camping deck offers mountain views, private restroom access, and hammock hooks for the ultimate urban camping adventure. Flat turf camping area perfect for bringing your own tent and sleeping gear while staying in the heart of downtown Colorado Springs.',
  campDeckFeatures: [
    'Outdoor camping deck',
    'Mountain views',
    'Private restroom access',
    'Hammock hooks included',
  ],

  // ==================== CONTACT INFO ====================
  inquiryEmail: 'events@kinshiplanding.com',
  inquiryPhone: '(719) 203-9309',
  bookingUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',

  // ==================== SEO ====================
  seoTitle: 'Events & Weddings at Kinship Landing | Colorado Springs Venue',
  seoDescription: 'Host your wedding, corporate retreat, or private event at Kinship Landing in downtown Colorado Springs. Unique venues including GreenHaus, The Yard, and more.',
};

async function seedEventsPage() {
  console.log('🌱 Seeding Events page content to Sanity...\n');

  try {
    // Use createOrReplace to update the singleton document
    const result = await client.createOrReplace(eventsPageContent);

    console.log('✅ Successfully seeded Events page content!');
    console.log('\n📋 Document ID:', result._id);
    console.log('\n🔗 View in Sanity Studio: https://kinship-landing.sanity.studio/structure/eventsPage');
    console.log('\n📝 Fields populated:');
    console.log('   - Hero: title, subtitle');
    console.log('   - Gatherings: title, description, CTA');
    console.log('   - Weddings: title, descriptions, CTAs, info deck');
    console.log('   - Meetings: title, descriptions, note, CTA');
    console.log('   - Room Blocks: title, descriptions, CTA');
    console.log('   - Takeover: title, subtitle, descriptions, features, CTA');
    console.log('   - GreenHaus: title, description, capacity, features');
    console.log('   - The Yard: title, description, capacity, features');
    console.log('   - Conference Room: title, description, capacity, features');
    console.log('   - Fireplace: title, description, capacity, features');
    console.log('   - Camp Deck: title, description, features');
    console.log('   - Contact: email, phone, booking URL');
    console.log('   - SEO: title, description');
    console.log('\n⚠️  NOTE: Image galleries need to be uploaded manually in Sanity Studio');
    console.log('   Go to the Studio and add images to each gallery field.');

  } catch (error) {
    console.error('❌ Error seeding content:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\n💡 Make sure your SANITY_API_TOKEN has "Editor" permissions.');
      console.error('   Get a token from: https://www.sanity.io/manage/project/u2qzrboc/api#tokens');
    }
    process.exit(1);
  }
}

// Run the seed function
seedEventsPage();
