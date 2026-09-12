'use client';

import { Bell, BellOff, BellRing, ChevronDown, UserRoundX, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { userService } from '@/services/user.services';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const options = [
  {
    label: 'All',
    value: 'ALL',
    icon: BellRing,
  },
  {
    label: 'Personalised',
    value: 'PERSONALISED',
    icon: Bell,
  },
  {
    label: 'None',
    value: 'NONE',
    icon: BellOff,
  },
] as const;

type NotificationType = (typeof options)[number]['value'];

interface NotificationMenuProps {
  channelId: string;
}

export function NotificationMenu({ channelId }: NotificationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<NotificationType>('PERSONALISED');
  const [isLoading, setIsLoading] = useState(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const notfRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const getNotification = async () => {
      try {
        const { data } = await userService.getNotification(channelId);
        if (data?.type) {
          setSelected(data.type);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getNotification();
  }, [channelId]);
  const router = useRouter();
  const handleSelect = async (type: NotificationType) => {
    const previous = selected;
    setSelected(type);
    setIsOpen(false);
    try {
      await userService.updateNotification(channelId, type);
    } catch (error) {
      setSelected(previous);
      console.error(error);
    }
  };
  const selectedOption = options.find((option) => option.value === selected);
  const SelectedIcon = selectedOption?.icon ?? Bell;
  const queryClient = useQueryClient();

  const handleUnsubscribe = async () => {
    try {
      setIsLoading(true);
      await userService.unsubscribe(channelId);
      await queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
      setShowUnsubscribeModal(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notfRef.current && !notfRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="relative" ref={notfRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'flex items-center gap-3 rounded-full bg-[#1f1f1f] px-5 py-2',
            'transition-colors hover:bg-[#3f3f3f]',
          )}>
          <SelectedIcon size={20} />
          <ChevronDown size={22} />
        </button>

        {isOpen && (
          <div className="absolute left-0 top-[calc(100%+10px)] z-249 w-[170px] overflow-hidden rounded-xl bg-[#282828] py-1 shadow-xl">
            {options.map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => handleSelect(value)}
                className={cn(
                  'flex w-full items-center gap-4 px-5 py-3 text-left',
                  'text-white transition-colors hover:bg-[#3f3f3f]',
                  selected === value && 'bg-[#4a4a4a]',
                )}>
                <Icon size={20} strokeWidth={1.8} />

                <span className="text-sm">{label}</span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setShowUnsubscribeModal(true);
              }}
              className="flex w-full items-center gap-4 px-5 py-3 text-left text-white transition-colors hover:bg-[#3f3f3f]">
              <UserRoundX size={20} strokeWidth={1.8} />

              <span className="text-sm">Unsubscribe</span>
            </button>
          </div>
        )}
      </div>

      {showUnsubscribeModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/50 p-4"
          onClick={() => setShowUnsubscribeModal(false)}>
          <div
            className="relative w-full max-w-md rounded-2xl bg-[#282828] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setShowUnsubscribeModal(false)}
              className="absolute right-3 top-3 rounded-full p-2 transition-colors hover:bg-[#3f3f3f]">
              <X size={20} />
            </button>

            <h2 className="mb-2 text-xl font-semibold">Unsubscribe?</h2>

            <p className="mb-6 text-sm text-secondary">
              Are you sure you want to unsubscribe from this channel?
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowUnsubscribeModal(false)}
                className="rounded-full px-5 py-2 transition-colors hover:bg-[#3f3f3f] font-semibold">
                Cancel
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={handleUnsubscribe}
                className="rounded-full bg-foreground px-5 py-2 text-black font-semibold transition-opacity hover:opacity-80 disabled:opacity-50">
                {isLoading ? 'Unsubscribing...' : 'Unsubscribe'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
