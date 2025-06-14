'use server'

import { ID, Query } from 'node-appwrite'
import { createAdminClient } from '../appwrite'
import { appwriteConfig } from '../appwrite/config'
import { parse } from 'path'
import { parseStringify } from '../utils'

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

const sendEmailOTP = async ({ email }: { email: string }) => {
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
