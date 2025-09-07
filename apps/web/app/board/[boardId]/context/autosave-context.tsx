"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useCanvasContext } from "./canvas-context";
import { toast } from "sonner";

const AUTOSAVE_INTERVAL = 5000;

type UpdateMeta = { isDeleted: boolean };

interface AutosaveContextType {
  markForUpdate: (id: string) => void;
  flushUpdates: () => void;
}

const AutosaveContext = createContext<AutosaveContextType | undefined>(
  undefined
);

export const AutosaveContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { boardId, shapes } = useCanvasContext();
  const toUpdateRef = useRef<Record<string, UpdateMeta>>({});

  const markForUpdate = useCallback(
    (id: string, isDeleted: boolean = false) => {
      toUpdateRef.current[id] = { isDeleted };
    },
    []
  );

  const flushUpdates = useCallback(async () => {
    const dirtyShapeIds = { ...toUpdateRef.current };

    if (Object.keys(dirtyShapeIds).length === 0) return;

    const dirtyShapes = Object.entries(dirtyShapeIds).map(([id, meta]) => {
      const { id: shapeId, ...rest } = shapes[id]!;
      return {
        id: shapeId,
        data: rest,
        isDeleted: meta.isDeleted,
      };
    });

    try {
      const res = await fetch(`/api/boards/${boardId}/shapes/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shapes: dirtyShapes }),
      });

      if (!res.ok) throw new Error(`Failed with status ${res.status}`);
      toUpdateRef.current = {};
      toast.success("Changes saved!");
    } catch (err) {
      console.error("Autosave flush failed", err);
      toast.error("Changes weren't saved!");
    }
  }, [boardId, shapes]);

  useEffect(() => {
    const interval = setInterval(() => {
      flushUpdates();
    }, AUTOSAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [flushUpdates]);

  return (
    <AutosaveContext.Provider value={{ flushUpdates, markForUpdate }}>
      {children}
    </AutosaveContext.Provider>
  );
};

export const useAutosaveContext = () => {
  const context = useContext(AutosaveContext);

  if (!context)
    throw new Error(
      "useAutosaveContext must be used within a AutosaveContextProvider"
    );

  return context;
};
