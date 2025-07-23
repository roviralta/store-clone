'use client'

import React, { memo, useTransition } from 'react'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'

import Search from './Search'
import FileUploader from './FileUploader'
import { signOutUser } from '@/lib/actions/user.actions'
import { cn } from '@/lib/utils'
import { NormalizedUser } from '../lib/types/user'

interface HeaderProps {
	user: NormalizedUser
}

const LogoutButton = memo(({ onLogout }: { onLogout: () => void }) => {
	const [isPending, startTransition] = useTransition()

	const handleLogout = () => {
		startTransition(() => {
			onLogout()
		})
	}

	return (
		<button
			type='button'
			onClick={handleLogout}
			disabled={isPending}
			className={cn(
				'group relative p-2 rounded-lg transition-all duration-200',
				'hover:bg-red-50 hover:text-red-600',
				'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
				'disabled:opacity-50 disabled:cursor-not-allowed'
			)}
			aria-label={isPending ? 'Logging out...' : 'Log Out'}
			title='Log Out'
		>
			<LogOut
				className={cn(
					'w-5 h-5 transition-transform duration-200',
					'group-hover:scale-110 cursor-pointer',
					isPending && 'animate-pulse'
				)}
			/>

			<span
				className={cn(
					'absolute -bottom-8 left-1/2 transform -translate-x-1/2',
					'px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0',
					'group-hover:opacity-100 transition-opacity duration-200',
					'pointer-events-none whitespace-nowrap'
				)}
			>
				{isPending ? 'Logging out...' : 'Log out'}
			</span>
		</button>
	)
})

LogoutButton.displayName = 'LogoutButton'

const HeaderActions = memo(({ user }: { user: NormalizedUser }) => {
	const handleLogout = async () => {
		try {
			await signOutUser()
			toast.success('Logged out successfully!')
		} catch (error) {
			toast.error('Error at logging out')
			console.error('[Header] Logout error:', error)
		}
	}

	return (
		<div className='flex items-center gap-3'>
			<div className='flex items-center'>
				<FileUploader ownerId={user.id} accountId={user.accountId} />
			</div>

			<div className='flex items-center gap-2 pl-3 border-l border-gray-200'>
				<LogoutButton onLogout={handleLogout} />
			</div>
		</div>
	)
})

HeaderActions.displayName = 'HeaderActions'

const Header = memo(({ user }: HeaderProps) => {
	return (
		<header
			className={cn(
				'hidden sm:flex items-center justify-between',
				'w-full px-6 py-4 bg-white border-b border-gray-200',
				'sticky top-0 z-10 backdrop-blur-sm bg-white/95'
			)}
			role='banner'
		>
			<div className='flex-1 max-w-md'>
				<Search />
			</div>

			<HeaderActions user={user} />
		</header>
	)
})

Header.displayName = 'Header'

export default Header
