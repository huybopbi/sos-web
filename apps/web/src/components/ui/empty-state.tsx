import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  /** Nút hành động chính (Button) */
  action?: ReactNode;
  size?: "default" | "sm";
  className?: string;
}

/** Empty state kiểu SaaS: illustration vòng tròn lớp + tiêu đề + mô tả + action. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  size = "default",
  className,
}: EmptyStateProps) {
  const isSm = size === "sm";

  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center text-center",
        isSm
          ? "gap-3 px-4 py-8"
          : "gap-4 rounded-xl border border-dashed border-border bg-card px-6 py-14",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-muted/50 ring-1 ring-inset ring-border/60",
          isSm ? "h-14 w-14" : "h-20 w-20",
        )}
        aria-hidden
      >
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted text-muted-foreground",
            isSm ? "h-9 w-9" : "h-12 w-12",
          )}
        >
          <Icon className={isSm ? "h-4 w-4" : "h-6 w-6"} aria-hidden />
        </div>
      </div>

      <div className={cn("max-w-sm", isSm ? "space-y-1" : "space-y-2")}>
        <p
          className={cn(
            "font-medium text-foreground",
            isSm ? "text-body" : "text-h3",
          )}
        >
          {title}
        </p>
        {description ? (
          <p className="text-caption leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className={isSm ? "mt-1" : "mt-2"}>{action}</div> : null}
    </div>
  );
}
