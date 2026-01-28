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
}

export default nextConfig
