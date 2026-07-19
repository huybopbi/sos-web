import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  /** Desktop: sidebar đang mở (inline) */
  open: boolean;
  /** Mobile: drawer đang mở (overlay) */
  mobileOpen: boolean;
  onMobileClose: () => void;
  children: ReactNode;
}

export function AppSidebar({
  open,
  mobileOpen,
  onMobileClose,
  children,
}: AppSidebarProps) {
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onMobileClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      <aside
        className={cn(
          "hidden shrink-0 overflow-hidden border-r border-border bg-card/50 transition-[width] duration-200 ease-out lg:block",
          open ? "w-64" : "w-0 border-r-0",
        )}
        aria-hidden={!open}
      >
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] w-64 overflow-y-auto p-6">
          {children}
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={onMobileClose}
            aria-label="Đóng menu"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Chú thích màu"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] animate-fade-in flex-col overflow-y-auto border-r border-border bg-card p-6 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={onMobileClose}
                aria-label="Đóng menu"
              >
                <X className="h-4 w-4" aria-hidden />
              </Button>
            </div>
            {children}
          </aside>
        </div>
      ) : null}
    </>
  );
}
