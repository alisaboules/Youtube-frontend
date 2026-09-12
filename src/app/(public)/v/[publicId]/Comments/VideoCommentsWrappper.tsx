'use client';

import dynamic from 'next/dynamic';
import type { ISingleVideoResponse } from '@/types/video.types';

const VideoComments = dynamic(() => import('./VideoComments').then((mod) => mod.VideoComments), {
  ssr: false,
});

interface Props {
  video: ISingleVideoResponse;
}

export function VideoCommentsWrapper({ video }: Props) {
  return <VideoComments video={video} />;
}
