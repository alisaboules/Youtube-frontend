import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import type { Metadata } from 'next';
import StudioPageClient from './StudioPageClient';

export const metadata: Metadata = {
  title: 'Studio',
  ...NO_INDEX_PAGE,
};

export default function StudioPage() {
  return (
    <StudioPageClient />
  );
}
