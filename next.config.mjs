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
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
