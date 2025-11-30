export type FAQItem = {
  id: string;
  question: string;
  answer_short: string;
  answer_long: string;
  updated_at: string;
  sources: string[];
};

export type HotelFacts = {
  checkin: string;
  checkout: string;
  parking: string;
  pets: string;
  dining: string;
  location?: string;
};

export const hotelFacts: HotelFacts = {
  checkin: 'Check-in 4:00 PM',
  checkout: 'Check-out 10:00 AM',
  parking: 'On-site parking $18.99 + $0.99',
  pets: 'Dogs OK (≤80 lb, fee applies)',
  dining: 'Homa Café + Bar on-site',
  location: 'Downtown Colorado Springs',
};

// Updated 2025-10-27 America/Denver
export const faqs: FAQItem[] = [
  {
    id: 'check-in-out',
    question: 'What are the check-in and check-out times at Kinship Landing?',
    answer_short: 'Check-in starts at 4:00 PM and check-out is at 10:00 AM.',
    answer_long: 'Need a little more time? Late check-out until 11:00 AM is available for a $10 fee.\nAll times are in Mountain Time (America/Denver).\nArriving late? Just give our front desk a heads-up so we can expect you.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel policies'],
  },
  {
    id: 'parking',
    question: 'Is parking available on-site and how much does it cost?',
    answer_short: 'Yes, on-site overnight parking is available for $18.99 plus a $0.99 service fee per 24 hours.',
    answer_long: 'Parking is managed through Metropolis. Scan the QR code when you arrive to start your session.\nIn and out privileges are included, and rates may change from time to time.\nStreet and city garage options are nearby if you prefer to park off-site.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel policies'],
  },
  {
    id: 'pets',
    question: 'Do you allow pets?',
    answer_short: 'Dogs are welcome, up to two per room, 80 pounds each, for $49 per night. Sorry, no cats.',
    answer_long: 'Pet-friendly Jr. Queen rooms are available on the second floor, pending availability.\nService animals, as defined by the ADA, are always welcome.\nESAs are treated as pets under our policy.\nWhen you book, let us know your pup is coming so we can get you set up right.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel policies'],
  },
  {
    id: 'pool',
    question: 'Does Kinship Landing have a pool?',
    answer_short: 'No, Kinship Landing does not have a pool.',
    answer_long: 'We are more about connection than cannonballs.\nThink social spaces, local coffee, a lively bar, and plenty of room to swap stories after a day of exploring downtown or the trails.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel amenities'],
  },
  {
    id: 'accessibility',
    question: 'Is Kinship Landing accessible for guests with disabilities?',
    answer_short: 'Yes, Kinship Landing offers wheelchair access and rooms with accessibility features.',
    answer_long: 'If you need an ADA-accessible room, let us know when booking so we can match you with the best fit.\nPublic areas include accessible routes, and our team is always happy to help with directions or extra assistance.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel & partner listings'],
  },
  {
    id: 'payment-methods',
    question: 'Which payment methods are accepted?',
    answer_short: 'We accept major credit cards, including American Express, Visa, and Mastercard.',
    answer_long: 'A card and photo ID are required at check-in.\nCash policies can vary, so give the front desk a quick call if you would like to confirm before arriving.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Partner listing'],
  },
  {
    id: 'in-room-amenities',
    question: 'What in-room amenities can I expect?',
    answer_short: 'Every room includes essentials like A/C and a flat-screen TV, and some feature a balcony.',
    answer_long: 'Room layouts vary by type, so double-check your selection for exact details.\nAll rooms are non-smoking, and outside alcohol is not allowed on property.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel & partner listings; policies'],
  },
  {
    id: 'dining',
    question: 'Is there on-site dining or breakfast?',
    answer_short: 'Yes, Homa Café + Bar serves breakfast, daytime fare, and evening drinks right on-site.',
    answer_long: 'Grab coffee and breakfast in the lobby café, or enjoy the full Homa menu throughout the day.\nWant to explore? Downtown Colorado Springs has excellent local spots just a short walk away. Our team is happy to share their favorites.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel site; TripAdvisor amenities'],
  },
  {
    id: 'nearby-attractions',
    question: 'What attractions are close to Kinship Landing?',
    answer_short: 'Downtown favorites within a few blocks include the Pioneers Museum and Alamo Square Park.',
    answer_long: 'Bar-K is about 0.06 miles away, and the city center is about 0.4 miles from our door.\nOur team is full of locals who love to share the best hikes, trails, and hidden-gem spots around Colorado Springs.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['TripAdvisor – Nearby'],
  },
  {
    id: 'business-services',
    question: 'Do you have spaces for meetings or events?',
    answer_short: 'Yes, we have flexible meeting rooms and event spaces available.',
    answer_long: 'Check out the Events page for room capacities and details, or contact our team for layouts and A/V setup.\nPlanning something big? Group buyouts are available with a little notice.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['TripAdvisor amenities; hotel site'],
  },
  {
    id: 'smoking-alcohol',
    question: 'What are the smoking and alcohol policies?',
    answer_short: 'Kinship Landing is 100% non-smoking, and outside alcohol is not permitted.',
    answer_long: 'Smoking in rooms results in a $500 cleaning fee.\nYou must be 21 or older to drink.\nFor a local pour or crafted cocktail, visit Homa Café + Bar. We will mix you something good.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel policies'],
  },
  {
    id: 'location-getting-around',
    question: 'Where is Kinship Landing, and how walkable is the area?',
    answer_short: 'You will find us at 415 S Nevada Ave in downtown Colorado Springs. It is walkable to dining, parks, and museums.',
    answer_long: 'We are right in the middle of it all, a perfect base for exploring the city.\nAsk our team for local picks or favorite routes.\nIf you are driving, there are city garages and metered street spots nearby.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel site; TripAdvisor – Location'],
  },
];
