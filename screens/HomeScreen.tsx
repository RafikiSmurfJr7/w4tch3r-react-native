import { Button, StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";
import { HomeScreenProps } from "../types/Props";
import { useContext } from "react";
import { ThemeColor } from "../context/ThemeColor";
import { getColorsFromContext } from "../utils/functions";
import { Styles } from "../types/Styles";

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const colors = useContext(ThemeColor);

  const styles: Styles = {
    container: {
      flex: 1,
      backgroundColor: colors.blue,
    },
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <View>
        <Text style={{ color: "white" }}>Ola </Text>
      </View>
    </View>
  );
}
