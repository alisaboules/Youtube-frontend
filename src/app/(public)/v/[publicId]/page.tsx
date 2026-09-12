import type { Metadata } from 'next';
import type { TPagePublicIdProp } from '@/types/page.types';
import { videoService } from '@/services/video.service';
import { stripHtml } from '@/utils/strip-html';
import { SingleVideo } from './SingleVideo';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: TPagePublicIdProp): Promise<Metadata> {
  const { publicId } = await params;
  const data = await videoService.getByPublicId(publicId);
  const video = data.data;
  return {
    title: video.title,
    description: stripHtml(video.description).slice(0, 150),
    openGraph: {
      type: 'video.other',
      images: [video.thumbnailUrl],
    },
  };
}

export async function generateStaticParams() {
  const data = await videoService.getAll();

  return data.data.videos.map((video) => ({
    publicId: video.publicId,
  }));
}

export default async function VideoPage({ params }: TPagePublicIdProp) {
  const { publicId } = await params;
  console.log('PUBLIC_ID IN PAGE:', publicId);
  const data = await videoService.getByPublicId(publicId);
  const video = data.data;
  return (
    <SingleVideo video={video}/>
  );
}
