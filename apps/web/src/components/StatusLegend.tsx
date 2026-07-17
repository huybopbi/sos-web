import { legendItems } from "@hotsos/shared";

export function StatusLegend() {
  const items = legendItems();

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {items.map((item) => (
        <div key={item.group} className="flex items-center gap-1.5 text-xs">
          <span
            className="h-3 w-3 shrink-0 rounded-sm"
            style={{ backgroundColor: item.hex }}
            aria-hidden
          />
          <span className="text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
