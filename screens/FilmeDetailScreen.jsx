import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Iframe } from "@bounceapp/iframe";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendApi, tmdbApi } from "../config/axios.conf";
import { Icon } from "@rneui/base";
import { AuthContext } from "../context/AuthContext";

export default function FilmeDetailScreen({}) {
  const route = useRoute();
  const [movieData, setMovieData] = useState();
  const [isFav, setIsFav] = useState(false);
  const { getToken } = useContext(AuthContext);
  const userToken = getToken();
  const [favId, setFavId] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setIsFav(false);

      tmdbApi
        .get(`/movie/${route.params.id}`)
        .then((res) => {
          setMovieData(res.data);
        })
        .catch((err) => {});

      backendApi
        .get(`/favorites/?token=${userToken}`)
        .then((res) => {
          console.log(res);
          const favorites = res.data;
          let isFavorite = false;
          favorites.map((e) => {
            if (e.tmdb_id == route.params.id) {
              isFavorite = true;
              setFavId(e.fav_id);
            }
          });
          setIsFav(isFavorite);
        })
        .catch((err) => console.log(err));
    }, [route.params.id])
  );

  const handlePressFavorite = () => {
    if (!isFav) {
      backendApi
        .post("/favorites/create", {
          user_token: String(userToken),
          tmdb_id: String(movieData.id),
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(favId);
      backendApi.delete(`/favorites/delete/${favId}`);
    }
    setIsFav((prev) => !prev);
  };

  const removeFromFavorite = (fav_id) => {
    backendApi.delete(`/favorites/delete/${fav_id}`).then((res) => {
      updateRefresh(true);
    });
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
              <View style={styles.movieInfoContainer}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
                  }}
                  style={styles.poster}
                />

                <View style={{ alignSelf: "center", width: 150 }}>
                  <Text style={styles.movieInfoText}>{movieData.title} </Text>
                  <Text style={styles.movieInfoText}>
                    ({movieData.release_date.slice(0, 4)})
                  </Text>
                  <Text style={styles.movieInfoText}>
                    Rating: {movieData.vote_average.toPrecision(2) * 10}%
                  </Text>
                  <Text style={styles.movieInfoText}>
                    Language: {movieData.original_language.toUpperCase()}{" "}
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

                  <Pressable
                    onPress={handlePressFavorite}
                    style={{ marginTop: 2, alignSelf: "flex-start" }}
                  >
                    <Icon
                      name="star"
                      type="font-awesome-5"
                      color="#F7D730"
                      solid={isFav}
                    />
                  </Pressable>
                </View>
              </View>
              <View style={styles.movieDescriptionContainer}>
                <Text style={styles.movieWatchTitle}></Text>
                <Text style={styles.movieInfoText}>{movieData.overview}</Text>
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
    flexDirection: "row",
    alignItems: "center",
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
