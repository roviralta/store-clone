'use client'

import { MdCloudUpload } from 'react-icons/md'
import { Button } from './ui/button'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { convertFileToUrl, getFileType } from '@/lib/utils'
import UploadSummary from './UploadSummary'

interface Props {
	ownerId: string
	accountId: string
}

const FileUploader = ({ ownerId, accountId }: Props) => {
	const [files, setFiles] = useState<File[]>([])
	const [showSummary, setShowSummary] = useState(false)

	const onDrop = useCallback((acceptedFiles: File[]) => {
		console.log('Dropped files:', acceptedFiles)
		setFiles(acceptedFiles)
		setShowSummary(true)
	}, [])

	const totalSize = files.reduce((acc, file) => acc + file.size, 0)

	const { getRootProps, getInputProps } = useDropzone({ onDrop })

	return (
		<div className='relative flex flex-col justify-center items-center'>
			{/* Dropzone area */}
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

			{/* Upload summary outside the dropzone */}
			{showSummary && (
				<div className='absolute top-10 right-25'>
					<UploadSummary
						totalFiles={files.length}
						totalSize={totalSize}
						progress={42}
						onClose={() => setShowSummary(false)}
					/>
				</div>
			)}
		</div>
	)
}

export default FileUploader
