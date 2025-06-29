'use client'
import React from 'react'
import logobg from '../public/logobg.png'
import Image from 'next/image'
import Link from 'next/link'
import { navItems } from '@/app/constants'
import { usePathname } from 'next/navigation'
import Profile from './Profile'
import { CgProfile } from 'react-icons/cg'

const Sidebar = ({ user }: any) => {
	const pathname = usePathname()
	return (
		<aside className='hidden sm:flex flex-col gap-20 p-4 w-48 lg:w-80 lg:text-[18px] border-r h-full'>
			<Link
				href='/'
				className='center gap-2 text-3xl font-bold text-gray-600'
			>
				<h1>Cluud</h1>
				<Image src={logobg} alt='logo' height={50} />
			</Link>
			<ul className='flex flex-col gap-5 space-y-2 text-gray-700 font-medium'>
				{navItems.map((item) => {
					const active = pathname === item.url
					return (
						<Link key={item.url} href={item.url}>
							<li
								className={`hover:rounded-2xl h-10 hover:border hover:bg-blue-100 cursor-pointer flex justify-center items-center gap-4 ${
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
			<div className='flex justify-center h-screen items-end mb-20'>
				{user?.username ? (
					<Profile {...user} />
				) : (
					<Link
						href='sign-in'
						className='hover:font-semibold text-gray-800 hover:underline underline-offset-4 decoration-2 decoration-blue-500 center gap-2'
					>
						<CgProfile size={25} />
						<span>Login</span>
					</Link>
				)}
			</div>
		</aside>
	)
}

export default Sidebar
