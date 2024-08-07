/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "foodish-api.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
