import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./route/route.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRoutes />
      <Toaster closeButton />
    </ThemeProvider>
  </StrictMode>,
);
