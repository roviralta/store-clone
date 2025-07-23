import React, { memo, useCallback } from 'react'
import Search from './Search'
import FileUploader from './FileUploader'
import { CiLogout } from 'react-icons/ci'
import HamburguerMenu from './HamburguerMenu'
import { signOutUser } from '@/lib/actions/user.actions'
import { NormalizedUser } from '@/lib/types/user'

interface MobileNavigatorProps {
	user: NormalizedUser
}

const LogoutButton = memo(() => {
	const handleSignOut = useCallback(async () => {
		'use server'
		await signOutUser()
	}, [])

	return (
		<form className='items-center' action={handleSignOut}>
			<button
				type='submit'
				className='flex items-center justify-center p-1 rounded-md hover:bg-gray-100 transition-colors duration-200'
				aria-label='Cerrar sesión'
			>
				<CiLogout className='size-7 text-gray-800' />
			</button>
		</form>
	)
})

LogoutButton.displayName = 'LogoutButton'

// Componente principal memoizado
const MobileNavigator = memo<MobileNavigatorProps>(({ user }) => {
	return (
		<header
			className='sm:hidden w-full flex items-center justify-between py-4 px-4'
			role='banner'
		>
			<div className='flex items-center gap-3 text-lg font-semibold'>
				<HamburguerMenu user={user} />
				<Search />
			</div>

			<div className='flex items-center gap-3'>
				<div className='text-sm text-gray-700'>
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
