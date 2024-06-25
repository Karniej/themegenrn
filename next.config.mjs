/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  module: {
    rules: [
      {
        test: /\.md$/,
        use: "raw-loader",
      },
    ],
  },
};

export default nextConfig;
