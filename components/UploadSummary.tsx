import React from 'react'

interface Props {
	totalFiles: number
	totalSize: number
	progress?: number
	onClose: () => void
}

const formatSize = (bytes: number) => {
	const sizes = ['Bytes', 'KB', 'MB', 'GB']
	if (bytes === 0) return '0 Byte'
	const i = Math.floor(Math.log(bytes) / Math.log(1024))
	return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

const UploadSummary = ({ totalFiles, totalSize, progress, onClose }: Props) => {
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
					className='text-gray-400 hover:text-gray-600 text-sm font-bold ml-2 hover:cursoir-pointer'
				>
					×
				</button>
			</div>

			{progress !== undefined && (
				<div className='w-full bg-gray-100 rounded-full h-2 mt-2'>
					<div
						className='bg-blue-500 h-2 rounded-full transition-all duration-300'
						style={{ width: `${progress}%` }}
					/>
				</div>
			)}
		</div>
	)
}

export default UploadSummary
