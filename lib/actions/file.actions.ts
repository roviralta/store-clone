'use server'
import { createAdminClient } from '../appwrite'
import { InputFile } from 'node-appwrite/file'
import { appwriteConfig } from '../appwrite/config'
import { ID, Models, Query } from 'node-appwrite'
import { constructFileUrl, getFileType, parseStringify } from '../utils'
import { revalidatePath } from 'next/cache'
import { getCurrentUser } from './user.actions'
import { parse } from 'path'

interface UploadFileProps {
	file: File
	ownerId: string
	accountId: string
	path: string
}

const handleError = (error: unknown, message: string) => {
	console.log(error, message)
	throw error
}

export const uploadFile = async ({
	file,
	ownerId,
	accountId,
	path,
}: UploadFileProps) => {
	const { storage, databases } = await createAdminClient()

	try {
		const inputFile = InputFile.fromBuffer(file, file.name)

		const bucket = await storage
			.createFile(appwriteConfig.bucket, ID.unique(), inputFile)
			.catch((error) => {
				console.error('Storage upload failed:', error)
				throw new Error(
					`Failed to upload ${file.name}: ${error.message}`
				)
			})

		const fileDocument = {
			type: getFileType(bucket.name).type,
			name: bucket.name,
			url: constructFileUrl(bucket.$id),
			extension: getFileType(bucket.name).extension,
			size: bucket.sizeOriginal,
			owner: ownerId,
			accountId: accountId,
			users: [],
			bucket: bucket.$id,
		}

		const newFile = await databases
			.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.filesCollection,
				ID.unique(),
				fileDocument
			)
			.catch(async (error) => {
				await storage.deleteFile(appwriteConfig.bucket, bucket.$id)
				handleError(error, 'Failed to create file document')
			})

		revalidatePath(path)

		return parseStringify(newFile)
	} catch (error) {
		handleError(error, 'Failed to upload files')
	}
}

const createQueries = (user: Models.Document) => {
	const queries = [
		Query.or([
			Query.equal('owner', [user.$id]),
			Query.contains('users', [user.email]),
		]),
	]

	//TODO SEARCH

	return queries
}

export const getFiles = async () => {
	const { databases } = await createAdminClient()

	try {
		const user = await getCurrentUser()

		if (!user) throw new Error('User not found')

		const queries = createQueries(user)

		const files = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.filesCollection,
			queries
		)

		return parseStringify(files)
	} catch (error) {
		handleError(error, 'Failed to get files')
	}
}
