import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { IoMenu } from 'react-icons/io5'

const HamburguerMenu = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button type='button'>
					<IoMenu className='size-7 text-gray-800' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-48 rounded-xl shadow-md p-2 text-base'>
				<DropdownMenuLabel className='text-gray-700 text-sm'>
					Cluud
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='hover:bg-gray-100 h-12 px-3 py-2 rounded-md cursor-pointer transition'>
					Dashboard
				</DropdownMenuItem>
				<DropdownMenuItem className='hover:bg-gray-100 h-12 px-3 py-2 rounded-md cursor-pointer transition'>
					Images
				</DropdownMenuItem>
				<DropdownMenuItem className='hover:bg-gray-100 h-12 px-3 py-2 rounded-md cursor-pointer transition'>
					Media
				</DropdownMenuItem>
				<DropdownMenuItem className='hover:bg-gray-100 h-12 px-3 py-2 rounded-md cursor-pointer transition'>
					Others
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default HamburguerMenu
