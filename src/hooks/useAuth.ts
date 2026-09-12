import { useTypedSelector } from '@/store'

export function useAuth() {
	return useTypedSelector(state => state.auth)
}
