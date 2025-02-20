import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: "raw-loader",
    });
    
    // Exclude `@mapbox/node-pre-gyp`
    config.externals = config.externals || [];
    config.externals.push("@mapbox/node-pre-gyp");

    return config;
  },
};

export default nextConfig;
