'use client';

import { Star, Shield } from '@/components/icons';

interface TrustPillsProps {
  googleRating: number;
  googleReviewCount: number;
  bbbRating: string;
  bbbYear: number;
}

export function TrustPills({ 
  googleRating, 
  googleReviewCount, 
  bbbRating, 
  bbbYear 
}: TrustPillsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-4">
      {/* Google Reviews Pill */}
      <a
        href="https://www.google.com/search?q=kinship+landing+reviews"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-kinship-white border border-kinship-divider text-kinship-text text-sm font-medium hover:border-kinship-green transition-colors"
        style={{ borderRadius: '9999px', padding: '6px 12px', gap: '8px' }}
      >
        <Star 
          className="w-4 h-4 fill-kinship-green text-kinship-green" 
          aria-hidden="true"
        />
        <span>
          ★ {googleRating}/5 • {googleReviewCount}+ Google reviews
        </span>
      </a>

      {/* BBB Accreditation Pill */}
      <a
        href="https://www.bbb.org/us/co/colorado-springs/profile/hotel/kinship-landing-1296-90108797"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-kinship-white border border-kinship-divider text-kinship-text text-sm font-medium hover:border-kinship-green transition-colors"
        style={{ borderRadius: '9999px', padding: '6px 12px', gap: '8px' }}
      >
        <Shield 
          className="w-4 h-4 text-kinship-green" 
          aria-hidden="true"
        />
        <span>
          {bbbRating} • BBB Accredited (since {bbbYear})
        </span>
      </a>
    </div>
  );
}