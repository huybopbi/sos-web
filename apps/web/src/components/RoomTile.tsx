import { useEffect, useRef, useState } from "react";
import { UserRound } from "lucide-react";
import { COLOR_GROUP_LABELS, GROUP_HEX } from "@hotsos/shared";
import type { RoomTile } from "@hotsos/shared";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchRoomPax } from "@/lib/api";

interface RoomTileProps {
  room: RoomTile;
}

function cleanStatusLabel(cleanStatus: string): string {
  const s = cleanStatus.trim().toLowerCase();
  if (s === "clean") return "Đã dọn";
  if (s === "inspected") return "Đã check";
  return cleanStatus;
}

function RoomDetailBody({
  room,
  statusLabel,
  paxLabel,
  paxLoading,
  paxError,
}: {
  room: RoomTile;
  statusLabel: string;
  paxLabel: string | null;
  paxLoading: boolean;
  paxError: boolean;
}) {
  return (
    <div className="space-y-1.5 p-2 text-caption">
      <p className="font-medium text-foreground">
        Phòng {room.roomNumber} · {statusLabel}
      </p>
      <p className="text-foreground">{room.label}</p>
      <p className="text-muted-foreground">
        Res: {room.reservationStatus || "—"}
      </p>
      <p className="text-muted-foreground">
        Checkout: {room.departureDate ?? "—"}
      </p>
      {room.checkedIn ? (
        <p className="text-foreground">Khách đã check-in</p>
      ) : null}
      <p className="text-muted-foreground">
        Khách:{" "}
        {!room.assignmentId
          ? "—"
          : paxLoading
            ? "…"
            : paxError
              ? "không lấy được"
              : (paxLabel ?? "…")}
      </p>
      <p className="text-muted-foreground">
        Dọn dẹp:{" "}
        {room.cleanStatus ? cleanStatusLabel(room.cleanStatus) : "—"}
      </p>
      {room.cleanTaskName ? (
        <p className="text-muted-foreground">{room.cleanTaskName}</p>
      ) : null}
      {room.assignStatus ? (
        <p className="text-muted-foreground">{room.assignStatus}</p>
      ) : null}
    </div>
  );
}

export function RoomTileView({ room }: RoomTileProps) {
  const hex = GROUP_HEX[room.colorGroup];
  const statusLabel = COLOR_GROUP_LABELS[room.colorGroup];
  const [open, setOpen] = useState(false);
  const [paxLabel, setPaxLabel] = useState<string | null>(null);
  const [paxLoading, setPaxLoading] = useState(false);
  const [paxError, setPaxError] = useState(false);
  const requestIdRef = useRef(0);

  // PC: mở khi hover. Mobile: mở khi chạm (Popover click).
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open || !room.assignmentId) return;
    if (paxLabel !== null || paxError) return;

    const requestId = ++requestIdRef.current;
    setPaxLoading(true);

    void fetchRoomPax(room.assignmentId, room.reservationStatus)
      .then((pax) => {
        if (requestId !== requestIdRef.current) return;
        setPaxLabel(pax.label || "0 khách");
        setPaxError(false);
      })
      .catch(() => {
        if (requestId !== requestIdRef.current) return;
        setPaxError(true);
      })
      .finally(() => {
        if (requestId !== requestIdRef.current) return;
        setPaxLoading(false);
      });
  }, [open, room.assignmentId, room.reservationStatus, paxLabel, paxError]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Phòng ${room.roomNumber}, ${statusLabel}${room.checkedIn ? ", khách đã check-in" : ""}`}
          aria-expanded={open}
          className="relative flex h-10 min-w-12 items-center justify-center rounded-lg px-2 text-body font-semibold tabular-nums text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{ backgroundColor: hex }}
          onMouseEnter={() => {
            if (canHover) setOpen(true);
          }}
          onMouseLeave={() => {
            if (canHover) setOpen(false);
          }}
        >
          {room.roomNumber}
          {room.checkedIn ? (
            <span
              className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/25"
              aria-hidden
            >
              <UserRound className="h-2.5 w-2.5" />
            </span>
          ) : null}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        side="top"
        className="w-56 p-0 shadow-sm"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onMouseEnter={() => {
          if (canHover) setOpen(true);
        }}
        onMouseLeave={() => {
          if (canHover) setOpen(false);
        }}
      >
        <RoomDetailBody
          room={room}
          statusLabel={statusLabel}
          paxLabel={paxLabel}
          paxLoading={paxLoading}
          paxError={paxError}
        />
      </PopoverContent>
    </Popover>
  );
}
