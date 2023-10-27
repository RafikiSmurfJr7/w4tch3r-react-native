import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  NavigationProp,
} from "@react-navigation/native";

export interface HomeScreenProps {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

export interface SeriesCardProps {
  title: string;
  img: string;
  rating: number;
  year: string;
}
