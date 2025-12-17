#!/usr/bin/env node

/**
 * CAREERS PAGE - VERIFIED CONTENT SEED SCRIPT
 *
 * This script seeds all Careers page content to Sanity.
 * Each value has been verified by reading the component fallbacks.
 *
 * AUDIT DATE: December 2024
 *
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-careers-content-verified.js
 */

const { createClient } = require('@sanity/client');

// Sanity configuration
const SANITY_PROJECT_ID = 'u2qzrboc';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

const SANITY_TOKEN = process.env.SANITY_API_TOKEN;
if (!SANITY_TOKEN) {
  console.error('Error: SANITY_API_TOKEN environment variable is required');
  console.error('Run with: SANITY_API_TOKEN=your_token node scripts/seed-careers-content-verified.js');
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
 * Source: app/careers/page.tsx:41-42 (defaultContent)
 */
const HERO_CONTENT = {
  heroTitle: "Let's Work Together!",
  heroSubtitle: 'Careers at Kinship Landing & Homa Cafe and Bar',
};

/**
 * INTRO SECTION
 * Source: app/careers/page.tsx:44-45 (defaultContent)
 */
const INTRO_CONTENT = {
  introTitle: 'Ready for outrageous hospitality?!',
  introText: 'Do you crave the freedom to use your hospitality superpowers to make a lasting impact? We are a values-driven startup that is fueled by courage, trust, generosity, community and adventure.',
};

/**
 * WHY JOIN SECTION
 * Source: app/careers/page.tsx:9-30 (defaultWhyJoinReasons) and line 46
 */
const WHY_JOIN_CONTENT = {
  whyJoinTitle: 'Why Join our Team',
  whyJoinReasons: [
    {
      _key: 'work-life-balance',
      title: 'Work Life Balance',
      description: "At Kinship Landing, we know that life is all about the adventure. That's why we prioritize a work-life balance for our staff, at all levels of the organization. We work to live, not live to work. From Paid Volunteer days for hotel team members to hotel discounts for Homa employees - we are always finding fun ways to make sure that you're able to enjoy your life and your work. Join the Kinship Landing fam and let's create outrageous hospitality and embark on the amazing adventures ahead!",
    },
    {
      _key: 'service-minded',
      title: 'Service Minded',
      description: "Here at Kinship, we're deeply passionate about outrageous hospitality. We're on a mission to experience the fullness of life through hospitality, friendship, and adventure. Our guests are our priority. We strive to make their travels and stay better in every way that we can.",
    },
    {
      _key: 'diversity-inclusion',
      title: 'Diversity & Inclusion',
      description: "We value, respect and support all types of diversity across all identities including, but not limited to LGBTQIA+, race, ethnicity, gender, religion, age and abilities. We've created a community that makes everyone feel welcome, seen and heard. Our company exists to help everyone have the best possible trip to Colorado Springs. We're looking for team members who can add value to these spaces, serve our people like their own and care deeply about their enjoyment.",
    },
    {
      _key: 'career-path',
      title: 'A Career Path',
      description: "We're always brainstorming and implementing new ideas that will best serve our guests. Although we'll expect you to adhere to the roles, responsibilities and systems that enable Kinship to run smoothly, your creativity and initiative will always be welcome and rewarded. Once you've mastered the basics, there are plenty of ways you can move up and around within the company.",
    },
  ],
};

/**
 * BENEFITS SECTION
 * Source: app/careers/page.tsx:32-38 (defaultBenefits) and line 47
 */
const BENEFITS_CONTENT = {
  benefitsTitle: 'Other Benefits Include',
  benefitsList: [
    'Hotel & Restaurant Discounts',
    'Paid Volunteer days for hotel team members',
    'Transferable skills',
    'Professional certification trainings',
    'Adventure credits for hotel team members',
  ],
};

/**
 * CTA SECTION
 * Source: app/careers/page.tsx:48-51 (defaultContent)
 */
const CTA_CONTENT = {
  ctaTitle: 'Ready to Join Us?',
  ctaText: 'Browse our current openings and take the first step toward your next adventure.',
  ctaButtonText: 'View Open Positions',
  ctaButtonUrl: 'https://imprinthospitality.hrmdirect.com/employment/job-openings.php?search=true&',
};

/**
 * SEO CONTENT
 * Source: app/careers/page.tsx:58-59
 */
const SEO_CONTENT = {
  seoTitle: 'Careers | Kinship Landing',
  seoDescription: 'Join the Kinship Landing team in Colorado Springs. Work-life balance, career growth, and outrageous hospitality await.',
};

async function main() {
  console.log('\n🚀 CAREERS PAGE - Content Seed Script (Verified)\n');
  console.log('='.repeat(50));

  // Combine all content
  const allContent = {
    ...HERO_CONTENT,
    ...INTRO_CONTENT,
    ...WHY_JOIN_CONTENT,
    ...BENEFITS_CONTENT,
    ...CTA_CONTENT,
    ...SEO_CONTENT,
  };

  console.log('\n📝 Content sections to seed:');
  console.log('  - Hero Section (2 fields)');
  console.log('  - Intro Section (2 fields)');
  console.log('  - Why Join Section (1 title + 4 reasons)');
  console.log('  - Benefits Section (1 title + 5 benefits)');
  console.log('  - CTA Section (4 fields)');
  console.log('  - SEO (2 fields)');

  console.log('\n📤 Updating Sanity document...');

  await client.patch('careersPage').set(allContent).commit();

  console.log('\n✅ COMPLETE! All Careers page content seeded to Sanity.');
  console.log('\n📊 SUMMARY:');
  console.log(`  - Total fields updated: ${Object.keys(allContent).length}`);
  console.log(`  - Why Join reasons: 4`);
  console.log(`  - Benefits: 5`);
  console.log('\n🔗 Verify at: https://kinship-landing.sanity.studio/structure/careersPage');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
