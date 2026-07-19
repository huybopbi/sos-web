import type { ColorGroup } from "@hotsos/shared";
import { GROUP_HEX } from "@hotsos/shared";
import { cn } from "@/lib/utils";

interface StatusDotProps {
  group: ColorGroup;
  className?: string;
}

/** Chấm màu trạng thái phòng — dùng chung cho legend, stats, tooltip. */
export function StatusDot({ group, className }: StatusDotProps) {
  return (
    <span
      className={cn("h-2.5 w-2.5 shrink-0 rounded-sm", className)}
      style={{ backgroundColor: GROUP_HEX[group] }}
      aria-hidden
    />
  );
}
