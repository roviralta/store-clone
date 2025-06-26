import React from 'react'
import { CiLogout } from 'react-icons/ci'
import Search from './Search'
import FileUploader from './FileUploader'
import { signOutUser } from '@/lib/actions/user.actions'

const Header = () => {
	return (
		<header className='hidden sm:flex w-full items-center justify-between p-4 flex-wrap'>
			<span className='text-lg font-semibold ml-2'>
				<Search />
			</span>
			<div className='flex items-center gap-4'>
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
		</header>
	)
}

export default Header
