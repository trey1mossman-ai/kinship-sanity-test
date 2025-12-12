#!/usr/bin/env node
/**
 * Seed Accessibility, Policies, Privacy, and Careers pages with content
 * Run with: SANITY_API_TOKEN=your_token node scripts/seed-legal-pages.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u2qzrboc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// ============================================
// ACCESSIBILITY PAGE DATA
// ============================================
const accessibilityPageData = {
  _id: 'accessibilityPage',
  _type: 'accessibilityPage',
  // Hero
  heroTitle: 'Accessibility',
  heroSubtitle: 'Making our hotel and website accessible to everyone',
  // Website Accessibility
  websiteTitle: 'Website Accessibility',
  websiteParagraph1: "At Kinship Landing, it's important to us that our website and property is accessible and easy to use for all persons of varying abilities. When creating our website, our development team used software tools to identify web accessibility standards as outlined by the World Wide Web Consortium's Web Content Accessibility Guidelines 2.0 Level AA (WCAG 2.0 AA).",
  websiteParagraph2: "While the industry is not operating from approved, regulated legislation, Kinship Landing is committed to our good faith effort to follow guidelines that are available and making every effort to go beyond the minimum level of accessibility wherever we can.",
  issueTitle: 'Found an Accessibility Issue?',
  issueText: 'If you have questions, concerns or have discovered an accessibility issue on our site, please contact us by emailing hello@kinshiplanding.com. Please include specifics and any page where an issue has occurred. We will make every reasonable effort to make the page accessible for you.',
  // ADA
  adaTitle: 'Americans with Disability Act (ADA)',
  adaIntro: 'Our Downtown Colorado Springs hotel offers accessible features throughout, such as accessible guestrooms in our three different room types and accessible entrances to most spaces.',
  amenitiesTitle: 'Accessible Room Amenities',
  amenities: [
    '40" flat-screen TV in private rooms',
    '49" flat-screen TV in suites',
    'Accessible entry/exits',
    'Electronically keyed lockers',
    'ADA showers with transfer seat'
  ],
  // Contact
  contactTitle: 'Questions About Accessibility?',
  contactText: 'If you have specific accessibility needs or questions about our facilities, please contact us:',
  contactEmail: 'hello@kinshiplanding.com',
  contactPhone: '(719) 203-9309',
  // SEO
  seoTitle: 'Accessibility | Kinship Landing',
  seoDescription: 'Learn about accessibility features and accommodations at Kinship Landing boutique hotel in Colorado Springs.'
};

// ============================================
// POLICIES PAGE DATA
// ============================================
const policiesPageData = {
  _id: 'policiesPage',
  _type: 'policiesPage',
  heroTitle: 'Hotel Policies',
  heroSubtitle: 'While our hotel policies are thoughtfully implemented, if there is a safe and responsible way to work together to make your stay that much more comfortable and enjoyable, please do not hesitate to reach out to us. We love finding solutions to meet your needs!',
  policies: [
    {
      _key: 'check-in',
      title: 'Check-in + Check-out',
      content: '',
      bulletPoints: [
        'Check-In: 4:00 PM',
        'Check-Out: 10:00 AM',
        'Late Check-Out Hour: 11:00 AM',
        'Late check-out (after 10:00 AM and before 11:00 AM) may result in a $10 fee.'
      ],
      isHighlighted: false
    },
    {
      _key: 'pricing',
      title: 'Pricing',
      content: 'Room and bed rates are nightly and based on occupancies described in the room types visible when booking. All room rates include at least double occupancies (2 adults) and two children under age 2. Taxes and fees are subject to change, are not displayed in the room rate, and will be applied to the total booking amount at checkout.',
      isHighlighted: false
    },
    {
      _key: 'smoking',
      title: 'Smoking and Alcohol',
      content: 'You must be 21 years of age to drink alcohol on property. Drinking is allowed, drunkenness is not. Consumption of outside alcohol on the property is prohibited.\n\nKinship Landing is a non-smoking property. An additional $500 cleaning fee will automatically be applied to any room that has been smoked in. Public areas where smoking is allowed are nearby.\n\nMarijuana is not tolerated on the premises, but we will gladly point you in the right direction. #coloradomountainhigh',
      isHighlighted: false
    },
    {
      _key: 'pets',
      title: 'Pets',
      content: "Up to two dogs under 80lbs each may be added to your booking for an additional $49/night fee. Check for the pet-friendly icon when booking dog-friendly Jr. Queen rooms, each on the pet-friendly second floor. Due to allergies, cats are not allowed on property. If you have other types of pets you wish to bring, contact us before booking. We've always wanted to host a flying squirrel. Please request a copy of our pet policy for more info.\n\nEmotional support animals (ESA's) are not covered under the ADA as certified service animals. All guests with ESA's are welcome to stay in one of our pet-friendly second floor Jr. Queen Suites for a $49/night fee. All pet-friendly rooms are subject to availability.",
      isHighlighted: false
    },
    {
      _key: 'parking',
      title: 'Parking and Dropoff',
      content: 'On-site overnight parking is available for overnight guests for $18.99 plus a $0.99 service fee for up to 24 hours, including in and out privileges. We reserve select spaces for overnight guests, so please look for the signs indicating those spots when you pull in.\n\nWe have partnered with Metropolis to manage our parking lot. To park on site, you will need to create a Metropolis user account, which we recommend you do in advance of your arrival. When you arrive at Kinship, please scan the QR code posted in the parking lot to begin your session.\n\nThe hotel is not responsible for theft or damage to vehicles or contents of vehicles parked on site nor in nearby public parking areas. Street parking is available around the building on Nevada Avenue and Costilla Street, with meters costing $1-1.50 per hour. City parking garages are located at 130 S Nevada Ave., 120 E Kiowa St., and 117 N Nevada Ave.',
      isHighlighted: false
    },
    {
      _key: 'events',
      title: 'Events',
      content: 'Please contact us at events@kinshiplanding.com to discuss throwing an epic party at Kinship Landing. See our events page for more information.',
      isHighlighted: false
    },
    {
      _key: 'minors',
      title: 'Minors and Children',
      content: 'Reservations by anyone under the age of 18 are not permitted. Minors under age 18 may stay in the hotel with a guardian on property. With the exceptions of shared bunkrooms, children under two are included in booking. The number of children included depends on the room booked. Contact us for more info or if we can help make your stay with children more comfortable.',
      isHighlighted: false
    },
    {
      _key: 'locker',
      title: 'Locker Policy',
      content: "Lockers are available on the main level as well as in all shared bunkrooms. Main Level lockers, some containing charging ports, are available for up to 6 hours at a time unless otherwise arranged. Please see the front desk for access.\n\nAll lockers are property of Kinship Landing. At no time does the property relinquish its exclusive control of lockers which are assigned to its guests for convenience and temporary use. Guests are responsible for any items placed in the lockers and Kinship Landing will not be responsible for the loss or damage of goods under any conditions. Furthermore, guests are prohibited to store any drugs, alcohol, illegal substances, firearms, explosives, chemicals, food or live animals in lockers. Items that are, in the opinion of Kinship Landing, hazardous or could cause a nuisance to the property, staff, or guests may be refused, destroyed or removed at the user's expense without the user being entitled to enforce any claim to the items at any time thereafter.\n\nInspection of the interior of lockers may be conducted by Kinship Landing, for any reason at any time, without notice, without guest consent, and without a search warrant. The personal possessions of guests within a Kinship Landing locker may be searched when reasonable suspicion that the search will uncover evidence of a violation of state or federal law or property policy exists. As soon as practical before the search of a locker, notice of the search will be informed to the guest before lockers will be searched unless disclosure would impede an investigation.\n\nAny material left in a locker after the assignment ceases will be removed and secured by Kinship Landing. These items will be stored at the Front Desk for up to 24 hours, after which all unclaimed items will become property of Kinship Landing.",
      isHighlighted: false
    },
    {
      _key: 'cancellation',
      title: 'Deposit and Cancellation',
      content: "The card used to book your reservation will be authorized $50 upon arrival for potential incidentals to include, but not limited to, food and beverage, on-site parking, optional amenities, smoking fees and damages. If incidentals are incurred, payment will be taken upon your departure.\n\nAll cancellations must be made by contacting us directly by phone or email at 719-203-9309 or stay@kinshiplanding.com.\n\nIndividual reservations which are part of a group contract, reservations booked with a nonrefundable promotion and some other reservation types, a full refund will be honored for cancellations made at least 48 hours prior to check in time. Cancellations within 48 hours of check in will be charged one night's stay plus any associated fees and taxes. Reservations made with a non refundable promotion may be cancelled but may not be refunded. Reservations made as part of a group reservation, room block, using a promo code or group code, and some specials, discounts, and event reservations may be subject to alternate cancellation policies per contract or promotion policy.",
      bulletPoints: [
        '0% Due - 180+ days before check-in',
        '20% Due - 90-179 days before check-in',
        '40% Due - 60-89 days before check-in',
        '60% Due - 30-59 days before check-in',
        '100% Due - 0-29 days before check-in'
      ],
      isHighlighted: true
    }
  ],
  contactTitle: 'Questions About Our Policies?',
  contactText: "If you have questions or need clarification about any of our policies, we're here to help:",
  contactEmail: 'hello@kinshiplanding.com',
  contactPhone: '(719) 203-9309',
  seoTitle: 'Hotel Policies | Kinship Landing',
  seoDescription: 'Review hotel policies including check-in, check-out, parking, pets, cancellations and more at Kinship Landing in Colorado Springs.'
};

// ============================================
// PRIVACY PAGE DATA
// ============================================
const privacyPageData = {
  _id: 'privacyPage',
  _type: 'privacyPage',
  heroTitle: 'Privacy Policy',
  heroSubtitle: 'Kinship Landing values your privacy.',
  paragraph1: 'We want you to be confident in using this site to make your online reservations at our boutique hotel in Colorado Springs, Colorado. And we are very much aware of your concerns about the privacy of your information. So rest assured, we have no desire or intent to infringe on your privacy. We will not provide your personal information to anyone else. When you submit your personal information such as name, address, email address and telephone number, we will not give or sell this information to any outside company for any use. This information you provide will be kept confidential and will be used only to support your customer relationship with us. We have appropriate security measures in place to protect against the loss, misuse or alteration of information we have collected from you at our site.',
  paragraph2: 'All of the information contained in this website, including the site design, graphics and text, are the copyrighted property of Kinship Landing. Any other trademarks, company names, product names and/or logos set forth in this website are the property of their respective owners.',
  contactTitle: 'Questions About Privacy?',
  contactText: "If you have any questions or concerns about our privacy policy, please don't hesitate to contact us:",
  contactEmail: 'hello@kinshiplanding.com',
  contactPhone: '(719) 203-9309',
  contactAddress: '415 S Nevada Ave, Colorado Springs, CO 80903',
  seoTitle: 'Privacy Policy | Kinship Landing',
  seoDescription: 'Learn how Kinship Landing protects your privacy and personal information.'
};

// ============================================
// CAREERS PAGE DATA
// ============================================
// ============================================
// COMMUNITY PAGE DATA
// ============================================
const communityPageData = {
  _id: 'communityPage',
  _type: 'communityPage',
  heroTitle: 'Community Events',
  heroSubtitle: 'Join us for gatherings, workshops, and experiences that bring our community together',
  introText: 'Join us for gatherings, workshops, and experiences that bring our community together. Click any flyer below to view full details.',
  description: 'Kinship Landing hosts regular community events in downtown Colorado Springs.',
  seoTitle: 'Community Events | Kinship Landing',
  seoDescription: 'Join Kinship Landing for community events, gatherings, workshops, and experiences that bring the Colorado Springs community together.'
};

const careersPageData = {
  _id: 'careersPage',
  _type: 'careersPage',
  heroTitle: "Let's Work Together!",
  heroSubtitle: 'Careers at Kinship Landing & Homa Cafe and Bar',
  introTitle: 'Ready for outrageous hospitality?!',
  introText: 'Do you crave the freedom to use your hospitality superpowers to make a lasting impact? We are a values-driven startup that is fueled by courage, trust, generosity, community and adventure.',
  whyJoinTitle: 'Why Join our Team',
  whyJoinReasons: [
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
  ],
  benefitsTitle: 'Other Benefits Include',
  benefitsList: [
    'Hotel & Restaurant Discounts',
    'Paid Volunteer days for hotel team members',
    'Transferable skills',
    'Professional certification trainings',
    'Adventure credits for hotel team members'
  ],
  seoTitle: 'Careers | Kinship Landing',
  seoDescription: 'Join the Kinship Landing team in Colorado Springs. Work-life balance, career growth, and outrageous hospitality await.'
};

async function seedPages() {
  console.log('Seeding legal pages and careers page...\n');

  try {
    // Seed Accessibility Page
    console.log('1. Seeding Accessibility Page...');
    await client.createOrReplace(accessibilityPageData);
    console.log('   ✓ Accessibility Page seeded');

    // Seed Policies Page
    console.log('2. Seeding Policies Page...');
    await client.createOrReplace(policiesPageData);
    console.log('   ✓ Policies Page seeded');

    // Seed Privacy Page
    console.log('3. Seeding Privacy Page...');
    await client.createOrReplace(privacyPageData);
    console.log('   ✓ Privacy Page seeded');

    // Seed Careers Page
    console.log('4. Seeding Careers Page...');
    await client.createOrReplace(careersPageData);
    console.log('   ✓ Careers Page seeded');

    // Seed Community Page
    console.log('5. Seeding Community Page...');
    await client.createOrReplace(communityPageData);
    console.log('   ✓ Community Page seeded');

    console.log('\n✅ All pages seeded successfully!');
    console.log('\nView in Sanity Studio:');
    console.log('  - Accessibility: https://kinship-landing.sanity.studio/structure/accessibilityPage');
    console.log('  - Policies: https://kinship-landing.sanity.studio/structure/policiesPage');
    console.log('  - Privacy: https://kinship-landing.sanity.studio/structure/privacyPage');
    console.log('  - Careers: https://kinship-landing.sanity.studio/structure/careersPage');
    console.log('  - Community: https://kinship-landing.sanity.studio/structure/communityPage');

  } catch (error) {
    console.error('Error seeding pages:', error.message);
    process.exit(1);
  }
}

seedPages();
