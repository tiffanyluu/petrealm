/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true,
    },
    async redirects() {
      return [
        {
          source: '/:path*',
          destination: '/index.html',
          permanent: false,
        },
      ];
    },
  };
  
  export default nextConfig;
  