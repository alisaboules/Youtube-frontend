import Image from 'next/image'
import Link from 'next/link'
import { STUDIO_PAGE } from '@/config/studio-page'
import { StudioActions } from './StudioActions'
import type { IFullVideo } from '@/types/video.types'
import { PUBLIC_PAGE } from '@/config/public-page.config'
import { stripHtml } from '@/utils/strip-html'
import { transformDate } from '@/utils/transform-date'

interface Props {
	video: IFullVideo
}

export function StudioVideoItem({ video }: Props) {
	const initialContent = stripHtml(video.description).slice(0, 150);

	return (
		<div className='grid grid-cols-[.49fr_1.1fr_0.3fr_0.3fr_0.3fr_0.2fr_0.5fr] gap-6 mb-6 border-b border-b-border pb-6 last:border-none'>
			<Link
				href={PUBLIC_PAGE.VIDEO(video.publicId)}
				target='_blank'
				className='flex-shrink-0'
			>
				<Image
					src={video.thumbnailUrl}
					width={206}
					height={116}
					alt={video.title}
					className='rounded-md'
				/>
			</Link>

			<div>
				<Link
					href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
					className='line-clamp-1 text-lg mb-1'
				>
					{video.title}
				</Link>

				<div className='opacity-50 line-clamp-2'>{initialContent}</div>
			</div>

			<div>
				<div className='text-gray-400'>{transformDate(video.createdAt)}</div>
				<div className='text-gray-600'>Published</div>
			</div>

			<div>
				<div className='text-gray-400'>{video.viewsCount.toLocaleString('ru-RU')} views</div>
			</div>

			<div>
				<div className='text-gray-400'>
					{video.comments.length.toLocaleString('ru-RU')} comments
				</div>
			</div>

			<div>
				<div className='text-gray-400'>{video.likes.length.toLocaleString('ru-RU')} likes</div>
			</div>

			<StudioActions video={video} />
		</div>
	)
}
