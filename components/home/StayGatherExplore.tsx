'use client';

import Image from 'next/image';

export function StayGatherExplore() {
  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/background for stay explore gather drink eat.webp"
          alt="Colorado Springs landscape background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      
      {/* Darker overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Text Overlay Image - Smaller and centered */}
      <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
        <div className="relative w-64 max-w-[16rem]">
          <Image
            src="/images/home/STAY EXPLORE GATHER DRINK EAT.webp"
            alt="Stay Explore Gather Drink Eat"
            width={256}
            height={64}
            className="w-full h-auto"
            style={{
              filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.8))',
              width: 'auto',
              height: 'auto'
            }}
            priority
          />
        </div>
      </div>
    </section>
  );
}