'use client';

import { Button } from '@/components/ui/button';

export function WhyKinshipSection() {
  const features = [
    {
      icon: '🏔️',
      title: 'Local Adventures',
      description: 'Curated experiences from hiking trails to hidden gems, all within minutes of downtown.'
    },
    {
      icon: '☕',
      title: 'Homa Café + Bar',
      description: 'Start your day with locally roasted coffee and end with craft cocktails in our on-site café.'
    },
    {
      icon: '🤝',
      title: 'Community Connections',
      description: 'Meet fellow travelers and locals through our community events and shared experiences.'
    },
    {
      icon: '📍',
      title: 'Perfect Location',
      description: 'Downtown Colorado Springs location puts you steps from restaurants, shops, and attractions.'
    }
  ];

  return (
    <section 
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: 'var(--kinship-topo)' }}
    >
      {/* Subtle Topo Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23647B56' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='30' cy='0' r='1'/%3E%3Ccircle cx='60' cy='30' r='1'/%3E%3Ccircle cx='0' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-wrap mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 
            className="font-heading font-bold text-kinship-text mb-6"
            style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.01em' 
            }}
          >
            Why Choose Kinship Landing?
          </h2>
          <p 
            className="text-kinship-text/80 max-w-3xl mx-auto"
            style={{ 
              fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
              lineHeight: '1.6' 
            }}
          >
            More than just a place to stay - we're your gateway to authentic Colorado Springs experiences, 
            connecting you with the local community and the adventures that await.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group"
            >
              {/* Icon */}
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                <div 
                  className="w-16 h-16 mx-auto rounded-2xl bg-kinship-white shadow-card flex items-center justify-center text-2xl"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                >
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-heading font-semibold text-kinship-text mb-3">
                {feature.title}
              </h3>
              <p className="text-kinship-text/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            asChild
            className="btn-primary px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <a href="/book">
              Experience Kinship Landing
            </a>
          </Button>
          <p className="text-kinship-text/60 text-sm mt-4">
            Book direct for the best rates and exclusive perks
          </p>
        </div>
      </div>
    </section>
  );
}