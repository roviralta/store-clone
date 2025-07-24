// app/layout.tsx

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

// Only load the font weights you actually use
const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
	variable: '--font-poppins',
	display: 'swap', // Ensures text remains visible during webfont load
})

export const metadata: Metadata = {
	title: 'Cluud',
	description: 'Cluud - The only storage solution you need.',
}

export const viewport = 'width=device-width, initial-scale=1' // ✅ proper way
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='h-full'>
			<body
				className={`${poppins.variable} font-poppins antialiased h-full`}
			>
				{children}
			</body>
		</html>
	)
}
