// Server component - no client-side interactivity needed
import Image from 'next/image';
import Link from 'next/link';
import { content } from '@/content/copy';

export function WhyKinship() {
  return (
    <section
      className="section-spacing relative overflow-hidden"
      style={{
        backgroundColor: 'white',
        backgroundImage: 'url("/textures/KL-Pikes-Peak-Topo-Map-Gray.webp")',
        backgroundSize: '300%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'multiply'
      }}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-white/75 z-0" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif font-bold mb-6" style={{ color: '#667C58' }}>
            {content.home.why.title}
          </h2>
          
          <div className="text-kinship-text mb-8 space-y-4">
            {content.home.why.body.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold transition-all transform bg-[#849e74] text-white hover:bg-[#667C58] hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#849e74] focus-visible:ring-offset-2"
            >
              {content.home.why.ctas.primary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
