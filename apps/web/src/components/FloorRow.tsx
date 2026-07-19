import { motion, useReducedMotion } from "framer-motion";
import type { RoomTile } from "@hotsos/shared";
import { RoomTileView } from "@/components/RoomTile";

interface FloorRowProps {
  floor: number;
  rooms: RoomTile[];
}

export function FloorRow({ floor, rooms }: FloorRowProps) {
  const reduceMotion = useReducedMotion();
  const title = floor > 0 ? `Tầng ${floor}` : "Không xác định tầng";
  const headingId = `floor-${floor > 0 ? floor : "unknown"}`;

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="space-y-3"
      aria-labelledby={headingId}
    >
      <div className="flex items-baseline gap-3">
        <h2 id={headingId} className="text-h3 font-medium text-foreground">
          {title}
        </h2>
        <span className="text-caption text-muted-foreground">
          {rooms.length} phòng
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {rooms.map((room) => (
          <RoomTileView
            key={`${room.assignmentId ?? ""}-${room.roomNumber}`}
            room={room}
          />
        ))}
      </div>
    </motion.section>
  );
}
