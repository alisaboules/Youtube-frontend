'use client'
import type { ISingleVideoResponse } from "@/types/video.types";
import { VideoItem } from "@/ui/video-item/VideoItem";
import { Play } from "lucide-react";

export function SimilarVideos({ videos }: { videos: ISingleVideoResponse['similarVideos']}) {
  return (
    <section className="mb-7">
      <div className="grid grid-cols-1 gap-x-4 gap-y-6">
        {videos.map((video) => (
          <VideoItem main={true} key={video.id} video={video} Icon={Play}/>
        ))}
      </div>
    </section>
  );
}
