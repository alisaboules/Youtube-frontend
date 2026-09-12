import { Heading } from '@/ui/Heading';
import { Flame } from 'lucide-react';
import { videoService } from '@/services/video.service';
import { VideoItem } from '@/ui/video-item/VideoItem';

export default async function TrendingPage() {
  const trendingVideos = await videoService.getTrendingVideos();
  return (
    <section className="px-10 mb-20">
      <Heading IconMe={Flame}>Trending</Heading>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {trendingVideos.data.length ? (
          trendingVideos.data.map((video) => <VideoItem key={video.id} video={video} />)
        ) : (
          <div>Trends are temporarily unavailable.</div>
        )}
      </div>
    </section>
  );
}
