import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

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

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
