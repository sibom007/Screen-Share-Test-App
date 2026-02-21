import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (theme: "light" | "dark" | "system") => {
    setTheme(theme);
    setOpen(false);
  };

  return (
    <div className="relative inline-block " ref={menuRef}>
      {/* Trigger Button */}
      <Button
        variant="outline"
        size="icon"
        className="relative hover:text-primary-foreground"
        onClick={() => setOpen((prev) => !prev)}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Menu */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-32 rounded-md border bg-popover text-popover-foreground shadow-md p-1 z-50
                     animate-in fade-in-0 zoom-in-95 duration-150">
          <button
            onClick={() => handleSelect("light")}
            className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
            Light
          </button>

          <button
            onClick={() => handleSelect("dark")}
            className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
            Dark
          </button>

          <button
            onClick={() => handleSelect("system")}
            className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
            System
          </button>
        </div>
      )}
    </div>
  );
}
