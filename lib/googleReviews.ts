import reviewsSeed from '../data/reviews.seed.json';

export interface GoogleReviewsData {
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
 * Fetches Google Reviews data for a given place ID
 * Currently returns seed data, but will be replaced with Google Places API integration
 * 
 * @param placeId - Google Places API place ID
 * @returns Promise resolving to reviews data matching the seed structure
 */
export async function fetchGoogleReviews(placeId?: string): Promise<GoogleReviewsData> {
  // Check for environment override
  const envPlaceId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
  const targetPlaceId = placeId || envPlaceId;

  try {
    // TODO: Replace with actual Google Places API call
    // const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${targetPlaceId}&fields=name,rating,reviews&key=${process.env.GOOGLE_PLACES_API_KEY}`);
    // const data = await response.json();
    
    // For now, return seed data with a small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Log the place ID that would be used (for debugging)
    if (targetPlaceId) {
      console.log(`[fetchGoogleReviews] Using place ID: ${targetPlaceId}`);
    }
    
    return reviewsSeed as GoogleReviewsData;
  } catch (error) {
    console.warn('[fetchGoogleReviews] API call failed, falling back to seed data:', error);
    
    // Always fall back to seed data if fetch fails
    return reviewsSeed as GoogleReviewsData;
  }
}

/**
 * Hook for easily using reviews data in components
 */
export function useGoogleReviews(placeId?: string) {
  // This would typically use React Query or SWR for caching
  // For now, we'll return the seed data directly
  return {
    data: reviewsSeed as GoogleReviewsData,
    isLoading: false,
    error: null,
  };
}