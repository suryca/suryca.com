import type { NextConfig } from "next";

// Canonical host is suryca.com. www.suryca.com is a custom domain on the same
// Worker (see wrangler.jsonc) and is redirected here. Two rules instead of one
// "/:path*" rule because OpenNext leaves the pattern unexpanded when the
// optional wildcard matches nothing, sending "/" to "/:path*".
const wwwHost = [{ type: "host" as const, value: "www.suryca.com" }];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", has: wwwHost, destination: "https://suryca.com/", permanent: true },
      { source: "/:path+", has: wwwHost, destination: "https://suryca.com/:path+", permanent: true },
    ];
  },
};

export default nextConfig;
