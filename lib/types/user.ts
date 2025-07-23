// types/user.ts

export interface DatabaseUser {
	$id: string
	username: string
	email: string
	avatar: string
	accountId: string
	$createdAt: string
	$updatedAt: string
}

export interface NormalizedUser {
	id: string
	username: string
	email: string
	avatar: string
	accountId: string
}

export interface UserContextType {
	user: NormalizedUser | null
	loading: boolean
	error: string | null
	refreshUser: () => Promise<void>
	clearUser: () => void
	isAuthenticated: boolean
}
