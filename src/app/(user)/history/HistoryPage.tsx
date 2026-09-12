'use client';

import { watchHistoryService } from '@/services/watch-history.service';
import { Button } from '@/ui/button/Button';
import { Heading } from '@/ui/Heading';
import { SkeletonLoader } from '@/ui/SkeletonLoader';
import { VideoItem } from '@/ui/video-item/VideoItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { History } from 'lucide-react';

export function WatchHistory() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['watchHistory'],
    queryFn: () => watchHistoryService.getUserHistory(),
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ['clear history'],
    mutationFn: () => watchHistoryService.clearHistory(),
    onSuccess() {
      refetch();
    },
  });

  return (
    <section className="px-10 mb-20">
      <div className="flex justify-between items-center mb-6">
        <Heading isH1 IconMe={History} className="mb-0">
          History
        </Heading>
        <Button variant="secondary" isLoading={isPending} onClick={() => mutate()}>
          Clear
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : data?.data?.length ?
          data.data.map((history) => (<VideoItem key={history.id} video={history.video} />)
        ) : (
          <p>Watch History not found!</p>
        )}
      </div>
    </section>
  );
}
