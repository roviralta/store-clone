import Header from '@/components/Header'
import MobileNavigator from '@/components/MobileNavigator'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='flex h-screen'>
			<Sidebar />
			<section className='flex h-full flex-1 flex-col'>
				<MobileNavigator />
				<Header />
				<div>{children}</div>
			</section>
		</main>
	)
}

export default Layout
