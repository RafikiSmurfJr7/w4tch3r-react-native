import { createContext } from "react";
import { IThemeColor } from "../types/interfaces/IThemeColor";

const colors: IThemeColor = {
  blue: "#021F3A",
  grey: "#E1E1E1",
  greyDark: "#838383",
  white: "#F7F7F7",
  black: "#0E0E0E",
};

export const ThemeColor: React.Context<IThemeColor> = createContext(colors);
