import type { RoomTile } from "@hotsos/shared";
import { RoomTileView } from "@/components/RoomTile";

interface FloorRowProps {
  floor: number;
  rooms: RoomTile[];
}

export function FloorRow({ floor, rooms }: FloorRowProps) {
  const title = floor > 0 ? `Tầng ${floor}` : "Không xác định tầng";
  return (
    <section className="space-y-2">
      <div className="flex items-baseline gap-2">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <span className="text-xs text-muted-foreground">{rooms.length} phòng</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {rooms.map((room) => (
          <RoomTileView key={`${room.assignmentId ?? ""}-${room.roomNumber}`} room={room} />
        ))}
      </div>
    </section>
  );
}
