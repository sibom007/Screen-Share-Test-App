import * as React from "react";

type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  asChild?: boolean;
}

export function Badge({
  className = "",
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? "span" : "span";

  const base =
    "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors overflow-hidden focus-visible:ring-2 focus-visible:ring-ring";

  const variants: Record<BadgeVariant, string> = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "border border-border text-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  return (
    <Comp
      data-variant={variant}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
