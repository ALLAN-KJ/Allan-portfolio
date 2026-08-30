import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local images in /public are served statically — no remotePatterns needed.
    // formats adds WebP/AVIF auto-conversion for optimized delivery.
    formats: ["image/avif", "image/webp"],
  },
  // allowedDevOrigins is for local network dev testing; safe to keep for LAN access
  allowedDevOrigins: ["10.2.5.79", "192.168.29.112", "192.168.1.9"],
};

export default nextConfig;
