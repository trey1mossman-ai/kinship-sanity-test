import { Metadata } from 'next';
import { getAboutPage } from '@/lib/sanity/queries';
import { optimizeSanityData } from '@/lib/sanity/imageTransform';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Kinship Landing - a boutique hotel in downtown Colorado Springs built by locals, for everyone. Our story, values, and mission.',
};

export default async function AboutPage() {
  const aboutData = optimizeSanityData(await getAboutPage());

  return <AboutPageClient aboutData={aboutData} />;
}
