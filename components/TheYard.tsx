import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@/components/icons';

export function TheYard() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=2400&q=80"
          alt="The Yard outdoor space"
          fill
          className="object-cover"
          loading="lazy"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/50 to-charcoal/20" />
      </div>

      {/* Content with Caption Chip */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-charcoal/95 backdrop-blur-sm rounded-xl p-8 shadow-deep border border-white/10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-bone mb-4">
              The Yard
            </h2>
            
            <p className="text-bone/90 mb-6">
              Our outdoor living room. Fire pits, string lights, and space to spread out. 
              Perfect for s'mores or stargazing.
            </p>

            <Button 
              asChild
              size="lg"
              className="bg-pine hover:bg-pine/90 text-bone"
            >
              <Link href="/events/takeover">
                Host your event
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}