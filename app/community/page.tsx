import { Metadata } from 'next';
import { getCommunityPage } from '@/lib/sanity/queries';
import { CommunityPageClient } from './CommunityPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCommunityPage();

  return {
    title: data?.seoTitle || 'Community Events',
    description: data?.seoDescription || 'Join Kinship Landing for community events, gatherings, workshops, and experiences that bring the Colorado Springs community together.',
  };
}

export default async function CommunityPage() {
  const communityData = await getCommunityPage();

  return <CommunityPageClient communityData={communityData} />;
}
