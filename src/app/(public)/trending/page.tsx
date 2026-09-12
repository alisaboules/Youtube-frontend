import { PUBLIC_PAGE } from '@/config/public-page.config';
import type { Metadata } from 'next';
import TrendingPage from './Trending';

export const revalidate = 100;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Trending',
  description: 'Videos in trends',
  alternates: {
    canonical: PUBLIC_PAGE.TRENDING
  },
  openGraph: {
    type: 'website',
    url: PUBLIC_PAGE.TRENDING,
    title: 'Trending'
  }
}

export default function Page() {
  return (
    <TrendingPage />
  );
}