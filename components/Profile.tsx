import React from 'react'
import Image from 'next/image'
import profileAvatar from '../public/profileAvatar.webp'

interface Props {
	username: string
	avatar: string
	email: string
}

const Profile = ({ username, avatar, email }: Props) => {
	return (
		<div className='center gap-2'>
			<Image src={profileAvatar} alt='avatar' width={44} height={44} />
			<div>
				<p>{username}</p>
			</div>
		</div>
	)
}

export default Profile
