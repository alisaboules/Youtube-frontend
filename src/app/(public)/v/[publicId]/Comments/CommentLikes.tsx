'use client';

import { commentService } from '@/services/comment.service';
import type { VideoComment } from '@/types/video.types';
import { cn } from '@/utils/cn';
import { transformCounts } from '@/utils/transform-count';
import { useMutation } from '@tanstack/react-query';
import { Heart, ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import type { IProfileResponse } from '@/types/user.types';

interface Props {
  comment: VideoComment;
  isAuthor?: boolean;
  profile?: IProfileResponse;
  refetch: () => void;
}

export function CommentLikes({ comment, isAuthor, profile, refetch }: Props) {
  const liked = !!profile && comment.likes.some((like) => like.userId === profile.id);
  const dislike = !!profile && comment.dislikes.some((dislike) => dislike.userId === profile.id);
  const likesCount = comment.likes.length;

  const { mutate: mutateLike, isPending: isLikePending } = useMutation({
      mutationKey: ['comment-like', comment.id],
      mutationFn: () => commentService.toggleLike(comment.id),
      onSuccess: () => {
        refetch();
      },
    });

  const { mutate: mutateDislike, isPending: isDislikePending } = useMutation({
    mutationKey: ['comment-dislike', comment.id],
    mutationFn: () =>
      commentService.toggleDislike(comment.id),
    onSuccess: () => {
      refetch();
    },
  });

  const isPending = isLikePending || isDislikePending;

  const handleLike = () => {
    if (!profile || isPending) return;
    mutateLike();
  };

  const handleDislike = () => {
    if (!profile || isPending) return;
    mutateDislike();
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleLike}
          disabled={isPending}
          className={cn(
            'flex items-center justify-center rounded-full p-2',
            'transition-colors hover:bg-[#3f3f3f]',
            'disabled:opacity-50',
          )}>
          <ThumbsUp className={cn('w-4 h-4', liked && 'fill-white')} />
        </button>

        <span className="text-sm -ml-1">{transformCounts(likesCount)}</span>
      </div>

      <button
        type="button"
        onClick={handleDislike}
        disabled={isPending}
        className="rounded-full p-2 hover:bg-[#3f3f3f] transition-colors disabled:opacity-50">
        <ThumbsDown className={cn('w-4 h-4', dislike && 'fill-white')} />
      </button>

      {isAuthor && (
        <div className="relative ml-5 z-70">
          <Image
            src={comment.authorLike?.channel?.avatarUrl || '/default_avatar.jpeg'}
            alt={comment.authorLike?.channel?.name || ''}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover"
          />

          <Heart
            size={12}
            fill="red"
            stroke="white"
            className="absolute -right-1 -bottom-1 text-red-500"
          />
        </div>
      )}
    </div>
  );
}
