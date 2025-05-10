/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BASE_URL: process.env.BASE_URL,
      SITE_KEY: process.env.GOOGLE_API_KEY_RE_CAPTCHA,
      BASE_URL_TRANSACTION: process.env.BASE_URL_TRANSACTION,
    },};

export default nextConfig;
