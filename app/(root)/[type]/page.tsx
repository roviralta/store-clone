import React from 'react'

interface SearchParamProps {
	params?: { [key: string]: string | string[] | undefined }
	searchParams?: { [key: string]: string | string[] | undefined }
}
const page = async ({ params }: SearchParamProps) => {
	const type = ((await params)?.type as string) || ''
	return (
		<div className='flex ml-10 mt-10 flex-col'>
			<section className='w-full '>
				<h1 className='font-bold size-10'>{type}</h1>
				<div>
					<p>
						Total: <span>0 MB</span>
					</p>
				</div>
			</section>
		</div>
	)
}

export default page
