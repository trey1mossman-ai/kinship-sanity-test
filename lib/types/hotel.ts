export interface Room {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  thumbnail: string;
  panorama360?: string;
  capacity: {
    adults: number;
    children: number;
  };
  size: number;
  bedType: string;
  amenities: string[];
  features: string[];
  available: boolean;
}

export interface BookingData {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  promoCode?: string;
  rooms?: number;
}

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'wellness' | 'dining' | 'business' | 'leisure' | 'accessibility';
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export interface Policy {
  id: string;
  title: string;
  content: string;
  category: 'general' | 'cancellation' | 'payment' | 'children' | 'pets' | 'smoking';
}