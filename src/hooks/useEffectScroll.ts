import { useEffect } from 'react'

interface Props {
	hasNextPage: boolean
	isFetchingNextPage: boolean
	fetchNextPage: () => void
}

export function useEffectScroll({ fetchNextPage, hasNextPage, isFetchingNextPage }: Props) {
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
					document.documentElement.offsetHeight * 0.99 &&
				hasNextPage &&
				!isFetchingNextPage
			) {
				fetchNextPage()
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [hasNextPage, isFetchingNextPage, fetchNextPage])
}
