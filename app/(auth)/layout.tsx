import React from 'react'
import Image from 'next/image'
import icon from '../../public/favicon.ico'
import cloudFile from '../../public/cloudfile.png'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col lg:flex-row min-h-screen'>
			<section className='bg-blue-100 w-full lg:w-1/3 xl:w-1/4 center flex-col px-6 py-12 gap-10'>
				<div className='flex flex-col items-center mb-10'>
					<Image src={icon} alt='Cluud logo' width={60} height={60} />
					<h2 className='text-lg sm:text-xl font-semibold mt-2'>
						Cluud Storage
					</h2>
				</div>

				<div className='flex items-center flex-col'>
					<h1 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-2'>
						Manage your files the best way
					</h1>
					<p className='text-sm sm:text-base text-gray-700'>
						This is a place where you can store all your files
					</p>
					<Image
						src={cloudFile}
						alt='cluud files'
						width={220}
						height={220}
						className='transition-all hover:rotate-3 hover:scale-105 cursor-pointer'
					/>
				</div>
			</section>

			<main className='flex-1 bg-white p-4 sm:p-6 md:p-8'>
				{children}
			</main>
		</div>
	)
}

export default Layout
