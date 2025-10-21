"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CornerButtonGroupContextType {
  hoveredButton: string | null;
  setHoveredButton: (id: string | null) => void;
}

const CornerButtonGroupContext = createContext<CornerButtonGroupContextType | undefined>(undefined);

export function useCornerButtonGroup() {
  const context = useContext(CornerButtonGroupContext);
  if (!context) {
    throw new Error("useCornerButtonGroup must be used within CornerButtonGroup");
  }
  return context;
}

interface CornerButtonGroupProps {
  children: ReactNode;
}

export function CornerButtonGroup({ children }: CornerButtonGroupProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <CornerButtonGroupContext.Provider value={{ hoveredButton, setHoveredButton }}>
      {children}
    </CornerButtonGroupContext.Provider>
  );
}
