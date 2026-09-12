'use client';

import type { ISingleVideoResponse } from '@/types/video.types';
import { useState } from 'react';
import Image from 'next/image';
import { Heading } from '@/ui/Heading';
import Verify from '@/assets/verify.svg';
import { transformCounts } from '@/utils/transform-count';
import { Description } from '../../../../utils/convert-description';
import { SimilarVideos } from './Video/SimilarVideos';
import Link from 'next/link';
import { PUBLIC_PAGE } from '@/config/public-page.config';
import { VideoLikes } from './Video/VideoLikes';
import { ChannelSubscribe } from './Video/ChannelSubscribe';
import Report from './Video/Report';
import { VideoCommentsWrapper } from './Comments/VideoCommentsWrappper';
import { VideoPlayer } from '@/ui/video-player/VideoPlayer';
import { cn } from '@/utils/cn';
import { useUpdateViews } from '@/hooks/useUpdateViews';
import { SaveMenu } from './Video/SaveMenu';
import { ShareMenu } from './Video/ShareMenu';

interface Props {
  video: ISingleVideoResponse;
}

export function SingleVideo({ video }: Props) {
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  useUpdateViews(video);
  return (
    <section className="mb-20 px-10 grid grid-cols-[3fr_1.5fr] gap-10 relative">
      <div className="flex flex-col gap-5">
        <div
          className={cn(
            isTheaterMode ? 'absolute top-0 left-0 w-full px-10 overflow-hidden' : 'relative',
          )}>
          <VideoPlayer
            fileName={video.videoFileName}
            maxResolution={video.maxResolution}
            thumbnailUrl={video.thumbnailUrl}
            toggleTheaterMode={() => {
              setIsTheaterMode(!isTheaterMode);
            }}
          />

        </div>
        <div className={cn('flex flex-col gap-5', { 'pt-[50.5rem]': isTheaterMode })}>
          <h1 className="font-bold text-xl">{video.title}</h1>
          <div className="flex gap-2 justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden shrink-0">
                <Link href={PUBLIC_PAGE.CHANNEL(video.channel.slug)}>
                  <Image
                    alt={video.channel.name || 'Чей-то аватар'}
                    src={video.channel.avatarUrl}
                    width={50}
                    height={50}
                    className="object-cover"
                    quality={100}
                    title={video.channel.name}
                  />
                </Link>
              </div>
              <div className={cn('flex flex-col mr-4')}>
                <Link
                  href={PUBLIC_PAGE.CHANNEL(video.channel.slug)}
                  title={video.channel.user.name}>
                  <div className="flex items-center gap-1">
                    <Heading className="mb-0">
                      <span>{video.channel.user.name}</span>
                    </Heading>
                    {video.channel.isVerified && <Verify className="w-3.5 h-3.5 text-secondary" />}
                  </div>
                </Link>
                <span className="text-secondary text-sm">
                  {transformCounts(video.channel.subscribers.length)} subscribers
                </span>
              </div>
              <ChannelSubscribe channelId={video.channel.id} slug={video.channel.slug} />
            </div>
            <div className="flex items-center gap-2">
              <VideoLikes video={video} />
              <ShareMenu videoId={video.id}/>
              <SaveMenu videoId={video.id}/>
              <Report isVertical={false} />
            </div>
          </div>
          <div className="w-full bg-[#1f1f1f] py-2 pl-3 rounded-xl pr-20">
            <Description
              mode="inline"
              previewLines={3}
              description={video.description || ''}
              video={video}
            />
          </div>
          <VideoCommentsWrapper video={video} />
        </div>
      </div>
      {!!video.similarVideos.length && (
        <div className={cn({ 'pt-[50.5rem]': isTheaterMode })}>
          <SimilarVideos videos={video.similarVideos} />
        </div>
      )}
    </section>
  );
}
