import React, { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import { Iframe } from "@bounceapp/iframe";
import { useRoute } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tmdbApi } from "../config/axios.conf";  

export default function FilmeDetailScreen({}) {
    const route = useRoute();
    const [movieData, setMovieData] = useState();
    const [isWatchLaterClicked, setIsWatchLaterClicked] = useState(false);
    const [favoritos, setFavoritos] = useState([]);
    
    useEffect(() => {
        tmdbApi
            .get(`/movie/${route.params.id}`)
            .then((res) => {
                setMovieData(res.data);
            })
            .catch((err) => {});
    }, [route.params.id]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favorites');
                if (storedFavorites) {
                    setFavoritos(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };

        const checkIsWatchLater = async () => {
            try {
                const storedWatchLater = await AsyncStorage.getItem('watchLater');
                const watchLaterList = storedWatchLater ? JSON.parse(storedWatchLater) : [];
                const isAlreadyInWatchLater = watchLaterList.some(item => item.id === movieData?.id);
                setIsWatchLaterClicked(isAlreadyInWatchLater);
            } catch (error) {
                console.error('Error checking if movie is in "Assistir Mais Tarde":', error);
            }
        };

        loadFavorites();
        checkIsWatchLater();
    }, [movieData]);

    const isFavorito = favoritos.some(fav => fav.id === movieData?.id);

    const toggleFavorite = async () => {
        try {
            let updatedFavorites = [...favoritos];

            const isAlreadyFavorited = updatedFavorites.some(fav => fav.id === movieData.id);

            if (isAlreadyFavorited) {
                updatedFavorites = updatedFavorites.filter(fav => fav.id !== movieData.id);
            } else {
                updatedFavorites.push({ id: movieData.id, title: movieData.title });
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavoritos(updatedFavorites);
        } catch (error) {
            console.error('Error manipulating favorites:', error);
        }
    };

    const handleWatchLater = async () => {
        try {
            const storedWatchLater = await AsyncStorage.getItem('watchLater');
            let watchLaterList = storedWatchLater ? JSON.parse(storedWatchLater) : [];

            const isAlreadyInWatchLater = watchLaterList.some(item => item.id === movieData.id);

            if (isAlreadyInWatchLater) {
                watchLaterList = watchLaterList.filter(item => item.id !== movieData.id);
            } else {
                watchLaterList.push({
                    id: movieData.id,
                    title: movieData.title,
                    poster_path: movieData.poster_path,
                    vote_average: movieData.vote_average,
                   
                });
            }

            await AsyncStorage.setItem('watchLater', JSON.stringify(watchLaterList));
            setIsWatchLaterClicked(!isWatchLaterClicked);
        } catch (error) {
            console.error('Error manipulating "Assistir Mais Tarde":', error);
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
                            <TouchableOpacity
                                onPress={handleWatchLater}
                                style={{ position: 'absolute', top: 72, right: 80, zIndex: 1 }}
                            >
                                <Icon name="time" size={30} color={isWatchLaterClicked ? 'orange' : 'white'} />
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
