'use client'

import React, { memo } from 'react'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { IoMenu } from 'react-icons/io5'
import Image from 'next/image'
import Link from 'next/link'

import logobg from '../public/logobg.png'
import { navItems } from '@/app/constants'
import Profile from './Profile'
import { NormalizedUser } from '@/lib/types/user'
import { cn } from '@/lib/utils'

interface HamburguerMenuProps {
	user?: NormalizedUser
}

const HamburguerMenu = memo(({ user }: HamburguerMenuProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type='button'
					aria-label='Open navigation menu'
					className='p-1 rounded-md hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition'
				>
					<IoMenu className='size-7 text-gray-800' />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align='start'
				sideOffset={8}
				className='w-52 rounded-xl shadow-md p-2 bg-white border border-gray-200'
			>
				<DropdownMenuLabel className='flex items-center justify-between px-2'>
					<span className='text-base font-bold text-gray-700'>
						Cluud
					</span>
					<Image
						src={logobg}
						alt='Cluud logo'
						width={40}
						height={40}
						className='rounded'
						priority
					/>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{navItems.map((item) => (
					<Link
						key={item.url}
						href={item.url}
						legacyBehavior
						passHref
					>
						<DropdownMenuItem
							className={cn(
								'flex items-center gap-2 h-10 px-3 py-2 rounded-md cursor-pointer text-gray-700',
								'hover:bg-gray-100 hover:text-blue-600 transition-colors',
								'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
							)}
						>
							<item.icon className='size-4' />
							<span>{item.name}</span>
						</DropdownMenuItem>
					</Link>
				))}

				<DropdownMenuSeparator />

				{user?.username ? (
					<DropdownMenuItem
						className={cn(
							'h-12 px-3 py-2 rounded-md cursor-pointer text-gray-700',
							'hover:bg-gray-100 hover:text-blue-600 transition-colors',
							'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
						)}
					>
						<Profile {...user} />
					</DropdownMenuItem>
				) : (
					<Link href='/sign-in' passHref>
						<DropdownMenuItem
							className={cn(
								'h-10 px-3 py-2 rounded-md cursor-pointer text-gray-800',
								'hover:bg-gray-100 hover:text-blue-600 transition-colors',
								'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
							)}
						>
							<span className='hover:underline underline-offset-4 decoration-blue-500'>
								Login
							</span>
						</DropdownMenuItem>
					</Link>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
})

HamburguerMenu.displayName = 'HamburguerMenu'

export default HamburguerMenu
