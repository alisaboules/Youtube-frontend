'use client';

import { PUBLIC_PAGE } from '@/config/public-page.config';
import { useProfile } from '@/hooks/useProfile';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { channelService } from '@/services/channel.service';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { Dot } from 'lucide-react';

const stars = [
  { x: '0px', y: '-80px', rotate: '0deg', delay: '0ms' },
  { x: '110px', y: '-69px', rotate: '0deg', delay: '15ms' },
  { x: '190px', y: '-40px', rotate: '0deg', delay: '30ms' },
  { x: '220px', y: '0px', rotate: '0deg', delay: '45ms' },
  { x: '190px', y: '40px', rotate: '0deg', delay: '60ms' },
  { x: '110px', y: '69px', rotate: '0deg', delay: '75ms' },
  { x: '0px', y: '80px', rotate: '0deg', delay: '90ms' },
  { x: '-110px', y: '69px', rotate: '0deg', delay: '105ms' },
  { x: '-190px', y: '40px', rotate: '0deg', delay: '120ms' },
  { x: '-220px', y: '0px', rotate: '0deg', delay: '135ms' },
  { x: '-190px', y: '-40px', rotate: '0deg', delay: '150ms' },
  { x: '-110px', y: '-69px', rotate: '0deg', delay: '165ms' },
];

export function SubscribeButton({ slug }: { slug: string }) {
  const { profile, refetch } = useProfile();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['subscribe'],
    mutationFn: () => channelService.toggleSubscribe(slug),
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setIsAnimating(false);
      setShowStars(false);

      await queryClient.invalidateQueries({
        queryKey: ['profile'],
      });

      await refetch();
      router.refresh();
    },

    onError: () => {
      setIsAnimating(false);
    },
  });
  const isSubscribed = profile?.subscriptions.some((sub) => sub.slug == slug);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showStars, setShowStars] = useState(false);

  const clickHandler = () => {
    if (!profile) {
      router.push(PUBLIC_PAGE.AUTH);
      return;
    }

    if (isPending) return;

    if (!isSubscribed) {
      setIsAnimating(true);
      setShowStars(true);
      // setTimeout(() => {
      //   setShowStars(true);
      // }, 60);
    }

    mutate();
  };

  return (
    <div className="relative w-fit">
      {showStars &&
        stars.map((star, index) => (
          <span
            key={`${index}-${isAnimating}`}
            className="absolute left-1/2 top-1/2 z-20 pointer-events-none animate-subscribe-star text-primary"
            style={
              {
                '--star-x': star.x,
                '--star-y': star.y,
                '--star-rotate': star.rotate,
                animationDelay: star.delay,
              } as React.CSSProperties
            }>
            ✦
            <Dot />
          </span>
        ))}
      <Button
        onClick={clickHandler}
        className={cn(
          'relative z-10 w-fit transition-all duration-100',
          isAnimating ? 'scale-95' : '',
        )}
        disabled={isPending}
        variant={isAnimating ? 'tertiary' : isSubscribed ? 'secondary' : 'primary'}>
        {isAnimating ? 'Subscribing...' : isSubscribed ? 'Subscribed' : 'Subscribe'}
      </Button>
    </div>
  );
}
