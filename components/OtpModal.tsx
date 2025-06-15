'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import loader from '../public/loader.svg'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { Button } from './ui/button'
import close from '../public/close.svg'
import { sendEmailOTP, verifySecret } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'

const OtpModal = ({ accountId, email }: { accountId: any; email: string }) => {
	const router = useRouter()
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isOpen, setIsOpen] = useState(true)

	const handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			//Call API to verify OTP
			const sessionId = await verifySecret({ accountId, password })
			if (sessionId) {
				router.push('/')
			}
		} catch (error) {
			console.log('Failed to verify OTP')
		}
		setIsLoading(false)
	}

	const handleResendOTP = async () => {
		//Resend OTP
		await sendEmailOTP({ email })
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent className='flex justify-center flex-col items-center space-y-6'>
				<AlertDialogHeader>
					<AlertDialogTitle className='text-center font-bold'>
						Enter your OTP
					</AlertDialogTitle>

					<Image
						src={close}
						alt='Close'
						width={20}
						height={20}
						onClick={() => setIsOpen(false)}
						className='
							absolute top-4 right-4'
					/>

					<AlertDialogDescription>
						We have sent a code to:
						<span className='text-blue-500 pl-2'>{email}</span>
					</AlertDialogDescription>
				</AlertDialogHeader>

				<InputOTP maxLength={6} value={password} onChange={setPassword}>
					<InputOTPGroup>
						{[...Array(6)].map((_, i) => (
							<InputOTPSlot
								key={i}
								index={i}
								className='ml-2 border-2 font-bold'
							/>
						))}
					</InputOTPGroup>
				</InputOTP>

				<AlertDialogFooter>
					<div className='flex gap-3 flex-col'>
						<AlertDialogAction
							type='button'
							className='bg-blue-500 hover:cursor-pointer hover:bg-blue-700'
							onClick={handleSubmit}
						>
							Submit
							{isLoading && (
								<Image
									src={loader}
									alt='loader'
									width={24}
									height={24}
									className='ml-2 animate-spin'
								/>
							)}
						</AlertDialogAction>

						<div className='center gap-2'>
							<span className='text-[12px] sm:text-[14px]'>
								Didn't get a code?
							</span>
							<Button
								type='button'
								onClick={handleResendOTP}
								variant='link'
								className='cursor-pointer hover:text-blue-700 font-semibold hover:underline text-blue-500'
							>
								Click to resend
							</Button>
						</div>
					</div>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default OtpModal
