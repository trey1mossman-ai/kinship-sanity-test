import { Card } from '@/components/ui/card';

export function RoomCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 h-full">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] bg-sand animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title */}
        <div className="h-7 bg-sand rounded-md animate-pulse mb-4 w-3/4" />
        
        {/* Features */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-sand/50 rounded animate-pulse w-full" />
          <div className="h-4 bg-sand/50 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-sand/50 rounded animate-pulse w-4/6" />
        </div>
        
        {/* Amenity Chips */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-20 bg-sand/50 rounded-full animate-pulse" />
          <div className="h-6 w-24 bg-sand/50 rounded-full animate-pulse" />
        </div>
        
        {/* Button */}
        <div className="h-10 bg-sand rounded-md animate-pulse" />
      </div>
    </Card>
  );
}