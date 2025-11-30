'use client';

import { Star, Shield } from '@/components/icons';

interface Meta {
  googleRating: number;
  googleReviewCountApprox: number;
  bbb: {
    rating: string;
    accreditedSince: string;
  };
}

interface PillBadgesProps {
  data: Meta;
}

export function PillBadges({ data }: PillBadgesProps) {
  const accreditedYear = new Date(data.bbb.accreditedSince).getFullYear();

  return (
    <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-6">
      {/* Google Reviews Pill */}
      <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-kinship-white/95 backdrop-blur-sm border border-kinship-white/20 text-kinship-text text-sm font-semibold shadow-lg">
        <Star 
          className="w-4 h-4 fill-kinship-green text-kinship-green" 
          aria-hidden="true"
        />
        <span>
          {data.googleRating}/5 • {data.googleReviewCountApprox}+ Google reviews
        </span>
      </div>

      {/* BBB Accreditation Pill */}
      <a
        href="https://www.bbb.org/us/co/colorado-springs/profile/hotel/kinship-landing-1296-90108797"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-kinship-white/95 backdrop-blur-sm border border-kinship-white/20 text-kinship-text text-sm font-semibold shadow-lg hover:bg-kinship-white hover:border-kinship-green-light hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        aria-label="View BBB accreditation profile"
      >
        <Shield 
          className="w-4 h-4 text-kinship-green" 
          aria-hidden="true"
        />
        <span>
          {data.bbb.rating} • BBB Accredited (since {accreditedYear})
        </span>
      </a>
    </div>
  );
}