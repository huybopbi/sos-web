import { Check, ChevronDown, Search, X } from "lucide-react";
import type { ColorGroup } from "@hotsos/shared";
import { COLOR_GROUPS, COLOR_GROUP_LABELS } from "@hotsos/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MultiSelectOption {
  value: string;
  label: string;
}

/** Popover checklist chọn nhiều mục — dùng chung cho lọc tầng và trạng thái. */
function MultiSelectFilter({
  ariaLabel,
  triggerLabel,
  allLabel,
  options,
  selected,
  onChange,
  triggerClassName,
}: {
  ariaLabel: string;
  triggerLabel: string;
  allLabel: string;
  options: MultiSelectOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  triggerClassName?: string;
}) {
  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  const itemClass =
    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-body outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between font-normal",
            selected.length > 0 && "border-primary/40 text-primary",
            triggerClassName,
          )}
          aria-label={ariaLabel}
        >
          <span className="truncate">{triggerLabel}</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-72 w-56 overflow-y-auto">
        <button
          type="button"
          className={itemClass}
          onClick={() => onChange([])}
        >
          {selected.length === 0 ? (
            <Check className="absolute left-2 h-4 w-4" aria-hidden />
          ) : null}
          {allLabel}
        </button>
        {options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              role="checkbox"
              aria-checked={checked}
              className={itemClass}
              onClick={() => toggle(option.value)}
            >
              {checked ? (
                <Check
                  className="absolute left-2 h-4 w-4 text-primary"
                  aria-hidden
                />
              ) : null}
              {option.label}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

function floorFilterLabel(selectedFloors: number[]): string {
  if (selectedFloors.length === 0) return "Tất cả tầng";
  const sorted = [...selectedFloors].sort((a, b) => a - b);
  if (sorted.length <= 3) return `Tầng ${sorted.join(", ")}`;
  return `${sorted.length} tầng`;
}

function stateFilterLabel(selectedStates: ColorGroup[]): string {
  if (selectedStates.length === 0) return "Tất cả trạng thái";
  if (selectedStates.length === 1) return COLOR_GROUP_LABELS[selectedStates[0]];
  return `${selectedStates.length} trạng thái`;
}

interface FilterToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedFloors: number[];
  onFloorsChange: (floors: number[]) => void;
  selectedStates: ColorGroup[];
  onStatesChange: (states: ColorGroup[]) => void;
  floors: number[];
  hasActiveFilter: boolean;
  onReset: () => void;
}

export function FilterToolbar({
  search,
  onSearchChange,
  selectedFloors,
  onFloorsChange,
  selectedStates,
  onStatesChange,
  floors,
  hasActiveFilter,
  onReset,
}: FilterToolbarProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-xs">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full min-w-0 sm:min-w-52 sm:flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm số phòng…"
            aria-label="Tìm phòng"
            className="pl-9"
          />
        </div>

        <MultiSelectFilter
          ariaLabel="Lọc tầng"
          triggerLabel={floorFilterLabel(selectedFloors)}
          allLabel="Tất cả tầng"
          options={floors.map((floor) => ({
            value: String(floor),
            label: `Tầng ${floor}`,
          }))}
          selected={selectedFloors.map(String)}
          onChange={(values) => onFloorsChange(values.map(Number))}
          triggerClassName="sm:w-44"
        />

        <MultiSelectFilter
          ariaLabel="Lọc trạng thái"
          triggerLabel={stateFilterLabel(selectedStates)}
          allLabel="Tất cả trạng thái"
          options={COLOR_GROUPS.map((group) => ({
            value: group,
            label: COLOR_GROUP_LABELS[group],
          }))}
          selected={selectedStates}
          onChange={(values) => onStatesChange(values as ColorGroup[])}
          triggerClassName="sm:w-52"
        />

        {hasActiveFilter ? (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-4 w-4" aria-hidden />
            Xóa lọc
          </Button>
        ) : null}
      </div>
    </div>
  );
}
