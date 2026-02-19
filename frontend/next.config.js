/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://supa-guru-ten.vercel.app/api/:path*' // Proxy to the deployed API
      }
    ];
  }
};

module.exports = nextConfig;
