'use client';

import { ReviewStats } from '@/components/social-proof/ReviewStats';
import { ReviewCarousel } from '@/components/social-proof/ReviewCarousel';

interface SocialProofSectionProps {
  reviewsData: {
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
  };
}

export function SocialProofSection({ reviewsData }: SocialProofSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-kinship-grayBg">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 
            className="font-serif font-bold text-kinship-text mb-6"
            style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.01em' 
            }}
          >
            What Our Guests Say
          </h2>
          <p 
            className="text-kinship-text/80 max-w-3xl mx-auto"
            style={{ 
              fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
              lineHeight: '1.6' 
            }}
          >
            Real reviews from travelers who discovered Colorado Springs through Kinship Landing.
          </p>
        </div>

        {/* Review Stats */}
        <div className="mb-16 lg:mb-20">
          <ReviewStats 
            data={reviewsData.meta}
            themes={reviewsData.themes}
          />
        </div>

        {/* Review Carousel */}
        <div>
          <ReviewCarousel items={reviewsData.reviews} />
        </div>
      </div>
    </section>
  );
}