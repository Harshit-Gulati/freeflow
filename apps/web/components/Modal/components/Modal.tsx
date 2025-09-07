"use client";

import { ModalContextProvider } from "./modal.context";

interface ModalProps {
  children: React.ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  return (
    <ModalContextProvider>
      <div>{children}</div>
    </ModalContextProvider>
  );
};
