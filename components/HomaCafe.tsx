import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@/components/icons';
import { Section } from './Section';

export function HomaCafe() {
  return (
    <Section className="bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* 2x2 Photo Collage - Left */}
          <div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80"
                  alt="Coffee at Homa Café"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80"
                  alt="Homa Bar interior"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80"
                  alt="Food at Homa"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80"
                  alt="Cocktails at Homa"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
            <p className="text-sm text-charcoal/60 text-center">
              Open daily 7AM-10PM • Local roasted coffee • Full bar
            </p>
          </div>

          {/* Content - Right */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-6">
              Homa Café + Bar
            </h2>
            
            <p className="text-body text-charcoal/80 mb-8">
              Great coffee. Solid cocktails. Real food. Open to neighbors and travelers alike, 
              because the best spots always are.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-rust hover:bg-rust/90 text-bone"
              >
                <Link href="/homa/menu">
                  View Menu
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-rust text-rust hover:bg-rust hover:text-bone"
              >
                <Link href="/homa">
                  See Homa
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}