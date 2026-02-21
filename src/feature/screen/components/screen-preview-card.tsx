import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RefObject } from "react";

type Props = {
  state: string;
  videoRef: RefObject<HTMLVideoElement | null>;
};

export function ScreenPreviewCard({ state, videoRef }: Props) {
  const isActive = state === "granted";

  const getBadge = () => {
    switch (state) {
      case "granted":
        return <Badge>Active</Badge>;
      case "requesting":
        return <Badge variant="secondary">Requesting</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      case "denied":
        return <Badge variant="destructive">Denied</Badge>;
      default:
        return <Badge variant="outline">No Active</Badge>;
    }
  };

  return (
    <Card className="lg:col-span-2">
      <div className="flex  items-center justify-between px-8">
        <CardTitle>Live Screen Preview</CardTitle>
        {getBadge()}
      </div>

      <CardContent>
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-muted border border-border flex items-center justify-center">
          {isActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium">No Active Screen Stream</p>
              <p className="text-sm">Start screen sharing to see preview</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
