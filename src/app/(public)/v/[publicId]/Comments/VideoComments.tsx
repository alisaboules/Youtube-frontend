'use client';

import { commentService } from '@/services/comment.service';
import type { ISingleVideoResponse } from '@/types/video.types';
import { Heading } from '@/ui/Heading';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { ListSortDescending } from 'lucide-react';
import { cn } from '@/utils/cn';
import dynamic from 'next/dynamic';
import { AddComment } from './AddComment';

interface Props {
  video: ISingleVideoResponse;
}

const CommentItem = dynamic(() => import('./CommentItem').then((mod) => mod.CommentItem), {
  ssr: false,
});

export function VideoComments({ video }: Props) {
  const [sort, setSort] = useState<'newest' | 'top'>('top');
  const [isOpen, setIsOpen] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ['comments', video.publicId, sort],
    queryFn: async () => {
      const { data } = await commentService.byVideoPublicId(video.publicId, sort);
      return data;
    },
    initialData: sort === 'newest' ? video.comments : undefined,
    staleTime: 0,
  });

  const handleSort = (value: 'newest' | 'top') => {
    setSort(value);
    setIsOpen(false);
  };
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  console.log('VIDEO COMMENTS:', video.comments);
  console.log('QUERY DATA:', data);

  return (
    <>
      <div className="flex gap-5 items-center">
        <Heading isH1 className="mb-0">{`${data?.length ?? 0} Comments`}</Heading>
        <div ref={menuRef} className="relative z-[149]">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={cn(
              'flex items-center gap-3 rounded-full bg-[#1f1f1f] px-5 py-2',
              'transition-colors hover:bg-[#3f3f3f]',
            )}>
            <ListSortDescending size={20} />
            Sort by
          </button>

          {isOpen && (
            <div className="absolute left-0 top-[calc(100%+10px)] z-[999] w-[170px] overflow-hidden rounded-xl bg-[#282828] shadow-xl pointer-events-auto">
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => handleSort('top')}
                  className={cn(
                    'flex w-full items-center gap-4 px-5 py-3 text-left',
                    'text-white transition-colors hover:bg-[#3f3f3f]',
                    sort === 'top' && 'bg-[#4a4a4a]',
                  )}>
                  Top
                </button>

                <button
                  type="button"
                  onClick={() => handleSort('newest')}
                  className={cn(
                    'flex w-full items-center gap-4 px-5 py-3 text-left',
                    'text-white transition-colors hover:bg-[#3f3f3f]',
                    sort === 'newest' && 'bg-[#4a4a4a]',
                  )}>
                  Newest
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <AddComment videoId={video.id} refetch={refetch} />
      {data?.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          refetch={refetch}
          videoAuthorId={video.channel?.user?.id}
          authorName={video.channel.slug || video.channel.name}
        />
      ))}
    </>
  );
}
