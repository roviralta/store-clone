import FileCard from '@/components/FileCard'
import Sort from '@/components/Sort'
import { getFiles } from '@/lib/actions/file.actions'
import React from 'react'
import { formatSize } from '@/lib/utils'

interface SearchParamProps {
	params?: { [key: string]: string | string[] | undefined }
	searchParams?: { [key: string]: string | string[] | undefined }
}
const page = async ({ params }: SearchParamProps) => {
	const type = ((await params)?.type as string) || ''
	const files = await getFiles()

	const size = files.documents.reduce(
		(acc: any, file: any) => acc + file.size,
		0
	)

	return (
		<>
			<section className='w-full flex items-center justify-between'>
				<div className='flex flex-col justify-around'>
					<h1 className='font-bold size-10 uppercase'>{type}</h1>
					<p>
						Total: <span>{formatSize(size)}</span>
					</p>
				</div>
				<div className='flex gap-3'>
					<span>Sort by:</span>
					<Sort />
				</div>
			</section>
			{files.total > 0 ? (
				<section className='flex flex-wrap items-center justify-center gap-4 pt-5'>
					{files.documents.map((file: any) => (
						<FileCard key={file.$id} file={file} />
					))}
				</section>
			) : (
				<p>No files uploaded</p>
			)}
		</>
	)
}

export default page
