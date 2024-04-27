/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
        port: '',
        pathname: '/img/avatars/**',
      },
    ],
  },
  transpilePackages: ['mui-tel-input'],
};

module.exports = nextConfig;
