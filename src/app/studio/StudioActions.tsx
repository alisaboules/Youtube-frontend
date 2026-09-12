'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { type Toast, toast } from 'react-hot-toast'
import { STUDIO_PAGE } from '@/config/studio-page'
import type { IVideo } from '@/types/video.types'
import { studioService } from '@/services/studio-video.service'
import { PUBLIC_PAGE } from '@/config/public-page.config'

interface Props {
	video: IVideo
}

export function StudioActions({ video }: Props) {
	const queryClient = useQueryClient()

	const { mutate: deleteVideo, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete a video'],
		mutationFn: () => studioService.delete(video.id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['studioVideoList']
			})
			toast.success('Successfully deleted!')
		}
	})

	const handleDelete = () => {
		toast((t: Toast) => (
			<div>
				<p>Are you sure you want to delete this video?</p>
				<div className='flex justify-end gap-4 mt-2'>
					<button
						onClick={() => {
							deleteVideo()
							toast.dismiss(t.id)
						}}
						className='text-primary'
					>
						Delete
					</button>
					<button
						onClick={() => toast.dismiss(t.id)}
						className='text-gray-400'
					>
						Cancel
					</button>
				</div>
			</div>
		))
	}

	return (
		<div className='flex justify-center items-start gap-5'>
			<Link
				href={PUBLIC_PAGE.VIDEO(video.publicId)}
				className='text-foreground transition-opacity opacity-70 hover:opacity-100'
				target='_blank'
				title='Open in a new tab'
			>
				<ExternalLink size={22} />
			</Link>
			<Link
				href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
				className='text-quaternary transition-opacity opacity-70 hover:opacity-100'
				title='Edit a video'
			>
				<Edit size={22} />
			</Link>
			<button
				onClick={handleDelete}
				className='text-primary transition-opacity opacity-70 hover:opacity-100'
				title='Delete a video'
				disabled={isDeletePending}
			>
				<Trash2 size={22} />
			</button>
		</div>
	)
}
