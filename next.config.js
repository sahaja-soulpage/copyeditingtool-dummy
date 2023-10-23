/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = nextConfig;

module.exports = {
  env: {
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    BACK_END_SERVER_URL: process.env.BACK_END_SERVER_URL,
  },
};
