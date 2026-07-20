import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // 0.0.0.0 — cho phép mobile cùng Wi‑Fi truy cập
    port: 5173,
    // localtunnel / ngrok / Cloudflare Tunnel
    allowedHosts: [".loca.lt", ".ngrok-free.app", ".ngrok.io", ".trycloudflare.com"],
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
