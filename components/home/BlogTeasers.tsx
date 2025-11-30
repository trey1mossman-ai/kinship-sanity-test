'use client';

import Image from 'next/image';
import Link from 'next/link';
import { content } from '@/content/copy';

const blogPosts = [
  {
    id: 'hidden-trails',
    title: '5 Hidden Trails Near Downtown',
    teaser: 'Local hiking spots within 20 minutes of Kinship Landing.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=90',
    category: 'Itineraries'
  },
  {
    id: 'coffee-guide',
    title: 'Colorado Springs Coffee Culture',
    teaser: 'From roasters to cafes, your guide to local coffee.',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&q=90',
    category: 'Local Spots'
  },
  {
    id: 'weekend-adventure',
    title: 'Perfect Weekend Itinerary',
    teaser: 'Make the most of 48 hours in Colorado Springs.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=90',
    category: 'Hidden Gems'
  }
];

export function BlogTeasers() {
  return (
    <section className="section-spacing bg-kinship-gray-bg">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <h2 className="font-heading font-bold text-kinship-text text-center mb-8">
          {content.home.blog.title}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white border border-kinship-divider rounded-[14px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              <div className="p-4">
                <span className="text-xs text-kinship-green font-semibold uppercase tracking-wider">
                  {post.category}
                </span>
                <h3 className="font-heading font-semibold text-kinship-text mt-2 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-kinship-text/70 mb-3">
                  {post.teaser}
                </p>
                <Link 
                  href={`/blog/${post.id}`}
                  className="text-kinship-green font-medium text-sm hover:underline"
                >
                  {content.home.blog.more} →
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/blog" className="text-kinship-green font-medium hover:underline">
            More stories
          </Link>
        </div>
      </div>
    </section>
  );
}