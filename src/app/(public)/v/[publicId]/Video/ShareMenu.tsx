'use client';

import { Check, Copy, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PiShareFatBold } from 'react-icons/pi';

interface Props {
  videoId: string;
}

export function ShareMenu({ videoId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const videoUrl = typeof window !== 'undefined' ? `${window.location.origin}/video/${videoId}` : '';
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(videoUrl);

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsCopied(false);
  };
  return (
    <div>
      <div className="relative" ref={shareRef}>
        <button
          onClick={() => setIsOpen(true)}
          title="Share"
          className="bg-[#1f1f1f] hover:bg-[#3f3f3f] transition-colors rounded-full py-2 px-4 flex gap-1 items-center">
          <PiShareFatBold size={23} />
          <span>Share</span>
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
            onClick={handleClose}>
            <div
              className="relative w-full max-w-md rounded-2xl bg-[#282828] p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-3 top-3 rounded-full p-2 transition-colors hover:bg-[#3f3f3f]">
                <X size={20} />
              </button>

              <h2 className="mb-6 text-2xl font-semibold">Share</h2>

              <p className="mb-3 text-sm text-secondary">Share this video with others</p>

              <div className="flex items-center gap-2">
                <div className="min-w-0 flex-1 overflow-hidden rounded-lg bg-[#1f1f1f] px-4 py-3">
                  <p className="truncate text-sm text-gray-300">{videoUrl}</p>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-black transition-colors hover:bg-gray-200">
                  {isCopied ? (
                    <>
                      <Check size={19} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={19} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
