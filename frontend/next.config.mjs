/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Ensures Next.js exports static files
    trailingSlash: true, // Helps with Amplify routing
  };
  
  export default nextConfig;
  