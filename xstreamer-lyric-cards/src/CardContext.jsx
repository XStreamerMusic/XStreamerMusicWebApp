// CardContext.jsx
import { createContext, useState } from "react";

export const CardContext = createContext();

export function CardProvider({ children }) {
  const [ratioId, setRatioId] = useState("");
  const [ratioSize, setRatioSize] = useState({ width: 0, height: 0 });

  const ratios = [
    { id: "instagram", width: 1080, height: 1350 },
    { id: "twitter", width: 1600, height: 900 },
    { id: "square", width: 1080, height: 1080 },
  ];

  const updateRatio = (id, width, height) => {
    setRatioId(id);
    setRatioSize({ width, height });
  };

  return (
    <CardContext.Provider value={{ ratioId, ratioSize, updateRatio, ratios }}>
      {children}
    </CardContext.Provider>
  );
}
