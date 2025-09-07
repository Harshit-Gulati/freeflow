"use client";

import { useModalContext } from "./modal.context";

interface ModalTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalTrigger = ({ children, className }: ModalTriggerProps) => {
  const { openModal, closeModal, open } = useModalContext();

  return (
    <button onClick={open ? closeModal : openModal} className={className}>
      {children}
    </button>
  );
};
