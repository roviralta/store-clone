import React from 'react'
import Search from './Search'
import FileUploader from './FileUploader'
import { CiLogout } from 'react-icons/ci'
import HamburguerMenu from './HamburguerMenu'

const MobileNavigator = () => {
	return (
		<div className='sm:hidden w-full flex items-center justify-between py-4'>
			<div className='center gap-4 ml-4 text-lg font-semibold ml-2'>
				<HamburguerMenu />
				<Search />
			</div>

			<div className='center gap-4 mr-4'>
				<span className='text-sm text-gray-700'>
					<FileUploader />
				</span>
				<form className='items-center'>
					<CiLogout className='size-7 hover:cursor-pointer text-gray-800 mr-2' />
				</form>
			</div>
		</div>
	)
}

export default MobileNavigator
