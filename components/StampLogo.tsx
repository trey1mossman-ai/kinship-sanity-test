'use client';

import { useEffect, useState } from 'react';
import { content } from '@/content/copy';

export function StampLogo() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = content.stamp.words;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="flex items-center justify-center py-20">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="animate-spin-slow"
      >
        {/* Outer Circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-pine"
        />
        
        {/* Inner Circle */}
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-pine/50"
        />
        
        {/* Center Text */}
        <text
          x="100"
          y="100"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-serif font-bold fill-pine"
        >
          KINSHIP
        </text>
        
        {/* Rotating Words */}
        <text
          x="100"
          y="125"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm font-medium fill-rust transition-opacity duration-500"
        >
          {words[currentWord]}
        </text>
        
        {/* Decorative Elements */}
        <path
          d="M 100 30 L 105 20 L 100 10 L 95 20 Z"
          fill="currentColor"
          className="text-pine"
        />
        <path
          d="M 100 190 L 105 180 L 100 170 L 95 180 Z"
          fill="currentColor"
          className="text-pine"
        />
        <path
          d="M 30 100 L 20 105 L 10 100 L 20 95 Z"
          fill="currentColor"
          className="text-pine"
        />
        <path
          d="M 190 100 L 180 105 L 170 100 L 180 95 Z"
          fill="currentColor"
          className="text-pine"
        />
      </svg>
    </div>
  );
}