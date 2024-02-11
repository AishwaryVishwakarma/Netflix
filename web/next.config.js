/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.sanity.io',
      'assets.nflxext.com',
      'image.tmdb.org',
      'i.postimg.cc',
    ],
  },
};

module.exports = nextConfig;
