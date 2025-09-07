"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";

type DropdownContextType = ReturnType<typeof useDropdown>;

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

type DropdownOptions = {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const useDropdown = ({
  initialOpen = false,
  placement = "bottom-end",
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: DropdownOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] =
    useState<boolean>(initialOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    placement,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const context = floating.context;
  const click = useClick(context, { enabled: controlledOpen == null });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });

  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...floating,
      ...interactions,
    }),
    [open, setOpen, floating, interactions]
  );
};

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown Components must be wrapped in <Dropdown/>");
  }
  return context;
};

export function Dropdown({
  children,
  ...options
}: { children: React.ReactNode } & DropdownOptions) {
  const dropdown = useDropdown(options);

  return (
    <DropdownContext.Provider value={dropdown}>
      {children}
    </DropdownContext.Provider>
  );
}
