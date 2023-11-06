import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  NavigationProp,
} from "@react-navigation/native";

export interface HomeScreenProps {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

export interface SeriesCardProps {
  id: number;
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

export interface SerieSearchListProps {
  serieName: string;
}

export interface SerieSeasonEpisodeButtonProps {
  children: string;
  handleSerieButtonPressed: (children: string) => void;
}

export interface SerieEpisodeButtonProps {
  children: string;
  handleSerieEpisodeButtonPressed: (children: string) => void;
}

export interface LoginFormProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  submitLoginForm: () => void;
}

export interface ErrorAlertProps {
  children: string;
}

export interface LoginScreenProps {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}
