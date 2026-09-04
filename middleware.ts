import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip the API, Next internals and any path with a file extension (favicon, robots, …).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
