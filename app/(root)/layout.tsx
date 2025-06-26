import Header from '@/components/Header'
import MobileNavigator from '@/components/MobileNavigator'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
	const user = await getCurrentUser()

	if (!user) return redirect('/sign-in')

	const plainUser = {
		username: user.username,
		avatar: user.avatar,
		email: user.email,
	}

	return (
		<main className='flex h-screen'>
			<Sidebar user={user} />
			<section className='flex h-full flex-1 flex-col'>
				<MobileNavigator user={plainUser} />
				<Header />
				<div>{children}</div>
			</section>
		</main>
	)
}

export default Layout
