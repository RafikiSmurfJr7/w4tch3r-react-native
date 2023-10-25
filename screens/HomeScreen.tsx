import { Button, StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";
import { HomeScreenProps } from "../types/Props";
import { useContext } from "react";
import { ThemeColor } from "../context/ThemeColor";
import { getColorsFromContext } from "../utils/functions";
import { HomeScreenStyles } from "../types/Styles";
import Filters from "../components/Filters";
import SerieList from "../components/SerieList";

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const colors = useContext(ThemeColor);

  const styles: HomeScreenStyles = {
    container: {
      flex: 1,
      backgroundColor: colors.blue,
    },
    subContainerNavBar: {
      //borderWidth: 2,
      //borderColor: "white",
    },
    subContainerFilter: {
      //borderWidth: 2,
      //borderColor: "white",
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainerNavBar}>
        <NavBar />
      </View>
      <View style={styles.subContainerFilter}>
        <Filters />
      </View>
      <View>
        <SerieList />
      </View>
    </View>
  );
}
