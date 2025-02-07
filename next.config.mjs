// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
    images: {
      domains: ['cdn.sanity.io'], // Allow images from cdn.sanity.io
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io', // Explicitly define the hostname
        },
      ],
    },
  };
  
  export default nextConfig;
  