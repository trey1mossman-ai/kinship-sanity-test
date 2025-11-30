/**
 * Type definitions for the enhanced Hero section
 * Purpose: Provide type safety and clear contracts for hero components
 */

export interface Review {
  source: string;
  name: string;
  date: string;
  rating: number;
  quote: string;
}

export interface ReviewItem {
  id: string;
  type: 'review' | 'statement';
  content: string;
  author?: string;
  rating?: number;
  source?: string;
  date?: string;
}

export interface BackgroundMediaProps {
  type: 'image' | 'video';
  source: string;
  fallback?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export interface BookingWidgetProps {
  className?: string;
  onBookingInitiated?: (data: BookingData) => void;
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: string;
  rooms: string;
  promo?: string;
}