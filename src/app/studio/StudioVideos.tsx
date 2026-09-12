
import type { IFullVideo } from '@/types/video.types';
import { StudioVideoItem } from './StudioVideoPage';
import { Heading } from '@/ui/Heading';
import { Settings } from 'lucide-react';

export default function StudioVideos({videos}: {videos: IFullVideo[]}) {
  return (
    <section className="">
      <Heading IconMe={Settings} isH1={true}>
        Studio
      </Heading>
      <div className="grid ">
        {videos.length ? (
          videos?.map((video) => <StudioVideoItem key={video.id} video={video} />)
       ) : (<span>You don&apos;t have any videos yet.</span>)}
      </div>
    </section>
  );
} 