/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["nftstorage.link"],
  }
}

module.exports = nextConfig
