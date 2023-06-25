/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"lh3.googleusercontent.com",
			"firebasestorage.googleapis.com",
			"prorohit.netlify.app",
			"th.bing.com",
		],
	},
};

module.exports = nextConfig;
