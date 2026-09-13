'use server'

import { API_URL } from "@/constants/api.constants"
import type { TUser } from "@/types/user.types"

interface IAuthResponse {
	user: TUser;
	accessToken: string;
}

export async function getNewTokensByRefresh(refreshToken: string) {
	const response = await fetch(`${API_URL}/auth/access-token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Cookie: `refreshToken=${refreshToken}`
		},
		credentials: 'include'
	})

	if (!response.ok) {
		throw new Error('Failed to fetch new tokens')
	}

	const data: IAuthResponse = await response.json()
	return data
}
