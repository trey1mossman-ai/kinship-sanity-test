import { Metadata } from 'next';
import { getEventsPage } from '@/lib/sanity/queries';
import { EventsPageClient } from './EventsPageClient';

export const metadata: Metadata = {
  title: 'Events & Meetings | Kinship Landing',
  description: 'Host your wedding, corporate retreat, or special event at Kinship Landing. Explore our venue spaces including the GreenHaus, Conference Room, Yard, Camp Deck, and Fireplace in downtown Colorado Springs.',
};

export default async function EventsPage() {
  const eventsData = await getEventsPage();

  return <EventsPageClient eventsData={eventsData} />;
}
