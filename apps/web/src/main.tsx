import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "@/pages/Dashboard";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Dashboard />
    <Toaster />
  </StrictMode>,
);
