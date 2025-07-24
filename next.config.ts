import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		serverActions: {
			bodySizeLimit: '100MB',
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'imgs.search.brave.com',
			},
			{
				protocol: 'https',
				hostname: 'fra.cloud.appwrite.io',
			},
		],
	},
}

export default nextConfig
