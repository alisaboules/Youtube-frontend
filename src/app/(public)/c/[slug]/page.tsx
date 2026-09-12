import type { Metadata } from 'next';
import { channelService } from '@/services/channel.service';
import type { TPageSlugProp } from '@/types/page.types';
import { ChannelVideo } from './ChannelVideo';
import Image from 'next/image';
import { Heading } from '@/ui/Heading';
import Verify from '@/assets/verify.svg';
import { transformCounts } from '@/utils/transform-count';
import { Dot } from 'lucide-react';
import { Description } from '../../../../utils/convert-description';
import { SubscribeButton } from '@/ui/button/SubscribeButton';

export const revalidate = 100;
export const dynamic = 'force-static';

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
  const { slug } = await params;
  const data = await channelService.bySlug(slug);
  const channel = data.data;
  return {
    title: channel.user.name,
    description: channel.description,
    openGraph: {
      type: 'profile',
      images: [channel.avatarUrl],
    },
  };
}

export async function generateStaticParams() {
  const { data } = await channelService.getAll();

  return data.map((channel) => ({
    slug: channel.slug,
  }));
}

export default async function ChannelPage({ params }: TPageSlugProp) {
  const { slug } = await params;
  console.log('SLUG IN PAGE:', slug);
  const data = await channelService.bySlug(slug);
  console.log('SLUG IN PAGE:', slug);
  const channel = data.data;
  return (
    <section className="mb-20 px-10">
      <div>
        <div className="relative w-full h-[250px] rounded-3xl overflow-hidden">
          <Image
            alt={channel.user.name || 'Чей-то баннер'}
            src={channel.bannerUrl || '/default_banner.jpg'}
            fill
            className="object-cover"
            quality={100}
          />
        </div>
        <div className="flex item-сenter gap-5 my-7 ">
          <div className="w-[160px] h-[160px] rounded-full overflow-hidden shrink-0">
            <Image
              alt={channel.slug || 'Чей-то аватар'}
              src={channel.avatarUrl || '/default_avatar.jpeg'}
              width={160}
              height={160}
              className="w-full h-full object-cover"
              quality={100}
            />
          </div>

          <div className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-2">
              <Heading isPageHeading className="mb-0">
                <span>{channel.user.name}</span>
              </Heading>
              {channel.isVerified && <Verify className="w-7 h-7" />}
            </div>
            <div className="flex text-secondary items-center">
              <span className="text-foreground">{`@${channel.slug}`}</span>
              <Dot size={14} className="stroke-[4]" />
              <span>{transformCounts(channel.subscribers.length)} subscribers</span>
              <Dot size={14} className="stroke-[4]" />
              <span>{channel.videos.length} videos</span>
            </div>
            <Description mode="modal" previewLines={1} description={channel.description || ''} />
            <SubscribeButton slug={slug} />
          </div>
        </div>
      </div>
      {!!channel.videos.length && <ChannelVideo videos={channel.videos} />}
    </section>
  );
}
