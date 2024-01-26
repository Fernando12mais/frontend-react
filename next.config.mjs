/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "http://localhost:8000",
  },
  images: {
    remotePatterns: [
      { hostname: "images.prd.kavak.io" },
      { hostname: "ik.imagekit.io" },
    ],
  },
};

export default nextConfig;
