'use client';

import { useProfile } from '@/hooks/useProfile';
import { SubscribeButton } from '@/ui/button/SubscribeButton';
import { NotificationMenu } from './NotificationMenu';

interface Props {
  channelId: string;
  slug: string;
}

export function ChannelSubscribe({ channelId, slug }: Props) {
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return null;
  }

  const isSubscribed = profile?.subscriptions.some((subscription) => subscription.id === channelId);

  return (
    <>
      {!isSubscribed ? <SubscribeButton slug={slug} /> : <NotificationMenu channelId={channelId} />}
    </>
  );
}
