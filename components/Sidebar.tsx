import React from 'react'
import logobg from '../public/logobg.png'
import Image from 'next/image'

const Sidebar = () => {
	return (
		<aside className='hidden sm:flex flex-col gap-20 p-4 w-48 bg-gray-100 border-r h-full'>
			<div className='center gap-2 text-3xl font-bold text-gray-600'>
				<h1>Cluud</h1>
				<Image src={logobg} alt='logo' width={50} height={50} />
			</div>
			<ul className='flex flex-col gap-5 space-y-2 text-gray-700 font-medium'>
				<li className='hover:rounded-2xl h-8 hover:border hover:bg-blue-100 cursor-pointer flex justify-center items-center'>
					Dashboard
				</li>
				<li className='hover:rounded-2xl h-8 hover:border hover:bg-blue-100 cursor-pointer flex justify-center items-center'>
					Images
				</li>
				<li className='hover:rounded-2xl h-8 hover:border hover:bg-blue-100 cursor-pointer flex justify-center items-center'>
					Media
				</li>
				<li className='hover:rounded-2xl h-8 hover:border hover:bg-blue-100 cursor-pointer flex justify-center items-center'>
					Others
				</li>
			</ul>
		</aside>
	)
}

export default Sidebar
