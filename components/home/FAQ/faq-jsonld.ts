import type { FAQItem } from './faq-data';

export function buildFaqJsonLd(faqs: FAQItem[], homepageUrl: string) {
  const faqId = `${homepageUrl}#faq`;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': faqId,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      url: `${homepageUrl}#faq-${f.id}`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${f.answer_short}\n\n${f.answer_long}`.replace(/\n/g, ' '),
      },
    })),
  };
}

