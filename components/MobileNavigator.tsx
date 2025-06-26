import React from 'react'
import Search from './Search'
import FileUploader from './FileUploader'
import { CiLogout } from 'react-icons/ci'
import HamburguerMenu from './HamburguerMenu'
import { signOutUser } from '@/lib/actions/user.actions'

const MobileNavigator = ({ user }: any) => {
	return (
		<div className='sm:hidden w-full flex items-center justify-between py-4'>
			<div className='center gap-3 ml-4 text-lg font-semibold'>
				<HamburguerMenu user={user} />
				<Search />
			</div>

			<div className='center gap-3'>
				<span className='text-sm text-gray-700'>
					<FileUploader />
				</span>
				<form
					className='items-center'
					action={async () => {
						'use server'
						await signOutUser()
					}}
				>
					<button type='submit'>
						<CiLogout className='size-7 hover:cursor-pointer text-gray-800 mr-2' />
					</button>
				</form>
			</div>
		</div>
	)
}

export default MobileNavigator
