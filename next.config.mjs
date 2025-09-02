// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fakestoreapi.com", pathname: "/img/**" },
    ],
  },
};
export default nextConfig;
