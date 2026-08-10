/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }
    return config
  },
}

module.exports = nextConfig
