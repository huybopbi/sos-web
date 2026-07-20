import type { PaxCounts, RoomStats, RoomTile } from "@hotsos/shared";

export interface RoomsResponse {
  updatedAt: string;
  sessionActive: boolean;
  loggedInAt: string | null;
  floors: number[];
  stats: RoomStats;
  rooms: RoomTile[];
}

export interface RoomPaxResponse extends PaxCounts {
  assignmentId: number;
  label: string;
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

const paxCache = new Map<number, RoomPaxResponse>();
const paxInflight = new Map<number, Promise<RoomPaxResponse>>();

export function clearPaxCache(): void {
  paxCache.clear();
  paxInflight.clear();
}

/** Lazy fetch số khách — cache theo assignmentId trong phiên trình duyệt. */
export async function fetchRoomPax(
  assignmentId: number,
  reservationStatus: string,
): Promise<RoomPaxResponse> {
  const cached = paxCache.get(assignmentId);
  if (cached) return cached;

  const pending = paxInflight.get(assignmentId);
  if (pending) return pending;

  const request = (async () => {
    const params = new URLSearchParams();
    if (reservationStatus) {
      params.set("reservationStatus", reservationStatus);
    }
    const qs = params.toString();
    const res = await fetch(
      `/api/rooms/${assignmentId}/pax${qs ? `?${qs}` : ""}`,
    );
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      throw new Error(body?.error ?? `HTTP ${res.status}`);
    }
    const data = (await res.json()) as RoomPaxResponse;
    paxCache.set(assignmentId, data);
    return data;
  })().finally(() => {
    paxInflight.delete(assignmentId);
  });

  paxInflight.set(assignmentId, request);
  return request;
}
