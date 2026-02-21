import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  state: string;
  resolution: string;
  displaySurface: string;
}

export function ScreenMetadataCard({
  state,
  resolution,
  displaySurface,
}: Props) {
  const isActive = state === "granted";
  const getDisplayType = (surface?: string) => {
    switch (surface) {
      case "browser":
        return "Tab";
      case "window":
        return "Window";
      case "monitor":
        return "Entire Screen";
      default:
        return "Unknown";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stream Metadata</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between -mt-4">
          <span className="text-muted-foreground">Stream Status</span>
          <Badge variant={isActive ? "default" : "outline"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">State</span>
          <span className="font-medium capitalize">{state}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Resolution</span>
          <span className="font-medium">{resolution || "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Display Type</span>
          <span className="font-medium capitalize">
            {getDisplayType(displaySurface)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
