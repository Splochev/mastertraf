import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      // Old *.vercel.app address -> main domain (avoids duplicate content in search engines)
      {
        source: "/:path*",
        has: [{ type: "host", value: "mastertraf.vercel.app" }],
        destination: "https://www.mastertraf.net/:path*",
        permanent: true,
      },
      // Legacy WordPress URLs from the old site
      { source: "/wp-content/:path*", destination: "/galeriya", permanent: true },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ngbiahcqjeaoeyhipygi.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
