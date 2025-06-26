import Header from '@/components/Header'
import MobileNavigator from '@/components/MobileNavigator'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { getCurrentUser } from '@/lib/actions/user.actions'

const Layout = async ({ children }: { children: React.ReactNode }) => {
	let user = null
	try {
		user = await getCurrentUser()
	} catch (error) {
		console.log('User not logged in, continuing without user...')
	}

	const plainUser = user
		? {
				username: user.username,
				avatar: user.avatar,
				email: user.email,
			}
		: null

	return (
		<main className='flex h-screen'>
			<Sidebar user={user} />
			<section className='flex h-full flex-1 flex-col'>
				<MobileNavigator user={plainUser} />
				<Header user={plainUser} />
				<div>{children}</div>
			</section>
		</main>
	)
}

export default Layout
