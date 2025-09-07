"use client";

import { IconX } from "@tabler/icons-react";
import { useModalContext } from "./modal.context";
import { ModalTrigger } from "./ModalTrigger";

interface ModalHeaderProps {
  children?: React.ReactNode;
}

export const ModalHeader = ({ children }: ModalHeaderProps) => {
  const { open } = useModalContext();

  return (
    <div className="w-full flex justify-between items-center">
      <div>{children}</div>
      <ModalTrigger>
        <div className="ml-auto">
          <IconX size={28} className="cursor-pointer hover:stroke-purple-600" />
        </div>
      </ModalTrigger>
    </div>
  );
};
