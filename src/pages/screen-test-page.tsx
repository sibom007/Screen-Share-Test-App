import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScreenShare } from "@/feature/screen/hooks/use-screen-share";
import { ScreenPreviewCard } from "@/feature/screen/components/screen-preview-card";
import { ScreenControlsCard } from "@/feature/screen/components/screen-controls-card";
import { ScreenErrorAlert } from "@/feature/screen/components/screen-error-alert";
import { ScreenMetadataCard } from "@/feature/screen/components/screen-metadata-card";
import { StopConfirmDialog } from "@/feature/screen/components/stop-confirm-dialog";

export default function ScreenTestPage() {
  const navigate = useNavigate();
  const screen = useScreenShare();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <div className="border-b border-border bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">Screen Sharing Test</h1>
          <Button variant="outline" className="cursor-pointer" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Preview */}
          <ScreenPreviewCard state={screen.state} videoRef={screen.videoRef} />

          {/* Sidebar */}
          <div className="space-y-6">
            <ScreenControlsCard
              state={screen.state}
              onStart={screen.startScreenShare}
              onStop={screen.requestStop}
              onBackToHome={() => navigate("/")}
            />

            <ScreenErrorAlert
              state={screen.state}
              errorType={screen.errorType}
              errorMessage={screen.errorMessage}
            />

            <ScreenMetadataCard
              state={screen.state}
              resolution={screen.resolution}
              displaySurface={screen.displaySurface}
            />
          </div>
        </div>
      </section>

      <StopConfirmDialog
        open={screen.showStopConfirm}
        onCancel={screen.cancelStop}
        onConfirm={screen.confirmStop}
      />
    </main>
  );
}
