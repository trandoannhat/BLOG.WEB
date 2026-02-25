import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cấp phép cho Cloudinary
      },
      // Thêm các domain khác nếu sau này bạn dùng thêm (vd: imgur, facebook...)
    ],
  },
};

export default nextConfig;
