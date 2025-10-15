/** @type {import('next').NextConfig} */
const nextConfig = {
    // Redirect from root to /services
    async redirects() {
        return [
            {
                source: "/",
                destination: "/services",
                permanent: true,
            },
        ];
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "c.pxhere.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
