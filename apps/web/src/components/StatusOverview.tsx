import type { RoomStats } from "@hotsos/shared";
import { COLOR_GROUPS, COLOR_GROUP_LABELS, GROUP_HEX } from "@hotsos/shared";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatusOverviewProps {
  stats: RoomStats;
  /** Phạm vi đang thống kê, ví dụ "Tầng 7" — mặc định toàn khách sạn */
  scopeLabel?: string;
}

export function StatusOverview({ stats, scopeLabel }: StatusOverviewProps) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-h3 font-medium text-foreground">
          Tổng quan trạng thái
        </h2>
        <span className="text-caption text-muted-foreground">
          {scopeLabel ?? "Tất cả tầng"} · {stats.total} phòng
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {COLOR_GROUPS.map((group) => {
          const count = stats[group];
          return (
            <div
              key={group}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-1.5 text-white transition-opacity duration-150",
                count === 0 && "opacity-45",
              )}
              style={{ backgroundColor: GROUP_HEX[group] }}
            >
              <span className="text-caption font-medium">
                {COLOR_GROUP_LABELS[group]}
              </span>
              <span className="text-h3 font-semibold tabular-nums">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
