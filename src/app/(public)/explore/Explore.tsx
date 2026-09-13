'use client';
import { videoService } from '@/services/video.service';
import { SkeletonLoader } from '@/ui/SkeletonLoader';
import { Heading } from '@/ui/Heading';
import { VideoItem } from '@/ui/video-item/VideoItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Compass } from 'lucide-react';
import { useEffectScroll } from '@/hooks/useEffectScroll';
import { useAuth } from '@/hooks/useAuth';

export default function Explore() {
  // const { data, isLoading } = useQuery({
  //   queryKey: ['explore'],
  //   queryFn: () => videoService.getExploreVideos(),
  // });
  const { user } = useAuth()
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['explore'],
		queryFn: ({ pageParam }) =>
			videoService.getExploreVideos(
				user?.id,
				{
					page: pageParam.page,
					limit: 12
				},
				pageParam.excludeIds
			),
		initialPageParam: { page: 1, excludeIds: [] as string[] },
		getNextPageParam: (lastPage, allPages) => {
			const { page, totalPages } = lastPage
			const allVideoIds = allPages.flatMap(page => page.videos.map(video => video.id))

			return page < totalPages ? { page: page + 1, excludeIds: allVideoIds } : undefined
		}
	})

	useEffectScroll({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	})

	const allVideos = data?.pages.flatMap(page => page.videos) || []
	console.log('EXPLORE VIDEOS:', allVideos)

  return (
    <section className="px-10 mb-20">
      <Heading IconMe={Compass}>Explore</Heading>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : allVideos.length ? (
          allVideos.map((video) => <VideoItem key={video.id} video={video} />)
        ) : (
          <div>Explore are temporarily unavailable</div>
        )}
      </div>
    </section>
  );
}
