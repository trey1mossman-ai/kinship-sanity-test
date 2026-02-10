import { Metadata } from 'next';
import { getGalleryPage } from '@/lib/sanity/queries';
import { optimizeSanityData } from '@/lib/sanity/imageTransform';
import { GalleryPageClient } from './GalleryPageClient';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore Kinship Landing through our photo gallery featuring rooms, venues, Homa Café + Bar, weddings, and event spaces in downtown Colorado Springs.',
};

export default async function GalleryPage() {
  const galleryData = optimizeSanityData(await getGalleryPage());

  return <GalleryPageClient galleryData={galleryData} />;
}
