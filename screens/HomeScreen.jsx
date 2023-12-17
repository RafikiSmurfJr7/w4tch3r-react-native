import { Button, StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";
import { useContext, useState } from "react";
import { ThemeColor } from "../context/ThemeColor";
import Filters from "../components/Filters";
import SerieTopRatedList from "../components/SerieTopRatedList";
import SerieSearchList from "../components/SerieSearchList";

export default function HomeScreen({ navigation }) {
  const colors = useContext(ThemeColor);

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.blue,
    },
    subContainerNavBar: {},
    subContainerFilter: {},
    listContainer: {
      flex: 1,
      marginTop: 10,
    },
  };

  const [serieName, setSerieName] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.subContainerNavBar}>
        <NavBar />
      </View>
      <View style={styles.subContainerFilter}>
        <Filters setSerieName={setSerieName} serieName={serieName} />
      </View>

      {serieName != "" ? (
        <View style={styles.listContainer}>
          <SerieSearchList serieName={serieName} />
        </View>
      ) : (
        <View style={styles.listContainer}>
          <SerieTopRatedList />
        </View>
      )}
    </View>
  );
}
