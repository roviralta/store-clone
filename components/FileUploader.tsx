'use client'

import { MdCloudUpload } from 'react-icons/md'
import { Button } from './ui/button'
import React, { memo, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadSummary from './UploadSummary'
import { MAX_FILE_SIZE } from '../lib/utils'
import { toast } from 'sonner'
import { uploadFile } from '@/lib/actions/file.actions'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Props {
	ownerId: string
	accountId: string
}

const FileUploader = memo(({ ownerId, accountId }: Props) => {
	const path = usePathname()
	const [files, setFiles] = useState<File[]>([])
	const [showSummary, setShowSummary] = useState(false)

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const validFiles = acceptedFiles.filter((file) => {
				if (file.size > MAX_FILE_SIZE) {
					toast(
						<p>
							<span className='font-medium'>{file.name}</span> is
							too large!
						</p>
					)
					return false
				}
				return true
			})

			if (!validFiles.length) return

			setFiles(validFiles)
			setShowSummary(true)

			const uploadResults = await Promise.all(
				validFiles.map(async (file) => {
					try {
						const uploadedFile = await uploadFile({
							file,
							ownerId,
							accountId,
							path,
						})

						if (uploadedFile) {
							setFiles((prev) =>
								prev.filter((f) => f.name !== file.name)
							)
							return { success: true, fileName: file.name }
						} else {
							toast(
								<p>
									There was a problem uploading{' '}
									<span className='font-medium'>
										{file.name}
									</span>
								</p>
							)
							return { success: false, fileName: file.name }
						}
					} catch (error) {
						console.error(`Error uploading ${file.name}:`, error)
						toast(
							<p>
								Failed to upload{' '}
								<span className='font-medium'>{file.name}</span>
							</p>
						)
						return { success: false, fileName: file.name }
					}
				})
			)

			setShowSummary(false)

			const successCount = uploadResults.filter((r) => r.success).length
			if (successCount > 0) {
				toast(
					<p>
						Successfully uploaded {successCount}{' '}
						{successCount === 1 ? 'file' : 'files'}
					</p>
				)
			}
		},
		[ownerId, accountId, path]
	)

	const totalSize = files.reduce((acc, file) => acc + file.size, 0)

	const { getRootProps, getInputProps } = useDropzone({ onDrop })

	const handleRemove = () => {
		setFiles([])
		setShowSummary(false)
	}

	return (
		<div className='relative flex flex-col justify-center items-center'>
			{ownerId && accountId ? (
				<div {...getRootProps()} className='w-full sm:w-auto'>
					<input
						{...getInputProps()}
						aria-label='Upload file input'
					/>
					<Button
						type='button'
						className={cn(
							'w-full sm:w-auto flex items-center gap-2 bg-gray-200 text-gray-800',
							'hover:bg-blue-100 hover:text-blue-600 transition-colors',
							'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
						)}
					>
						<MdCloudUpload className='text-xl' />
						<span className='hidden md:inline'>Upload</span>
					</Button>
				</div>
			) : (
				<div
					role='button'
					tabIndex={0}
					onClick={() => toast(<p>Please log in to upload files.</p>)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							toast(<p>Please log in to upload files.</p>)
						}
					}}
					className={cn(
						'w-full sm:w-auto h-9 px-4 py-2 rounded-md flex items-center justify-center',
						'bg-gray-200 text-gray-400 cursor-not-allowed select-none',
						'transition'
					)}
					aria-disabled='true'
				>
					<MdCloudUpload className='text-xl' />
					<span className='hidden md:inline ml-2'>Upload</span>
				</div>
			)}

			{showSummary && (
				<div className='absolute top-10 right-0 sm:right-10 z-10'>
					<UploadSummary
						totalFiles={files.length}
						totalSize={totalSize}
						onClose={handleRemove}
					/>
				</div>
			)}
		</div>
	)
})

FileUploader.displayName = 'FileUploader'
export default FileUploader
