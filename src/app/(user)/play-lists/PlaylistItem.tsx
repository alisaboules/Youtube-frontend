'use client';

import { PUBLIC_PAGE } from '@/config/public-page.config';
import { playlistService } from '@/services/play-lists.service';
import type { IPlayList } from '@/types/playlists.types';
import { darkenColor, lightenColor } from '@/utils/rgb';
import { useMutation } from '@tanstack/react-query';
import { getColor } from 'colorthief';
import { ListVideo, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface Props {
  playlist: IPlayList;
  refetch: () => void;
}

export function PlaylistItem({ playlist, refetch }: Props) {
  const [colors, setColors] = useState({
    original: 'transparent',
    light: 'transparent',
    dark: 'transparent',
  });
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
        const { r, g, b } = color.rgb();
        const light = lightenColor(r, g, b, 0.3);
        const dark = darkenColor(r, g, b, 0.3);
        console.log('CSS COLOR:', color.css);
        setColors({
          original: `rgb(${r}, ${g}, ${b})`,
          light: `rgb(${light.r}, ${light.g}, ${light.b})`,
          dark: `rgb(${dark.r}, ${dark.g}, ${dark.b})`,
        });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist.videos[0]]);

  const { mutate: deletePlaylist } = useMutation({
    mutationFn: (playlistId: string) => playlistService.deletePlaylist(playlistId),
    onSuccess() {
      refetch();
    },
  });
  return (
    <div className='relative'
      style={
        {
          '--light': colors.light,
          '--dark': colors.dark,
        } as React.CSSProperties
      }>
      <Link href={PUBLIC_PAGE.PLAYLIST(playlist.id)} className="relative block">
        <div className="absolute w-11/12 h-full -top-2 left-1/2 -translate-x-1/2 bg-[var(--light)] z-[2] rounded-xl" />
        <div className="absolute w-10/12 h-full -top-4 shadow-lg left-1/2 -translate-x-1/2 bg-[var(--dark)] rounded-xl" />
        <Image
          ref={imageRef}
          alt={playlist.title}
          src={playlist.videos[0].thumbnailUrl}
          width={350}
          height={197}
          className="rounded-xl w-full relative z-[3]"
          preload
        />
        <div className="absolute z-[4] right-2 bottom-2 flex gap-1 items-center bg-background text-xs p-1 rounded-md">
          <ListVideo size={12} />
          <span>{`${playlist.videos.length} ${playlist.videos.length > 1 ? 'videos' : 'video'}`}</span>
        </div>
      </Link>
      <button className="absolute left-2 top-2 z-[4] bg-background px-0.5 py-1 rounded-md hover:text-secondary" onClick={() => deletePlaylist(playlist.id)}>
          <Trash2 size={20}/>
        </button>
      <div className="py-3 flex gap-3">
        <Link href={PUBLIC_PAGE.PLAYLIST(playlist.id)}>
          <span className="font-bold text-xl">{playlist.title}</span>
        </Link>
      </div>
    </div>
  );
}
