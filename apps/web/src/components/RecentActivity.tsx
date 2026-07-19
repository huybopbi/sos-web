import { Activity, History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export interface ActivityItem {
  id: number;
  time: string;
  title: string;
  detail?: string;
}

interface RecentActivityProps {
  items: ActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" aria-hidden />
          Hoạt động gần đây
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <EmptyState
            size="sm"
            icon={History}
            title="Chưa có hoạt động"
            description="Bấm Refresh để ghi nhận thay đổi trạng thái phòng giữa các lần cập nhật."
          />
        ) : (
          <ul className="space-y-1">
            {items.map((item) => (
              <li
                key={item.id}
                className="rounded-md px-2 py-2 transition-colors duration-150 hover:bg-accent/40"
              >
                <div className="flex items-baseline gap-3">
                  <span className="shrink-0 text-caption tabular-nums text-muted-foreground">
                    {item.time}
                  </span>
                  <div className="min-w-0">
                    <p className="text-body text-foreground">{item.title}</p>
                    {item.detail ? (
                      <p className="truncate text-caption text-muted-foreground">
                        {item.detail}
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
