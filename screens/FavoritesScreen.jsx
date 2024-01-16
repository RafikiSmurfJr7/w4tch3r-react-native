import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { ThemeColor, useThemeColor } from "../context/ThemeColor";
import { useFocusEffect } from "@react-navigation/native";
import { backendApi } from "../config/axios.conf";
import ErrorAlert from "../components/ErrorAlert";
import NavBar from "../components/NavBar";
import FavContainer from "../components/favorites/FavContainer";

export default function FavoritesScreen() {
  const colors = useThemeColor();

  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(false);

  const [refresh, updateRefres] = useState(false);

  styles = {
    container: {
      flex: 1,
      backgroundColor: colors.blue,
    },
    subContainerNavBar: {},
    errorContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 100,
    },
  };

  useFocusEffect(
    useCallback(() => {
      updateRefres(false);
      backendApi
        .get("/favorites/?id=1")
        .then((res) => {
          console.log(res.data);
          setFavorites(res.data);
          setError(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.detail);
        });
    }, [refresh])
  );

  return (
    <View style={styles.container}>
      <View style={styles.subContainerNavBar}>
        <NavBar />
      </View>
      {!error ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <>
              <FavContainer
                updateRefres={updateRefres}
                tmdb_id={item.tmdb_id}
                fav_id={item.fav_id}
              />
            </>
          )}
          keyExtractor={(item) => item.fav_id}
        />
      ) : (
        <View style={styles.errorContainer}>
          <ErrorAlert>{error}</ErrorAlert>
        </View>
      )}
    </View>
  );
}

//const styles = StyleSheet.create({});
