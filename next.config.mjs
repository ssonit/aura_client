/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "utfs.io",
      "img.clerk.com",
      "subdomain",
      "shikimori.one",
      "picsum.photos",
      "i.pinimg.com",
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
