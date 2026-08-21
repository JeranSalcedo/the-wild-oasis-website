/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "kfjzqfqgktyhvtedpeht.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/cabin-images/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
		],
	},
};

export default nextConfig;
