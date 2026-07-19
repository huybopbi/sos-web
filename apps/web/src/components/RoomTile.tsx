import { UserRound } from "lucide-react";
import { COLOR_GROUP_LABELS, GROUP_HEX } from "@hotsos/shared";
import type { RoomTile } from "@hotsos/shared";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RoomTileProps {
  room: RoomTile;
}

function cleanStatusLabel(cleanStatus: string): string {
  const s = cleanStatus.trim().toLowerCase();
  if (s === "clean") return "Đã dọn";
  if (s === "inspected") return "Đã check";
  return cleanStatus;
}

export function RoomTileView({ room }: RoomTileProps) {
  const hex = GROUP_HEX[room.colorGroup];
  const statusLabel = COLOR_GROUP_LABELS[room.colorGroup];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`Phòng ${room.roomNumber}, ${statusLabel}${room.checkedIn ? ", khách đã check-in" : ""}`}
          className="relative flex h-10 min-w-12 items-center justify-center rounded-lg px-2 text-body font-semibold tabular-nums text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{ backgroundColor: hex }}
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
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-1.5">
          <p className="font-medium">
            Phòng {room.roomNumber} · {statusLabel}
          </p>
          <p>{room.label}</p>
          <p className="text-muted-foreground">
            Res: {room.reservationStatus || "—"}
          </p>
          {room.checkedIn ? <p>Khách đã check-in</p> : null}
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
      </TooltipContent>
    </Tooltip>
  );
}
