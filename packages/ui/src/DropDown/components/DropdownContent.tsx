"use client";

import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import { useDropdownContext } from "./dropdown.context";
import { forwardRef } from "react";

enum AnimationStyleEnums {
  inOut = "inOut",
  outIn = "outIn",
}

const dropDownAnimationStyle: Record<
  AnimationStyleEnums,
  Record<"true" | "false", string>
> = {
  inOut: {
    true: "scale-100 opacity-100",
    false: "scale-125 opacity-0",
  },
  outIn: {
    true: "scale-100 opacity-100",
    false: "scale-85 opacity-0",
  },
};

export const DropdownContent = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function DropdownContent({ style, children, className, ...props }, ref) {
  const context = useDropdownContext();
  const mergedRef = useMergeRefs([context.refs.setFloating, ref]);

  if (!context.open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={context.context} modal={false}>
        <div
          ref={mergedRef}
          style={{ ...context.floatingStyles, ...style }}
          className={`${className} ${dropDownAnimationStyle["inOut"][String(context.open) as "true" | "false"]}`}
          {...context.getFloatingProps(props)}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});
