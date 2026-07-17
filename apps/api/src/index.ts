import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { serve } from "@hono/node-server";
import { createApp } from "./app.js";

// Resolve from this file so cwd (pnpm filter / monorepo root) không ảnh hưởng
const apiRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(apiRoot, "../..");
config({ path: resolve(repoRoot, ".env") });
config({ path: resolve(apiRoot, ".env"), override: true });

const port = Number(process.env.API_PORT ?? "3001");
const app = createApp();

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`[hotsos-api] listening on http://localhost:${info.port}`);
});
