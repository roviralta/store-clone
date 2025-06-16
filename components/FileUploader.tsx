import React from 'react'
import { MdCloudUpload } from 'react-icons/md'
import { Button } from './ui/button'

const FileUploader = () => {
	return (
		<div>
			<Button className='bg-gray-100 text-gray-600'>
				<MdCloudUpload />
				Upload
			</Button>
		</div>
	)
}

export default FileUploader
