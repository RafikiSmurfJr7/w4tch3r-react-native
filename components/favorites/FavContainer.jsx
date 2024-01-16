import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useThemeColor } from "../../context/ThemeColor";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { backendApi, tmdbApi } from "../../config/axios.conf";
import { Image } from "react-native";
import { Icon } from "@rneui/base";

export default function FavContainer({ tmdb_id, fav_id, updateRefres }) {
  const navigation = useNavigation();
  const colors = useThemeColor();

  const [movieDetails, setMovieDetails] = useState();
  const [error, setError] = useState(true);

  useFocusEffect(
    useCallback(() => {
      tmdbApi
        .get(`/movie/${tmdb_id}`)
        .then((res) => {
          console.log(res);
          setMovieDetails(res.data);
          setError(false);
        })
        .catch((err) => console.log(err));
    }, [])
  );

  const styles = {
    container: {
      backgroundColor: colors.white,
      marginLeft: 25,
      marginRight: 25,
      marginTop: 20,
      flexDirection: "row",
      padding: 10,
      justifyContent: "space-between",
      borderRadius: 8,
    },
    poster_img: {
      width: 60,
      height: 80,
      borderRadius: 8,
    },
    text_container: {
      width: "60%",
      marginLeft: 20,
      justifyContent: "center",
    },
    title: {
      fontSize: 16,
      fontWeight: "900",
    },
    tagline: {
      fontWeight: "500",
    },
    icon_container: {
      justifyContent: "center",
    },
  };

  const return_year = (date) => date.slice(0, 4);

  const removeFromFavorite = () => {
    backendApi.delete(`/favorites/delete/${fav_id}`).then((res) => {
      updateRefres(true);
    });
  };

  return !error ? (
    <Pressable
      onPress={() => navigation.navigate("FilmeDetail", { id: tmdb_id })}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
          }}
          style={styles.poster_img}
        />
        <View style={styles.text_container}>
          <Text style={styles.title}>
            {movieDetails.original_title} (
            {return_year(movieDetails.release_date)})
          </Text>
          <Text style={styles.tagline}>{movieDetails.tagline}</Text>
        </View>
        <View style={styles.icon_container}>
          <Icon
            name="trash"
            type="font-awesome-5"
            color="#FF0000"
            solid
            size={18}
            onPress={removeFromFavorite}
          />
        </View>
      </View>
    </Pressable>
  ) : null;
}

const styles2 = StyleSheet.create({
  test: {
    flexWrap: "wrap",
  },
});
