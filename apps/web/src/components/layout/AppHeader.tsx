import { useState } from "react";
import { Moon, PanelLeft, RefreshCw, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  loading: boolean;
  sessionActive: boolean;
  onRefresh: () => void;
  onToggleSidebar: () => void;
  onToggleMobileSidebar: () => void;
}

export function AppHeader({
  loading,
  sessionActive,
  onRefresh,
  onToggleSidebar,
  onToggleMobileSidebar,
}: AppHeaderProps) {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  const toggleTheme = () => {
    const dark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
    setIsDark(dark);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:inline-flex"
          onClick={onToggleSidebar}
          aria-label="Thu gọn / mở sidebar"
        >
          <PanelLeft className="h-4 w-4" aria-hidden />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onToggleMobileSidebar}
          aria-label="Mở menu chú thích"
        >
          <PanelLeft className="h-4 w-4" aria-hidden />
        </Button>

        <div className="flex min-w-0 items-baseline gap-2">
          <span className="text-caption font-medium uppercase tracking-[0.18em] text-muted-foreground">
            HotSOS
          </span>
          <span className="hidden truncate text-body font-medium text-foreground sm:inline">
            Room Dashboard
          </span>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          {sessionActive ? (
            <Badge variant="success" className="hidden sm:inline-flex">
              Session OK
            </Badge>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? "Chuyển sáng" : "Chuyển tối"}
          >
            {isDark ? (
              <Sun className="h-4 w-4" aria-hidden />
            ) : (
              <Moon className="h-4 w-4" aria-hidden />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
            aria-busy={loading}
          >
            <RefreshCw
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              aria-hidden
            />
            Refresh
          </Button>
        </div>
      </div>
    </header>
  );
}
