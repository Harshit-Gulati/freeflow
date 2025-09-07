"use client";

import { CloseIcon } from "../../icons/CloseIcon";
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
          <CloseIcon
            active={open}
            animated={true}
            size={28}
            className="cursor-pointer hover:stroke-purple-600"
          />
        </div>
      </ModalTrigger>
    </div>
  );
};
