import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/schedule",
        permanent: true,
      },
    ]
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins]
    }
    return config
  },
}

export default nextConfig
