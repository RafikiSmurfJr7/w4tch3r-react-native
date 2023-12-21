// ThemeColor.js
import { createContext, useContext } from "react";

export const ThemeColor = createContext({});

export function useThemeColor() {
  return useContext(ThemeColor);
}
