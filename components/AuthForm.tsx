'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import loader from '../public/loader.svg'
import Link from 'next/link'

// Define FormType
export type FormType = 'sign-in' | 'sign-up'

// Function that returns the appropriate schema
const authFormSchema = (formtype: FormType) =>
	z.object({
		username:
			formtype === 'sign-up'
				? z
						.string()
						.min(3, 'Username too short')
						.max(15, 'Username too long')
				: z.string().optional(),
		email: z.string().email('Invalid email'),
	})

const AuthForm = ({ type }: { type: FormType }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const formSchema = authFormSchema(type)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			email: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)
		try {
			console.log(values)
			// API logic here
		} catch (err) {
			setErrorMessage('Something went wrong')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6
			'
			>
				<h1 className='font-bold m-5 text-2xl mb-10'>
					{type === 'sign-in' ? 'Sign In' : 'Sign Up'}
				</h1>

				{type === 'sign-up' && (
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter your username'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter your email'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					className='bg-blue-100 text-black hover:bg-blue-500 hover:cursor-pointer'
					disabled={isLoading}
				>
					{type === 'sign-in' ? 'Sign In' : 'Sign Up'}
					{isLoading && (
						<Image
							src={loader}
							alt='loader'
							className='animate-spin ml-2'
							width={20}
							height={20}
						/>
					)}
				</Button>

				{errorMessage && <p className='text-red-500'>{errorMessage}</p>}

				<div className='flex justify-center'>
					<p>
						{type === 'sign-in'
							? "Don't have an account?"
							: 'Already have an account?'}
					</p>
					<Link
						href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
						className='ml-2 text-blue-500 font-semibold hover:underline'
					>
						{type === 'sign-in' ? 'Sign Up' : 'Sign In'}
					</Link>
				</div>
			</form>
		</Form>
	)
}

export default AuthForm
