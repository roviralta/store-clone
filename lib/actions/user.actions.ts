'use server'

import { ID, Query } from 'node-appwrite'
import { createAdminClient, createClient } from '../appwrite'
import { appwriteConfig } from '../appwrite/config'
import { parseStringify } from '../utils'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const getUserByEmail = async (email: string) => {
	const { databases } = await createAdminClient()

	const result = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.usersCollection,
		[Query.equal('email', [email])]
	)

	return result.total > 0 ? result.documents[0] : null
}

const handleError = (error: unknown, message: string) => {
	console.log(error, message)
	throw error
}

export const sendEmailOTP = async ({ email }: { email: string }) => {
	const { account } = await createAdminClient()

	try {
		const session = await account.createEmailToken(ID.unique(), email)
		return session.userId
	} catch (error) {
		handleError(error, 'Failed to send email OTP')
	}
}

export const createAccount = async ({
	username,
	email,
}: {
	username: string
	email: string
}) => {
	const existingUser = await getUserByEmail(email)

	const accountId = await sendEmailOTP({ email })

	if (!accountId) throw new Error('Failed to send email OTP')
	if (!existingUser) {
		const { databases } = await createAdminClient()

		await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.usersCollection,
			ID.unique(),
			{
				username,
				email,
				avatar: 'https://imgs.search.brave.com/tSQ7qyU11uWI2i0NKNeRN7c7v3Cu6qa3-LE_Sj_9z9E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjA0/MTU3MjM5NS92ZWN0/b3IvYmxhbmstYXZh/dGFyLXBob3RvLXBs/YWNlaG9sZGVyLWlj/b24tdmVjdG9yLWls/bHVzdHJhdGlvbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/d1N1aXUtc2kzM20t/ZWl3R2hYaVhfNUR2/S1FESE5TLS1DQkxj/eXV5NjhuMD0',
				accountId,
			}
		)
	}

	return parseStringify({ accountId })
}

export const verifySecret = async ({
	accountId,
	password,
}: {
	accountId: string
	password: string
}) => {
	try {
		const { account } = await createAdminClient()

		const session = await account.createSession(accountId, password)

		;(await cookies()).set('appwrite-session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		})
		return parseStringify({ sessionId: session.$id })
	} catch (error) {
		handleError(error, 'OTP code not correct')
	}
}

export const getCurrentUser = async () => {
	const { databases, account } = await createClient()

	const result = await account.get()
	const user = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.usersCollection,
		[Query.equal('accountId', [result.$id])]
	)

	if (user.total <= 0) return null

	return parseStringify(user.documents[0])
}

export const signOutUser = async () => {
	const { account } = await createClient()

	try {
		await account.deleteSession('current')
		;(await cookies()).delete('appwrite-session')
	} catch (error) {
		handleError(error, 'Error logging out')
	} finally {
		redirect('/sign-in')
	}
}

export const signInUser = async ({ email }: { email: string }) => {
	try {
		const user = await getUserByEmail(email)
		if (!user) {
			return parseStringify({ accountId: null, error: 'User not found' })
		}
		await sendEmailOTP({ email })
		return parseStringify({ accountId: user.accountId })
	} catch (error) {
		handleError(error, 'Failed to sign in user')
		return parseStringify({ accountId: null, error: 'Sign in failed' })
	}
}
