import { PUBLIC_PAGE } from '@/config/public-page.config';
import { videoService } from '@/services/video.service';
import { Heading } from '@/ui/Heading';
import { VideoItem } from '@/ui/video-item/VideoItem';
import { MonitorPlayIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 100;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Cartoons',
  description: 'Popular cartoons',
  alternates: {
    canonical: PUBLIC_PAGE.CARTOONS,
  },
  openGraph: {
    type: 'website',
    url: PUBLIC_PAGE.CARTOONS,
    title: 'Cartoons',
  },
};

export default async function Page() {
  const trendingVideos = await videoService.getAll('nicktoons');
  return (
    <section className="px-10">
      <Heading IconMe={MonitorPlayIcon}>Cartoons</Heading>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {trendingVideos.data.videos.length ? (
          trendingVideos.data.videos.map((video) => <VideoItem key={video.id} video={video} />)
        ) : (
          <div>Trends are temporarily unavailable.</div>
        )}
      </div>
    </section>
  );
}
