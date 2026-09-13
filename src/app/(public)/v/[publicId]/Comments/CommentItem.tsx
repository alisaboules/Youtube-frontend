'use client';

import { PUBLIC_PAGE } from '@/config/public-page.config';
import Image from 'next/image';
import Verify from '@/assets/verify.svg';
import type { ICommentData, ISingleVideoResponse } from '@/types/video.types';
import Link from 'next/link';
import { transformDate } from '@/utils/transform-date';

import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/utils/cn';
import { useCallback, useEffect, useRef, useState } from 'react';
import { commentService } from '@/services/comment.service';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { Textarea } from '@/ui/field/Textarea';
import { Smile } from 'lucide-react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { BsPinAngleFill } from 'react-icons/bs';
import { CommentLikes } from './CommentLikes';
import EllipsisComment from './EllipsisComment';
import Report from '../Video/Report';

interface Props {
  comment: ISingleVideoResponse['comments'][0];
  refetch: () => void;
  videoAuthorId?: string;
  authorName: string;
}

export function CommentItem({ comment, refetch, videoAuthorId, authorName }: Props) {
  const { profile } = useProfile();
  const isAuthorLike = comment.authorLike && comment.authorLike.id !== profile?.id;
  const isAuthorComment = comment.user.id == profile?.id;
  const isAuthorChannelComment = comment.user.id === videoAuthorId;
  const isVideoAuthor = profile?.id === videoAuthorId;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const { mutate: pinComment, isPending: isPinning } = useMutation({
    mutationKey: ['pin-comment', comment.id],
    mutationFn: () => commentService.pin(comment.id),
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      toast.error('Failed to pin comment');
    },
  });

  const { mutate: updateComment, isPending: isUpdating } = useMutation({
    mutationKey: ['update comment', comment.id],
    mutationFn: (data: ICommentData) => commentService.update(comment.id, data),
    onSuccess: () => {
      setIsEditing(false);
      refetch();
    },
    onError: () => {
      toast.error('Failed to update comment');
    },
  });

  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationKey: ['delete comment', comment.id],
    mutationFn: () => commentService.delete(comment.id),
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      toast.error('Failed to delete comment');
    },
  });
  const [showEmoji, setShowEmoji] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const cursorPositionRef = useRef(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEditText(comment.text);
  }, [comment.text]);

  const handleEdit = () => {
    setEditText(comment.text);
    setIsEditing(true);
  };

  const handleCancelEdit = useCallback(() => {
    setEditText(comment.text);
    setShowEmoji(false);
    setIsEditing(false);
  }, [comment.text]);

  const handleSaveEdit = () => {
    const text = editText.trim();
    if (!text) return;
    updateComment({
      text,
      videoId: comment.videoId,
    });
  };

  const handleDelete = () => {
    deleteComment();
  };
  const isEmpty = !editText.trim();
  const hasChanges = editText.trim() !== comment.text.trim();
  const editContainerRef = useRef<HTMLDivElement | null>(null);
  const channelSlug = comment.user.channel?.slug;
  useEffect(() => {
    if (!isEditing) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (editContainerRef.current && !editContainerRef.current.contains(event.target as Node)) {
        if (showEmoji) {
          setShowEmoji(false);
          return;
        }
        handleCancelEdit();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, showEmoji, handleCancelEdit]);

  const saveCursorPosition = (textarea: HTMLTextAreaElement) => {
    cursorPositionRef.current = textarea.selectionStart;
  };
  const handleEmojiClick = (emojiData: { emoji: string }) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const currentText = textarea.value;
    const position = cursorPositionRef.current;
    const newText = currentText.slice(0, position) + emojiData.emoji + currentText.slice(position);
    const newPosition = position + emojiData.emoji.length;
    setEditText(newText);
    cursorPositionRef.current = newPosition;
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    });
  };
  return (
    <>
      <div className="flex gap-1 items-start">
        <div className="w-[30px] h-[30px] rounded-full overflow-hidden shrink-0">
          {channelSlug ? (
            <Link href={PUBLIC_PAGE.CHANNEL(channelSlug)} className="block w-full h-full">
              <Image
                alt={comment.user.channel?.name || 'Чей-то аватар'}
                src={comment.user.channel?.avatarUrl || '/default_avatar.jpeg'}
                width={30}
                height={30}
                className="block w-[30px] h-[30px] object-cover"
                quality={100}
                title={comment.user.channel?.name}
              />
            </Link>
          ) : (
            <Image
              alt={'Чей-то аватар'}
              src="/default_avatar.jpeg"
              width={30}
              height={30}
              className="block w-[30px] h-[30px] object-cover"
              quality={100}
            />
          )}
        </div>
        <div className="flex flex-col mr-4 gap-1 justify-start w-full">
          {comment.isPinned && (
            <div className="flex text-secondary text-sm gap-1 mb-1 items-center pl-2">
              <BsPinAngleFill className="" />
              <span>{`Pinned by @${authorName}`}</span>
            </div>
          )}

          <div className="flex gap-1 text-sm pl-2 items-center">
            <div
              className={cn('flex gap-1 items-center rounded-3xl', {
                'bg-foreground px-2 text-background font-medium': isAuthorChannelComment,
              })}>
              {`@${comment.user.channel?.slug || comment.user.name || 'Anonym'}`
                .toLowerCase()
                .replace(/\s+/g, '')}
              {comment.user.channel?.isVerified && (
                <Verify className="w-3.5 h-3.5 text-bakground" />
              )}
            </div>
            <span className="text-secondary">{transformDate(comment.createdAt)}</span>
          </div>
          {isEditing ? (
            <div ref={editContainerRef}>
              <div className="pl-2 mt-1 comment-input-line">
                <Textarea
                  value={editText}
                  onChange={(event) => {
                    setEditText(event.target.value);
                    saveCursorPosition(event.currentTarget);
                  }}
                  onFocus={(event) => {
                    setIsFocused(true);
                    saveCursorPosition(event.currentTarget);
                  }}
                  onClick={(event) => {
                    saveCursorPosition(event.currentTarget);
                  }}
                  onKeyUp={(event) => {
                    saveCursorPosition(event.currentTarget);
                  }}
                  onSelect={(event) => {
                    saveCursorPosition(event.currentTarget);
                  }}
                  rows={1}
                  disabled={isUpdating}
                  autoFocus
                  textareaRef={(element) => {
                    textareaRef.current = element;
                  }}
                  className="w-full p-0 pb-1 border-0 bg-transparent h-auto focus:border-0 focus:ring-0 focus-visible:ring-0 focus:outline-none rounded-none"
                />
              </div>
              <div className="flex justify-between items-start relative">
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  onClick={() => {
                    setShowEmoji((prev) => !prev);
                  }}>
                  <Smile className="relative mt-2 z-1000" />
                </button>

                {showEmoji && (
                  <div className="absolute top-0 left-0 mt-10">
                    <EmojiPicker theme={Theme.DARK} onEmojiClick={handleEmojiClick} />
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={isUpdating}
                    className="w-20 p-2 hover:bg-secondary/30 font-medium transition-colors rounded-full">
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    disabled={isUpdating || isEmpty || !hasChanges}
                    className={cn(
                      'w-30 p-2 rounded-full transition-colors font-medium',
                      !hasChanges
                        ? 'bg-secondary/20 text-secondary cursor-not-allowed'
                        : 'bg-foreground text-background hover:bg-foreground/80',
                    )}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <span className="text-sm pl-2">{comment.text}</span>
              <CommentLikes
                refetch={refetch}
                comment={comment}
                isAuthor={isAuthorLike}
                profile={profile}
              />
            </>
          )}
        </div>
        {isAuthorComment ? (
          <EllipsisComment
            onDelete={handleDelete}
            onEdit={handleEdit}
            onPin={() => pinComment()}
            isVideoAuthor={isVideoAuthor}
            isPinned={comment.isPinned}
          />
        ) : (
          <Report
            isVertical={true}
            onPin={() => pinComment()}
            isVideoAuthor={isVideoAuthor}
            isPinned={comment.isPinned}
          />
        )}
      </div>
    </>
  );
}
