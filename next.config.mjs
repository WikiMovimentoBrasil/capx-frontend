/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["upload.wikimedia.org"],
  },
};

export default nextConfig;
