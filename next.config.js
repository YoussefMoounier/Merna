/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ← السطر المهم هنا

  images: {
    domains: ['images.unsplash.com'], // لو بتستخدم صور من Unsplash
  },

  env: {
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  },
};

module.exports = nextConfig;