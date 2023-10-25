import { createContext } from "react";
import { IThemeColor } from "../types/interfaces/IThemeColor";

export const ThemeColor: React.Context<IThemeColor> = createContext({
  blue: "",
  grey: "",
  greyDark: "",
  white: "",
  black: "",
});
