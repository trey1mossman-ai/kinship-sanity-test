import { Metadata } from 'next';
import { getHomaPage } from '@/lib/sanity/queries';
import { HomaPageClient } from './HomaPageClient';

export const metadata: Metadata = {
  title: 'Homa Café + Bar',
  description: 'Great coffee. Solid cocktails. Real food. Open to neighbors and travelers alike in downtown Colorado Springs.',
};

export default async function HomaPage() {
  const homaData = await getHomaPage();

  return <HomaPageClient homaData={homaData} />;
}
