'use client'
import React from 'react'
import logobg from '../public/logobg.png'
import Image from 'next/image'
import Link from 'next/link'
import { navItems } from '@/app/constants'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
	const pathname = usePathname()
	return (
		<aside className='hidden sm:flex flex-col gap-20 p-4 w-48 lg:w-80 border-r h-full pl-10'>
			<Link
				href='/'
				className='center gap-2 text-3xl font-bold text-gray-600'
			>
				<h1>Cluud</h1>
				<Image src={logobg} alt='logo' width={50} height={50} />
			</Link>
			<ul className='flex flex-col gap-5 space-y-2 text-gray-700 font-medium'>
				{navItems.map((item) => {
					const active = pathname === item.url
					return (
						<Link key={item.url} href={item.url}>
							<li
								className={`hover:rounded-2xl px-2 h-10 hover:border hover:bg-blue-100 cursor-pointer flex justify-left items-center gap-4 ${
									active
										? 'bg-blue-100 border rounded-2xl'
										: ''
								}`}
							>
								<item.icon className='size-5' />
								{item.name}
							</li>
						</Link>
					)
				})}
			</ul>
		</aside>
	)
}

export default Sidebar
