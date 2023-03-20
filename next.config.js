/** @type {import('next').NextConfig} */

module.exports = {
  async redirects() {
    return [
      {
        source: '/customer/:path*',
        missing: [
          {
            type: 'cookie',
            key: 'session-token',
          },
        ],
        permanent: false,
        destination: '/auth',
      },
      {
        source: '/admin/:path*',
        missing: [
          {
            type: 'cookie',
            key: 'session-token',
          },
        ],
        permanent: false,
        destination: '/auth',
      },
      {
        source: '/auth',
        has: [
          {
            type: 'cookie',
            key: 'session-token',
          },
        ],
        permanent: false,
        destination: '/customer',
      },
    ];
  },
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@prisma/client$'] = require.resolve('@prisma/client');
    return config;
  },
};
