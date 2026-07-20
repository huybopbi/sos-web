import { Hono } from "hono";
import { computeRoomStats, toRoomTile } from "@hotsos/shared";
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

  return app;
}
