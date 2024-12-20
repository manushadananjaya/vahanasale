/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dummyimage.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://your-api-domain.com/api/:path*",
  //     },
  //   ];
  // },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "X-Frame-Options",
  //           value: "DENY",
  //         },
  //         {
  //           key: "X-Content-Type-Options",
  //           value: "nosniff",
  //         },
  //         {
  //           key: "Referrer-Policy",
  //           value: "no-referrer",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
