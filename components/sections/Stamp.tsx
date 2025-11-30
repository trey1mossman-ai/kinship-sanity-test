'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { content } from '@/content/copy';

export function Stamp() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <section className="py-16 bg-sand">
      <div className="flex items-center justify-center">
        <div 
          className={`relative ${!prefersReducedMotion ? 'hover:rotate-12' : ''} transition-transform duration-500 ease-out`}
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="text-charcoal"
            aria-label="Kinship Landing stamp: Stay, Gather, Explore, Drink, Eat"
          >
            {/* Diamond Shape */}
            <polygon
              points="100,10 190,100 100,190 10,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-80"
            />
            
            {/* Inner Diamond */}
            <polygon
              points="100,25 175,100 100,175 25,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="opacity-60"
            />
            
            {/* Text Around Diamond */}
            <defs>
              <path
                id="diamond-path"
                d="M 100,25 L 175,100 L 100,175 L 25,100 Z"
              />
            </defs>
            
            {/* Circular text path */}
            <defs>
              <path
                id="circle-path"
                d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
              />
            </defs>
            
            <text className="fill-current text-[11px] font-bold tracking-[0.15em] uppercase">
              <textPath href="#circle-path" startOffset="0%">
                STAY • GATHER • EXPLORE • DRINK • EAT •
              </textPath>
            </text>
            
            {/* Center Logo/Icon */}
            <circle
              cx="100"
              cy="100"
              r="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="opacity-70"
            />
            <circle
              cx="100"
              cy="100"
              r="3"
              fill="currentColor"
              className="opacity-70"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}