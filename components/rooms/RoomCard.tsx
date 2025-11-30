import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getRoomIcon } from '@/components/ui/RoomIcons';
import type { RoomTeaser } from '@/lib/data/rooms';

interface RoomCardProps {
  room: RoomTeaser;
  index: number;
  onImageClick: (data: { src: string; alt: string; images: string[]; index: number }) => void;
}

export const RoomCard = memo(function RoomCard({ room, index, onImageClick }: RoomCardProps) {
  return (
    <div
      key={room.id}
      id={room.slug}
      className="group grid md:grid-cols-2 gap-6 md:gap-8 items-center border-2 p-4 sm:p-6 md:p-8 transition-shadow duration-200 hover:shadow-lg scroll-mt-32 bg-white"
      style={{
        borderColor: '#667C58',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transform: 'translate3d(0,0,0)',
        contain: 'layout style paint',
        contentVisibility: index > 2 ? 'auto' as any : 'visible' as any,
        willChange: index < 3 ? 'transform' : undefined
      }}
    >
      {/* Room Info */}
      <div className="space-y-4">
        <div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3"
            style={{
              fontFamily: "'Utopia Display', 'Georgia', serif",
              color: '#667C58'
            }}
          >
            {room.name}
          </h2>
          <p className="text-kinship-text/80 text-base sm:text-lg leading-relaxed">
            {room.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
          {room.features.map((feature, idx) => {
            const IconComponent = getRoomIcon(feature);
            return (
              <div key={idx} className="flex items-start gap-2">
                {IconComponent && (
                  <span style={{ color: '#849e74' }} className="flex-shrink-0 mt-0.5">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                )}
                <span className="text-sm sm:text-base text-kinship-text/70 leading-snug">{feature}</span>
              </div>
            );
          })}
        </div>

        <Link
          href="https://hotels.cloudbeds.com/reservation/4nfQ6E"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0"
          style={{
            backgroundColor: '#849e74',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            transform: 'translateZ(0)'
          }}
          aria-label={`Book ${room.name}`}
        >
          Book Your Room
        </Link>
      </div>

      {/* Room Images */}
      <div className="space-y-3 sm:space-y-4">
        {/* Main Image - Clickable */}
        <button
          onClick={() => onImageClick({
            src: room.heroImage,
            alt: room.name,
            images: room.galleryImages && room.galleryImages.length > 0
              ? room.galleryImages
              : [room.heroImage],
            index: 0
          })}
          className="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden cursor-pointer bg-kinship-sage w-full focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          aria-label={`View full size ${room.name} image`}
        >
          <Image
            src={room.heroImage}
            alt={room.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover hover-scale"
            loading={index < 2 ? 'eager' : 'lazy'}
            priority={index === 0}
            quality={index === 0 ? 90 : 85}
            fetchPriority={index < 2 ? 'high' : 'auto'}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </button>

        {/* Thumbnail Gallery */}
        {room.galleryImages && room.galleryImages.length > 0 && (
          <div className={`grid gap-2 sm:gap-3 ${
            room.galleryImages.length === 2 ? 'grid-cols-2' :
            room.galleryImages.length === 4 ? 'grid-cols-2 sm:grid-cols-4' :
            room.galleryImages.length === 6 ? 'grid-cols-3' :
            room.galleryImages.length === 8 ? 'grid-cols-4' :
            'grid-cols-3'
          }`}>
            {room.galleryImages.map((image, idx) => (
              <button
                key={idx}
                onClick={() => onImageClick({
                  src: image,
                  alt: room.name,
                  images: room.galleryImages,
                  index: idx
                })}
                className="relative h-[70px] sm:h-[80px] md:h-[100px] overflow-hidden cursor-pointer hover-opacity hover-scale bg-kinship-sage focus:outline-none focus:ring-2 focus:ring-kinship-green focus:ring-offset-2"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                aria-label={`View full size image ${idx + 1} of ${room.name}`}
              >
                <Image
                  src={image}
                  alt={`${room.name} - View ${idx + 2}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 15vw"
                  className="object-cover"
                  loading="lazy"
                  quality={65}
                  decoding="async"
                />
                {/* Zoom icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none">
                  <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if room ID changes
  return prevProps.room.id === nextProps.room.id;
});
