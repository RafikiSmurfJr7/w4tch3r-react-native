import { Button, StyleSheet, Switch, Text, View } from "react-native";
import NavBar from "../components/NavBar";
import { useContext, useState } from "react";
import { ThemeColor } from "../context/ThemeColor";
import Filters from "../components/Filters";
import SerieTopRatedList from "../components/SerieTopRatedList";
import SerieSearchList from "../components/SerieSearchList";
import MovieSearchList from "../components/movies/MovieSearchList";
import MoviesPopularList from "../components/movies/MoviePopularList";
import MoviesTopRatedList from "../components/movies/MovieTopRatedList";
import SwitchSelector from "react-native-switch-selector";

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
        texto: {
            color: "#ffffff",
        },
        listContainer: {
            flex: 1,
            marginTop: 10,
        },
        switchContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
        },
        switchLabel: {
            color: colors.white,
            marginRight: 10,
        },
    };

    const [movieName, setMovieName] = useState("");
    const [showTopRated, setShowTopRated] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.subContainerNavBar}>
                <NavBar />
            </View>
            <View style={styles.switchContainer}>
                <SwitchSelector
                    initial={0}
                    textColor={"#000000"}
                    selectedColor={"#fff"}
                    buttonColor={colors.blue}
                    borderColor={"#ffffff"}
                    valuePadding={2}
                    hasPadding
                    onPress={(value) => setShowTopRated(!showTopRated)}
                    options={[
                        { label: "Filmes", value: false },
                        { label: "Series", value: false },
                    ]}
                />
            </View>
            <View style={styles.listContainer}>
                {movieName !== "" ? (
                    <MovieSearchList movieName={movieName} />
                ) : showTopRated ? (
                    <MoviesPopularList />
                ) : (
                    <SerieTopRatedList />
                )}
            </View>
        </View>
    );
}
