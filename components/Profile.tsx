import React from 'react'
import Image from 'next/image'

interface Props {
	username: string
	avatar: string
	email: string
}

const Profile = ({ username, avatar, email }: Props) => {
	return (
		<button
			className='center gap-2 cursor-pointer hover:underline underline-offset-4 decoration-2 decoration-blue-500 hover:font-semibold text-gray-800'
			onClick={() => console.log('got to the profile')}
		>
			<Image src={avatar} alt='avatar' width={44} height={44} />
			<span className='text-gray-700'>{username}</span>
		</button>
	)
}

export default Profile
