/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BASE_URL: process.env.BASE_URL,
      SITE_KEY: process.env.SITE_KEY,
    },};

export default nextConfig;
