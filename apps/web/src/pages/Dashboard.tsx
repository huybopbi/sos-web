import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, RefreshCw, SearchX, WifiOff } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type { ColorGroup, RoomStats, RoomTile } from "@hotsos/shared";
import {
  COLOR_GROUPS,
  COLOR_GROUP_LABELS,
  computeRoomStats,
} from "@hotsos/shared";
import { FilterToolbar } from "@/components/FilterToolbar";
import { FloorRow } from "@/components/FloorRow";
import { RecentActivity, type ActivityItem } from "@/components/RecentActivity";
import { StatusLegend } from "@/components/StatusLegend";
import { StatusOverview } from "@/components/StatusOverview";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeIn } from "@/components/ui/fade-in";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { fetchRooms, clearPaxCache, type RoomsResponse } from "@/lib/api";

export function Dashboard() {
  const [data, setData] = useState<RoomsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFloors, setSelectedFloors] = useState<number[]>([]);
  const [selectedStates, setSelectedStates] = useState<ColorGroup[]>([]);
  const [selectedCheckoutDates, setSelectedCheckoutDates] = useState<string[]>(
    [],
  );
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const prevStatsRef = useRef<RoomStats | null>(null);
  const activityIdRef = useRef(0);
  const lastFetchRef = useRef(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    lastFetchRef.current = Date.now();
    try {
      const next = await fetchRooms();
      clearPaxCache();
      setData(next);

      // Ghi lại thay đổi giữa các lần refresh (chỉ phía client)
      const prev = prevStatsRef.current;
      prevStatsRef.current = next.stats;

      const time = new Date().toLocaleTimeString("vi-VN", {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
      });
      let title: string;
      let detail: string | undefined;
      if (!prev) {
        title = `Đã tải ${next.stats.total} phòng`;
      } else {
        const changes = COLOR_GROUPS.filter(
          (group) => next.stats[group] !== prev[group],
        ).map(
          (group) =>
            `${COLOR_GROUP_LABELS[group]}: ${prev[group]} → ${next.stats[group]}`,
        );
        title = changes.length
          ? "Cập nhật trạng thái phòng"
          : "Refresh — không có thay đổi";
        detail = changes.length ? changes.join(" · ") : undefined;
      }
      setActivity((list) =>
        [
          { id: ++activityIdRef.current, time, title, detail },
          ...list,
        ].slice(0, 8),
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      toast.error("Không tải được danh sách phòng", { description: message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // Tự làm mới: poll mỗi 60s khi tab đang hiển thị,
  // và refresh ngay khi quay lại tab nếu dữ liệu đã cũ hơn 30s.
  useEffect(() => {
    const AUTO_REFRESH_MS = 60_000;
    const STALE_MS = 30_000;

    const intervalId = setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, AUTO_REFRESH_MS);

    const onVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        Date.now() - lastFetchRef.current > STALE_MS
      ) {
        void load();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [load]);

  const filteredRooms = useMemo(() => {
    if (!data) return [] as RoomTile[];
    const query = search.trim().toLowerCase();
    return data.rooms.filter((room) => {
      if (
        selectedFloors.length > 0 &&
        (room.floor === null || !selectedFloors.includes(room.floor))
      ) {
        return false;
      }
      if (
        selectedStates.length > 0 &&
        !selectedStates.includes(room.colorGroup)
      ) {
        return false;
      }
      if (
        selectedCheckoutDates.length > 0 &&
        (room.departureDate === null ||
          !selectedCheckoutDates.includes(room.departureDate))
      ) {
        return false;
      }
      if (query && !room.roomNumber.toLowerCase().includes(query)) {
        return false;
      }
      return true;
    });
  }, [data, selectedFloors, selectedStates, selectedCheckoutDates, search]);

  const checkoutDates = useMemo(() => {
    if (!data) return [] as string[];
    return [
      ...new Set(
        data.rooms
          .map((room) => room.departureDate)
          .filter((d): d is string => d !== null),
      ),
    ].sort();
  }, [data]);

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

  const stats = data?.stats;

  // Tổng quan trạng thái bám theo bộ lọc tầng + ngày checkout
  const overviewStats = useMemo(() => {
    if (!data) return null;
    if (selectedFloors.length === 0 && selectedCheckoutDates.length === 0) {
      return data.stats;
    }
    return computeRoomStats(
      data.rooms.filter((room) => {
        if (
          selectedFloors.length > 0 &&
          (room.floor === null || !selectedFloors.includes(room.floor))
        ) {
          return false;
        }
        if (
          selectedCheckoutDates.length > 0 &&
          (room.departureDate === null ||
            !selectedCheckoutDates.includes(room.departureDate))
        ) {
          return false;
        }
        return true;
      }),
    );
  }, [data, selectedFloors, selectedCheckoutDates]);

  const overviewScopeLabel = useMemo(() => {
    const parts: string[] = [];
    if (selectedFloors.length > 0) {
      parts.push(
        `Tầng ${[...selectedFloors].sort((a, b) => a - b).join(", ")}`,
      );
    }
    if (selectedCheckoutDates.length > 0) {
      const dates = [...selectedCheckoutDates]
        .sort()
        .map((d) => {
          const [y, m, day] = d.split("-");
          return y && m && day ? `${day}/${m}/${y}` : d;
        });
      parts.push(
        dates.length <= 2
          ? `Checkout ${dates.join(", ")}`
          : `${dates.length} ngày checkout`,
      );
    }
    return parts.length > 0 ? parts.join(" · ") : undefined;
  }, [selectedFloors, selectedCheckoutDates]);

  const hasActiveFilter =
    selectedFloors.length > 0 ||
    selectedStates.length > 0 ||
    selectedCheckoutDates.length > 0 ||
    search.trim() !== "";

  const resetFilters = () => {
    setSelectedFloors([]);
    setSelectedStates([]);
    setSelectedCheckoutDates([]);
    setSearch("");
  };

  const sidebarContent = (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-caption font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Chú thích màu
        </p>
        <StatusLegend />
      </section>
    </div>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-screen flex-col">
        <AppHeader
          loading={loading}
          sessionActive={Boolean(data?.sessionActive)}
          onRefresh={() => void load()}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        <div className="flex flex-1">
          <AppSidebar
            open={sidebarOpen}
            mobileOpen={mobileSidebarOpen}
            onMobileClose={() => setMobileSidebarOpen(false)}
          >
            {sidebarContent}
          </AppSidebar>

          <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-screen-2xl flex-col gap-8">
              <FadeIn className="space-y-2">
                <h1 className="text-h1 font-semibold text-foreground">
                  Room Dashboard
                </h1>
                <p className="text-body text-muted-foreground">
                  Cập nhật: {updatedLabel} (JST)
                </p>
              </FadeIn>

              {error && data ? (
                <Alert variant="destructive">
                  <AlertCircle aria-hidden />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}

              {error && !data && !loading ? (
                <FadeIn>
                  <EmptyState
                    icon={WifiOff}
                    title="Không tải được dữ liệu phòng"
                    description={error}
                    action={
                      <Button onClick={() => void load()}>
                        <RefreshCw className="h-4 w-4" aria-hidden />
                        Thử lại
                      </Button>
                    }
                  />
                </FadeIn>
              ) : null}

              <AnimatePresence mode="wait">
              {loading && !data ? (
                <FadeIn key="skeleton" className="flex flex-col gap-8">
                  <Skeleton className="h-44 rounded-xl" />
                  <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
                    <div className="flex flex-col gap-8">
                      {[0, 1, 2].map((row) => (
                        <div key={row} className="space-y-3">
                          <Skeleton className="h-5 w-28" />
                          <div className="flex flex-wrap gap-1.5">
                            {Array.from({ length: 14 }, (_, i) => (
                              <Skeleton key={i} className="h-10 w-14 rounded-lg" />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-6">
                      <Skeleton className="h-48 rounded-xl" />
                    </div>
                  </div>
                </FadeIn>
              ) : stats ? (
                <FadeIn key="content" className="flex flex-col gap-8">
                  <FadeIn delay={0}>
                    <StatusOverview
                      stats={overviewStats ?? stats}
                      scopeLabel={overviewScopeLabel}
                    />
                  </FadeIn>

                  <FilterToolbar
                    search={search}
                    onSearchChange={setSearch}
                    selectedFloors={selectedFloors}
                    onFloorsChange={setSelectedFloors}
                    selectedStates={selectedStates}
                    onStatesChange={setSelectedStates}
                    selectedCheckoutDates={selectedCheckoutDates}
                    onCheckoutDatesChange={setSelectedCheckoutDates}
                    floors={data?.floors ?? []}
                    checkoutDates={checkoutDates}
                    hasActiveFilter={hasActiveFilter}
                    onReset={resetFilters}
                  />

                  <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
                    <div className="flex flex-col gap-8 pb-12">
                      {filteredRooms.length === 0 && !loading ? (
                        <EmptyState
                          icon={SearchX}
                          title="Không có phòng khớp bộ lọc"
                          description="Thử tìm số phòng khác, đổi tầng hoặc chọn trạng thái khác để xem lại danh sách."
                          action={
                            hasActiveFilter ? (
                              <Button onClick={resetFilters}>
                                Xóa bộ lọc
                              </Button>
                            ) : undefined
                          }
                        />
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>

                    <div className="flex w-full flex-col gap-6 self-start xl:sticky xl:top-[4.5rem]">
                      <RecentActivity items={activity} />
                    </div>
                  </div>
                </FadeIn>
              ) : null}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
