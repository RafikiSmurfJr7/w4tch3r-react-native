import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { tmdbApi } from "../config/axios.conf";
import SeriesCard from "./SeriesCard";

export default function SerieList() {
  const [seriesData, setSeriesData] = useState();

  useEffect(() => {
    tmdbApi
      .get("/tv/top_rated")
      .then((res) => {
        setSeriesData(res.data.results);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
        data={seriesData}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => (
          <SeriesCard
            title={item.name}
            img={item.poster_path}
            rating={item.vote_average}
            year={item.first_air_date.slice(0, 4)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
