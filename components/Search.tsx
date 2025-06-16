import React from 'react'
import { CiSearch } from 'react-icons/ci'

const Search = () => {
	return (
		<div className='flex items-center border border-gray-300 rounded-2xl shadow h-8 px-2 bg-white w-100'>
			<CiSearch className='text-gray-600 w-5 h-5' />
			<input
				type='text'
				placeholder='Search'
				className='ml-2 bg-transparent outline-none text-sm w-full'
			/>
		</div>
	)
}

export default Search
