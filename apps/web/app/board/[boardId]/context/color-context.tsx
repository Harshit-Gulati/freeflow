"use client";

import { Color } from "@/types/canvas";
import { createContext, useContext, useState } from "react";
import { useCanvasContext } from "./canvas-context";
import { useAutosaveContext } from "./autosave-context";

interface ColorContextType {
  strokeColor: Color;
  setStrokeColor: React.Dispatch<React.SetStateAction<Color>>;
  fillColor: Color;
  setFillColor: React.Dispatch<React.SetStateAction<Color>>;
  updateColor: (fill: Color, stroke: Color) => void;
}

interface ColorContextProviderTypes {
  children: React.ReactNode;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorContextProvider = ({
  children,
}: ColorContextProviderTypes) => {
  const { setShapes, selectedShapes } = useCanvasContext();
  const { markForUpdate } = useAutosaveContext();

  const [strokeColor, setStrokeColor] = useState<Color>({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });
  const [fillColor, setFillColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  });

  const updateColor = async (fillColor: Color, strokeColor: Color) => {
    setShapes((prev) => {
      const newShapes = { ...prev };

      selectedShapes.forEach((id) => {
        const shape = prev[id];
        if (!shape) return;

        newShapes[id] = {
          ...shape,
          fill: fillColor,
          stroke: strokeColor,
        };
        markForUpdate(id);
      });

      return newShapes;
    });
  };

  return (
    <ColorContext.Provider
      value={{
        strokeColor,
        setStrokeColor,
        fillColor,
        setFillColor,
        updateColor,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const context = useContext(ColorContext);

  if (!context)
    throw new Error(
      "useColorContext must be used within a ColorContextProvider"
    );

  return context;
};
