export type FAQItem = {
  id: string;
  question: string;
  answer_short: string;
  answer_long: string;
  updated_at: string;
  sources: string[];
};

// Room-specific FAQs - Updated 2025-10-27
export const roomsFaqs: FAQItem[] = [
  {
    id: 'how-to-book',
    question: 'How can I book a room at Kinship Landing?',
    answer_short: 'Book direct on our website, email stay@kinshiplanding.com, or call us at (719) 203-9309.',
    answer_long: 'Book direct through our website for the best rates.\nYou can also email us at stay@kinshiplanding.com with questions or special requests.\nPrefer to talk it through? Give us a call at (719) 203-9309 to connect with our team.\nSign up for our email newsletter to get first dibs on special offers.\nFor events or group travel, fill out the group booking form or email groups@kinshiplanding.com.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel policies'],
  },
  {
    id: 'kids-occupancy',
    question: 'Are kids included in room occupancy?',
    answer_short: 'Yes, two children under age two are included in room occupancy at no extra charge.',
    answer_long: 'Two children under age two stay free with your booking.\nWe can provide cribs, playground recommendations, and kid-friendly activities around town.\nFamily-friendly room options include:\nDouble Queen Balcony Suite, two beds plus balcony\nMountain Queen Balcony Suite, queen bed plus two trundles and mountain view balcony\nJr. Queen + Bunk Suite, lofted bed over main queen\nFamily Suites, queen bed for parents plus bunks for kids in one room',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel policies'],
  },
  {
    id: 'ada-accessible',
    question: 'Do you have ADA-accessible room options?',
    answer_short: 'Yes, we offer ADA-accessible options for every room type with first-floor accessibility.',
    answer_long: 'Every room type at Kinship Landing has an ADA-accessible option.\nOur first-floor layout is designed with accessibility in mind.\nWe worked with Olympic athletes, state representatives, and accessibility experts to get the details right.\nWe are always open to learning and improving the ADA experience.\nLet us know during booking so we can make sure your space fits your needs perfectly.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel policies'],
  },
  {
    id: 'camp-deck-room',
    question: 'What is the story on the Camp Deck Room?',
    answer_short: 'One private outdoor camping room for up to six people at $89 per night plus tax.',
    answer_long: 'The Camp Deck Room is one private camping space that fits up to six adults and two children under two.\nBring your own tent and camping gear, or rent hammocks from us.\nThe space includes a flat turf surface, heated bathroom with shower, Bluetooth speaker, secure door lock, and Pikes Peak views.\nYou will also have a covered overhang and access to indoor restrooms.\nHoma Café + Bar is just a short staircase away.\nNo pets are allowed to help keep the space pristine.\nA $50 cleaning fee applies if you leave it messy, following Leave No Trace principles.\nIt is the perfect way to practice your backcountry skills while still enjoying a few comforts.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Hotel policies'],
  },
  {
    id: 'room-availability',
    question: 'Why cannot I book a certain room type on certain dates?',
    answer_short: 'Our booking platform shows real-time availability. If a room type is not listed, it is already booked.',
    answer_long: 'Our online system shows all available rooms in real time.\nWe only have 41 private rooms, and they book fast.\nIf your preferred room type is not showing, it means it is already reserved for those dates.\nTry adjusting your dates or reach out to our team for alternate options.',
    updated_at: '2025-10-27T00:00:00-06:00',
    sources: ['Booking system'],
  },
];
