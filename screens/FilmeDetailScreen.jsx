import React, { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import { Iframe } from "@bounceapp/iframe";
import { useRoute } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tmdbApi } from "../config/axios.conf";  

export default function FilmeDetailScreen() {
    const route = useRoute();
    const [movieData, setMovieData] = useState();
    const [isFavorito, setIsFavorito] = useState(false);

    useEffect(() => {
        tmdbApi
            .get(`/movie/${route.params.id}`)
            .then((res) => {
                setMovieData(res.data);
            })
            .catch((err) => {});
    }, [route.params.id]);

    const toggleFavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

            const isAlreadyFavorited = favorites.some(fav => fav.id === movieData.id);

            if (isAlreadyFavorited) {
                
                favorites = favorites.filter(fav => fav.id !== movieData.id);
            } else {
             
                favorites.push({ id: movieData.id, title: movieData.title });
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorito(!isFavorito);
        } catch (error) {
            console.error('Error manipulating favorites:', error);
        }
    };

    return (
        <View style={styles.container}>
            {movieData ? (
                <>
                    <ImageBackground
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`,
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
                            <TouchableOpacity
                                style={styles.starContainer}
                                onPress={toggleFavorite}
                            >
                                <Icon
                                    name={isFavorito ? 'star' : 'star-outline'}
                                    size={30}
                                    color="yellow"
                                />
                            </TouchableOpacity>
                            <View style={styles.movieInfoContainer}>
                                <Image
                                    source={{
                                        uri: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
                                    }}
                                    style={styles.poster}
                                />
                                <View
                                    style={{ alignSelf: "center", width: 150 }}
                                >
                                    <Text style={styles.movieInfoText}>
                                        {movieData.title}
                                    </Text>
                                    <Text style={styles.movieInfoText}>
                                        ({movieData.release_date.slice(0, 4)})
                                    </Text>
                                    <Text style={styles.movieInfoText}>
                                        Rating:{" "}
                                        {movieData.vote_average.toPrecision(2) *
                                            10}
                                        %
                                    </Text>
                                    <Text style={styles.movieInfoText}>
                                        Language:{" "}
                                        {movieData.original_language.toUpperCase()}{" "}
                                    </Text>
                                    <Text style={styles.movieInfoText}>
                                        Genre:{" "}
                                        {movieData.genres.map((item, i) =>
                                            i < movieData.genres.length - 1
                                                ? `  ${item.name} ,`
                                                : `  ${item.name} `
                                        )}{" "}
                                    </Text>
                                    <Text style={styles.movieInfoText}>
                                        Time: {movieData.runtime} min
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.movieDescriptionContainer}>
                                <Text style={styles.movieWatchTitle}>                                    
                                </Text>
                                <Text style={styles.movieInfoText}>
                                    {movieData.overview}
                                </Text>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                    <ScrollView style={styles.moviePlayerContainer}>
                        <View style={styles.moviePlayerTitleContainer}>
                            <Text style={styles.movieWatchTitle}>Watch</Text>
                        </View>
                        <Iframe
                            style={styles.containerWebView}
                            uri={`https://vidsrc.me/embed/movie?tmdb=${movieData.id}&color=15006D`}
                        />
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
        flex: 1.4,
        height: "100%",
    },
    imageTransparent: {
        flex: 1,
        height: "100%",
    },
    starContainer: {
        position: 'absolute',
        top: 70,
        right: 40,
        zIndex: 1,
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
        flexDirection: 'row',
        alignItems: 'center',
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
        marginLeft: 8,
    },
    containerWebView: {
        flex: 1,
        marginTop: 16,
        height: 200,
    },
});
