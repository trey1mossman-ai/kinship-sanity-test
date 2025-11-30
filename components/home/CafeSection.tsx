'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { content } from '@/content/copy';

export function CafeSection() {
  const images = [
    { src: "/images/HOMA Page/Fresh and local.webp", alt: "Delicious food at Homa" },
    { src: "/images/HOMA Page/CafeSeating-RichardSeldomridge.webp", alt: "Cozy cafe atmosphere at Homa" },
    { src: "/images/HOMA Page/Cafe + Bar.webp", alt: "HOMA Bar atmosphere" },
    { src: "/images/HOMA Page/Craft Cocktails.webp", alt: "Craft cocktails at Homa" },
    { src: "/images/HOMA Page/Signature Dishes.webp", alt: "Premium steak dishes at Homa" }
  ];

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Pure white background - no fades */}
      <div className="relative max-w-[1600px] mx-auto px-2 sm:px-4">
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-3 items-stretch">
          {/* Content */}
          <div className="flex flex-col justify-center p-4 lg:p-6">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl mb-2" style={{ color: '#667C58' }}>
              {content.home.cafe.title}
            </h2>

            <p className="text-kinship-text text-sm lg:text-base leading-relaxed mb-4" style={{ color: '#4f575c' }}>
              {content.home.cafe.features.join('. ')}
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href="/cafe"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold transition-all duration-300"
              style={{
                backgroundColor: '#667C58',
                color: '#ffffff',
                border: '1px solid #667C58'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#556649';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#667C58';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
                {content.home.cafe.cta}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Images Gallery */}
          <div className="flex flex-col gap-2">
            {/* Main large image */}
            <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="object-cover transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Thumbnail images - clickable */}
            <div className="grid grid-cols-4 gap-1">
              {images.slice(1).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index + 1)}
                  className="relative h-16 lg:h-20 overflow-hidden transition-all duration-300"
                  style={{
                    border: selectedImage === index + 1 ? '2px solid #849e74' : '2px solid transparent',
                    opacity: selectedImage === index + 1 ? 1 : 0.7
                  }}
                  onMouseEnter={(e) => {
                    if (selectedImage !== index + 1) {
                      e.currentTarget.style.opacity = '0.9';
                      e.currentTarget.style.border = '2px solid #849e7450';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedImage !== index + 1) {
                      e.currentTarget.style.opacity = '0.7';
                      e.currentTarget.style.border = '2px solid transparent';
                    }
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 25vw, 12.5vw"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
