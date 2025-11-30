import seedData from '../data/reviews.seed.json';

export interface ReviewsData {
  meta: {
    googleRating: number;
    googleReviewCountApprox: number;
    bbb: {
      rating: string;
      accreditedSince: string;
    };
    expedia: {
      label: string;
      score: number;
      reviewCountApprox: number;
      distribution: {
        excellent: number;
        good: number;
        okay: number;
        poor: number;
        terrible: number;
      };
    };
  };
  themes: string[];
  reviews: Array<{
    source: string;
    name: string;
    rating: number;
    quote: string;
    url: string;
    date?: string;
  }>;
}

/**
 * Fetch Google Reviews data for a given place ID
 * 
 * TODO: Replace with actual Google Places API integration
 * 
 * @param placeId - Google Places API place ID
 * @returns Promise resolving to reviews data
 */
export async function fetchGoogleReviews(placeId: string): Promise<ReviewsData> {
  const useSeed = process.env.NEXT_PUBLIC_USE_SEED === 'true';
  const googlePlaceId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || placeId;

  // If explicitly using seed data or no place ID provided
  if (useSeed || !googlePlaceId) {
    console.log('[fetchGoogleReviews] Using seed data');
    return seedData as ReviewsData;
  }

  try {
    // TODO: Implement Google Places API call
    /*
    const response = await fetch(`/api/reviews?placeId=${googlePlaceId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Transform Google Places API response to match our seed structure
    return transformGooglePlacesData(data);
    */

    // For now, simulate API delay and return seed data
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log(`[fetchGoogleReviews] Would fetch data for place ID: ${googlePlaceId}`);
    return seedData as ReviewsData;

  } catch (error) {
    console.warn('[fetchGoogleReviews] API call failed, falling back to seed data:', error);
    return seedData as ReviewsData;
  }
}

/**
 * Transform Google Places API response to our internal format
 * TODO: Implement this function when integrating with actual API
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function transformGooglePlacesData(apiResponse: any): ReviewsData {
  // This would transform the Google Places API response
  // to match our ReviewsData interface
  return seedData as ReviewsData;
}

/**
 * Hook for using reviews data in React components
 * 
 * TODO: Replace with proper data fetching hook (SWR, React Query, etc.)
 */
export function useReviews(placeId?: string) {
  // For now, return seed data synchronously
  // In production, this would be an async hook
  return {
    data: seedData as ReviewsData,
    isLoading: false,
    error: null
  };
}