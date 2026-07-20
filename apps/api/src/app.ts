import { Hono } from "hono";
import { cors } from "hono/cors";
import { assignmentGuestCounts, formatPax } from "@hotsos/shared";
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

  // Path 1 đoạn — tránh 404 trên Vercel (static + serverless chỉ match ổn /api/<segment>)
  // GET /api/pax?assignmentId=123&reservationStatus=Due%20Out
  app.get("/api/pax", async (c) => {
    const assignmentId = Number(c.req.query("assignmentId"));
    if (!Number.isFinite(assignmentId) || assignmentId <= 0) {
      return c.json({ error: "assignmentId không hợp lệ" }, 400);
    }

    const reservationStatus = c.req.query("reservationStatus") ?? "";
    const guests = await client.getGuests(assignmentId);
    const pax = assignmentGuestCounts(guests, reservationStatus);

    return c.json({
      assignmentId,
      adults: pax.adults,
      children: pax.children,
      label: formatPax(pax),
    });
  });

  // Alias 1 đoạn cho refresh session (path /api/session/refresh bị 404 trên Vercel)
  app.post("/api/refresh", async (c) => {
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
