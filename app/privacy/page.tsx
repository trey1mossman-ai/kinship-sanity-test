import { Metadata } from 'next';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { Footer } from '@/components/Footer';
import { ScrollEffectsWrapper } from '@/components/home/ScrollEffectsWrapper';

export const metadata: Metadata = {
  title: 'Privacy Policy | Kinship Landing',
  description: 'Learn how Kinship Landing protects your privacy and personal information.',
};

export default function PrivacyPage() {
  return (
    <ScrollEffectsWrapper>
      <HeaderNav />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 md:py-24 bg-kinship-sage/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{
                fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                color: '#667C58'
              }}
            >
              Privacy Policy
            </h1>
            <p
              className="text-lg md:text-xl"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58',
                opacity: 0.8
              }}
            >
              Kinship Landing values your privacy.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="prose prose-lg max-w-none"
              style={{
                fontFamily: '"europa", "Hind", system-ui, sans-serif',
                color: '#667C58'
              }}
            >
              <p className="text-lg leading-relaxed mb-6">
                We want you to be confident in using this site to make your online reservations at our boutique hotel in Colorado Springs, Colorado. And we are very much aware of your concerns about the privacy of your information. So rest assured, we have no desire or intent to infringe on your privacy. We will not provide your personal information to anyone else. When you submit your personal information such as name, address, email address and telephone number, we will not give or sell this information to any outside company for any use. This information you provide will be kept confidential and will be used only to support your customer relationship with us. We have appropriate security measures in place to protect against the loss, misuse or alteration of information we have collected from you at our site.
              </p>

              <p className="text-lg leading-relaxed">
                All of the information contained in this website, including the site design, graphics and text, are the copyrighted property of Kinship Landing. Any other trademarks, company names, product names and/or logos set forth in this website are the property of their respective owners.
              </p>

              {/* Contact Section */}
              <div className="mt-12 p-8 bg-kinship-sage/10 border-l-4" style={{ borderColor: '#667C58' }}>
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
                    color: '#667C58'
                  }}
                >
                  Questions About Privacy?
                </h2>
                <p className="mb-4">
                  If you have any questions or concerns about our privacy policy, please don't hesitate to contact us:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a
                      href="mailto:hello@kinshiplanding.com"
                      className="underline hover:brightness-110 transition-colors"
                      style={{ color: '#667C58' }}
                    >
                      hello@kinshiplanding.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a
                      href="tel:+17192039309"
                      className="underline hover:brightness-110 transition-colors"
                      style={{ color: '#667C58' }}
                    >
                      (719) 203-9309
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong> 415 S Nevada Ave, Colorado Springs, CO 80903
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </ScrollEffectsWrapper>
  );
}
