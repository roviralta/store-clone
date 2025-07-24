import React from 'react'
import Image from 'next/image'
import fileloader from '../public/file-loader.gif'

interface Props {
	totalFiles: number
	totalSize: number
	onClose: () => void
}

const formatSize = (bytes: number): string => {
	const sizes = ['Bytes', 'KB', 'MB', 'GB']
	if (bytes === 0) return '0 Byte'
	const i = Math.floor(Math.log(bytes) / Math.log(1024))
	return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

const UploadSummary = ({ totalFiles, totalSize, onClose }: Props) => {
	const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		onClose()
	}

	return (
		<div className='absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-xl w-auto p-4 z-20'>
			<div className='flex justify-between items-start'>
				<div>
					<p className='text-sm font-semibold text-gray-800'>
						Uploading {totalFiles}{' '}
						{totalFiles === 1 ? 'file' : 'files'}
					</p>
					<p className='text-xs text-gray-500'>
						Total size: {formatSize(totalSize)}
					</p>
				</div>
				<button
					onClick={handleClose}
					className='text-gray-400 hover:text-blue-600 transition-colors font-bold text-base ml-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded'
					aria-label='Close upload summary'
					title='Close'
				>
					×
				</button>
			</div>

			<div className='w-full mt-3 h-2 rounded-full overflow-hidden bg-gray-100 relative'>
				<div className='absolute inset-0 flex items-center justify-center'>
					<Image
						src={fileloader}
						alt='Uploading files loader animation'
						width={120}
						height={16}
						className='object-contain'
						priority
					/>
				</div>
			</div>
		</div>
	)
}

export default UploadSummary
