'use client'
import { useEffect } from 'react'
import { authService } from '@/services/auth.services'
import { useAppDispatch } from '@/store'
import { clearAuthData } from '@/store/auth.slice'

export function AuthInitializer() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const initAuth = async () => {
			try {
				await authService.getNewTokens()
			} catch {
				dispatch(clearAuthData())
			}
		}

		initAuth()
	}, [dispatch])

	return null
}