'use client';

import { Bookmark, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { playlistService } from '@/services/play-lists.service';
import { Heading } from '@/ui/Heading';
import { PUBLIC_PAGE } from '@/config/public-page.config';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Props {
  videoId: string;
}

export function SaveMenu({ videoId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const saveRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['Playlists'],
    queryFn: () => playlistService.getUserPlayLists(),
    enabled: isOpen,
  });
  const playlists = data?.data || [];

  const { mutate: toggleVideo, isPending } = useMutation({
    mutationKey: ['save playlist'],
    mutationFn: ({
      playlistId,
      videoId,
      userId,
    }: {
      playlistId: string;
      videoId: string;
      userId: string;
    }) => playlistService.toggleVideoPlayList(playlistId, videoId, userId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ['Playlists'],
      });
      if (response.data.message === 'Видео добавлено в плейлист') {
        toast.success('The video was added to the playlist!');
      }

      if (response.data.message === 'Видео удалено из плейлиста') {
        toast.success('The video was removed from the playlist!');
      }
    },
  });
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (saveRef.current && !saveRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={saveRef}>
      <button
        title="Save"
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-[#1f1f1f] hover:bg-[#3f3f3f] transition-colors rounded-full py-2 px-4 flex gap-2 items-center">
        <Bookmark size={25} />
        <span>Save</span>
      </button>
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+10px)] pt-4 z-249 w-[240px] overflow-hidden rounded-xl bg-[#282828] py-1 shadow-xl">
          <div className="flex items-center justify-between">
            <Heading className="mb-2 px-5">Save to...</Heading>
          </div>
          <div className="max-h-[150px] overflow-y-auto flex flex-col line">
            {isLoading ? (
              <div className="px-5 py-6 text-secondary">Loading playlists...</div>
            ) : playlists.length ? (
              playlists.map((playlist) => {
                const isVideoSaved = playlist.videos?.some((video) => video.id === videoId);
                const thumbnail = playlist.videos?.[0]?.thumbnailUrl;
                return (
                  <button
                    key={playlist.id}
                    disabled={isPending}
                    onClick={() =>
                      toggleVideo({ playlistId: playlist.id, videoId, userId: playlist.userId })
                    }
                    className="px-5 py-2 flex w-full items-start gap-4 text-left hover:bg-[#3a3a3a] rounded-md transition-colors justify-between">
                    <div className="flex gap-2">
                      <div className="relative h-[55px] w-[55px] shrink-0 overflow-hidden rounded-lg bg-[#1f1f1f]">
                        {thumbnail ? (
                          <Image
                            src={thumbnail}
                            alt={playlist.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-secondary">
                            Empty
                          </div>
                        )}
                      </div>
                      <span className="font-semibold">{playlist.title}</span>
                    </div>
                    <div>
                      <Bookmark
                        size={28}
                        fill={isVideoSaved ? 'var(--foreground)' : 'transparent'}
                        className="shrink-0"
                      />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="px-5 py-6 text-secondary">You don&apos;t have playlists yet.</div>
            )}
          </div>
          <div className="border-t border-border mt-1 p-3">
            <Link
              href={PUBLIC_PAGE.PLAY_LISTS}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3f3f3f] py-3 font-semibold transition-colors hover:bg-[#505050]">
              <Plus size={25} />
              <span>New playlist</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
