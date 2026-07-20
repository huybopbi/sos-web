import { Hono } from "hono";
import {
  assignmentGuestCounts,
  computeRoomStats,
  formatPax,
  toRoomTile,
} from "@hotsos/shared";
import type { HotSosClient } from "../hotsos/client.js";

export function createRoomsRouter(client: HotSosClient) {
  const app = new Hono();

  app.get("/", async (c) => {
    const rooms = await client.listRooms();
    const tiles = rooms.map(toRoomTile);
    tiles.sort((a, b) => {
      const fa = a.floor ?? 9999;
      const fb = b.floor ?? 9999;
      if (fa !== fb) return fa - fb;
      return a.roomNumber.localeCompare(b.roomNumber, undefined, {
        numeric: true,
      });
    });

    const floors = [
      ...new Set(
        tiles
          .map((t) => t.floor)
          .filter((f): f is number => f !== null),
      ),
    ].sort((a, b) => a - b);

    return c.json({
      updatedAt: new Date().toISOString(),
      sessionActive: client.hasSession,
      loggedInAt: client.loggedInAt
        ? new Date(client.loggedInAt).toISOString()
        : null,
      floors,
      stats: computeRoomStats(tiles),
      rooms: tiles,
    });
  });

  // Lazy pax: GET /api/rooms/:assignmentId/pax?reservationStatus=...
  app.get("/:assignmentId/pax", async (c) => {
    const assignmentId = Number(c.req.param("assignmentId"));
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

  return app;
}
