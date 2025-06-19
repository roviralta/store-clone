import { MdDashboard } from 'react-icons/md'
import { BsImages } from 'react-icons/bs'
import { FaVideo } from 'react-icons/fa'
import { IoDocumentSharp } from 'react-icons/io5'
import { FaPaperclip } from 'react-icons/fa6'

export const navItems = [
	{
		name: 'Dashboard',
		icon: MdDashboard,
		url: '/',
	},
	{
		name: 'Documents',
		icon: IoDocumentSharp,
		url: '/documents',
	},
	{
		name: 'Images',
		icon: BsImages,
		url: '/images',
	},
	{
		name: 'Media',
		icon: FaVideo,
		url: '/media',
	},
	{
		name: 'Others',
		icon: FaPaperclip,
		url: '/others',
	},
]
