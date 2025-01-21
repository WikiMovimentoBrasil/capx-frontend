/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["upload.wikimedia.org", "commons.wikimedia.org"],
  },
};

export default nextConfig;
