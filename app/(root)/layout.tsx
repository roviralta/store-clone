import Header from '@/components/Header'
import MobileNavigator from '@/components/MobileNavigator'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { Toaster } from '@/components/ui/sonner'
import { redirect } from 'next/dist/server/api-utils'

const Layout = async ({ children }: { children: React.ReactNode }) => {
	let user = null
	try {
		user = await getCurrentUser()
	} catch (error) {
		console.log('User not logged in, continuing without user...')
	}

	//if (!user) return redirect('/sign-in')

	const plainUser = user
		? {
				username: user.username,
				avatar: user.avatar,
				email: user.email,
				id: user.$id,
				accountId: user.accountId,
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
			<Toaster />
		</main>
	)
}

export default Layout
