import { content } from '@/content/copy';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@/components/icons';

export function KinshipGuide() {
  return (
    <section className="relative py-24 overflow-hidden bg-sand">
      {/* Topo Pattern Background */}
      <div 
        className="absolute inset-0 opacity-10 text-charcoal"
        style={{
          backgroundImage: 'url("/textures/topo-map.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">
            {content.guide.title}
          </h2>
          
          <p className="text-lg text-charcoal/80 leading-relaxed mb-10">
            {content.guide.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-pine hover:bg-pine/90 text-bone"
            >
              <Link href="/rooms">
                {content.guide.cta.rooms}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-pine text-pine hover:bg-pine hover:text-bone"
            >
              <Link href="/events">
                {content.guide.cta.events}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}