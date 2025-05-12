/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://script.google.com/macros/s/AKfycbyD5YndT_0HSpaoPl-8A4y4Jj4zsqcbcqTh_aMpwtNGJOyNps-7zRdDkq46Pxx0XH32/exec/:path*",
      },
    ];
  },
  /* experimental: {
    appDir: true, // ✅ needed if you're mixing app/pages routes
  }, */
};

export default nextConfig;
