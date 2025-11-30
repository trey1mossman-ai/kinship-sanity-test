'use client';

import { ReviewStats } from './ReviewStats';
import { ReviewCarousel } from './ReviewCarousel';

interface Meta {
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
}

interface Review {
  source: string;
  name: string;
  rating: number;
  quote: string;
  url?: string;
  date?: string;
}

interface SocialProofProps {
  meta: Meta;
  themes: string[];
  reviews: Review[];
}

export function SocialProof({ meta, themes, reviews }: SocialProofProps) {
  return (
    <section className="section-spacing bg-kinship-gray-bg relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(100, 123, 86, 0.03) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(100, 123, 86, 0.02) 0%, transparent 50%)`
        }} />
      </div>
      
      <div className="container max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-kinship-text mb-4">
            What guests are saying
          </h2>
          <p className="text-lg font-body text-kinship-text/70 max-w-2xl mx-auto">
            Real experiences from travelers who've made Kinship Landing their home base for Colorado Springs adventures.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Metrics Card */}
          <div className="order-2 lg:order-1">
            <ReviewStats data={meta} themes={themes} />
          </div>

          {/* Right: Reviews Carousel */}
          <div className="order-1 lg:order-2">
            <ReviewCarousel items={reviews} />
          </div>
        </div>
      </div>
    </section>
  );
}