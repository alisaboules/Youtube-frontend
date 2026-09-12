import type { Metadata } from 'next';
import { PUBLIC_PAGE } from '@/config/public-page.config';
import Explore from './explore/Explore';
import { Heading } from '@/ui/Heading';
import { VideoItem } from '@/ui/video-item/VideoItem';
import { Flame } from 'lucide-react';
import { videoService } from '@/services/video.service';

export const revalidate = 100;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Best video platform',
  alternates: {
    canonical: PUBLIC_PAGE.HOME,
  },
  openGraph: {
    type: 'website',
    url: PUBLIC_PAGE.HOME,
    title: 'Youtube',
  },
};

export default async function Home() {
  const data = await videoService.getTrendingVideos();
  const trendingVideos = data.data.slice(0, 3);
  return (
    <section className="mb-20">
      {!!trendingVideos.length && (
        <section className="px-10 mb-7">
          <Heading IconMe={Flame}>Trending</Heading>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {trendingVideos.length &&
              trendingVideos.map((video) => <VideoItem key={video.id} video={video} />)}
          </div>
        </section>
      )}
      <Explore />
    </section>
  );
}
