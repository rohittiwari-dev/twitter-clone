/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		unoptimized: true,
		domains: [
			"lh3.googleusercontent.com",
			"firebasestorage.googleapis.com",
			"prorohit.netlify.app",
		],
	},
};

module.exports = nextConfig;
