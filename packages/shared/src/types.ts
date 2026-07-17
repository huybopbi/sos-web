export type TileState =
  | "out_pending"
  | "out_done_dirty"
  | "out_done_clean"
  | "out_in_dirty"
  | "out_in_clean"
  | "stay"
  | "stay_dirty"
  | "stay_clean"
  | "linen"
  | "linen_clean"
  | "touch_up"
  | "no_task"
  | "other";

export interface HotSosRoom {
  displayRoomNumber?: string | null;
  assignmentId?: number | null;
  reservationStatus?: string | null;
  assignStatus?: string | null;
  cleanStatus?: string | null;
  cleanTaskName?: string | null;
  cleanTaskId?: number | null;
  arrivalDate?: string | { _i?: string } | null;
  departureDate?: string | { _i?: string } | null;
  customerName?: string | null;
  credits?: number | null;
}

export type ColorGroup =
  | "out"
  | "out_clean"
  | "out_inspected"
  | "stay"
  | "stay_clean"
  | "touchup"
  | "none";

export interface RoomTile {
  roomNumber: string;
  floor: number | null;
  assignmentId: number | null;
  tileState: TileState;
  colorGroup: ColorGroup;
  label: string;
  reservationStatus: string;
  assignStatus: string;
  cleanStatus: string;
  cleanTaskName: string;
  cleanTaskId: number | null;
  customerName: string;
  credits: number | null;
}

export interface RoomStats {
  out: number;
  out_clean: number;
  out_inspected: number;
  stay: number;
  stay_clean: number;
  touchup: number;
  none: number;
  total: number;
}
