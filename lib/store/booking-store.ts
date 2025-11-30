import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookingData } from '@/lib/types/hotel';

interface BookingStore {
  bookingData: BookingData;
  recentSearches: BookingData[];
  setBookingData: (data: Partial<BookingData>) => void;
  addRecentSearch: (search: BookingData) => void;
  clearRecentSearches: () => void;
  resetBooking: () => void;
}

const defaultBookingData: BookingData = {
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  rooms: 1,
  promoCode: '',
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookingData: defaultBookingData,
      recentSearches: [],
      
      setBookingData: (data) =>
        set((state) => ({
          bookingData: { ...state.bookingData, ...data },
        })),
      
      addRecentSearch: (search) =>
        set((state) => ({
          recentSearches: [
            search,
            ...state.recentSearches.filter(
              (s) =>
                s.checkIn?.getTime() !== search.checkIn?.getTime() ||
                s.checkOut?.getTime() !== search.checkOut?.getTime()
            ),
          ].slice(0, 5), // Keep only last 5 searches
        })),
      
      clearRecentSearches: () =>
        set(() => ({
          recentSearches: [],
        })),
      
      resetBooking: () =>
        set(() => ({
          bookingData: defaultBookingData,
        })),
    }),
    {
      name: 'booking-storage',
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
);