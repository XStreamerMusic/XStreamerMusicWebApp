// CardContext.jsx
import { createContext, useState } from "react";
import { rescale } from "./utils/rescale";

export const CardContext = createContext();

export function CardProvider({ children }) {
  const [ratioId, setRatioId] = useState("square");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateRatio = (id, width, height, maxWidthRem = 20) => {
    setRatioId(id);
    setDimensions(rescale(width, height, maxWidthRem));
  };

  return (
    <CardContext.Provider value={{ ratioId, dimensions, updateRatio }}>
      {children}
    </CardContext.Provider>
  );
}