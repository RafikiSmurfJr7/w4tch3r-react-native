import { Button, StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";
import { useContext, useState } from "react";
import { ThemeColor } from "../context/ThemeColor";
import Filters from "../components/Filters";
import MoviesTopRatedList from "../components/movies/MovieTopRatedList";

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
  const [movieName, setMovieName] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.subContainerNavBar}>
        <NavBar />
      </View>
      <View style={styles.subContainerFilter}>
        <Filters setMovieName={setMovieName} movieName={movieName} />
      </View>

      {movieName != "" ? (
        <View style={styles.listContainer}>
          <MovieSearchList movieName={movieName} />
        </View>
      ) : (
        <View style={styles.listContainer}>
          <MoviesTopRatedList />
        </View>
      )}
    </View>
  );
}
