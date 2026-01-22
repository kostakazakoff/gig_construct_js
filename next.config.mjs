/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "8000",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "gig-construct.s3.eu-central-1.amazonaws.com",
                port: "",
                pathname: "/**",
            }, 
        ],
    },
};

export default nextConfig;
