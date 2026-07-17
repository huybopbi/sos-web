import type { RoomStats, RoomTile, TileState } from "@hotsos/shared";

export interface RoomsResponse {
  updatedAt: string;
  sessionActive: boolean;
  loggedInAt: string | null;
  floors: number[];
  stats: RoomStats;
  rooms: RoomTile[];
}

export async function fetchRooms(): Promise<RoomsResponse> {
  const res = await fetch("/api/rooms");
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<RoomsResponse>;
}

export async function refreshSession(): Promise<void> {
  const res = await fetch("/api/session/refresh", { method: "POST" });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? `HTTP ${res.status}`);
  }
}

export type { RoomStats, RoomTile, TileState };
