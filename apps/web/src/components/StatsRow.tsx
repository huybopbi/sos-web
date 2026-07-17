import type { RoomStats } from "@hotsos/shared";
import { Badge } from "@/components/ui/badge";

interface StatsRowProps {
  stats: RoomStats;
}

const ITEMS: Array<{ key: keyof RoomStats; label: string }> = [
  { key: "out_pending", label: "Out · chưa out" },
  { key: "out", label: "Out" },
  { key: "out_clean", label: "Out · đã dọn" },
  { key: "out_inspected", label: "Out · đã check" },
  { key: "stay", label: "Stay" },
  { key: "stay_clean", label: "Stay · đã dọn" },
  { key: "touchup", label: "Touch Up" },
  { key: "none", label: "Phòng sạch" },
  { key: "total", label: "Tổng" },
];

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ITEMS.map(({ key, label }) => (
        <Badge key={key} className="gap-1.5">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-semibold tabular-nums">{stats[key]}</span>
        </Badge>
      ))}
    </div>
  );
}
