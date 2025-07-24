'use client'

import React, { memo, useTransition } from 'react'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'

import Search from './Search'
import FileUploader from './FileUploader'
import HamburguerMenu from './HamburguerMenu'
import { signOutUser } from '@/lib/actions/user.actions'
import { NormalizedUser } from '@/lib/types/user'
import { cn } from '@/lib/utils'

interface MobileNavigatorProps {
	user: NormalizedUser
}

const LogoutButton = memo(() => {
	const [isPending, startTransition] = useTransition()

	const handleLogout = () => {
		startTransition(async () => {
			try {
				await signOutUser()
				toast.success('Logged out successfully!')
			} catch (error) {
				toast.error('Error during logout')
				console.error('[MobileNav] Logout error:', error)
			}
		})
	}

	return (
		<button
			type='button'
			onClick={handleLogout}
			disabled={isPending}
			className={cn(
				'group relative p-2 rounded-md transition-all duration-200',
				'hover:bg-blue-50 hover:text-red-600',
				'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
				'disabled:opacity-50 disabled:cursor-not-allowed'
			)}
			aria-label={isPending ? 'Logging out...' : 'Log out'}
			title='Cerrar sesión'
		>
			<LogOut
				className={cn(
					'w-5 h-5 transition-transform duration-200',
					'group-hover:scale-110',
					isPending && 'animate-pulse'
				)}
			/>
			<span
				className={cn(
					'absolute -bottom-8 left-1/2 transform -translate-x-1/2',
					'px-2 py-1 text-xs bg-gray-900 text-white rounded',
					'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
					'pointer-events-none whitespace-nowrap z-10'
				)}
			>
				{isPending ? 'Logging out...' : 'Log out'}
			</span>
		</button>
	)
})

LogoutButton.displayName = 'LogoutButton'

const MobileNavigator = memo(({ user }: MobileNavigatorProps) => {
	return (
		<header
			className='sm:hidden w-full flex items-center justify-between px-4 py-4 border-b border-border bg-white sticky top-0 z-10'
			role='banner'
		>
			<div className='flex items-center gap-3 text-base font-semibold text-gray-800'>
				<HamburguerMenu user={user} />
				<Search />
			</div>

			<div className='flex items-center gap-3'>
				<div
					className='rounded-md transition-all duration-200
                     hover:bg-blue-50 hover:text-blue-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
				>
					<FileUploader
						ownerId={user.id}
						accountId={user.accountId}
					/>
				</div>
				<LogoutButton />
			</div>
		</header>
	)
})

MobileNavigator.displayName = 'MobileNavigator'

export default MobileNavigator
