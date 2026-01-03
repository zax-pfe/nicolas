import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
};

export default withNextVideo(nextConfig);
