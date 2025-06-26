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

export const convertFileToUrl = (file: File) => {
	return URL.createObjectURL(file)
}
