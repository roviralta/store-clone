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
import { MdDashboard } from 'react-icons/md'
import { BsImages } from 'react-icons/bs'
import { FaVideo } from 'react-icons/fa'
import { IoDocumentSharp } from 'react-icons/io5'
import { FaPaperclip } from 'react-icons/fa6'
import Link from 'next/link'
import { navItems } from '@/app/constants'

const HamburguerMenu = () => {
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
					<Image src={logobg} alt='logo' width={50} height={50} />
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{navItems.map((item) => {
					return (
						<Link href={item.url}>
							<DropdownMenuItem className='hover:bg-gray-100 h-12 px-3 py-2 rounded-md cursor-pointer transition text-gray-700'>
								<item.icon className='size-4' />
								{item.name}
							</DropdownMenuItem>
						</Link>
					)
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default HamburguerMenu
