'use client';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Heading } from '@/ui/Heading';
import { VideoItem } from '@/ui/video-item/VideoItem';
import { SkeletonLoader } from '@/ui/SkeletonLoader';
import { videoService } from '@/services/video.service';

export default function SearchPage() {
  const searchParams = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ['search', searchParams.get('term')],
    queryFn: () => videoService.getAll(searchParams.get('term')),
  });

  return (
    <section className="px-10 mb-20">
      <Heading isH1 IconMe={Search}>
        Search &quot;{searchParams.get('term')}&quot;
      </Heading>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : data?.data.videos.length ? (
          data.data.videos.map((video) => <VideoItem key={video.id} video={video} />)
        ) : (
          <p>No videos were found.</p>
        )}
      </div>
    </section>
  );
}
