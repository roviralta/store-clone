'use client'
import React from 'react'
import { MdCloudUpload } from 'react-icons/md'
import { Button } from './ui/button'

const FileUploader = () => {
	return (
		<div>
			<Button
				className='bg-gray-200 text-gray-800'
				onClick={() => console.log('testing button')}
			>
				<MdCloudUpload />
				<p className='hidden md:block'>Upload</p>
			</Button>
		</div>
	)
}

export default FileUploader
