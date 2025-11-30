'use client';

export function ReviewStats({ data }: { data: any }) {

  return (
    <div className="shadow-lg flex items-center justify-center min-h-[200px]" style={{
      border: '3px solid #849e74',
      background: 'linear-gradient(135deg, #f8faf6 0%, #ffffff 100%)'
    }}>
      {/* Compact horizontal design - perfectly centered */}
      <div className="text-center p-6">
        <p className="text-base font-black mb-2" style={{ color: '#667C58' }}>
          {data.googleReviewCountApprox}+ Google Reviews
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => {
              const fillPercentage = Math.min(Math.max(data.googleRating - i, 0), 1) * 100;
              return (
                <div key={i} className="relative w-5 h-5">
                  <svg className="absolute inset-0 w-5 h-5 fill-gray-200" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg
                    className="absolute inset-0 w-5 h-5"
                    viewBox="0 0 20 20"
                    style={{
                      fill: '#849e74',
                      clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`
                    }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              );
            })}
          </div>
          <span className="text-lg font-bold" style={{ color: '#849e74' }}>{data.googleRating}/5</span>
        </div>
      </div>
    </div>
  );
}