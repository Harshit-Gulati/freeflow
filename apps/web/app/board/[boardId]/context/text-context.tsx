"use client";

import { createContext, useContext, useState } from "react";
import { useCanvasContext } from "./canvas-context";
import { Shapes, TextShape, Tools } from "@/types/canvas";
import { measureText } from "@/lib/canvas/draw";
import { useToolContext } from "./tool-context";
import { nanoid } from "nanoid";

interface TextContextType {
  textInput: {
    x: number;
    y: number;
    value: string;
    visible: boolean;
  };
  setTextInput: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
      value: string;
      visible: boolean;
    }>
  >;
  handleTextMouseDown: (x: number, y: number) => void;
  editTextShape: (shape: TextShape, id: string) => void;
  onInputBlur: () => void;
}

interface TextContextProviderTypes {
  children: React.ReactNode;
}

const TextContext = createContext<TextContextType | undefined>(undefined);

export const TextContextProvider = ({ children }: TextContextProviderTypes) => {
  const { shapes, setShapes } = useCanvasContext();
  const { setCurrentTool } = useToolContext();
  const [textInput, setTextInput] = useState<{
    x: number;
    y: number;
    value: string;
    visible: boolean;
  }>({ x: 0, y: 0, value: "", visible: false });

  const addTextShape = () => {
    if (textInput.value.trim() !== "") {
      const { width, height } = measureText(
        textInput.value.trim(),
        16,
        "Arial"
      );
      const newShape: TextShape = {
        id: nanoid(),
        type: Shapes.Text,
        x: textInput.x,
        y: textInput.y,
        fontFamily: "Arial",
        fontSize: 16,
        height,
        width,
        text: textInput.value,
        fill: { r: 0, g: 0, b: 0, a: 1 },
        stroke: { r: 0, g: 0, b: 0, a: 1 },
        zIndex: Object.keys(shapes).length,
      };

      setShapes((prev) => ({
        ...prev,
        [newShape.id]: newShape,
      }));
    }

    onInputBlur();
    setTextInput({ x: 0, y: 0, visible: false, value: "" });
  };

  const handleTextMouseDown = (x: number, y: number) => {
    if (textInput.visible) addTextShape();
    else setTextInput({ x, y, visible: true, value: "" });
    return;
  };

  const editTextShape = (shape: TextShape, id: string) => {
    setShapes((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
    setCurrentTool(Tools.Text);
    setTextInput({ x: shape.x, y: shape.y, visible: true, value: shape.text });
  };

  const onInputBlur = () => {
    setCurrentTool(Tools.Select);
  };

  return (
    <TextContext.Provider
      value={{
        textInput,
        setTextInput,
        handleTextMouseDown,
        editTextShape,
        onInputBlur,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};

export const useTextContext = () => {
  const context = useContext(TextContext);

  if (!context)
    throw new Error("useTextContext must be used within a TextContextProvider");

  return context;
};
