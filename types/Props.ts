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
  rating: string;
  year: string;
}

export interface SerieNameFilterInputProps {
  serieName: string;
  setSerieName: React.Dispatch<React.SetStateAction<string>>;
}

export interface FiltersProps {
  serieName: string;
  setSerieName: React.Dispatch<React.SetStateAction<string>>;
}

export interface SerieListProps {
  serieName: string;
}
