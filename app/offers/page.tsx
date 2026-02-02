import { Metadata } from 'next';
import { getOffersPage } from '@/lib/sanity/queries';
import OffersPageClient from './OffersPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getOffersPage();

  return {
    title: data?.seoTitle || 'Special Offers',
    description: data?.seoDescription || 'Discover exclusive deals and packages for your Colorado Springs adventure at Kinship Landing.',
  };
}

export default async function OffersPage() {
  const data = await getOffersPage();
  return <OffersPageClient data={data} />;
}
