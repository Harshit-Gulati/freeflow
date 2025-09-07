"use client";

import { useModalContext } from "./modal.context";

enum AnimationStyleEnums {
  inOut = "inOut",
  outIn = "outIn",
}

interface ModalContentProps {
  children: React.ReactNode;
  animationStyle?: AnimationStyleEnums;
  className?: string;
}

const modalAnimationStyle: Record<
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

export const ModalContent = ({
  children,
  animationStyle = AnimationStyleEnums.outIn,
  className,
}: ModalContentProps) => {
  const { open, closeModal } = useModalContext();

  return (
    <div
      className={`h-screen w-screen fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? `visible !bg-black/70` : `invisible`
      }`}
      onClick={closeModal}
    >
      <div
        className={`bg-white dark:bg-zinc-900 border border-slate-700 rounded-xl flex flex-col justify-between items-center transition-all ${
          modalAnimationStyle[animationStyle][String(open) as "true" | "false"]
        } ${className}`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
