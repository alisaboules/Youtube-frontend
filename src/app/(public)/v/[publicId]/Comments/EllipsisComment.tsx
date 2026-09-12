'use client';

import AnimationEllipsis from '@/ui/video-item/AnimationEllipsis';
import { Pencil, Pin, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  onPin: () => void;
  isVideoAuthor: boolean;
  isPinned: boolean;
}

export default function EllipsisComment({ onEdit, onDelete, onPin, isVideoAuthor, isPinned }: Props) {
  const ellipsisRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ellipsisRef.current && !ellipsisRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setIsOpen(false);
    onEdit();
  };

  const handleDelete = () => {
    setIsOpen(false);
    onDelete();
  };

  const handlePin = () => {
    setIsOpen(false);
    onPin();
  };


  return (
    <div className="relative" ref={ellipsisRef}>
      <AnimationEllipsis onClick={() => setIsOpen((prev) => !prev)} />
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-[999] w-[150px] overflow-hidden rounded-xl bg-[#282828] shadow-xl pointer-events-auto">
          {isVideoAuthor && (
            <button
              type="button"
              onClick={handlePin}
              className="flex w-full items-center gap-4 px-5 py-3 text-left text-white transition-colors hover:bg-[#3f3f3f]">
              <Pin size={20} />
              <span>{isPinned ? 'Unpin' : 'Pin'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleEdit}
            className="flex w-full items-center gap-4 px-5 py-3 text-left text-white transition-colors hover:bg-[#3f3f3f]">
            <Pencil />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-4 px-5 py-3 text-left text-white transition-colors hover:bg-[#3f3f3f]">
            <Trash2 />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}
