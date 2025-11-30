/**
 * Build FAQ JSON-LD schema for SEO/AEO optimization
 * Supports Google's FAQPage structured data format
 */

interface FAQItem {
  question: string;
  answer_short: string;
  answer_long: string;
  id?: string;
}

export function buildFAQSchema(
  faqs: FAQItem[],
  pageUrl: string,
  pageTitle: string = 'FAQs'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: pageTitle,
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((faq, index) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${faq.answer_short} ${faq.answer_long}`.replace(/\n/g, ' ').trim(),
      },
    })),
  };
}
