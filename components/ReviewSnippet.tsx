import { content } from '@/content/copy';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight } from '@/components/icons';

export function ReviewSnippet() {
  return (
    <section className="py-20 bg-bone">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal text-center mb-12">
          {content.reviews.title}
        </h2>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-soft p-8">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(content.reviews.sample.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-rust text-rust" />
              ))}
            </div>

            {/* Review Text */}
            <blockquote className="text-xl text-charcoal/80 text-center mb-6 italic">
              "{content.reviews.sample.text}"
            </blockquote>

            {/* Author */}
            <div className="text-center">
              <p className="font-medium text-charcoal">
                {content.reviews.sample.author}
              </p>
              <p className="text-sm text-charcoal/60">
                via {content.reviews.sample.source}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-pine text-pine hover:bg-pine hover:text-bone"
            >
              <Link href="/reviews">
                {content.reviews.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}