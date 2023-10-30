import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";

export type HomeScreenStyles = {
  container: ViewStyle;
  subContainerFilter: ViewStyle;
  subContainerNavBar: ViewStyle;
  listContainer: ViewStyle;
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

export type SerieNameFilterInputStyles = {
  input: ViewStyle;
  searchIcon: ViewStyle;
};

export type SeriesCardStyles = {
  container: ViewStyle;
  img: ImageStyle;
  textContainer: ViewStyle;
  titleContainer: TextStyle;
  ratingContainer: ViewStyle;
  title: TextStyle;
  rating: TextStyle;
};
