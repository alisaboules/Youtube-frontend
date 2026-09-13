'use client';
import { PUBLIC_PAGE } from '@/config/public-page.config';
import type { IVideo } from '@/types/video.types';
import { transformDate } from '@/utils/transform-date';
import { Dot, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Verify from '@/assets/verify.svg';
import { getColor } from 'colorthief';
import { useEffect, useRef, useState } from 'react';
import { transformCounts } from '@/utils/transform-count';

interface Props {
  video: IVideo;
  Icon?: LucideIcon;
  main?: boolean;
}

export function VideoItem({ video, Icon, main = false }: Props) {
  const [color, setColor] = useState<string>('transparent');
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    const extraColor = async () => {
      try {
        const color = await getColor(image);
        if (!color) {
          return;
        }
        console.log('CSS COLOR:', color.css);
        setColor(color.css());
      } catch (error) {
        console.error('Не удалось определить цвет:', error);
      }
    };

    if (image.complete) {
      extraColor();
    } else {
      image.addEventListener('load', extraColor);
      return () => image.removeEventListener('load', extraColor);
    }
  }, [video.thumbnailUrl]);
  return (
    <div
      className="flex flex-col group relative"
      style={{ '--thumbnail-color': color } as React.CSSProperties}>
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity transition-all ease-out duration-900 group-hover:opacity-50 group-hover:-inset-3"
        style={{ backgroundColor: 'var(--thumbnail-color)' }}
      />
      {main ? (
        <div className="z-10 flex gap-3 items-start">
          <Link
            href={PUBLIC_PAGE.VIDEO(video.publicId)}
            className="relative w-[250px] h-[150px] shrink-0">
            <Image
              ref={imageRef}
              alt={video.title}
              src={video.thumbnailUrl}
              fill
              sizes="250px"
              className="rounded-xl object-cover"
              priority
            />
          </Link>
          <div className=" flex gap-3">
            <div className="flex flex-col min-w-0 flex-1 text-secondary text-sm">
              <Link
                href={PUBLIC_PAGE.VIDEO(video.publicId)}
                className="line-clamp-3 text-wrap text-foreground font-medium text-base">
                {video.title}
              </Link>
              <Link
                href={PUBLIC_PAGE.CHANNEL(video.channel.slug)}
                className="flex items-center gap-1">
                <span className="">{video.channel.name}</span>
                {video.channel.isVerified && <Verify className="w-3.5 h-3.5" />}
              </Link>
              <div className="flex items-center gap-1 text-xs whitespace-nowrap">
                {Icon && <Icon size={12} />}
                <span className='mr-1'>{transformCounts(video.viewsCount)}</span>
                <span>{transformDate(video.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="z-10">
          <Link href={PUBLIC_PAGE.VIDEO(video.publicId)}>
            <Image
              ref={imageRef}
              alt={video.title}
              src={video.thumbnailUrl}
              width={350}
              height={197}
              className="rounded-xl w-full"
              preload
            />
          </Link>
          <div className="py-3 flex gap-3">
            <Link href={PUBLIC_PAGE.CHANNEL(video.channel.slug)}>
              <Image
                src={video.channel.avatarUrl}
                width={35}
                height={35}
                alt={video.channel.slug}
                className="rounded-full shrink-0"
              />
            </Link>
            <div className="flex flex-col min-w-0 flex-1 text-secondary text-sm">
              {Icon && <Icon />}
              <Link
                href={PUBLIC_PAGE.VIDEO(video.publicId)}
                className="line-clamp-2 text-wrap text-foreground font-medium text-base">
                {video.title}
              </Link>
              <Link
                href={PUBLIC_PAGE.CHANNEL(video.channel.slug)}
                className="flex items-center gap-1">
                <span className="">{video.channel.name}</span>
                {video.channel.isVerified && <Verify className="w-3.5 h-3.5" />}
              </Link>
              <div className="flex items-center">
                <span>{transformCounts(video.viewsCount)} views</span>
                <Dot size={14} className="stroke-[4]" />
                <span>{transformDate(video.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
