/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Thêm "api.dicebear.com" vào danh sách này
    domains: [
      "res.cloudinary.com",
      "ui-avatars.com",
      "images.unsplash.com",
      "api.dicebear.com",
    ],
  },
};

module.exports = nextConfig;
