/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/business-loan-calculator',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig