import { tileColorGroup } from "./colors.js";
import type { HotSosRoom, RoomStats, RoomTile, TileState } from "./types.js";

const TILE_LABELS: Record<TileState, string> = {
  out_pending: "Out · chờ khách rời",
  out_done_dirty: "Out · chưa dọn",
  out_done_clean: "Out · đã dọn xong",
  out_in_dirty: "Out/In · chưa dọn",
  out_in_clean: "Out/In · sẵn sàng",
  stay: "Stay",
  stay_dirty: "Stay · chưa dọn",
  stay_clean: "Stay · đã dọn",
  linen: "Thay giường · chưa dọn",
  linen_clean: "Thay giường · xong",
  touch_up: "Touch Up 手直し",
  no_task: "Phòng sạch",
  other: "Khác",
};

export function tileLabel(state: TileState): string {
  return TILE_LABELS[state];
}

export function stripNonDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function roomFloor(roomNumber: string): number | null {
  const digits = stripNonDigits(roomNumber);
  if (!digits) return null;
  return Math.floor(parseInt(digits, 10) / 100);
}

function lower(value: string | null | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

export function isCleaned(room: HotSosRoom): boolean {
  const status = lower(room.cleanStatus);
  return status === "clean" || status === "inspected";
}

export function isDirty(room: HotSosRoom): boolean {
  return lower(room.cleanStatus) === "dirty";
}

export function isPickup(room: HotSosRoom): boolean {
  return lower(room.cleanStatus) === "pickup";
}

export function isOutCleanTask(room: HotSosRoom): boolean {
  if (room.cleanTaskId === 1) return true;
  const name = room.cleanTaskName ?? "";
  return name === "Out Clean アウトメイク" || name.includes("Out Clean");
}

export function isTouchUp(room: HotSosRoom): boolean {
  return (
    room.cleanTaskId === 2 ||
    (room.cleanTaskName ?? "").includes("Touch Up")
  );
}

export function isNoTask(room: HotSosRoom): boolean {
  return (
    room.cleanTaskId === -1 ||
    (room.cleanTaskName ?? "").trim() === "タスクなし"
  );
}

export function isLinen(room: HotSosRoom): boolean {
  return (
    room.cleanTaskId === 5 ||
    room.cleanTaskName === "Stay Make Linen リネン交換"
  );
}

export function classifyOutDone(
  room: HotSosRoom,
): "out" | "out_in" | null {
  if (room.reservationStatus === "Checked Out") return "out";
  if (room.reservationStatus === "Due In\\Checked Out") return "out_in";
  return null;
}

export function classifyRoomTile(room: HotSosRoom): TileState {
  if (isNoTask(room)) return "no_task";
  if (isTouchUp(room)) return "touch_up";

  const status = (room.reservationStatus ?? "").trim();
  const outCat = classifyOutDone(room);

  if (status === "Due Out" || status === "Due In\\Out") return "out_pending";
  if (outCat === "out") return isCleaned(room) ? "out_done_clean" : "out_done_dirty";
  if (outCat === "out_in") return isCleaned(room) ? "out_in_clean" : "out_in_dirty";

  if (status === "Stay Over") {
    if (isLinen(room)) return isCleaned(room) ? "linen_clean" : "linen";
    if (isCleaned(room)) return "stay_clean";
    if (isDirty(room)) return "stay_dirty";
    return "stay";
  }

  // Checked In + Out Clean task (guest chưa rời) vẫn thuộc nhóm out
  if (isOutCleanTask(room)) {
    return isCleaned(room) ? "out_done_clean" : "out_pending";
  }

  return "other";
}

export function toRoomTile(room: HotSosRoom): RoomTile {
  const roomNumber = String(room.displayRoomNumber ?? "").trim() || "?";
  const tileState = classifyRoomTile(room);
  const cleanStatus = room.cleanStatus ?? "";

  return {
    roomNumber,
    floor: roomFloor(roomNumber),
    assignmentId: room.assignmentId ?? null,
    tileState,
    colorGroup: tileColorGroup(tileState, cleanStatus),
    label: tileLabel(tileState),
    reservationStatus: room.reservationStatus ?? "",
    assignStatus: room.assignStatus ?? "",
    cleanStatus,
    cleanTaskName: room.cleanTaskName ?? "",
    cleanTaskId: room.cleanTaskId ?? null,
    customerName: room.customerName ?? "",
    credits: room.credits ?? null,
  };
}

export function computeRoomStats(rooms: RoomTile[]): RoomStats {
  const stats: RoomStats = {
    out: 0,
    out_clean: 0,
    out_inspected: 0,
    stay: 0,
    stay_clean: 0,
    touchup: 0,
    none: 0,
    total: rooms.length,
  };

  for (const room of rooms) {
    stats[room.colorGroup] += 1;
  }

  return stats;
}

export { TILE_LABELS };
