/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // allow importing source files from the repo root (outside playground)
    externalDir: true
  }
}

module.exports = nextConfig
