'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
	FaFilePdf,
	FaFileAlt,
	FaFileAudio,
	FaFileVideo,
	FaFile,
	FaTrash,
	FaShareAlt,
	FaDownload,
} from 'react-icons/fa'
import { formatDate, formatSize } from '@/lib/utils'

interface AppFile {
	name: string
	url: string
	size: number
	$updatedAt: string | Date
	type: string
	id: string // Asumiendo que tienes un ID para eliminar
}

interface FileCardProps {
	file: AppFile
	onDelete?: (id: string) => void
	onShare?: (file: AppFile) => void
}

const FileCard = ({ file, onDelete, onShare }: FileCardProps) => {
	const isImage = file.type.startsWith('image')

	const renderIcon = () => {
		if (file.type === 'application/pdf') return <FaFilePdf />
		if (file.type.startsWith('text')) return <FaFileAlt />
		if (file.type.startsWith('audio')) return <FaFileAudio />
		if (file.type.startsWith('video')) return <FaFileVideo />
		return <FaFile />
	}

	return (
		<article
			className='group relative bg-card border rounded-2xl shadow-sm transition-all duration-300 p-4 flex flex-col justify-between h-64 w-64 transform hover:scale-[1.02] hover:cursor-pointer hover:border-blue-700 hover:shadow-2xl'
			aria-label={`Open file ${file.name}`}
		>
			{/* Top actions */}
			<div className='absolute top-2 right-2 flex gap-2 z-10'>
				<button
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						onShare?.(file)
					}}
					className='text-muted-foreground  transition-colors hover:cursor-pointer hover:text-blue-600'
					title='Share file'
				>
					<FaShareAlt />
				</button>
				<button
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						onDelete?.(file.id)
					}}
					className='text-muted-foreground hover:text-destructive transition-colors hover:cursor-pointer'
					title='Delete file'
				>
					<FaTrash />
				</button>
			</div>

			{/* File name */}
			<h2 className='text-sm font-semibold truncate text-center mb-2 mt-3 text-foreground group-hover:text-primary transition-colors'>
				{file.name}
			</h2>

			{/* File preview */}
			<Link
				href={file.url}
				target='_blank'
				rel='noopener noreferrer'
				className='relative w-full h-40 rounded-lg border bg-muted flex items-center justify-center overflow-hidden'
			>
				{isImage ? (
					<Image
						src={file.url}
						alt={file.name}
						fill
						sizes='(max-width: 640px) 100vw, 256px'
						className='object-cover rounded-lg'
						loading='lazy'
					/>
				) : (
					<span
						role='img'
						aria-label={`${file.type.split('/')[0]} file`}
						className='text-muted-foreground text-4xl'
					>
						{renderIcon()}
					</span>
				)}
			</Link>

			{/* Bottom info */}
			<footer className='text-xs text-muted-foreground mt-2 flex justify-between items-center'>
				<time dateTime={new Date(file.$updatedAt).toISOString()}>
					{formatDate(file.$updatedAt)}
				</time>
				<span>{formatSize(file.size)}</span>
			</footer>
		</article>
	)
}

export default FileCard
