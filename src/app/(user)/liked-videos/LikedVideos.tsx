'use client';

import { Heading } from '@/ui/Heading';
import { SkeletonLoader } from '@/ui/SkeletonLoader';
import { VideoItem } from '@/ui/video-item/VideoItem';
import Liked from '@/assets/liked.svg';
import { useProfile } from '@/hooks/useProfile';

export function LikedVideos() {
  const { profile, isLoading } = useProfile();
  return (
    <section className="px-10 mb-20">
      <div className="flex gap-2 items-end mb-6">
        <Heading isH1 IconMe={Liked} className="mb-0">
          Liked Videos
        </Heading>
        {profile?.likes && <span className="font-semibold text-lg">{profile.likes.length}</span>}
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : profile?.likes?.length ? (
          profile?.likes?.map((like) => <VideoItem key={like.video.id} video={like.video} />)
        ) : (
          <p>You haven&apos;t liked any videos yet!</p>
        )}
      </div>
    </section>
  );
}
