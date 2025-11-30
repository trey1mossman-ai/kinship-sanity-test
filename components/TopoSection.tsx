import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@/components/icons';
import { Section } from './Section';

export function TopoSection() {
  return (
    <Section className="relative overflow-hidden bg-sand">
      {/* Topo Pattern Background */}
      <div 
        className="absolute inset-0 opacity-10 text-charcoal pointer-events-none"
        style={{
          backgroundImage: 'url("/textures/topo-map.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-6">
            Kinship is your guide
          </h2>
          
          <p className="text-body text-charcoal/80 leading-relaxed mb-10">
            More than just a place to crash. We're your basecamp for Colorado adventures, 
            your connection to local culture, and your home in the heart of downtown.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-pine hover:bg-pine/90 text-bone"
            >
              <Link href="/rooms">
                See our rooms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-pine text-pine hover:bg-pine hover:text-bone"
            >
              <Link href="/events/takeover">
                See our events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}