export class AuthError extends Error {
	constructor(
		message: string,
		public code?: string
	) {
		super(message)
		this.name = 'AuthError'
	}
}

export class UserDataError extends Error {
	constructor(
		message: string,
		public missingFields?: string[]
	) {
		super(message)
		this.name = 'UserDataError'
	}
}
