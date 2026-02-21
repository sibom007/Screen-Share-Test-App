import * as React from "react";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export function DropdownMenuContent({
  className = "",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={`z-50 min-w-32 max-h-(--radix-dropdown-menu-content-available-height) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground p-1 shadow-md origin-(--radix-dropdown-menu-content-transform-origin) 
        data-[state=open]:animate-in 
        data-[state=closed]:animate-out 
        data-[state=closed]:fade-out-0 
        data-[state=open]:fade-in-0 
        data-[state=closed]:zoom-out-95 
        data-[state=open]:zoom-in-95 
        data-[side=bottom]:slide-in-from-top-2 
        data-[side=left]:slide-in-from-right-2 
        data-[side=right]:slide-in-from-left-2 
        data-[side=top]:slide-in-from-bottom-2 
        ${className}`}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({
  className = "",
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  const insetClass = inset ? "pl-8" : "";
  const destructiveClass =
    variant === "destructive"
      ? "text-destructive focus:bg-destructive/10 focus:text-destructive"
      : "focus:bg-accent focus:text-accent-foreground";

  return (
    <DropdownMenuPrimitive.Item
      className={`relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors 
      data-disabled:pointer-events-none data-disabled:opacity-50 
      ${insetClass} ${destructiveClass} ${className}`}
      {...props}
    />
  );
}

export function DropdownMenuCheckboxItem({
  className = "",
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      className={`relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors 
      focus:bg-accent focus:text-accent-foreground 
      data-disabled:pointer-events-none data-disabled:opacity-50 
      ${className}`}
      {...props}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center pointer-events-none">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export function DropdownMenuRadioItem({
  className = "",
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={`relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors 
      focus:bg-accent focus:text-accent-foreground 
      data-disabled:pointer-events-none data-disabled:opacity-50 
      ${className}`}
      {...props}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center pointer-events-none">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

export function DropdownMenuLabel({
  className = "",
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      className={`px-2 py-1.5 text-sm font-medium ${
        inset ? "pl-8" : ""
      } ${className}`}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className = "",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={`-mx-1 my-1 h-px bg-border ${className}`}
      {...props}
    />
  );
}

export function DropdownMenuShortcut({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`ml-auto text-xs tracking-widest text-muted-foreground ${className}`}
      {...props}
    />
  );
}

export function DropdownMenuSubTrigger({
  className = "",
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={`flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors 
      focus:bg-accent focus:text-accent-foreground 
      data-[state=open]:bg-accent data-[state=open]:text-accent-foreground 
      ${inset ? "pl-8" : ""} ${className}`}
      {...props}>
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export function DropdownMenuSubContent({
  className = "",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      className={`z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground p-1 shadow-lg 
      data-[state=open]:animate-in 
      data-[state=closed]:animate-out 
      data-[state=closed]:fade-out-0 
      data-[state=open]:fade-in-0 
      data-[state=closed]:zoom-out-95 
      data-[state=open]:zoom-in-95 
      data-[side=bottom]:slide-in-from-top-2 
      data-[side=left]:slide-in-from-right-2 
      data-[side=right]:slide-in-from-left-2 
      data-[side=top]:slide-in-from-bottom-2 
      ${className}`}
      {...props}
    />
  );
}
