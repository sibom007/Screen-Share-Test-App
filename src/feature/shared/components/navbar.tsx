import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

interface Props {
  handleStart: () => void;
  isSupported: boolean | MediaDevices["getDisplayMedia"] | undefined;
}

export const Navbar = ({ handleStart, isSupported }: Props) => {
  return (
    <nav className="w-full border-b border-border/50 bg-background/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          Screen Share Test App
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:block">
            Chrome / Edge Recommended
          </span>
          <Button
            variant="outline"
            onClick={handleStart}
            disabled={!isSupported}
            className={`cursor-pointer `}>
            Start Test
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
