import { Metadata } from 'next';
import { getCommunityPage } from '@/lib/sanity/queries';
import { CommunityPageClient } from './CommunityPageClient';

export const metadata: Metadata = {
  title: 'Community Events | Kinship Landing',
  description: 'Join Kinship Landing for community events, gatherings, workshops, and experiences that bring the Colorado Springs community together.',
};

export default async function CommunityPage() {
  const communityData = await getCommunityPage();

  return <CommunityPageClient communityData={communityData} />;
}
