import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Navbar } from "@/feature/shared/components/navbar";

export function HomePage() {
  const navigate = useNavigate();

  const isSupported =
    typeof navigator !== "undefined" &&
    navigator.mediaDevices &&
    navigator.mediaDevices.getDisplayMedia;

  const handleStart = () => {
    if (!isSupported) {
      toast.error("Screen sharing is not supported in this browser.");
      return;
    }
    navigate("/screen-test");
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-background via-background to-secondary/40">
      {/* NAVBAR */}
      <Navbar handleStart={handleStart} isSupported={isSupported} />

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {!isSupported && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive">
            <p className="font-medium">Browser unsupported</p>
            <p className="text-sm mt-1">
              Screen sharing is not supported in this browser. Use Chrome or
              Edge (desktop) for the best experience.
            </p>
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Screen Share Test App
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl">
              This test verifies your browser’s screen sharing permissions,
              media stream lifecycle handling, and real-time preview using
              native Web APIs. No recording or backend streaming involved.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={handleStart}
                disabled={!isSupported}
                className="text-base px-8 cursor-pointer">
                Start Screen Test
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia",
                    "_blank",
                  )
                }>
                Learn About Screen API
              </Button>
            </div>
          </div>

          {/* RIGHT INFO CARD */}
          <Card className="p-6 bg-card/60 border border-border/50  shadow-xl ">
            <h3 className="text-xl font-semibold mb-4">
              What This Test Checks
            </h3>

            <ul className="space-y-3 text-muted-foreground">
              <li>• Screen share permission handling</li>
              <li>• Live media stream preview</li>
              <li>• Resolution & metadata detection</li>
              <li>• Stream lifecycle (onended detection)</li>
              <li>• Proper cleanup & retry flow</li>
            </ul>

            <div className="mt-6 p-4 rounded-lg bg-secondary/30 border border-border/40">
              <p className="text-sm text-muted-foreground">
                Best supported on:
              </p>
              <p className="font-medium text-foreground">
                Google Chrome / Microsoft Edge (Desktop)
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 py-6 text-center text-sm text-muted-foreground">
        Built with React + Native Screen Capture API
      </footer>
    </main>
  );
}
