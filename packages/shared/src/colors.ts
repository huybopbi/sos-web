import type { ColorGroup, TileState } from "./types.js";

export type { ColorGroup };

export const COLOR_GROUP_LABELS: Record<ColorGroup, string> = {
  out: "Out",
  out_clean: "Out · đã dọn",
  out_inspected: "Out · đã check",
  stay: "Stay",
  stay_clean: "Stay · đã dọn",
  touchup: "Touch Up",
  none: "Phòng sạch",
};

/** Hex for room-status color groups */
export const GROUP_HEX: Record<ColorGroup, string> = {
  out: "#ef4444",
  out_clean: "#3b82f6",
  out_inspected: "#22c55e",
  stay: "#1e3a8a",
  stay_clean: "#06b6d4",
  touchup: "#a855f7",
  none: "#9ca3af",
};

const OUT_STATES = new Set<TileState>([
  "out_pending",
  "out_done_dirty",
  "out_done_clean",
  "out_in_dirty",
  "out_in_clean",
]);

/**
 * Màu phòng theo trạng thái + cleanStatus:
 * - out: clean → xanh dương, inspected → xanh lá, còn lại → đỏ
 * - stay: clean → cyan, còn lại → navy
 * - no_task → xám
 */
export function tileColorGroup(
  state: TileState,
  cleanStatus?: string | null,
): ColorGroup {
  if (state === "no_task") return "none";
  if (state === "touch_up") return "touchup";
  const s = (cleanStatus ?? "").trim().toLowerCase();
  if (OUT_STATES.has(state)) {
    if (s === "clean") return "out_clean";
    if (s === "inspected") return "out_inspected";
    return "out";
  }
  if (s === "clean") return "stay_clean";
  return "stay";
}

/** @deprecated prefer GROUP_HEX[colorGroup] */
export const TILE_HEX: Record<TileState, string> = {
  out_pending: GROUP_HEX.out,
  out_done_dirty: GROUP_HEX.out,
  out_done_clean: GROUP_HEX.out_clean,
  out_in_dirty: GROUP_HEX.out,
  out_in_clean: GROUP_HEX.out_clean,
  stay: GROUP_HEX.stay,
  stay_dirty: GROUP_HEX.stay,
  stay_clean: GROUP_HEX.stay,
  linen: GROUP_HEX.stay,
  linen_clean: GROUP_HEX.stay,
  touch_up: GROUP_HEX.touchup,
  no_task: GROUP_HEX.none,
  other: GROUP_HEX.stay,
};

export const TILE_BG: Record<TileState, string> = {
  out_pending: "bg-red-500 text-white",
  out_done_dirty: "bg-red-500 text-white",
  out_done_clean: "bg-blue-500 text-white",
  out_in_dirty: "bg-red-500 text-white",
  out_in_clean: "bg-blue-500 text-white",
  stay: "bg-blue-900 text-white",
  stay_dirty: "bg-blue-900 text-white",
  stay_clean: "bg-blue-900 text-white",
  linen: "bg-blue-900 text-white",
  linen_clean: "bg-blue-900 text-white",
  touch_up: "bg-purple-500 text-white",
  no_task: "bg-gray-400 text-white",
  other: "bg-blue-900 text-white",
};

export const COLOR_GROUPS: ColorGroup[] = [
  "out",
  "out_clean",
  "out_inspected",
  "stay",
  "stay_clean",
  "touchup",
  "none",
];

export function legendItems(): Array<{
  group: ColorGroup;
  label: string;
  hex: string;
}> {
  return COLOR_GROUPS.map((group) => ({
    group,
    label: COLOR_GROUP_LABELS[group],
    hex: GROUP_HEX[group],
  }));
}
