'use client'

import { playlistService } from '@/services/play-lists.service';
import { Heading } from '@/ui/Heading';
import { SkeletonLoader } from '@/ui/SkeletonLoader';
import { VideoItem } from '@/ui/video-item/VideoItem';
import { useQuery } from '@tanstack/react-query';
import { ListVideo } from 'lucide-react';
import { useParams } from 'next/navigation';

export function SinglePlaylist() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['playlist', id],
    queryFn: () => playlistService.getPlayListById(id as string),
    enabled: !!id,
  });
  return (
    <section className='px-10'>
      <Heading isH1 IconMe={ListVideo}>
        {`Playlist "${data?.data.title ? data?.data.title : ''}"`}
      </Heading>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6">
        {isLoading ? (
          <SkeletonLoader count={4} />
        ) : data?.data.videos?.length ? (
          data?.data?.videos?.map(video => <VideoItem key={video.id} video={video} />)
        ) : (
          <p>Playlist is empty!</p>
        )}
      </div>
    </section>
  );
}
