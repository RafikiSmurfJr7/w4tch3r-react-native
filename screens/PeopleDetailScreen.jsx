import {
    ActivityIndicator,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import { tmdbApi } from "../config/axios.conf";
import { useNavigation } from "@react-navigation/native";


export default function PeopleDetailScreen() {
    const route = useRoute();
    const [peopleData, setPeopleData] = useState();
    const [castData, setCastData] = useState();
    const [knownFor, setKnownFor] = useState([]);

    useEffect(() => {
        tmdbApi
            .get(`/person/${route.params.id}`)
            .then((res) => {
                setPeopleData(res.data);
            })
            .catch((err) => {});
    }, [route.params.id]);

    useEffect(() => {
        tmdbApi
            .get(`/person/${route.params.id}/combined_credits`)
            .then((res) => {
                setCastData(res.data);
                const knownForData = res.data.cast.map((item) => ({
                    id: item.id,
                    title: item.title,
                    poster_path: item.poster_path,
                }));

                setKnownFor(knownForData);
            })
            .catch((err) => {});
    }, [route.params.id]);

    return (
        <View style={styles.container}>
            {peopleData && castData ? (
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
                            <View style={styles.peopleInfoContainer}>
                                <Image
                                    source={{
                                        uri: `https://image.tmdb.org/t/p/w500${peopleData.profile_path}`,
                                    }}
                                    style={styles.poster}
                                />
                                <View
                                    style={{ alignSelf: "center", width: 150 }}
                                >
                                    <Text style={styles.peopleInfoText}>
                                        {peopleData.name}
                                    </Text>
                                    <Text style={styles.peopleInfoText}>
                                        Birthday: {peopleData.birthday}{" "}
                                    </Text>
                                    <Text style={styles.peopleInfoText}>
                                        Place: {peopleData.place_of_birth}{" "}
                                    </Text>
                                    <Text style={styles.peopleInfoText}>
                                        Deathday: {peopleData.deathday}
                                    </Text>
                                    <Text style={styles.peopleInfoText}>
                                        Popularity: {peopleData.popularity}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                        <ScrollView style={styles.peopleContainer}>
                            <View style={styles.peopleTitleContainer}>
                                <Text style={styles.peopleTitle}>
                                    Biography
                                </Text>
                                <Text style={styles.peopleInfoText}>
                                    {peopleData.biography}
                                </Text>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                    <View style={styles.peopleContainer}>
                        <View style={styles.peopleTitleContainer}>
                            <Text style={styles.peopleTitle}>Known for: </Text>
                            <FlatList
                                data={knownFor}
                                horizontal
                                renderItem={({ item }) => (
                                    <Image
                                        source={{
                                            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                                        }}
                                        style={styles.knownForPoster}
                                    />
                                )}
                                keyExtractor={(item) => Math.random()*100+item.id}
                            />
                        </View>
                    </View>
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
        flex: 2,
        height: "100%",
    },
    peopleInfoContainer: {
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
    peopleInfoText: {
        color: "white",
        fontWeight: "bold",
    },
    peopleContainer: {
        flex: 1,
        backgroundColor: "#021F3A",
    },
    peopleTitleContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    peopleTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    knownForContainer: {
        marginTop: 20,
    },
    knownForTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    knownForList: {
        flexDirection: "row",
        marginBottom: 20,
    },
    knownForItem: {
        marginRight: 10,
    },
    knownForPoster: {
        width: 100,
        height: 150,
        borderRadius: 10,
        marginHorizontal:5,
    },
});
