import { build } from "esbuild";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const apiRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Bundle serverless entry thành 1 file ESM tự chứa để Vercel không phải
// resolve workspace packages / TS source lúc runtime.
await build({
  entryPoints: [resolve(apiRoot, "src/vercel.ts")],
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  outfile: resolve(apiRoot, "../../api/[...route].mjs"),
  banner: {
    js: 'import { createRequire } from "node:module"; const require = createRequire(import.meta.url);',
  },
});

console.log("[build-vercel] api/[...route].mjs generated");
