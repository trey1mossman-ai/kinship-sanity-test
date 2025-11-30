export interface RoomTeaser {
  id: string;
  name: string;
  slug: string;
  category: 'suites' | 'junior' | 'family' | 'specialty';
  heroImage: string;
  galleryImages?: string[]; // Additional images for room detail pages
  features: string[];
  description: string;
  price: number;
}

export const roomTeasers: RoomTeaser[] = [
  // 1. Mountain King Suite
  {
    id: 'mountain-king-suite',
    name: 'Mountain King Suite',
    slug: 'mountain-king-suite',
    category: 'suites',
    heroImage: '/images/Rooms Page:section/Mountain King Suite/MountainKingSuite-RichardSeldomridge (1)-optimized.webp',
    galleryImages: [
      '/images/Rooms Page:section/Mountain King Suite/MountainKingSuite-RichardSeldomridge (1)-optimized.webp',
      '/images/Rooms Page:section/Mountain King Suite/MountainKingSuite-RichardSeldomridge (3)-optimized.webp',
      '/images/Rooms Page:section/Mountain King Suite/MountainKingSuite-RichardSeldomridge (5)-optimized.webp',
      '/images/Rooms Page:section/Mountain King Suite/MountainKingSuite-RichardSeldomridge (6)-optimized.webp',
      '/images/Rooms Page:section/Mountain King Suite/MountainKingSuite-RichardSeldomridge (7)-optimized.webp',
      '/images/Rooms Page:section/Mountain King Suite/MountainKingSuite-RichardSeldomridge (8)-optimized.webp'
    ],
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
    description: 'Take in breathtaking views through an overhead garage door, opening to Rocky Mountain vistas and crisp Colorado air. Cozy, inspiring, and luxurious, cozy up with ridiculously comfortable beds, free-standing soaking tub, and a soothing fireplace.',
    price: 309
  },
  // 2. King Suite
  {
    id: 'king-suite',
    name: 'King Suite',
    slug: 'king-suite',
    category: 'suites',
    heroImage: '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (1) (1)-optimized.webp',
    galleryImages: [
      '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (1) (1)-optimized.webp',
      '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (2)-optimized.webp',
      '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (3)-optimized.webp',
      '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (4)-optimized.webp',
      '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (5)-optimized.webp',
      '/images/Rooms Page:section/King Suite/CityKingSuite-RichardSeldomridge (6)-optimized.webp'
    ],
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
    description: 'Take coziness to the next level in uniquely designed King suites. Enjoy ridiculously comfortable beds, free-standing soaking tub, soothing fireplace, and an overhead garage door that opens to crisp Colorado air. Take a deep breath, you\'ve made it.',
    price: 289
  },
  // 3. Executive King Suite
  {
    id: 'executive-king-suite',
    name: 'Executive King Suite',
    slug: 'executive-king-suite',
    category: 'suites',
    heroImage: '/images/Rooms Page:section/executive-king/exec-king-3-optimized.webp',
    galleryImages: [
      '/images/Rooms Page:section/executive-king/exec-king-3-optimized.webp',
      '/images/Rooms Page:section/executive-king/exec-king-4-optimized.webp',
      '/images/Rooms Page:section/executive-king/exec-king-2-optimized.webp'
    ],
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
    description: 'Superbly inviting King Bed, adjustable sit or stand desk work station, and a curated sitting area, all set in inspiring touches and luxury comfort. Our Executive King Suites are designed with the guest who needs a space to be productive and enjoyed by any looking for an inviting, spacious, and practical place to hunker down comfortably.',
    price: 329
  },
  // 4. Mountain Queen Balcony Suite
  {
    id: 'queen-balcony-suite',
    name: 'Mountain Queen Balcony Suite',
    slug: 'queen-balcony-suite',
    category: 'suites',
    heroImage: '/images/Rooms Page:section/Queen Balcony Suite/MountainQueenBalconySuite-AshleeKay (1)-optimized.webp',
    galleryImages: [
      '/images/Rooms Page:section/Queen Balcony Suite/MountainQueenBalconySuite-AshleeKay (1)-optimized.webp',
      '/images/Rooms Page:section/Queen Balcony Suite/MountainQueenBalconySuite-RichardSeldomridge (1)-optimized.webp',
      '/images/Rooms Page:section/Queen Balcony Suite/MountainQueenBalconySuite-AshleeKay-optimized.webp',
      '/images/Rooms Page:section/Queen Balcony Suite/MountainQueenBalconySuite-AshleeKay (2)-optimized.webp',
      '/images/Rooms Page:section/Queen Balcony Suite/MountainQueenBalconySuite-AshleeKay (4)-optimized.webp',
      '/images/Rooms Page:section/Queen Balcony Suite/MountainQueenBalconySuite-RichardSeldomridge-optimized.webp'
    ],
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
    description: 'Rest easy in a cozy Queen bed or one of two twin trundle bed Tuft and Needle mattress adorned with luxury Brooklinen sheets. All Kinship\'s charming style finishes in one of only three rooms with a spacious balcony, rocking chairs and absolutely breathtaking views of Pikes Peak and the Rocky Mountains. Spacious, comfy, and inspiring.',
    price: 249
  },
  // 5. Double Queen Balcony Suite
  {
    id: 'double-queen-balcony-suite',
    name: 'Double Queen Balcony Suite',
    slug: 'double-queen-balcony-suite',
    category: 'suites',
    heroImage: '/images/Rooms Page:section/Double Queen Balcony/DoubleQueenSuite-RichardSeldomridge-optimized.webp',
    galleryImages: [
      '/images/Rooms Page:section/Double Queen Balcony/DoubleQueenSuite-RichardSeldomridge-optimized.webp',
      '/images/Rooms Page:section/Double Queen Balcony/double-queen-balcony-suite-optimized.webp',
      '/images/Rooms Page:section/Double Queen Balcony/DoubleQueenBalconySuite-AshleeKay (1)-optimized.webp',
      '/images/Rooms Page:section/Double Queen Balcony/DoubleQueenBalconySuite-AshleeKay (2)-optimized.webp',
      '/images/Rooms Page:section/Double Queen Balcony/DoubleQueenBalconySuite-AshleeKay (3)-optimized.webp',
      '/images/Rooms Page:section/Double Queen Balcony/DoubleQueenBalconySuite-RichardSeldomridge-optimized.webp',
      '/images/Rooms Page:section/Double Queen Balcony/DoubleQueenBalconySuite-GregCeo-optimized.webp'
    ],
    features: [
      'Tuft and Needle Mattress',
      'Brooklinen sheets and towels',
      'Overhead Garage Door',
      'Spacious outdoor balcony',
      'Kettle, Microwave, Mini Chiller',
      '50" HD smart TV',
      'Freaky fast Wifi'
    ],
    description: 'Snuggle up in two charmingly designed double queen beds and enjoy the sunrise on a spacious balcony and rocking chairs with fresh Mountain air and soothing in room tea and coffee. Double Queen Balcony Suites are clean, functional, and spacious with all of Kinship\'s custom finishes and luxurious touches.',
    price: 269
  },
  // 6. Mountain Double Queen Suite
  {
    id: 'mountain-double-queen',
    name: 'Mountain Double Queen Suite',
    slug: 'mountain-double-queen',
    category: 'suites',
    heroImage: '/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-RichardSeldomridge (4)-optimized.webp',
    galleryImages: [
      '/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-RichardSeldomridge (4)-optimized.webp',
      '/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-RichardSeldomridge (1)-optimized.webp',
      '/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-RichardSeldomridge (2) (1)-optimized.webp',
      '/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-RichardSeldomridge (3)-optimized.webp',
      '/images/Rooms Page:section/Mountain Double Queen/MountainDoubleQueenSuite-AshleeKay (4)-optimized.webp'
    ],
    features: [
      'Two queen beds',
      'Mountain views',
      'Extra space',
      'Premium amenities'
    ],
    description: 'Two queen beds with stunning mountain views and extra space.',
    price: 279
  },
  // 7. Mountain Jr Queen
  {
    id: 'mountain-jr-queen',
    name: 'Mountain Jr Queen',
    slug: 'mountain-jr-queen',
    category: 'junior',
    heroImage: '/images/Rooms Page:section/Mountain Jr. Queen/MountainJrQueenSuite-RichardSeldomridge-optimized.webp',
    galleryImages: [
      '/images/Rooms Page:section/Mountain Jr. Queen/MountainJrQueenSuite-RichardSeldomridge-optimized.webp',
      '/images/Rooms Page:section/Mountain Jr. Queen/JrQueenSuite-GregCeo-optimized copy.webp',
      '/images/Rooms Page:section/Mountain Jr. Queen/JrQueenSuite-RichardSeldomridge-optimized copy.webp'
    ],
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
    description: 'Our Mountain Junior Queen rooms are designed with travelers in mind. Enjoy mountain views, boutique art and decor, extremely comfy bed fitted with Tuft and Needle mattress and Brooklinen luxury sheets, a sit or stand built in desk, and handpicked essentials, this room is everything you need for a memorable stay, and nothing you don\'t! Bring those furry friends along, with pet-friendly upgrades available in this room type.',
    price: 189
  },
  // 8. Jr Queen
  {
    id: 'jr-queen-suite',
    name: 'Jr Queen',
    slug: 'jr-queen-suite',
    category: 'junior',
    heroImage: '/images/Rooms Page:section/Jr. Queen/junior-queen-suite-optimized.webp',
    galleryImages: [
      '/images/Rooms Page:section/Jr. Queen/junior-queen-suite-optimized.webp',
      '/images/Rooms Page:section/Jr. Queen/JrQueenSuite-GregCeo-optimized.webp',
      '/images/Rooms Page:section/Jr. Queen/JrQueenSuite-GregCeo (2)-optimized.webp',
      '/images/Rooms Page:section/Jr. Queen/JrQueenSuite-RichardSeldomridge-optimized.webp',
      '/images/Rooms Page:section/Jr. Queen/JrQueenSuite-RichardSeldomridge (1)-optimized.webp'
    ],
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
    description: 'Our Junior Queen rooms are designed with travelers in mind. Enjoy sliding door to fresh air, boutique art and decor, extremely comfy bed fitted with Tuft and Needle mattress and Brooklinen luxury sheets, a sit or stand built in desk, and handpicked essentials, this room is everything you need for a memorable stay, and nothing you don\'t! Bring those furry friends along, with pet-friendly upgrades available in this room type.',
    price: 179
  },
  // 9. Family Suite
  {
    id: 'family-suite',
    name: 'Family Suite',
    slug: 'family-suite',
    category: 'family',
    heroImage: '/images/Rooms Page:section/Family Suite/AK_03363-optimized.webp',
    galleryImages: [
      '/images/Rooms Page:section/Family Suite/AK_03363-optimized.webp',
      '/images/Rooms Page:section/Family Suite/Bunkroom-RichardSeldomridge (1)-optimized.webp',
      '/images/Rooms Page:section/Family Suite/Bunkroom-RichardSeldomridge (2)-optimized.webp',
      '/images/Rooms Page:section/Family Suite/Family-Suite-AshleeKay-4-optimized.webp',
      '/images/Rooms Page:section/Family Suite/Family-Suite-AshleeKay-5-optimized.webp',
      '/images/Rooms Page:section/Family Suite/family-suite-6.webp'
    ],
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
    description: 'These delightfully functional and tiny rooms sleep six full grown guests, all with Kinship comfort, cleanliness, and tasteful design. In room access to two sinks and toilets plus a shower in room and another down the hall, Family Suites make great wedding party rooms, large family suites, or a place for a group of pals to crash in style.',
    price: 349
  },
  // 10. Camp Deck
  {
    id: 'camp-deck',
    name: 'Camp Deck',
    slug: 'camp-deck',
    category: 'specialty',
    heroImage: '/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge-optimized.webp',
    galleryImages: [
      '/images/Rooms Page:section/Camp Deck/CampDeck-RichardSeldomridge-optimized.webp',
      '/images/Rooms Page:section/Camp Deck/CampDeck-SamStarrMedia-optimized.webp',
      '/images/Rooms Page:section/Camp Deck/CampDeck-SamStarrMedia (2)-optimized.webp'
    ],
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
    description: 'Urban camping in the heart of Downtown Colorado Springs for up to six people! The camping room is just that: your own personal campsite. The best part about camping here? Unlike the wilderness, this room includes a private three piece bathroom with sink, shower, toilet and soft Brooklinen towels. Four stories up and open to the elements and sky, this camp spot provides great views of Pikes Peak, Cheyenne Mountain, and the Front Range. Bring your own camping gear! *GEAR PICTURED NOT INCLUDED.',
    price: 199
  }
];