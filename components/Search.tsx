'use client'

import React, { memo } from 'react'
import { CiSearch } from 'react-icons/ci'
import { cn } from '@/lib/utils'

const Search = memo(() => {
	return (
		<div
			role='search'
			className={cn(
				'flex items-center h-9 px-3 rounded-full border border-gray-300 bg-white shadow-sm',
				'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1',
				'transition-all duration-200 ease-in-out',
				'lg:w-96 md:w-72 w-50'
			)}
		>
			<CiSearch
				className='text-gray-600 w-5 h-5 shrink-0'
				aria-hidden='true'
			/>

			<input
				type='search'
				placeholder='Search'
				aria-label='Search'
				className={cn(
					'ml-2 w-full bg-transparent outline-none text-sm text-gray-800',
					'placeholder:text-gray-400'
				)}
			/>
		</div>
	)
})

Search.displayName = 'Search'

export default Search
