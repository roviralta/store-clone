import React from 'react'
import { Button } from './ui/button'
import { CiLogout } from 'react-icons/ci'
import Search from './Search'
import FileUploader from './FileUploader'

const Header = () => {
	return (
		<header className='hidden sm:flex w-full items-center justify-between py-4'>
			<span className='text-lg font-semibold'>
				<Search />
			</span>
			<div className='flex items-center gap-4'>
				<span className='text-sm text-gray-700'>
					<FileUploader />
				</span>
				<form className='flex items-center'>
					<CiLogout className='size-7 hover:cursor-pointer text-gray-800 mr-2' />
				</form>
			</div>
		</header>
	)
}

export default Header
