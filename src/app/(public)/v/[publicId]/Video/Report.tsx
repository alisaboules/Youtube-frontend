'use client';

import { Heading } from '@/ui/Heading';
import AnimationEllipsis from '@/ui/video-item/AnimationEllipsis';
import { cn } from '@/utils/cn';
import { Ellipsis, Flag, Pin, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const reportOptions = [
  'Sexual content',
  'Violent or repulsive content',
  'Hateful or abusive content',
  'Harassment or bullying',
  'Harmful or dangerous acts',
  'Suicide, self-harm or eating disorders',
  'Misinformation',
  'Child abuse',
  'Promotes terrorism',
  'Spam or misleading',
  'Legal issue',
];

interface Props {
  onPin?: () => void;
  isVideoAuthor?: boolean;
  isPinned?: boolean;
  isVertical?: boolean;
}

export default function Report({
  isVertical,
  isPinned = false,
  isVideoAuthor = false,
  onPin,
}: Props) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const handleReportClick = () => {
    setIsOpen(false);
    setShowReportModal(true);
  };
  const handleCloseModal = () => {
    setShowReportModal(false);
    setSelectedReason(null);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (reportRef.current && !reportRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleSend = () => {
    if (!selectedReason) return;
    console.log('Report reason:', selectedReason);
    handleCloseModal();
    toast.success('Report sent successfully');
  };
  const handlePin = () => {
    setIsOpen(false);
    onPin?.();
  };
  return (
    <div className="relative" ref={reportRef}>
      {isVertical ? (
        <AnimationEllipsis onClick={() => setIsOpen((prev) => !prev)} />
      ) : (
        <button
          title="Report"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn('', {
            'bg-[#1f1f1f] hover:bg-[#3f3f3f] transition-colors rounded-full p-3 flex items-center':
              !isVertical,
          })}>
          <Ellipsis size={20} />
        </button>
      )}
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-[999] w-[150px] overflow-hidden rounded-xl bg-[#282828] shadow-xl pointer-events-auto">
          <button
            type="button"
            onClick={handleReportClick}
            className="flex w-full items-center gap-4 px-5 py-3 text-left text-white transition-colors hover:bg-[#3f3f3f]">
            <Flag />
            <span>Report</span>
          </button>
          {isVideoAuthor && isVertical && (
            <button
              type="button"
              onClick={handlePin}
              className="flex w-full items-center gap-4 px-5 py-3 text-left text-white transition-colors hover:bg-[#3f3f3f]">
              <Pin size={20} />
              <span>{isPinned ? 'Unpin' : 'Pin'}</span>
            </button>
          )}
        </div>
      )}
      {showReportModal && (
        <div
          className="fixed inset-0 z-[1000] flex items-start justify-center bg-black/60"
          onClick={handleCloseModal}>
          <div
            className="relative mt-20 px-4 py-2 text-sm flex h-[70vh] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl bg-[#212121] text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}>
            <div className="shrink-0">
              <div className="flex items-center justify-between">
                <Heading className="mb-2">Report</Heading>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-full p-2 transition-colors hover:bg-[#3f3f3f]">
                  <X size={27} />
                </button>
              </div>

              <h3 className="mb-3 font-bold">What&apos;s going on?</h3>
              <p className="mb-3 leading-6">
                We&apos;ll check for all community guidelines, so don&apos;t
                <br />
                worry about making the perfect choice.
              </p>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              {reportOptions.map((reason) => { const isSelected = selectedReason === reason;
                return (
                  <button key={reason} type="button" onClick={() => setSelectedReason(reason)} className="flex w-full cursor-pointer items-center gap-4 py-3 text-left">
                    <span className={cn('relative h-6 w-6 shrink-0 rounded-full border-2 border-white', {'after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-4 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white': isSelected })} />
                    <span className="text-base">{reason}</span>
                  </button>
                );
              })}
            </div>

            <div className="py-5 shrink-0">
              <button
                type="button"
                disabled={!selectedReason}
                onClick={handleSend}
                className="w-full rounded-full py-3 text-base font-semibold transition-colors
                  disabled:cursor-not-allowed disabled:bg-border disabled:text-secondary
                  enabled:bg-foreground enabled:text-background enabled:hover:bg-foreground/80
                ">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
