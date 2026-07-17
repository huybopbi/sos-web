import { GROUP_HEX } from "@hotsos/shared";
import type { RoomTile } from "@hotsos/shared";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-10 min-w-10 items-center justify-center rounded-md px-1.5 text-xs font-semibold tracking-tight text-white shadow-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          style={{ backgroundColor: GROUP_HEX[room.colorGroup] }}
        >
          {room.roomNumber}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-1">
          <p className="font-semibold">Phòng {room.roomNumber}</p>
          <p>{room.label}</p>
          <p className="text-muted-foreground">
            Res: {room.reservationStatus || "—"}
          </p>
          <p className="text-muted-foreground">
            Dọn dẹp: {room.cleanStatus ? cleanStatusLabel(room.cleanStatus) : "—"}
          </p>
          {room.cleanTaskName ? (
            <p className="text-muted-foreground">{room.cleanTaskName}</p>
          ) : null}
          {room.customerName ? (
            <p className="text-muted-foreground">{room.customerName}</p>
          ) : null}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
