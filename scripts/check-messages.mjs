// Fails when a locale file is missing keys (or has extra ones) compared to messages/en.json.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../messages/", import.meta.url).pathname;
const read = (f) => JSON.parse(readFileSync(join(dir, f), "utf8"));

function keysOf(value, prefix = "") {
  if (Array.isArray(value)) return [`${prefix}[]`];
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => keysOf(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

const base = new Set(keysOf(read("en.json")));
let failed = false;
for (const file of readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "en.json")) {
  const keys = new Set(keysOf(read(file)));
  const missing = [...base].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !base.has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`messages/${file}:`);
    for (const k of missing) console.error(`  missing  ${k}`);
    for (const k of extra) console.error(`  extra    ${k}`);
  }
}
if (failed) process.exit(1);
console.log("messages: all locales match en.json");
