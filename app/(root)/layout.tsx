import { Suspense } from 'react'
import { redirect } from 'next/navigation'

import Header from '@/components/Header'
import MobileNavigator from '@/components/MobileNavigator'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/sonner'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { AuthError } from '../../lib/errors'

interface User {
	$id: string
	username: string
	email: string
	avatar: string
	accountId: string
}

interface DashboardLayoutProps {
	children: React.ReactNode
}

function LayoutSkeleton() {
	return (
		<main className='flex h-screen animate-pulse'>
			<div className='w-64 bg-gray-200' />
			<section className='flex h-full flex-1 flex-col'>
				<div className='h-16 bg-gray-100' />
				<div className='flex-1 bg-gray-50' />
			</section>
		</main>
	)
}

async function getAuthenticatedUser(): Promise<User> {
	try {
		const user = await getCurrentUser()

		if (!user) {
			throw new AuthError('No user session found')
		}

		if (!user.username || !user.email || !user.accountId) {
			throw new AuthError('Incomplete user data')
		}

		return user
	} catch (error) {
		console.error('[Layout] Authentication failed:', {
			error: error instanceof Error ? error.message : 'Unknown error',
			timestamp: new Date().toISOString(),
		})

		redirect('/sign-in')
	}
}

async function DashboardLayout({ children }: DashboardLayoutProps) {
	const user = await getAuthenticatedUser()

	const normalizedUser = {
		id: user.$id,
		username: user.username,
		email: user.email,
		avatar: user.avatar,
		accountId: user.accountId,
	}

	return (
		<main className='flex h-screen bg-background'>
			<Sidebar user={normalizedUser} />

			<section className='flex h-full flex-1 flex-col overflow-hidden'>
				<div className='block lg:hidden'>
					<MobileNavigator user={normalizedUser} />
				</div>

				<Header user={normalizedUser} />

				<div className='flex-1 overflow-auto p-6'>
					<Suspense
						fallback={
							<div className='animate-pulse'>
								Loading content...
							</div>
						}
					>
						{children}
					</Suspense>
				</div>
			</section>

			<Toaster
				position='bottom-right'
				toastOptions={{
					duration: 4000,
					style: {
						background: 'hsl(var(--background))',
						color: 'hsl(var(--foreground))',
						border: '1px solid hsl(var(--border))',
					},
				}}
			/>
		</main>
	)
}

export default function Layout({ children }: DashboardLayoutProps) {
	return (
		<Suspense fallback={<LayoutSkeleton />}>
			<DashboardLayout>{children} </DashboardLayout>
		</Suspense>
	)
}
