import * as React from "react";

type AlertVariant = "default" | "destructive";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

export function Alert({
  className = "",
  variant = "default",
  ...props
}: AlertProps) {
  const baseClasses =
    "relative w-full rounded-lg border px-4 py-3 text-sm grid items-start gap-y-0.5 " +
    "has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 " +
    "[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current";

  const variantClasses =
    variant === "destructive"
      ? "bg-card text-destructive [&>svg]:text-current"
      : "bg-card text-card-foreground";

  return (
    <div
      role="alert"
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    />
  );
}

export function AlertTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight ${className}`}
      {...props}
    />
  );
}

export function AlertDescription({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    />
  );
}
