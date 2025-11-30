/**
 * KINSHIP LANDING - EVENT CARD SKELETON LOADER
 *
 * Shows while images are loading to eliminate white flashing
 * Provides instant visual feedback for better perceived performance
 */

export function EventCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Main image skeleton */}
      <div
        className="relative h-[250px] sm:h-[300px] md:h-[350px] mb-3 sm:mb-4"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          backgroundColor: 'rgba(102, 124, 88, 0.1)' // kinship-sage/10
        }}
      >
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 -translate-x-full animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shimmer 2s infinite'
          }}
        />
      </div>

      {/* Thumbnail grid skeleton */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="relative h-[60px] sm:h-[70px] md:h-[80px]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              backgroundColor: 'rgba(102, 124, 88, 0.08)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Add shimmer animation to global CSS
const shimmerKeyframes = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
`;
