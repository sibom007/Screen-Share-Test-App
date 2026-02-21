import * as React from "react";

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

export function Separator({
  className = "",
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`shrink-0 bg-border ${
        isVertical ? "h-full w-px" : "h-px w-full"
      } ${className}`}
      {...props}
    />
  );
}
