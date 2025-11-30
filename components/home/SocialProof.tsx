'use client';

import Image from 'next/image';
import { ReviewStats } from './ReviewStats';
import { ReviewCarousel } from './ReviewCarousel';
import { content } from '@/content/copy';

interface SocialProofProps {
  data: {
    meta: any;
    themes: string[];
    reviews: any[];
  };
}

export function SocialProof({ data }: SocialProofProps) {
  return (
    <section className="py-12 sm:py-16 relative overflow-hidden" style={{ backgroundColor: '#f5f8f3' }}>
      <div className="container relative z-10">
        <h2 className="font-heading font-bold text-center mb-8 text-3xl lg:text-4xl text-[#667C58]">
          {content.home.social.title}
        </h2>

        <div className="max-w-6xl mx-auto">
          {/* Clean review display - 3 at a time */}
          <ReviewCarousel reviews={data.reviews} />
        </div>
      </div>
    </section>
  );
}
