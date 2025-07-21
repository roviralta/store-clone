'use client'

import { MdCloudUpload } from 'react-icons/md'
import { Button } from './ui/button'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadSummary from './UploadSummary'
import { MAX_FILE_SIZE } from '../lib/utils'
import { toast, Toaster } from 'sonner'
import { uploadFile } from '@/lib/actions/file.actions'
import { usePathname } from 'next/navigation'

interface Props {
	ownerId: string
	accountId: string
}

const FileUploader = ({ ownerId, accountId }: Props) => {
	const path = usePathname()
	const [files, setFiles] = useState<File[]>([])
	const [showSummary, setShowSummary] = useState(false)

	console.log('details: ', ownerId, accountId)

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			// Filter out files that are too large before processing
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

			if (validFiles.length === 0) {
				return // No valid files to upload
			}

			// Set the valid files and show summary
			setFiles(validFiles)
			setShowSummary(true)

			// Upload each valid file
			const uploadPromises = validFiles.map(async (file) => {
				try {
					const uploadedFile = await uploadFile({
						file,
						ownerId,
						accountId,
						path,
					})

					if (uploadedFile) {
						// Remove successfully uploaded file from the list
						setFiles((prev) =>
							prev.filter((f) => f.name !== file.name)
						)
						return { success: true, fileName: file.name }
					} else {
						toast(
							<p>
								There is a problem uploading{' '}
								<span className='font-medium'>{file.name}</span>
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

			// Wait for all uploads to complete
			const results = await Promise.all(uploadPromises)

			// Hide summary after all uploads are done
			setShowSummary(false)

			// Show success message if any files were uploaded successfully
			const successCount = results.filter(
				(result) => result.success
			).length
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
			{/* Dropzone area */}
			{ownerId && accountId ? (
				<div {...getRootProps()}>
					<input {...getInputProps()} />
					<Button
						type='button'
						className='bg-gray-200 text-gray-800 hover:cursor-pointer hover:bg-blue-100 w-full sm:w-auto'
					>
						<MdCloudUpload />
						<p className='hidden md:block'>Upload</p>
					</Button>
				</div>
			) : (
				<div
					className='w-full sm:w-auto bg-gray-200 text-gray-400 flex items-center justify-center rounded-md h-9 px-4 py-2 cursor-not-allowed select-none'
					onClick={() => toast(<p>Please log in to upload files.</p>)}
					style={{ pointerEvents: 'auto' }}
				>
					<MdCloudUpload />
					<p className='hidden md:block ml-2'>Upload</p>
				</div>
			)}

			{/* Upload summary outside the dropzone */}
			{showSummary && (
				<div className='absolute top-10 right-25'>
					<UploadSummary
						totalFiles={files.length}
						totalSize={totalSize}
						progress={42}
						onClose={handleRemove}
					/>
				</div>
			)}
		</div>
	)
}

export default FileUploader
