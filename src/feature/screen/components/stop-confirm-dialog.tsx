import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onConfirm: () => void;
};

export function StopConfirmDialog({ onConfirm }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setMounted(true);
    else {
      const t = setTimeout(() => setMounted(false), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="destructive"
        className="w-full cursor-pointer"
        onClick={() => setOpen(true)}>
        Stop Screen Share
      </Button>

      {mounted && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-150 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!open}>
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCancel}
            onKeyDown={(e) => e.key === "Escape" && handleCancel()}
          />
          <div
            className={`relative z-10 w-full max-w-sm rounded-lg border border-border bg-background p-6 shadow-lg transition-all duration-150 ${
              open ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="stop-dialog-title">
            <div className="mb-4">
              <h2 id="stop-dialog-title" className="text-lg font-semibold">
                Stop Screen Sharing?
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                This will immediately stop the stream and release all media
                tracks. You can start again with Retry.
              </p>
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={handleConfirm}>
                Yes, Stop Sharing
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
