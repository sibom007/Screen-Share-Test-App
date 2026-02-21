import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Button } from "./button";


export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export function AlertDialogOverlay({
  className = "",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      className={`fixed inset-0 z-50 bg-black/50 ${className}`}
      {...props}
    />
  );
}

export function AlertDialogContent({
  className = "",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  size?: "default" | "sm";
}) {
  const sizeClass = size === "sm" ? "max-w-xs" : "sm:max-w-lg";

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className={`fixed top-1/2 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 grid gap-4 rounded-lg border bg-background p-6 shadow-lg ${sizeClass} ${className}`}
        {...props}
      />
    </AlertDialogPortal>
  );
}

export const AlertDialogHeader = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`text-center sm:text-left ${className}`} {...props} />
);

export const AlertDialogFooter = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col-reverse gap-2 sm:flex-row sm:justify-end ${className}`}
    {...props}
  />
);

export const AlertDialogTitle = ({
  className = "",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) => (
  <AlertDialogPrimitive.Title
    className={`text-lg font-semibold ${className}`}
    {...props}
  />
);

export const AlertDialogDescription = ({
  className = "",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) => (
  <AlertDialogPrimitive.Description
    className={`text-muted-foreground text-sm ${className}`}
    {...props}
  />
);

export const AlertDialogAction = ({
  className = "",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) => (
  <AlertDialogPrimitive.Action asChild {...props}>
    <Button className={className}>Confirm</Button>
  </AlertDialogPrimitive.Action>
);

export const AlertDialogCancel = ({
  className = "",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) => (
  <AlertDialogPrimitive.Cancel asChild {...props}>
    <Button variant="outline" className={className}>
      Cancel
    </Button>
  </AlertDialogPrimitive.Cancel>
);
