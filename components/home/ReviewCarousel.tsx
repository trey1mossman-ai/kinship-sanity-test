'use client';

import { useState, useRef, useEffect } from 'react';

export function ReviewCarousel({ reviews, showGoogleBranding = false }: { reviews: any[], showGoogleBranding?: boolean }) {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [reviewsPerPage, setReviewsPerPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width >= 1024) {
        setReviewsPerPage(3);
      } else if (width >= 640) {
        setReviewsPerPage(2);
      } else {
        setReviewsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handleNext = () => {
    const nextPage = (currentPage + 1) % totalPages;
    setCurrentPage(nextPage);
    scrollToPage(nextPage);
  };

  const handlePrev = () => {
    const prevPage = (currentPage - 1 + totalPages) % totalPages;
    setCurrentPage(prevPage);
    scrollToPage(prevPage);
  };

  const scrollToPage = (page: number) => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth / totalPages;
      scrollContainerRef.current.scrollTo({
        left: scrollWidth * page,
        behavior: 'smooth'
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  useEffect(() => {
    scrollToPage(currentPage);
  }, [currentPage]);

  if (!reviews.length) return null;

  return (
    <div className="relative">
      {/* Reviews Container with horizontal scroll */}
      <div className="overflow-hidden mb-8">
        <div
          ref={scrollContainerRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentPage * 100}%)`
          }}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
        >
          {/* All reviews in a continuous strip */}
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="min-w-full flex gap-3 sm:gap-4 lg:gap-6 px-4 sm:px-0"
            >
              {reviews
                .slice(pageIndex * reviewsPerPage, (pageIndex + 1) * reviewsPerPage)
                .map((review, idx) => (
                  <div
                    key={`${pageIndex}-${idx}`}
                    className="flex-1 bg-white border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Rating Stars */}
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3.5 h-3.5"
                          style={{ fill: i < review.rating ? '#849e74' : '#e5e7eb' }}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>

                    {/* Review Quote */}
                    <p className="text-gray-700 text-xs leading-relaxed mb-3 min-h-[60px] line-clamp-3">
                      "{review.quote}"
                    </p>

                    {/* Reviewer Info */}
                    <div className="border-t pt-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-sm text-[#667C58]">
                            {review.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {showGoogleBranding ? 'Google Review' : review.source} • Verified Guest
                          </div>
                        </div>
                        {showGoogleBranding && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white border-2 border-[#849e74] flex items-center justify-center hover:bg-[#849e74] group transition-colors"
            aria-label="Previous reviews"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#849e74] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Indicators */}
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`transition-all duration-300 ${
                  i === currentPage
                    ? 'w-8 h-2 rounded-full bg-[#849e74]'
                    : 'w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white border-2 border-[#849e74] flex items-center justify-center hover:bg-[#849e74] group transition-colors"
            aria-label="Next reviews"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#849e74] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}