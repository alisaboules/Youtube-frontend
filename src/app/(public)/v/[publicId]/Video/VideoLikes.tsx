'use client';

import { useProfile } from '@/hooks/useProfile';
import { userService } from '@/services/user.services';
import type { ISingleVideoResponse } from '@/types/video.types';
import { cn } from '@/utils/cn';
import { transformCounts } from '@/utils/transform-count';
import { useMutation } from '@tanstack/react-query';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function VideoLikes({ video }: { video: ISingleVideoResponse }) {
  const { profile } = useProfile();
  const initialLiked = video.likes.some(
    like => like.userId === profile?.id
  );
  const initialDisliked = video.dislikes.some(
  dislike => dislike.userId === profile?.id
);
  const [liked, setLiked] = useState(initialLiked);
  const [dislike, setDislike] = useState(initialDisliked);
  const [likesCount, setLikesCount] = useState(
    video.likes.length
  );
    useEffect(() => {
    if (!profile) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLiked(
      video.likes.some(like => like.userId === profile.id)
    );

    setDislike(
      video.dislikes.some(
        dislike => dislike.userId === profile.id
      )
    );
  }, [profile, video.likes, video.dislikes]);
  const { mutate, isPending } = useMutation({
  mutationKey: ['like', video.id],
  mutationFn: () => userService.toggleLike(video.id),
  onError: () => {
    setLiked(prev => !prev);
    setLikesCount(prev =>
      liked ? prev + 1 : prev - 1
    );
  },
});

  const { mutate: mutateDislike } = useMutation({
  mutationKey: ['dislike', video.id],
  mutationFn: () => userService.toggleDislike(video.id),
   onError: () => {
    setDislike(prev => !prev);
  },
});

  const handleDislike = () => {
  if (!profile || isPending) return;
  if (liked) {
    setLiked(false);
    setLikesCount(prev => prev - 1);
  }
  setDislike(prev => !prev);
  mutateDislike();
};

  const handleLike = () => {
    if (isPending || !profile) return;
    if (dislike) setDislike(false);
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikesCount(prev =>
      nextLiked ? prev + 1 : prev - 1
    );
    mutate();
  };

  return (
    <div className="bg-[#1f1f1f] rounded-full flex items-center">
      <button onClick={handleLike} disabled={isPending} className='flex py-2 px-3 rounded-l-full items-center gap-1 hover:bg-[#3f3f3f] transition-colors'>
        <ThumbsUp className={liked ? 'fill-white' : ''}/>
        <span>{transformCounts(likesCount)}</span>
      </button>
      <div className="bg-secondary w-px h-5 " />
      <button onClick={handleDislike} className='hover:bg-[#3f3f3f] py-2 px-3 rounded-r-full transition-colors'>
        <ThumbsDown className={cn(dislike ? 'fill-white' : '')}/>
      </button>
    </div>
  );
}
