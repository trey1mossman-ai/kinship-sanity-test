import { DefaultSeoProps } from 'next-seo';
import env from './env';

const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | Kinship Landing',
  defaultTitle: 'Kinship Landing — Downtown Colorado Springs Boutique Hotel',
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
  canonical: env.NEXT_PUBLIC_SITE_URL,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: env.NEXT_PUBLIC_SITE_NAME,
    title: 'Kinship Landing — Downtown Colorado Springs Boutique Hotel',
    description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
    images: [
      {
        url: `${env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kinship Hotel',
      },
    ],
  },
  twitter: {
    handle: '@kinshiphotel',
    site: '@kinshiphotel',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'author',
      content: env.NEXT_PUBLIC_SITE_NAME,
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
};

export default defaultSEO;
