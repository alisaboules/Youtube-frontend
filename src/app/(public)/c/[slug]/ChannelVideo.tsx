import type { IChannel } from "@/types/channel.types";
import { Heading } from "@/ui/Heading";
import { VideoItem } from "@/ui/video-item/VideoItem";
import { Video } from "lucide-react";

export function ChannelVideo({ videos }: { videos: IChannel['videos']}) {
  return (
    <section className="mb-7">
      <Heading IconMe={Video}>Videos</Heading>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
