import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import NavBar from "../components/NavBar";
import { ThemeColor } from "../context/ThemeColor";
import MoviesTopRatedList from "../components/movies/MovieTopRatedList";
import MovieSearchList from "../components/movies/MovieSearchList";
import MoviesPopularList from "../components/movies/MoviePopularList";
import SwitchSelector from "react-native-switch-selector";


export default function FilmeScreen({ navigation }) {
    const colors = useContext(ThemeColor);

    const styles = StyleSheet.create({
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
    });
    const [movieName, setMovieName] = useState("");
    const [showTopRated, setShowTopRated] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.subContainerNavBar}>
                <NavBar />
            </View>
            {/* <View style={styles.subContainerFilter}>
        <MovieFilters setMovieName={setMovieName} movieName={movieName} />
      </View> */}
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
                        { label: "Top Rated", value: false },
                        { label: "Popular", value: false },
                    ]}
                />
            </View>
            <View style={styles.listContainer}>
                {movieName !== "" ? (
                    <MovieSearchList movieName={movieName} />
                ) : showTopRated ? (
                    <MoviesTopRatedList />
                ) : (
                    <MoviesPopularList />
                )}
            </View>
        </View>
    );
}
