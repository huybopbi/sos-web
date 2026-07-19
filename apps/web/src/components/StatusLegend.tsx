import { COLOR_GROUPS, COLOR_GROUP_LABELS } from "@hotsos/shared";
import { StatusDot } from "@/components/StatusDot";

export function StatusLegend() {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2">
      {COLOR_GROUPS.map((group) => (
        <li key={group} className="flex items-center gap-1.5 text-caption">
          <StatusDot group={group} className="h-3 w-3" />
          <span className="text-muted-foreground">
            {COLOR_GROUP_LABELS[group]}
          </span>
        </li>
      ))}
    </ul>
  );
}
