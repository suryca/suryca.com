import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache / queue configured: every page is prerendered at build
// time and only /api/contact runs on request, so the free Workers plan suffices.
export default defineCloudflareConfig({});
