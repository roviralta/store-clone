'use client'

import React, { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CgProfile } from 'react-icons/cg'

import { navItems } from '@/app/constants'
import Profile from './Profile'
import { cn } from '@/lib/utils'
import { NormalizedUser } from '../lib/types/user'

interface SidebarProps {
	user: NormalizedUser
}

interface NavItemProps {
	item: {
		name: string
		url: string
		icon: React.ComponentType<{ className?: string }>
	}
	isActive: boolean
}

const NavigationItem = memo(({ item, isActive }: NavItemProps) => (
	<li>
		<Link
			href={item.url}
			className={cn(
				'group flex items-center gap-4 h-12 px-4 rounded-xl transition-all duration-200',
				'text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600',
				'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
				isActive &&
					'bg-blue-100 text-blue-600 shadow-sm border border-blue-200'
			)}
			aria-current={isActive ? 'page' : undefined}
		>
			<item.icon
				className={cn(
					'w-5 h-5 transition-colors',
					isActive
						? 'text-blue-600'
						: 'text-gray-500 group-hover:text-blue-600'
				)}
			/>
			<span className='text-sm lg:text-base'>{item.name}</span>
		</Link>
	</li>
))

NavigationItem.displayName = 'NavigationItem'

const Logo = memo(() => (
	<Link
		href='/'
		className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group'
		aria-label='Cluud - Home'
	>
		<h1 className='text-2xl lg:text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors'>
			Cluud
		</h1>
		<div className='relative'>
			<Image
				src='/logobg.png'
				alt='Cluud logo'
				width={40}
				height={40}
				className='lg:w-15 lg:h-10 transition-transform group-hover:scale-110'
				priority
			/>
		</div>
	</Link>
))

Logo.displayName = 'Logo'

const AuthSection = memo(({ user }: { user: NormalizedUser | null }) => (
	<div className='mt-auto pb-6'>
		{user?.username ? (
			<Profile {...user} />
		) : (
			<Link
				href='/sign-in'
				className={cn(
					'flex items-center gap-3 p-3 rounded-xl text-gray-700',
					'hover:bg-blue-50 hover:text-blue-600 transition-all duration-200',
					'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
				)}
			>
				<CgProfile className='w-6 h-6' />
				<span className='font-medium'>Iniciar Sesión</span>
			</Link>
		)}
	</div>
))

AuthSection.displayName = 'AuthSection'

const Sidebar = memo(({ user }: SidebarProps) => {
	const pathname = usePathname()

	return (
		<aside
			className={cn(
				'hidden sm:flex flex-col',
				'w-64 lg:w-80 h-full',
				'bg-white border-r border-gray-200',
				'p-4 lg:p-6'
			)}
			role='navigation'
			aria-label='Principal navigation'
		>
			<div className='mb-8'>
				<Logo />
			</div>

			<nav className='flex-1' role='navigation'>
				<ul className='space-y-2' role='list'>
					{navItems.map((item) => (
						<NavigationItem
							key={item.url}
							item={item}
							isActive={pathname === item.url}
						/>
					))}
				</ul>
			</nav>

			<AuthSection user={user} />
		</aside>
	)
})

Sidebar.displayName = 'Sidebar'

export default Sidebar
