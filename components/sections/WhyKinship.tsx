'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function WhyKinship() {
  return (
    <section className="section-spacing bg-kinship-white relative overflow-hidden">
      {/* Subtle topo lines overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent('#EBEBEB')}' fill-opacity='0.4'%3E%3Ccircle cx='8' cy='8' r='1'/%3E%3Ccircle cx='32' cy='32' r='1'/%3E%3Cpath d='M8 8h24v24H8z' fill='none' stroke='currentColor' stroke-width='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="max-w-wrap mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-kinship-text mb-8">
            Why Kinship?
          </h2>
          
          <p className="text-lg lg:text-xl text-kinship-text/80 leading-relaxed mb-12 max-w-3xl mx-auto">
            We're more than a boutique hotel - we're your connection to Colorado Springs' authentic spirit. 
            From insider trail recommendations to the best local coffee shops, our community-driven approach 
            ensures you experience the city like someone who's lived here for years, not just visiting for days.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-primary px-8 py-3">
              <Link href="/rooms">
                Explore Rooms
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              className="border-kinship-green text-kinship-green hover:bg-kinship-green hover:text-kinship-white px-8 py-3"
            >
              <Link href="/plan">
                Plan Your Stay
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}