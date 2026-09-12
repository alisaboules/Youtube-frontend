'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { studioService } from '@/services/studio-video.service';
import StudioVideos from './StudioVideos';
import { useEffectScroll } from '@/hooks/useEffectScroll';
import { SkeletonLoader } from '@/ui/SkeletonLoader';

export default function StudioPageClient() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['studioVideoList'],
    queryFn: ({ pageParam }) =>
      studioService.getAll({
        page: pageParam.page,
        limit: 8,
      }),
    initialPageParam: { page: 1 },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data;

      return page < totalPages ? { page: page + 1 } : undefined;
    },
  });
  const allVideos = data?.pages.flatMap((page) => page.data.videos) || [];
  useEffectScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });
  return (
    <div className='px-10 mb-20'>
      {isLoading && !allVideos.length ? (
        <SkeletonLoader count={3} className="h-32 rounded-md mb-8" />
      ) : (
        <StudioVideos videos={allVideos} />
      )}
      {isFetchingNextPage && <SkeletonLoader count={3} className="h-32 rounded-md mb-8" />}
    </div>
  );
}
