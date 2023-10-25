import { ImageStyle, ViewStyle } from "react-native";

export type HomeScreenStyles = {
  container: ViewStyle;
  subContainerFilter: ViewStyle;
  subContainerNavBar: ViewStyle;
};

export type NavBarStyles = {
  container: ViewStyle;
  navBarContainer: ViewStyle;
  logo: ImageStyle;
};

export type CategoryDropdownFilterStyles = {
  dropDownContainer: ViewStyle;
  container: ViewStyle;
};

export type MovieNameFilterInputStyles = {
  input: ViewStyle;
  searchIcon: ViewStyle;
};
