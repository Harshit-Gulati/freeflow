"use client";

import { Shape, XYHW } from "@/types/canvas";
import { createContext, useContext, useState } from "react";

interface CanvasContextType {
  boardId: string;
  selectionBounds: XYHW | null;
  setSelectionBounds: React.Dispatch<React.SetStateAction<XYHW | null>>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  isResizing: boolean;
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;
  canvasRect: DOMRect | null;
  setCanvasRect: React.Dispatch<React.SetStateAction<DOMRect | null>>;
  shapes: Record<string, Shape>;
  setShapes: React.Dispatch<React.SetStateAction<Record<string, Shape>>>;
  selectedShapes: Set<string>;
  setSelectedShapes: React.Dispatch<React.SetStateAction<Set<string>>>;
}

interface CanvasContextProviderTypes {
  boardId: string;
  children: React.ReactNode;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasContextProvider = ({
  boardId,
  children,
}: CanvasContextProviderTypes) => {
  const [shapes, setShapes] = useState<Record<string, Shape>>({});
  const [selectedShapes, setSelectedShapes] = useState<Set<string>>(
    new Set([])
  );
  const [selectionBounds, setSelectionBounds] = useState<XYHW | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);

  return (
    <CanvasContext.Provider
      value={{
        boardId,
        selectionBounds,
        setSelectionBounds,
        isDragging,
        setIsDragging,
        isResizing,
        setIsResizing,
        canvasRect,
        setCanvasRect,
        shapes,
        setShapes,
        selectedShapes,
        setSelectedShapes,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);

  if (!context)
    throw new Error("useMyContext must be used within a MyProvider");

  return context;
};
