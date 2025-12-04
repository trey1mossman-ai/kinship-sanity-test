import { Metadata } from 'next';
import { getExplorePage } from '@/lib/sanity/queries';
import { ExplorePageClient } from './ExplorePageClient';

export const metadata: Metadata = {
  title: 'Explore Colorado Springs | Kinship Landing',
  description: 'Discover hidden gems, speakeasies, local restaurants, coffee shops, entertainment venues, and wellness experiences near Kinship Landing in downtown Colorado Springs.',
};

export default async function ExplorePage() {
  const exploreData = await getExplorePage();

  return <ExplorePageClient exploreData={exploreData} />;
}
