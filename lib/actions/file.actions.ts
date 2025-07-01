'use server'
import { createAdminClient } from '../appwrite'
import { InputFile } from 'node-appwrite/file'
import { appwriteConfig } from '../appwrite/config'
import { ID } from 'node-appwrite'
import { constructFileUrl, getFileType, parseStringify } from '../utils'
import { revalidatePath } from 'next/cache'

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
