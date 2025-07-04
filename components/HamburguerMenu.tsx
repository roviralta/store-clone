'use client'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { IoMenu } from 'react-icons/io5'
import logobg from '../public/logobg.png'
import Image from 'next/image'
import Link from 'next/link'
import { navItems } from '@/app/constants'
import Profile from './Profile'

const HamburguerMenu = ({ user }: any) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button type='button'>
					<IoMenu className='size-7 text-gray-800' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-48 rounded-xl shadow-md p-2'>
				<DropdownMenuLabel
					className='text-gray-700 text-sm flex intems-center justify-center gap-6
				'
				>
					<h1 className='font-bold text-[20px]'>Cluud</h1>
					<Image src={logobg} alt='logo' width={50} />
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{navItems.map((item) => {
					return (
						<Link href={item.url} key={item.url} as='image'>
							<DropdownMenuItem className='hover:bg-gray-100 h-12 px-3 py-2 rounded-md cursor-pointer transition'>
								<item.icon className='size-4' />
								<span className='text-gray-700'>
									{item.name}
								</span>
							</DropdownMenuItem>
						</Link>
					)
				})}
				<DropdownMenuSeparator />

				{user?.username ? (
					<DropdownMenuItem className='hover:bg-gray-100 h-12 px-3 py-2 rounded-md cursor-pointer transition'>
						<Profile {...user} />
					</DropdownMenuItem>
				) : (
					<DropdownMenuItem className='hover:bg-gray-100 h-12 px-3 py-2 rounded-md cursor-pointer transition'>
						<Link
							href='sign-in'
							className='hover:font-semibold text-gray-800 hover:underline underline-offset-4 decoration-2 decoration-blue-500'
						>
							<span>Login</span>
						</Link>{' '}
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default HamburguerMenu
