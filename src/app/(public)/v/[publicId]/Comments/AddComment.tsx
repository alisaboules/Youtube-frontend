'use client';

import { commentService } from '@/services/comment.service';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import type { ICommentData } from '@/types/video.types';
import { Textarea } from '@/ui/field/Textarea';
import { useMutation } from '@tanstack/react-query';
import { Smile } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { cn } from '@/utils/cn';

interface Props {
  refetch: () => void;
  videoId: string;
}

export function AddComment({ refetch, videoId }: Props) {
  const { control, handleSubmit, reset, watch, setValue } = useForm<ICommentData>({
    mode: 'onChange',
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['create comment'],
    mutationFn: (data: ICommentData) => commentService.create(data),
    onSuccess: () => {
      refetch();
      reset({ text: '', videoId });
      setShowEmoji(false);
    },
  });

  const onSubmit: SubmitHandler<ICommentData> = ({ text }) => {
    mutate({ text, videoId });
  };
  const [showEmoji, setShowEmoji] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // eslint-disable-next-line react-hooks/incompatible-library
  const text = watch('text') ?? '';
  const cursorPositionRef = useRef(0);

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const currentText = textarea.value;
    const position = cursorPositionRef.current;
    const newText = currentText.slice(0, position) + emojiData.emoji + currentText.slice(position);
    const newPosition = position + emojiData.emoji.length;
    setValue('text', newText, {
      shouldDirty: true,
      shouldValidate: true,
  });
  cursorPositionRef.current = newPosition;
  requestAnimationFrame(() => {
    textarea.focus();
    textarea.setSelectionRange(newPosition, newPosition);
  });
};

  const handleCancel = () => {
    reset({ text: '', videoId });
    setShowEmoji(false);
  };

  const isEmpty = !text?.trim();
  const showButtons = isFocused || !isEmpty;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showEmoji) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmoji]);

  const saveCursorPosition = (textarea: HTMLTextAreaElement) => {
    cursorPositionRef.current = textarea.selectionStart;
  };
  
  return (
    <div className="relative z-100" ref={containerRef}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <div className="comment-input-line">
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <Textarea
                className="w-full p-0 pb-1 border-0 bg-transparent h-auto focus:border-0 focus:ring-0 focus-visible:ring-0 focus:outline-none rounded-none"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  saveCursorPosition(e.currentTarget);
                }}
                onBlur={() => {
                  field.onBlur();
                  requestAnimationFrame(() => {
                    if (containerRef.current?.contains(document.activeElement)) {
                      return;
                    }
                    setIsFocused(false);
                    setShowEmoji(false);
                  });
                }}
                textareaRef={(el) => {
                  textareaRef.current = el;
                  field.ref(el); 
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
                placeholder="Enter a comment..."
                rows={1}
              />
            )}
          />
        </div>
        <div className="flex justify-between items-start relative">
          {showButtons && <button
            type="button"
            onMouseDown={(event) => {
              event.preventDefault();
            }}
            onClick={() => {
              setShowEmoji((prev) => !prev);
            }}>
            <Smile className="relative mt-2" />
          </button>}

          {showEmoji && (
            <div className="absolute top-0 left-0 mt-10">
              <EmojiPicker theme={Theme.DARK} onEmojiClick={handleEmojiClick} />
            </div>
          )}
          {showButtons && (
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={handleCancel}
                type="button"
                className="w-20 p-2 hover:bg-secondary/30 font-medium transition-colors rounded-full">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className={cn('w-30 p-2 rounded-full transition-colors font-medium', isEmpty ? 'bg-secondary/20 text-secondary cursor-not-allowed' : 'bg-foreground text-background hover:bg-foreground/80' )}>
                  Comment
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
