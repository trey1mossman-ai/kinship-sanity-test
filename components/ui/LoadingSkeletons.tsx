// Loading skeleton components for Formula 1 performance
export const HeroSkeleton = () => (
  <div className="h-screen bg-gradient-to-b from-gray-200 to-gray-100 animate-pulse" />
);

export const RoomCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    <div className="aspect-[4/5] bg-gray-200 animate-pulse" />
    <div className="p-4 space-y-2">
      <div className="h-6 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
    </div>
  </div>
);

export const SectionSkeleton = () => (
  <div className="py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-8 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <RoomCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export const ContentSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-48 bg-gray-200 rounded-lg" />
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

export const TextSkeleton = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-gray-200 rounded animate-pulse ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      />
    ))}
  </div>
);

export const ButtonSkeleton = () => (
  <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse" />
);

export const ImageSkeleton = ({ aspectRatio = 'aspect-video' }: { aspectRatio?: string }) => (
  <div className={`${aspectRatio} bg-gray-200 animate-pulse rounded-lg`} />
);