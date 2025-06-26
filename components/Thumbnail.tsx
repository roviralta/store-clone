import React from 'react'
import Image from 'next/image'

interface Props {
	type: string
	extension: string
	url: string
}

const Thumbnail = ({ type, extension, url = '' }: Props) => {
	const isImage = type === 'image' && extension !== 'svg'

	return (
		<figure className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0 rounded-md overflow-hidden border border-gray-200'>
			<Image
				src={url}
				alt='thumbnail'
				width={128}
				height={128}
				className='w-full h-full object-cover'
			/>
		</figure>
	)
}

export default Thumbnail
