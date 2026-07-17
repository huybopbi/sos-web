import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import type { ColorGroup, RoomTile } from "@hotsos/shared";
import { COLOR_GROUPS, COLOR_GROUP_LABELS } from "@hotsos/shared";
import { FloorRow } from "@/components/FloorRow";
import { StatsRow } from "@/components/StatsRow";
import { StatusLegend } from "@/components/StatusLegend";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";
import { fetchRooms, type RoomsResponse } from "@/lib/api";

const ALL_FLOORS = "all";
const ALL_STATES = "all";

export function Dashboard() {
  const [data, setData] = useState<RoomsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [floorFilter, setFloorFilter] = useState(ALL_FLOORS);
  const [stateFilter, setStateFilter] = useState(ALL_STATES);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await fetchRooms();
      setData(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredRooms = useMemo(() => {
    if (!data) return [] as RoomTile[];
    return data.rooms.filter((room) => {
      if (floorFilter !== ALL_FLOORS && room.floor !== Number(floorFilter)) {
        return false;
      }
      if (
        stateFilter !== ALL_STATES &&
        room.colorGroup !== (stateFilter as ColorGroup)
      ) {
        return false;
      }
      return true;
    });
  }, [data, floorFilter, stateFilter]);

  const roomsByFloor = useMemo(() => {
    const map = new Map<number, RoomTile[]>();
    const unknown: RoomTile[] = [];

    for (const room of filteredRooms) {
      if (room.floor === null) {
        unknown.push(room);
        continue;
      }
      const list = map.get(room.floor) ?? [];
      list.push(room);
      map.set(room.floor, list);
    }

    const floors = [...map.keys()].sort((a, b) => a - b);
    return { floors, map, unknown };
  }, [filteredRooms]);

  const updatedLabel = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleString("vi-VN", {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "2-digit",
      })
    : "—";

  return (
    <TooltipProvider delayDuration={200}>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              HotSOS
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Room Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Cập nhật: {updatedLabel} (JST)
              {data?.sessionActive ? " · session OK" : ""}
            </p>
          </div>
          <Button
            onClick={() => void load()}
            disabled={loading}
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </header>

        {data ? <StatsRow stats={data.stats} /> : null}

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Chú thích màu</p>
          <StatusLegend />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="w-40">
            <Select value={floorFilter} onValueChange={setFloorFilter}>
              <SelectTrigger aria-label="Lọc tầng">
                <SelectValue placeholder="Tầng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_FLOORS}>Tất cả tầng</SelectItem>
                {(data?.floors ?? []).map((floor) => (
                  <SelectItem key={floor} value={String(floor)}>
                    Tầng {floor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-56">
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger aria-label="Lọc trạng thái">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_STATES}>Tất cả trạng thái</SelectItem>
                {COLOR_GROUPS.map((group) => (
                  <SelectItem key={group} value={group}>
                    {COLOR_GROUP_LABELS[group]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        {loading && !data ? (
          <p className="text-sm text-muted-foreground">Đang tải phòng…</p>
        ) : null}

        {!loading && data && filteredRooms.length === 0 ? (
          <p className="text-sm text-muted-foreground">Không có phòng khớp bộ lọc.</p>
        ) : null}

        <div className="flex flex-col gap-6 pb-10">
          {roomsByFloor.floors.map((floor) => (
            <FloorRow
              key={floor}
              floor={floor}
              rooms={roomsByFloor.map.get(floor) ?? []}
            />
          ))}
          {roomsByFloor.unknown.length > 0 ? (
            <FloorRow floor={0} rooms={roomsByFloor.unknown} />
          ) : null}
        </div>
      </div>
    </TooltipProvider>
  );
}
