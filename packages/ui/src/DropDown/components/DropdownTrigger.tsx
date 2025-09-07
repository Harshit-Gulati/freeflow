"use client";

import { forwardRef } from "react";
import { useDropdownContext } from "./dropdown.context";

export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function DropdownTrigger({ children, ...props }, ref) {
  const context = useDropdownContext();

  return (
    <button
      ref={context.refs.setReference}
      aria-expanded={context.open}
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});
