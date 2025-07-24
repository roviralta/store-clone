import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface File {
	name: string
	url: string
	size: number
	$updatedAt: string | Date
	type: string
}

interface FileCardProps {
	file: File
}

const formatSize = (bytes: number) => {
	const sizes = ['Bytes', 'KB', 'MB', 'GB']
	if (bytes === 0) return '0 Bytes'
	const i = Math.floor(Math.log(bytes) / Math.log(1024))
	return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

const formatDate = (date: string | Date) => {
	const d = new Date(date)
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}

const FileCard = ({ file }: FileCardProps) => {
	const isImage = file.type.startsWith('image')

	return (
		<Link
			href={file.url}
			target='_blank'
			rel='noopener noreferrer'
			className='block sm:w-64 group'
		>
			<article
				className='bg-white rounded-2xl shadow p-4 flex flex-col justify-between h-64 hover:shadow-md transition-shadow duration-200'
				aria-label={`Open file ${file.name}`}
			>
				{/* File name */}
				<h2 className='text-sm font-semibold truncate text-center mb-2 text-black group-hover:text-blue-600 transition-colors duration-150'>
					{file.name}
				</h2>

				{/* Image preview or fallback */}
				<div className='relative w-full h-40 overflow-hidden rounded-lg border bg-gray-50'>
					{isImage ? (
						<Image
							src={file.url}
							alt={file.name}
							fill
							sizes='(max-width: 640px) 100vw, 256px'
							className='object-fill'
							loading='lazy' // LCP optimized
						/>
					) : (
						<div className='flex items-center justify-center h-full text-gray-400 text-xs text-center px-4'>
							No preview available
						</div>
					)}
				</div>

				{/* Bottom info */}
				<footer className='text-xs text-gray-600 mt-2 flex justify-between items-center'>
					<time dateTime={new Date(file.$updatedAt).toISOString()}>
						{formatDate(file.$updatedAt)}
					</time>
					<span>{formatSize(file.size)}</span>
				</footer>
			</article>
		</Link>
	)
}

export default FileCard
