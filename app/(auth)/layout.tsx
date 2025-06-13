import React from 'react'
import Image from 'next/image'
import icon from '../../public/logobg.png'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col lg:flex-row min-h-screen'>
			<section className='bg-blue-100 w-full lg:w-1/3 xl:w-1/4 flex flex-row sm:flex-col justify-center items-center px-6 py-12 gap-8'>
				<div className='flex flex-col items-center'>
					<Image
						src={icon}
						alt='Cluud logo'
						width={120}
						height={60}
						className='w-20 '
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
				</div>
			</section>

			<main className='flex-1 bg-white flex-col center'>{children}</main>
		</div>
	)
}

export default Layout
