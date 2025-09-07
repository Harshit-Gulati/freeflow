"use client";


import { Tools } from "@/types/canvas";

import { createContext, useContext, useState } from "react";

interface ToolContextType {
  currentTool: Tools;
  setCurrentTool: React.Dispatch<React.SetStateAction<Tools>>;
}

interface ToolContextProviderTypes {
  children: React.ReactNode;
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export const ToolContextProvider = ({ children }: ToolContextProviderTypes) => {
  const [currentTool, setCurrentTool] = useState<Tools>(Tools.Select);

  return (
    <ToolContext.Provider
      value={{
        currentTool,
        setCurrentTool,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};

export const useToolContext = () => {
  const context = useContext(ToolContext);

  if (!context)
    throw new Error("useToolContext must be used within a ToolContextProvider");

  return context;
};
