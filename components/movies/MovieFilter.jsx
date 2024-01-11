import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MovieNameFilterInput from "./MovieNameFilterInput";

export default function MovieFilters({ setMovieName, movieName }) {
    return (
        <>
            <View style={styles.container}>
                {/* <CategoryDropdownFilter /> */}
                <MovieNameFilterInput
                    setMovieName={setMovieName}
                    movieName={movieName}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
});
