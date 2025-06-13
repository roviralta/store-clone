import React from 'react'
import Image from 'next/image'
import icon from '../../public/logobg.png'
import cloudFile from '../../public/cloudfile.png'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col lg:flex-row min-h-screen'>
			<section className='bg-blue-100 w-full lg:w-1/3 xl:w-1/4 flex flex-row sm:flex-col justify-center items-center px-6 py-12 gap-8'>
				<div className='flex flex-col items-center gap-2'>
					<Image
						src={icon}
						alt='Cluud logo'
						width={120}
						height={60}
					/>
					<h2 className='text-lg sm:text-xl font-semibold'>Cluud</h2>
				</div>

				<div className='flex sm:flex-col flex-row items-center gap-4 text-center'>
					<h1 className='sm:font-bold font-semibold sm:text-3xl text-[20px]'>
						Manage your files the best way
					</h1>
					<p className='text-sm sm:text-base text-gray-700 max-w-xs hidden sm:block'>
						This is a place where you can store all your files
					</p>
					<Image
						src={cloudFile}
						alt='Cluud files'
						className='transition-all hover:rotate-3 hover:scale-105 cursor-pointer w-32 sm:w-40 md:w-52 lg:w-64 sm:block hidden'
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
