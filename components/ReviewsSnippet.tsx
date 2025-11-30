import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight } from '@/components/icons';
import { Section } from './Section';

export function ReviewsSnippet() {
  return (
    <Section className="bg-bone">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal text-center mb-12">
          What travelers say
        </h2>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-soft p-8">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-rust text-rust" />
              ))}
            </div>

            {/* Review Text */}
            <blockquote className="text-lg text-charcoal/80 text-center mb-4 italic">
              "Finally, a hotel that gets it. Great location, amazing hosts, and they actually know the city. 
              Will definitely be back."
            </blockquote>

            {/* Author */}
            <p className="text-center text-sm text-charcoal/60">
              - Sarah M. via Google
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Button 
              asChild
              variant="outline"
              className="border-pine text-pine hover:bg-pine hover:text-bone"
            >
              <Link href="/about/reviews">
                Read all reviews
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}