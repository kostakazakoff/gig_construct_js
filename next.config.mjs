/** @type {import('next').NextConfig} */
const nextConfig = {
    // Redirect from root to /services
    // async redirects() {
    //     return [
    //         {
    //             source: "/",
    //             destination: "/services",
    //             permanent: true,
    //         },
    //     ];
    // },

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
            {
                protocol: "https",
                hostname: "gig-construct-predator.s3.eu-central-1.amazonaws.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
