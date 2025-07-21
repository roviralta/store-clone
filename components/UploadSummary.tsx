import React from 'react'
import Image from 'next/image'
import fileloader from '../public/file-loader.gif'

interface Props {
	totalFiles: number
	totalSize: number
	onClose: () => void
}

const formatSize = (bytes: number) => {
	const sizes = ['Bytes', 'KB', 'MB', 'GB']
	if (bytes === 0) return '0 Byte'
	const i = Math.floor(Math.log(bytes) / Math.log(1024))
	return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

const UploadSummary = ({ totalFiles, totalSize, onClose }: Props) => {
	
	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation() // Prevent the click from bubbling up
		onClose()
	}

	return (
		<div className='absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-auto p-4'>
			<div className='flex justify-between items-start'>
				<div>
					<p className='text-sm font-medium text-gray-800'>
						Uploading {totalFiles}{' '}
						{totalFiles === 1 ? 'file' : 'files'}
					</p>
					<p className='text-xs text-gray-500'>
						Total size: {formatSize(totalSize)}
					</p>
				</div>
				<button
					onClick={handleClose}
					className='text-gray-400 hover:text-gray-600 text-sm font-bold ml-2 hover:cursor-pointer'
					aria-label='Close upload summary'
					title='Close'
				>
					×
				</button>
			</div>

			<div className='w-full bg-gray-100 rounded-full h-2 mt-2'>
				<Image src={fileloader} alt='file loader' />
			</div>
		</div>
	)
}

export default UploadSummary
