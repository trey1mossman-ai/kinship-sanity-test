'use client';

import { Star, Shield } from '@/components/icons';

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

interface ReviewStatsProps {
  data: Meta;
  themes: string[];
}

export function ReviewStats({ data, themes }: ReviewStatsProps) {
  const { distribution } = data.expedia;
  const totalReviews = Object.values(distribution).reduce((sum, count) => sum + count, 0);

  const getBarWidth = (count: number) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <div className="bg-kinship-white border border-kinship-divider rounded-2xl p-8 h-fit shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-8 bg-kinship-green rounded-full"></div>
        <h3 className="text-xl font-heading font-bold text-kinship-text">
          Trust & Recognition
        </h3>
      </div>

      {/* Google Rating */}
      <div className="mb-8 p-6 bg-kinship-sage/30 rounded-xl border border-kinship-sage">
        <div className="flex items-center gap-4 mb-3">
          <div className="text-4xl font-bold text-kinship-text">
            {data.googleRating}/5
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(data.googleRating)
                    ? 'fill-kinship-green text-kinship-green'
                    : 'text-kinship-divider'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
        <p className="text-sm font-medium text-kinship-text/80 uppercase tracking-wider">Google Reviews</p>
      </div>

      {/* Third-party Meta */}
      <div className="space-y-3 mb-6 pb-6 border-b border-kinship-divider">
        <div>
          <div className="text-sm font-medium text-kinship-text mb-1">
            Expedia: {data.expedia.score}/10 '{data.expedia.label}'
          </div>
          <div className="text-xs text-kinship-text opacity-60">
            ≈{data.expedia.reviewCountApprox} verified reviews
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-kinship-green" aria-hidden="true" />
          <div className="text-sm font-medium text-kinship-text">
            BBB: {data.bbb.rating} Accredited
          </div>
        </div>
      </div>

      {/* Distribution Bars */}
      <div className="space-y-4 mb-8">
        <h4 className="text-sm font-semibold text-kinship-text mb-4 uppercase tracking-wider">Rating Breakdown</h4>
        {Object.entries(distribution).map(([label, count]) => (
          <div key={label} className="flex items-center gap-4 text-sm">
            <div className="w-20 text-kinship-text/80 font-medium capitalize">
              {label}
            </div>
            <div className="flex-1 bg-kinship-gray-bg rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-kinship-green to-kinship-green-light transition-all duration-500 ease-out rounded-full"
                style={{ width: `${getBarWidth(count)}%` }}
                aria-label={`${label}: ${count} reviews`}
              />
            </div>
            <div className="w-10 text-right text-kinship-text font-semibold">
              {count}
            </div>
          </div>
        ))}
      </div>

      {/* Common Themes */}
      <div>
        <h4 className="text-sm font-semibold text-kinship-text mb-4 uppercase tracking-wider">What guests love most</h4>
        <div className="flex flex-wrap gap-3">
          {themes.map((theme) => (
            <span
              key={theme}
              className="px-4 py-2 bg-kinship-sage/60 text-kinship-text text-sm font-medium rounded-full border border-kinship-sage hover:bg-kinship-green-light hover:text-kinship-white transition-all duration-200"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}