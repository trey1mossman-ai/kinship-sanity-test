#!/usr/bin/env node
/**
 * Seed script to populate the About page in Sanity with actual website content
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-about-page.js
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
const aboutPageContent = {
  _id: 'aboutPage',
  _type: 'aboutPage',

  // ==================== HERO SECTION ====================
  heroTitle: 'About Kinship Landing',
  heroSubtitle: 'Crafted by locals, built for adventurers',

  // ==================== VIDEO SECTION ====================
  videoUrl: 'https://player.vimeo.com/video/854855486?badge=0&autopause=0&player_id=0&app_id=58479',
  videoTitle: 'Kinship Landing Video',

  // ==================== STORY SECTION ====================
  storyTitle: 'The Kinship Story',
  storyParagraph1: 'Our story began with friendship and adventure. After extended time traveling the world to dozens of countries, sinking our teeth deep into our local community, making lifelong friends, and recognizing a global need for intentional, authentic hospitality, the founding team of three friends landed back home in Colorado Springs with a clear vision: create an awesome place to sleep and the easiest way to find friendship and adventure in Colorado Springs.',
  storyParagraph2: 'Through a values-driven start-up, we are creating a community-powered accommodation concept with courage, trust, adventure, generosity, and community at the helm. Our first endeavor in Colorado Springs is a friendly boutique hotel in the heart of downtown called Kinship Landing, the very first of its kind.',
  storyParagraph3: "Here, locals and travelers connect to the best of the region's outdoor and cultural resources. We've found that having a place to launch from and land at makes all the difference. Our future vision: a worldwide network of different hospitality concepts, each cherished by the local community and contributing to the global family.",
  storyParagraph4: "We've all experienced outrageous hospitality at some point - it fills you with a sense of belonging, friendship, and trust. You're not going to find it just anywhere. At Kinship Landing, down-to-earth hospitality provides just what you are hoping for in a place to stay.",
  storyParagraph5: "You're part of the family. Land here.",

  // ==================== VALUES SECTION ====================
  valuesTitle: 'Our Values',
  valuesIntro: 'We make every decision and live every action through the lens of our values. From design decisions to staff recruitment and training, these values are our compass. We aspire to multiply them in the world and hope you carry them out the door with you when you say, "see ya again soon" at checkout.',
  values: [
    { _key: 'courage', number: 1, title: 'Courage', description: 'We act with integrity and do what is right in the face of challenges.' },
    { _key: 'trust', number: 2, title: 'Trust', description: 'We build genuine relationships through transparency and reliability.' },
    { _key: 'adventure', number: 3, title: 'Adventure', description: 'We embrace exploration and create experiences that inspire discovery.' },
    { _key: 'generosity', number: 4, title: 'Generosity', description: 'We give freely of our time, resources, and hospitality to all who visit.' },
    { _key: 'community', number: 5, title: 'Community', description: 'We foster connections between travelers and locals, creating a global family.' },
  ],

  // ==================== MILESTONES SECTION ====================
  milestonesTitle: 'Our Journey',
  milestones: [
    { _key: '2019', year: '2019', title: 'The Vision', description: 'A group of Colorado Springs locals dreamed of creating a place that would connect travelers to authentic local experiences.' },
    { _key: '2020', year: '2020', title: 'Historic Renovation', description: 'We transformed a historic building in downtown Colorado Springs, preserving its character while creating modern, comfortable spaces.' },
    { _key: '2021', year: '2021', title: 'Grand Opening', description: 'Kinship Landing opened its doors, welcoming travelers and locals alike to experience outrageous hospitality.' },
    { _key: '2024', year: '2024', title: 'Awards & Recognition', description: 'Featured in Forbes, Condé Nast Traveler, and USA Today as a must-visit destination in Colorado Springs.' },
  ],

  // ==================== CONTACT SECTION ====================
  contactTitle: 'Get in Touch',
  contactPhone: '(719) 203-9309',
  contactEmail: 'hello@kinshiplanding.com',
  contactAddress: '415 S Nevada Ave, Colorado Springs, CO 80903',
  googleMapsUrl: 'https://www.google.com/maps/place/415+S+Nevada+Ave,+Colorado+Springs,+CO+80903',

  // ==================== SEO ====================
  seoTitle: 'About Us | Kinship Landing',
  seoDescription: 'Learn about Kinship Landing - a boutique hotel in downtown Colorado Springs built by locals, for everyone. Our story, values, and mission.',
};

async function seedAboutPage() {
  console.log('🌱 Seeding About page content to Sanity...\n');

  try {
    // Use createOrReplace to update the singleton document
    const result = await client.createOrReplace(aboutPageContent);

    console.log('✅ Successfully seeded About page content!');
    console.log('\n📋 Document ID:', result._id);
    console.log('\n🔗 View in Sanity Studio: https://kinship-landing.sanity.studio/structure/aboutPage');
    console.log('\n📝 Fields populated:');
    console.log('   - Hero: title, subtitle');
    console.log('   - Video: Vimeo embed URL');
    console.log('   - Story: 5 paragraphs');
    console.log('   - Values: intro + 5 core values');
    console.log('   - Milestones: 4 timeline items');
    console.log('   - Contact: phone, email, address, Google Maps');
    console.log('   - SEO: title, description');
    console.log('\n⚠️  NOTE: Hero image needs to be uploaded manually in Sanity Studio');

  } catch (error) {
    console.error('❌ Error seeding content:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.error('\n💡 Make sure your SANITY_API_TOKEN has "Editor" permissions.');
    }
    process.exit(1);
  }
}

// Run the seed function
seedAboutPage();
