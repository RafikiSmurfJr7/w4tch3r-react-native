import {
    ActivityIndicator,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import { tmdbApi } from "../config/axios.conf";
import { ScrollView } from "react-native-gesture-handler";
import { Iframe } from "@bounceapp/iframe";

export default function PeopleDetailScreen() {
    const route = useRoute();

    const [peopleData, setPeopleData] = useState();

    useEffect(() => {
        tmdbApi
            .get(`/person/${route.params.id}`)
            .then((res) => {
                setPeopleData(res.data);
            })
            .catch((err) => {});
    }, [route.params.id]);

    return (
        <View style={styles.container}>
            {peopleData ? (
                <>
                    <ImageBackground
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${peopleData.profile_path}`,
                        }}
                        resizeMode="cover"
                        style={styles.image}
                    >
                        <ImageBackground
                            source={require("../assets/angryimg.png")}
                            resizeMode="cover"
                            style={styles.imageTransparent}
                        >
                            <NavBar />
                            <View style={styles.movieInfoContainer}>
                                <Image
                                    source={{
                                        uri: `https://image.tmdb.org/t/p/w500${peopleData.profile_path}`,
                                    }}
                                    style={styles.poster}
                                />
                                <View
                                    style={{ alignSelf: "center", width: 150 }}
                                >
                                    <Text style={styles.movieInfoText}>
                                        {peopleData.name}
                                    </Text>
                                    <Text style={styles.movieInfoText}>
                                        Birthday: {peopleData.birthday}{" "}
                                        {peopleData.place_of_birth}
                                    </Text>
                                    <Text style={styles.movieInfoText}>
                                        Deathday: ({peopleData.deathday})
                                    </Text>
                                    <Text style={styles.movieInfoText}>
                                        Popularity: {peopleData.popularity}
                                    </Text>
                                </View>
                                <View style={styles.moviePlayerTitleContainer}>
                                <ScrollView >
                                <View>
                                    <Text style={styles.movieWatchTitle}>
                                        Biography
                                    </Text>
                                    <Text style={styles.movieInfoText}>
                                        {peopleData.biography}
                                    </Text>
                                </View>
                                </ScrollView>
                                </View>
                            </View>
                            <View style={styles.movieDescriptionContainer}>
                                <Text style={styles.movieInfoText}>
                                    {peopleData.overview}
                                </Text>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                    <ScrollView style={styles.moviePlayerContainer}>
                        <View style={styles.moviePlayerTitleContainer}>
                            <Text style={styles.movieWatchTitle}>
                                Know from :{" "}
                            </Text>
                        </View>
                    </ScrollView>
                </>
            ) : (
                <View style={{ flex: 1, backgroundColor: "#021F3A" }}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 2,
        height: "100%",
    },
    imageTransparent: {
        flex: 1,
        height: "100%",
    },
    movieInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 30,
        flexWrap: "wrap",
    },
    poster: {
        width: 117,
        height: 176,
        borderRadius: 10,
    },
    movieInfoText: {
        color: "white",
        fontWeight: "bold",
    },
    movieDescriptionContainer: {
        marginTop: 25,
        marginHorizontal: 30,
    },
    moviePlayerContainer: {
        flex: 1,
        backgroundColor: "#021F3A",
    },
    moviePlayerTitleContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    movieWatchTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    seriePlayerSeasonsContainer: {
        marginTop: 10,
        marginHorizontal: 25,
        flex: 1,
    },
    seriePlayerSeasonsTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    seriePlayerSeasonsButtonsContainer: {
        marginTop: 20,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    containerWebView: {
        flex: 1,
        marginTop: 16,
        height: 200,
    },
    seriePlayerEpisodesButtonsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    seriePlayerEpisodesTitle: {
        color: "white",
    },
});
