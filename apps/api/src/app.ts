import { Hono } from "hono";
import { cors } from "hono/cors";
import { HotSosClient } from "./hotsos/client.js";
import { HotSosAuthError } from "./hotsos/auth.js";
import { createRoomsRouter } from "./routes/rooms.js";

export function createApp(): Hono {
  const username = process.env.HOTSOS_USERNAME ?? "";
  const password = process.env.HOTSOS_PASSWORD ?? "";
  const shift = Number(process.env.HOTSOS_SHIFT ?? "1");

  if (!username || !password) {
    console.warn(
      "[hotsos-api] HOTSOS_USERNAME / HOTSOS_PASSWORD chưa set — /api/rooms sẽ lỗi cho đến khi cấu hình env",
    );
  }

  const client = new HotSosClient({ username, password, shift });

  const app = new Hono();

  app.use(
    "*",
    cors({
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
      allowMethods: ["GET", "POST", "OPTIONS"],
    }),
  );

  app.get("/api/health", (c) =>
    c.json({
      ok: true,
      hasCredentials: Boolean(username && password),
      sessionActive: client.hasSession,
      shift,
    }),
  );

  app.route("/api/rooms", createRoomsRouter(client));

  app.post("/api/session/refresh", async (c) => {
    try {
      if (!username || !password) {
        return c.json({ error: "Missing HOTSOS credentials" }, 500);
      }
      await client.forceRelogin();
      return c.json({
        ok: true,
        loggedInAt: client.loggedInAt
          ? new Date(client.loggedInAt).toISOString()
          : null,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const status = err instanceof HotSosAuthError ? 401 : 500;
      return c.json({ error: message }, status);
    }
  });

  app.onError((err, c) => {
    console.error("[hotsos-api]", err);
    const message = err instanceof Error ? err.message : String(err);
    const status = err instanceof HotSosAuthError ? 401 : 500;
    return c.json({ error: message }, status);
  });

  return app;
}
