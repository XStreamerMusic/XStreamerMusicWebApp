// CardContext.jsx
import { createContext, useState } from "react";

export const CardContext = createContext();

export function CardProvider({ children }) {
  const [ratioId, setRatioId] = useState("twitter");
  const [ratioSize, setRatioSize] = useState({ width: 1600, height: 900 });

  const updateRatio = (id, width, height) => {
    setRatioId(id);
    setRatioSize({ width, height });
  };

  return (
    <CardContext.Provider value={{ ratioId, ratioSize, updateRatio }}>
      {children}
    </CardContext.Provider>
  );
}
