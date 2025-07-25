import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const parseStringify = (value: unknown) => {
	return JSON.parse(JSON.stringify(value))
}

export const getFileType = (filename: string) => {
	const extension = filename.split('.').pop()?.toLowerCase() || ''

	const typeMap: Record<string, string> = {
		// Images
		jpg: 'image',
		jpeg: 'image',
		png: 'image',
		gif: 'image',
		webp: 'image',
		svg: 'image',
		bmp: 'image',
		// Videos
		mp4: 'video',
		mov: 'video',
		avi: 'video',
		mkv: 'video',
		webm: 'video',
		// Audio
		mp3: 'audio',
		wav: 'audio',
		ogg: 'audio',
		flac: 'audio',
		// Documents
		pdf: 'document',
		doc: 'document',
		docx: 'document',
		xls: 'document',
		xlsx: 'document',
		ppt: 'document',
		pptx: 'document',
		txt: 'document',
		csv: 'document',
		// Code
		js: 'code',
		ts: 'code',
		html: 'code',
		css: 'code',
		json: 'code',
		xml: 'code',
		// Archive
		zip: 'archive',
		rar: 'archive',
		tar: 'archive',
		gz: 'archive',
	}

	return {
		type: typeMap[extension] || 'unknown',
		extension,
	}
}

export const constructFileUrl = (bucketFileId: string) => {
	return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`
}

export const MAX_FILE_SIZE = 50 * 1024 * 1024
export const formatSize = (bytes: number): string => {
	const sizes = ['Bytes', 'KB', 'MB', 'GB']
	if (bytes === 0) return '0 Byte'
	const i = Math.floor(Math.log(bytes) / Math.log(1024))
	return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

export const formatDate = (date: string | Date) => {
	const d = new Date(date)
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}
