'use client'

import { MdCloudUpload } from 'react-icons/md'
import { Button } from './ui/button'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { convertFileToUrl, getFileType } from '@/lib/utils'
import Thumbnail from './Thumbnail'
import loader from '../public/loader.svg'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Props {
	ownerId: string
	accountId: string
	classname: string
}

const FileUploader = ({ ownerId, accountId, classname }: Props) => {
	const [files, setFiles] = useState<File[]>([])

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		setFiles(acceptedFiles)
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})

	const rootProps = getRootProps()

	const handleRemoveFile = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		fileName: string
	) => {
		e.stopPropagation()
		setFiles((prev) => prev.filter((file) => file.name !== fileName))
	}

	return (
		<motion.div
			className={`w-full transition-colors duration-200 cursor-pointer ${classname}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			{...(rootProps as any)}
		>
			<input {...getInputProps()} />

			<Button
				type='button'
				className='bg-gray-200 text-gray-800 hover:cursor-pointer hover:bg-blue-100 w-full sm:w-auto'
			>
				<MdCloudUpload className='mr-2' />
				<p className='hidden md:block'>Upload</p>
			</Button>

			{files.length > 0 && (
				<motion.div
					className='mt-6 space-y-4'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					<h4 className='font-semibold text-gray-700'>Uploading</h4>
					<ul className='space-y-3'>
						{files.map((file, index) => {
							const { type, extension } = getFileType(file.name)
							return (
								<li
									key={`${file.name}-${index}`}
									className='flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white shadow p-3 rounded-lg'
								>
									<Thumbnail
										type={type}
										extension={extension}
										url={convertFileToUrl(file)}
									/>
									<div className='flex-1'>
										<p className='text-sm font-medium text-gray-800 break-all'>
											{file.name}
										</p>
										<Image
											src={loader}
											alt='Uploading...'
											width={80}
											height={26}
										/>
									</div>
									<button
										onClick={(e) =>
											handleRemoveFile(e, file.name)
										}
										className='text-red-500 hover:text-red-700 transition-colors text-sm font-medium'
									>
										Remove
									</button>
								</li>
							)
						})}
					</ul>
				</motion.div>
			)}
		</motion.div>
	)
}

export default FileUploader
