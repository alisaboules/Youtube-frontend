'use client'

import { useProfile } from "@/hooks/useProfile";
import { Heading } from "@/ui/Heading";
import { SkeletonLoader } from "@/ui/SkeletonLoader";
import { VideoItem } from "@/ui/video-item/VideoItem";
import { UserRoundCheck } from "lucide-react";

export function SubscriptionsPage() {
  const { profile, isLoading } = useProfile();

  return (
    <section className="px-10 mb-20">
      <Heading isH1 IconMe={UserRoundCheck}>
        Subscriptions
      </Heading>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : profile?.subscribedVideos?.length ? (
          profile?.subscribedVideos?.map(video => (<VideoItem key={video.id} video={video} />))
        ) : (
          <p>You aren&apos;t following anyone yet.</p>
        )}
      </div>
    </section>
  );
}